import { render } from "preact";
import "./assets/main.scss";
import Tree from "./components/tree.tsx";
import sidebar from "../fixtures/example.json";

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [].concat(function(hook, vm) {
    hook.ready(function() {
        document.querySelector(".sidebar").innerHTML = "";
        render(<Tree node={sidebar} />, document.querySelector(".sidebar"));
    })
}, $docsify.plugins || []);
