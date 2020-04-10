import React, { Component } from 'react';
import './App.css';
import Dashboard from './pages/DashBoard';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddProject from './pages/AddProject';
import { Provider } from 'react-redux';
import store from './redux/store';
import UpdateProject from './pages/UpdateProject';
import ProjectBoard from './pages/ProjectBoard';
import AddProjectTask from './pages/AddProjectTask';
import UpdateProjectTask from './pages/UpdateProjectTask';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import jwt_decode from 'jwt-decode';
import setJWTToken from './security/setJWTToken';
import { SET_CURRENT_USER } from './redux/actions/types';
import { logout } from './redux/actions/securityActions';
import SecuredRoute from './security/SecureRoute';

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {
              //Public Routes
            }

            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {
              //Private Routes
            }
            <Switch>
              <SecuredRoute exact path="/dashboard" component={Dashboard} />
              <SecuredRoute exact path="/addProject" component={AddProject} />
              <SecuredRoute
                exact
                path="/updateProject/:id"
                component={UpdateProject}
              />
              <SecuredRoute
                exact
                path="/projectBoard/:id"
                component={ProjectBoard}
              />
              <SecuredRoute
                exact
                path="/addProjectTask/:id"
                component={AddProjectTask}
              />
              <SecuredRoute
                exact
                path="/updateProjectTask/:backlog_id/:pt_id"
                component={UpdateProjectTask}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
