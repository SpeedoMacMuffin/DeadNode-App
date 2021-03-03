import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Chat from "./views/Chat/Chat";
import Files from "./views/Files/Files";
import Start from "./views/Start/Start";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/files">
          <Files />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/">
          <Start />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
