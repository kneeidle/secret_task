import './App.css';
import NavBar from "./components/NavBar"
import TodoList from "./components/TodoList"
import Home from "./components/Home"
import Login from "./components/Login"
import Logout from "./components/Logout"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from "./routers/PrivateRoute"
import PublicRoute from "./routers/PublicRoute"
import { connect } from  'react-redux'

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/tasks" component={TodoList} />
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/logout" component={Logout} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;
 