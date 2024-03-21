import { Lexer } from "marked";
import { render } from "preact";
import Sidebar from "./sidebar"
import "./assets/main.scss";

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [].concat(function(hook, vm) {
    const { enableSidebarCollapse, nameLink: basePath, hideSidebar } = vm.config;

    if (!enableSidebarCollapse) return;



    hook.mounted(() => {
        if (hideSidebar) {
            // FIXME : better styling solution
            [
              document.querySelector('aside.sidebar'),
              document.querySelector('button.sidebar-toggle'),
            ].forEach(node => node.parentNode.removeChild(node));
            document.querySelector('section.content').style.right = 'unset';
            document.querySelector('section.content').style.left = 'unset';
            document.querySelector('section.content').style.position = 'relative';
            document.querySelector('section.content').style.width = '100%';
        } else {
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
        }
    })
}, $docsify.plugins || []);
