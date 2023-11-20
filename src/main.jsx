import { Lexer } from "marked";
import { render } from "preact";
import Token from "./components/token";
import "./assets/main.scss";

function createRoot(el, id) {
    el.innerHTML = "";
    el.id = id;
    el.className = id;
    return el;
}

function _renderSidebar(txt, el) {
    const lexer = new Lexer();
    const tokens = lexer.lex(txt);
    const sidebar = tokens.map(t => <Token token={t} />)
    render(sidebar, el);
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [].concat(function(hook, vm) {
    hook.mounted(() => {
        const el = document.querySelector('.sidebar-nav');
        const root = createRoot(el, 'enhanced-sidebar');
        vm._renderSidebar = (txt) => {
            _renderSidebar(txt, root);
        }
    })
}, $docsify.plugins || []);

