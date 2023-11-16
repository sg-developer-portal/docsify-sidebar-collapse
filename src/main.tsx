import { render } from "preact";
import Tree from "./components/tree.tsx";
import sidebar from "../fixtures/sidebar.json";
import "./assets/main.scss";

render(<Tree node={sidebar} />, document.getElementById("sidebar")!);
