import { Lexer } from "marked";
import { render } from "preact";
import Token from "./components/token";
import sidebar from "../fixtures/docsify.md?raw";
import "./assets/main.scss";

// window.$docsify = window.$docsify || {};
// window.$docsify.plugins = [].concat(function(hook, vm) {
//     hook.ready(function() {
//         document.querySelector(".sidebar").innerHTML = "";
//         render(<Tree node={sidebar} />, document.querySelector(".sidebar"));
//     })
// }, $docsify.plugins || []);

const lexer = new Lexer();
const tokens = lexer.lex(sidebar);

const el = tokens.map(t => <Token token={t} />)
render(el, document.querySelector("#sidebar"));
