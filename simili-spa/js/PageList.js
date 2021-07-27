const PageList = (argument = "") => {
    console.log("Page List", argument);

    const preparePage = () => {
        cleanedArgument = argument.replace(/\s+/g, "-");
        let articles = "";

        const fetchList = (url, argument) => {
            let finalURL = url;
            const options = {
                method: 'GET',
                headers: new Headers(),
                // headers: {
                //     'Content-Type': 'application/json',
                //     'API-Key': apiKey
                // },
                mode: 'cors',
                cache: 'default'
            };
            if (argument) {
                finalURL = `${url}&search=${argument}&page_size=10&search_exact=true`;
            }
            fetch(`${finalURL}`, options)
                .then(response => response.json())
                .then(response => {
                    response.results.forEach(article => {
                        articles += `
                            <div class="cardGame">
                                <h1>${article.name}</h1>
                                <h2>${article.released}</h2>
                                <a href = "#pagedetail/${article.id}">${article.id}</a>
                            </div>`;
                    });
                    document.querySelector(".page-list .articles").innerHTML = articles;
                });
        };

        fetchList(`https://api.rawg.io/api/games?key=${apiKey}`, cleanedArgument);
    };

    const render = () => {
        pageContent.innerHTML = `
            <section class="page-list">
                <div class="articles">...loading</div>
            </section>
        `;
        preparePage();
    };

    render();
};