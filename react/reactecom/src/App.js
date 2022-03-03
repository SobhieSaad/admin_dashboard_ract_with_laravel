import React from 'react';
import {BrowserRouter, Redirect, Route,Switch} from 'react-router-dom';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import axios from 'axios';
import AdminPrivateRoute from './AdminPrivateRoute'
import Page403 from './components/errors/Page403';
import Page404 from './components/errors/Page404';
import PublicRoute from './PublicRoute';
axios.defaults.baseURL="http://localhost:8000";
axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.headers.post['Accept']='application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token=localStorage.getItem('auth_token');
  config.headers.Authorization=token? `Bearer ${token}` :'';
  return config;
});

 function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Switch>
            <AdminPrivateRoute path="/admin"  name="Admin"  />
            <PublicRoute path="/" name="Home" />
            <Route path="/login">
              {localStorage.getItem('auth_token')? <Redirect to='/'></Redirect>: <Login />}
            </Route>
            <Route path="/register">
              {localStorage.getItem('auth_token')? <Redirect to='/'></Redirect>: <Register />}
            </Route>

      </Switch>
      </BrowserRouter>
    </div>
  ); 
}

export default App;
