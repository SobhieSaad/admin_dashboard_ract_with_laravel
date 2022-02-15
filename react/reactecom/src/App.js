import React from 'react';
import {BrowserRouter, Redirect, Route,Switch} from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import axios from 'axios';
import AdminPrivateRoute from './AdminPrivateRoute'
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
            <Route exact path="/" component={Home}/>
            
            {/* <Route path="/login" component={Login}/>

            <Route path="/register" component={Register}/> */}

            <Route path="/login">
              {localStorage.getItem('auth_token')? <Redirect to='/'></Redirect>: <Login />}
            </Route>
            <Route path="/register">
              {localStorage.getItem('auth_token')? <Redirect to='/'></Redirect>: <Register />}
            </Route>
            {/* <Route path="/admin"  name="Admin"  render={(props)=><MasterLayout {...props}/>} /> */}

            <AdminPrivateRoute path="/admin"  name="Admin"  />

      </Switch>
      </BrowserRouter>
    </div>
  ); 
}

export default App;
