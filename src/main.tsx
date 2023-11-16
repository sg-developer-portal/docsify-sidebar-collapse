import { render } from "preact";
import Sidebar from "./components/tree.tsx";
import sidebar from "../fixtures/sidebar.json";

render(<Sidebar node={sidebar} />, document.getElementById("sidebar")!);
