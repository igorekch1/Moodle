import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import store from "./store";
// import MainPage from "./components/MainPage";
import Login from "./components/Login";
import Signup from "./components/Signup"; 
import AdminPage from './components/AdminPage';

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router history = {createHistory()}>
          <div>
            <Switch>
              {/* <Route path = "/" component = {MainPage} exact/> */}
              <Route path = "/" component = {Login} exact/>
              <Route path = "/signup" component = {Signup}/>
              <Route path = "/admin" component = {AdminPage}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
