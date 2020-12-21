import './App.css';
import NavBar from "./components/NavBar"
import TodoList from "./components/TodoList"
import Home from "./components/Home"
import Login from "./components/Login"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from "./routers/PrivateRoute"
import PublicRoute from "./routers/PublicRoute"
import { connect } from  'react-redux'

function App(props) {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute auth={props.auth} path="/tasks" component={TodoList} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}


export default connect(mapStateToProps)(App);
 