import { render } from "preact";
import "./assets/main.scss";
import Tree from "./components/tree.tsx";
import sidebar from "../fixtures/sidebar.json";

render(<Tree node={sidebar} />, document.getElementById("sidebar")!);
