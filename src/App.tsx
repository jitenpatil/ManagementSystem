import "./styles.css";
import {  BrowserRouter as Router} from "react-router-dom";
import AppRouting from "./AppRouting";


export default function App() {

  return <>
      <Router>
        <AppRouting/>
      </Router>
  </>;

}
