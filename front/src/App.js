import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import store from "./store";
// import MainPage from "./components/MainPage";
import Login from "./components/Login";
import Signup from "./components/Signup"; 
import AdminPage from './components/AdminPage';
import TopicEditor from "./components/TopicEditor";
import CoursesPage from "./components/CoursesPage";
 
class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router history = {createHistory()}>
          <div>
            <Switch>
              {/* <Route path = "/" component = {MainPage} exact/> */}
              <Route path = "/" component = {Login} exact/>
              <Route path = "/determinant" render={() => (
                store.getState().login.userRole === "admin" ? (
                  <Redirect to="/admin"/>
                ) : (
                  <Redirect to="courses"/>
                )  
              )}/>
              <Route path = "/signup" component = {Signup}/>
              <Route path = "/admin" component = {AdminPage}/>
              <Route path = "/editor" component = {TopicEditor}/>
              <Route path = "/courses" component = {CoursesPage}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default App;
