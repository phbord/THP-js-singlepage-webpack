const showSelected = () => {
        let select = document.getElementsByTagName("option");
        for (let i = 0; i < select.length; i++) {
            let matchingArticle = document.getElementsByClassName(`${select[i].id}`)[0];
            if (select[i].selected === false) {
                matchingArticle.classList.add('d-none');
            } else if (select[i].selected === true){
                matchingArticle.classList.remove('d-none');
            }
        }
    };

    const showMore = () => {
        if (!document.querySelectorAll('.col-4')[0]){
            console.log("Oups");
            return;
        } else {
            const cardList = document.querySelectorAll('.col-4');
            const listPart1 = Array.from(cardList).slice(0, 9);
            const listPart2 = Array.from(cardList).slice(9, 18);
            const listPart3 = Array.from(cardList).slice(18, 27);
            return [listPart1, listPart2, listPart3];
        }
    };

    const revealCards = (arr) => {
        arr.map(x => x.classList.remove('d-none'));
    };

    const hoverGamePicture = (bool) => {
        const evtGamePicture = () => {
            if (bool === true) {
                const imgElt = document.querySelectorAll('.card .card-img-over');
                imgElt.forEach(elt => {
                    elt.addEventListener('mouseover', (e) => {
                        e.target.classList.remove('opacity-0');
                    });
                    elt.addEventListener('mouseleave', (e) => {
                        e.target.classList.add('opacity-0');
                    });
                });
                clearInterval(evt);
            }
        };
        const evt = setInterval(evtGamePicture, 500);
    };

    const fetchDetails = (id) => {
        const finalURL = `https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`;
        return fetch(`${finalURL}`).then(res => res.json());
    };

    const fetchGameSeries = (id) => {
        const finalURL = `https://api.rawg.io/api/games/${id}/game-series?key=${process.env.API_KEY}`;
        let gamesArr = [];
        fetch(finalURL)
            .then(res => res.json())
            .then(res => {
                res.results.forEach(item => gamesArr.push(item));
            });
        return gamesArr;
    };

    const fetchVideos = (slug) => {
        let videoIds = [];
        const url = `https://api.rawg.io/api/games/${slug}/movies?key=${process.env.API_KEY}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                res.results.forEach(item => {
                    videoIds.push(item.data.max);
                })
            })
        return videoIds;
    }

    const setLocalStorage = (name, obj) => {
        return 
    };

export { showSelected, showMore, revealCards, hoverGamePicture, fetchDetails, fetchGameSeries, fetchVideos};