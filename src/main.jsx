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

function renderSidebar(markdown, basePath, el) {
    const lexer = new Lexer();
    const tokens = lexer.lex(markdown);
    render(<Sidebar tokens={tokens} basePath={basePath} />, el);
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [].concat(function(hook, vm) {
    const { enableSidebarCollapse, nameLink } = vm.config;

    if (!enableSidebarCollapse) return;

    hook.mounted(() => {
        const el = document.querySelector('.sidebar-nav');
        const root = createRoot(el, 'enhanced-sidebar');
        vm._renderSidebar = (markdown) => {
            renderSidebar(markdown, nameLink, root);
        }
    })
}, $docsify.plugins || []);
