import { render } from "preact";
import Sidebar from "./sidebar.tsx";
import sidebar from "../fixtures/sidebar.json";

render(<Sidebar sidebar={sidebar} />, document.getElementById("sidebar")!);
