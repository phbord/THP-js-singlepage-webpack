// import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip } from 'bootstrap';
import '../sass/style.scss';
import routes from './routes';
import Components from './components';
import pagelist from './PageList';

let searchBar = document.querySelector('.magnifier');
searchBar.innerHTML = new Components().svgComponent('search');

let searchInput = document.querySelector("#basic-url");

let pageArgument;

const setRoute = () => {
    let path = window.location.hash.substring(1).split("/");
    if (path[0] === ""){
        path[0] = "home";
    }

    pageArgument = path[1] || "";

    routes(path[0], pageArgument);
    return true;
};

searchInput.addEventListener("change", () => pagelist(searchInput.value));
window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());