import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import store from "./store";
import MainPage from "./components/MainPage";
import AdminPage from './components/AdminPage';
import TopicEditor from "./components/TopicEditor";
import CoursesPage from "./components/CoursesPage";
import TopicPage from "./components/TopicPage";
import TestCreator from "./components/TestCreator";
import TestEditor from "./components/TestEditor";
import TestPage from "./components/TestPage";
 
class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router history = {createHistory()}>
          <div>
            <Switch>
              <Route path = "/" component = {MainPage} exact/>
              <Route path = "/determinant" render={() => (
                store.getState().login.userRole === "admin" ? (
                  <Redirect to="/admin"/>
                ) : (
                  <Redirect to="courses"/>
                )  
              )}/>
              <Route path = "/admin" component = {AdminPage}/>
              <Route path = "/editor" component = {TopicEditor}/>
              <Route path = "/topic" component = {TopicPage}/>
              <Route path = "/courses" component = {CoursesPage}/>
              <Route path = "/testcreator" component = {TestCreator}/>
              <Route path = "/testeditor" component = {TestEditor}/>
              <Route path = "/testpage" component = {TestPage}/>
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
