import { Lexer } from "marked";
import { render } from "preact";
import Sidebar from "./sidebar"
import "./assets/main.scss";

function createRoot(el, id) {
    el.innerHTML = "";
    el.id = id;
    el.className = id;
    return el;
}

function _renderSidebar(txt, basePath, el) {
    const lexer = new Lexer();
    const tokens = lexer.lex(txt);
    render(<Sidebar tokens={tokens} basePath={basePath} />, el);
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [].concat(function(hook, vm) {
    if (vm.config.enableSidebarCollapse) {
        hook.mounted(() => {
            const el = document.querySelector('.sidebar-nav');
            const root = createRoot(el, 'enhanced-sidebar');
            vm._renderSidebar = (txt) => {
                _renderSidebar(txt, vm.config.nameLink, root);
            }
        })
    }
}, $docsify.plugins || []);

window.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && document.querySelector('#enhanced-sidebar').contains(e.target)) {
        e.preventDefault();
        window.history.pushState(undefined, "", e.target.href)
    }
})