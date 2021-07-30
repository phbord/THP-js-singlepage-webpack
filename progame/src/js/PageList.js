import Components from './components';
import { showSelected, showMore, revealCards, hoverGamePicture, fetchDetails} from './functions';

const pagelist = (argument = "") => {
    let isHoverGamePicture = false;

    let select = document.querySelector('#gameFilter');
    const preparePage = () => {
        let cleanedArgument = argument.replace(/\s+/g, "-");
        let articles = "";
        let select = document.querySelector('#gameFilter');
        let currentPlatforms = {};

        const fetchList = (url, argument) => {
            let finalURL = url;
            if (argument) {
                finalURL = `${url}&search=${argument}&page_size=27`;
            } else {
                finalURL = `${url}&dates=2021-08-01,2022-08-01&page_size=27`;
            }
            fetch(`${finalURL}`)
                .then(response => response.json())
                .then(response => {
                    let allOpts = [];
                    response.results.forEach(article => {
                        // localStorage
                        let screenshotsArr = [];
                        article.short_screenshots.map(s => screenshotsArr.push(s.image));
                        localStorage.setItem(article.id, screenshotsArr);

                        article.platforms.map(x => currentPlatforms[x.platform["id"]] = x.platform["name"]);
                        let platforms = article.platforms.map(x => `<li>${new Components().svgComponent(x.platform['slug'])}</li>`);
                        articles += `
                            <div class="col-4 ${article.name.replace(/\s+/g, "-")} d-none">
                                <div class="cardGame card my-4">
                                    <div class="card-img-top">
                                        <div class="card-img-over opacity-0">
                                            <p class="card-img-over-title">${article.released}</p>
                                            <p class="card-img-over-title">${article.rating}/${article.rating_top} - ${article.ratings_count} votes</p>
                                            <p class="card-img-over-text">${article.tags.map(x => x.name).join(', ')}</p>
                                        </div>
                                        <img src="${article.background_image}" class="card-img-single" alt="">
                                    </div>
                                    <div class="card-body">
                                        <a href="#pagedetail/${article.id}" class="d-block">
                                            <h1>${article.name}</h1>
                                        </a>
                                        <ul class="platform-list">${platforms.join(' ')}</ul>
                                    </div>
                                </div>
                            </div>`;
                        let opt = document.createElement('option');
                        opt.id = article.name.replace(/\s+/g, "-");
                        opt.innerHTML = `${article.name}`
                        allOpts.push(opt);
                    });
                    select.innerHTML = '';
                    for (let i = 0; i < allOpts.length; i ++) {
                        select.append(allOpts[i]);
                    }
                    document.querySelector("#articles").innerHTML = articles;

                    let nineFirst = document.querySelectorAll('.col-4');
                    for (let i = 0; i < 9; i++){
                        nineFirst[i].classList.remove('d-none');
                    }
                });
        };
        fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`, cleanedArgument);
    };

    window.addEventListener('change', showSelected);

    const render = () => {
        let pageContent = document.querySelector("#pageContent");
        pageContent.innerHTML = `
            <section class="page-list">
                <div>
                    <select name="filter" id="gameFilter" multiple="true">
                        <option id="first-opt">Platform: any</option>
                    </select>
                </div>
                <div id="articles" class="articles row my-2">...loading</div>
                <div class="d-flex justify-content-center mt-5">
                    <button id="btn-show-more" class="btn-default">Show more...</button>
                </div>
            </section>
        `;
        preparePage();
        isHoverGamePicture = true;
    };

    render();
    hoverGamePicture(isHoverGamePicture);

    let pageNumber = 1;

    let btnElt = document.querySelector('#btn-show-more');

    btnElt.addEventListener('mousedown', e => {
        e.preventDefault();
        revealCards(showMore()[pageNumber]);
        pageNumber += 1;
        if (pageNumber >= 3) {
            e.target.classList.add('d-none');
            return;
        }
    });
};

export default pagelist;