import { Lexer } from "marked";
import { render } from "preact";
import Sidebar from "./sidebar"
import "./assets/main.scss";

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [].concat(function(hook, vm) {
    const { enableSidebarCollapse, nameLink: basePath } = vm.config;

    if (!enableSidebarCollapse) return;

    hook.mounted(() => {
        const rootElement = document.querySelector(".sidebar-nav");

        // Clear and flag the element
        rootElement.innerHTML = ""
        rootElement.id = "enhanced-sidebar";
        rootElement.className = "enhanced-sidebar";

        vm._renderSidebar = (markdown) => {
            const lexer = new Lexer();
            const tokens = lexer.lex(markdown);

            render(<Sidebar tokens={tokens} basePath={basePath} />, rootElement);
        }

        // Prevents docsify from auto-collapsing the sidebar panel on mobile view
        // when clicking on sidebar items.
        // 
        // https://github.com/docsifyjs/docsify/blob/a416f97237318503cdf48430b20402ca5e2b30ec/src/core/event/index.js#L360-L365
        rootElement.addEventListener('click', (e) => {
            e.stopPropagation();
        })
    })
}, $docsify.plugins || []);
