import { Lexer } from "marked";
import { render } from "preact";
import Token from "./components/token";
import sidebar from "../fixtures/docsify.md?raw";
import "./assets/main.scss";

// const el = tokens.map(t => <Token token={t} />)
// render(el, document.querySelector("#sidebar"));

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [].concat(function(hook, vm) {
    hook.ready(function(vm) {
        console.log(vm);
        const lexer = new Lexer();
        const tokens = lexer.lex(sidebar);
        document.querySelector(".sidebar").innerHTML = "";
        const el = tokens.map(t => <Token token={t} />)
        render(el, document.querySelector(".sidebar"));
    })
}, $docsify.plugins || []);

// const lexer = new Lexer();
// const tokens = lexer.lex(sidebar);
// const el = tokens.map(t => <Token token={t} />)
// render(el, document.querySelector("#sidebar"));