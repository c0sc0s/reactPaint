import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Canvas from "./components/Canvas";
import SettingBar from "./components/SettingBar";
import Toolbar from "./components/Toolbar";
import "./styles/app.scss";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/:id"}>
          <div className="App">
            <Toolbar></Toolbar>
            <SettingBar></SettingBar>
            <Canvas></Canvas>
          </div>
        </Route>
      </Switch>
      <Redirect to={`f${(+new Date()).toString(16)}`} />
    </BrowserRouter>
  );
}

export default App;
