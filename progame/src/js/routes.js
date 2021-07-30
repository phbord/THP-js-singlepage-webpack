import pagedetail from "./PageDetail";
import pagelist from "./PageList";
import home from "./home";

const routes = (path, argument) => {
    let routes = {
        "home": home,
        "pagelist": pagelist,
        "pagedetail": pagedetail,
    }
    if (path){
        routes[path](argument);
    }
};

export default routes;