import { fetchGameSeries } from './functions';
import Components from './components';


const pagedetail = (argument = "") => {

    const preparePage = () => {
        let cleanedArgument = argument.replace(/\s+/g, "-");

        const fetchGame = (url, argument) => {
            let finalURL = `${url}?key=${process.env.API_KEY}`;
            if (argument){
                finalURL = `${url}${argument}?key=${process.env.API_KEY}`;
            }

            fetch(`${finalURL}`)
                .then((response) => response.json())
                .then((response) => {

                    let articleDOM = document.querySelector(".page-detail");
                    let similarGamesDOM = '';

                    fetchGameSeries(response.id).forEach(game => {
                        similarGamesDOM += `
                            <li class="col-12 col-sm-6 col-md-4">
                                <div class="cardGame card my-4">
                                    <div class="card-img-top">
                                        <img src="${game.background_image}" class="card-img-single" alt="">
                                    </div>
                                    <div class="card-body">
                                        <h1>${game.name}</h1>
                                        <h2 class="d-none">${game.released}</h2>
                                        <ul class="platform-list"></ul>
                                    </div>
                                </div>
                            </li>
                        `;
                        console.log('similarGamesDOM => ',similarGamesDOM);
                    });

                    // buy
                    let buyDOM = ``;
                    const components = new Components;
                    const buy = response.stores.forEach(res => {
                        buyDOM += `<li class=""><a target="_blank" href="https://${res.store.domain}" class="pb-2">`;
                        buyDOM +=   `<span class="welcome-content me-2">${res.store.name}</span>`;
                        buyDOM +=   components.svgComponent(res.store.slug) ? components.svgComponent(res.store.slug) : ''
                        buyDOM += `</a></li>`;
                    });

                    // localStorage
                    let screenshotsDOM = ``;
                    const screenshots = localStorage.getItem(response.id).split(',').forEach(url => {
                        screenshotsDOM += `<li class="item-screenshot-group col-12 col-sm-6 mt-4">`;
                        screenshotsDOM +=   `<div class="item-screenshot"><img src="${url}" class="img-screenshots"></div>`;
                        screenshotsDOM += `</li>`;
                    });

                    articleDOM.innerHTML = `
                        <div id="bigImg" class="img-lg mb-5" style="background-image: url('${response.background_image}');">
                            <a href="${response.website}" class="btn-default img-lg-btn">Check website<i class="triangle"></i></a>
                        </div>

                        <div class="article">
                            <div class="title-group">
                                <h1 class="h1 title">${response.name}</h1>
                                <div class="title-group-votes">
                                    ${response.rating}/${response.rating_top} -  ${response.ratings_count} votes
                                </div>
                            </div>

                            ${response.description}

                            <div class="row mb-5">
                                <div class="col-12 col-sm-6 col-md-3 release-date">
                                    ${response.released ? response.released : ''}
                                </div>
                            </div>

                            <h2 class="h2">Buy</h2>
                            <ul id="stores" class="mb-5">${buyDOM}</ul>

                            <h2 class="h2">Trailer</h2>
                            <video id="trailer" class="w-100 mb-5" poster="${response.background_image_additional}" controls>
                                <source src="" type="video/mp4">
                                <p class="welcome-content">Sorry, your browser doesn't support embedded videos.</p>
                            </video>

                            <h2 class="h2">Screenshots</h2>
                            <ul class="row mb-5">
                                ${screenshotsDOM}
                            </ul>

                            <h2 class="h2">Similar games</h2>
                            <ul id="similar-games-list" class="row"></ul>
                        </div>
                    `;
                            // <h2 class="h2">Youtube</h2>
                            // <div class="row mb-5">
                            //     <div class="col-12 col-sm-6"></div>
                            // </div>
                            // <div class="row">
                            //     <div class="col-12 col-sm-6 col-md-4"></div>
                            // </div>

                    console.log('similarGamesDOM==',similarGamesDOM);
                    document.querySelector('#similar-games-list').innerHTML = similarGamesDOM;
            });
        };

        fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
    };

    const render = () => {
        let pageContent = document.getElementById("pageContent");
        pageContent.innerHTML = `
            <section class="page-detail"></section>`;

        preparePage();
    };

    render();
};

export default pagedetail;