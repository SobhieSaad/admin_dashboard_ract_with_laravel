import React from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import axios from 'axios';

axios.defaults.baseURL="http://localhost:8000";
axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.headers.post['Accept']='application/json';
axios.defaults.withCredentials = true;

 function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Switch>
            <Route exact path="/" component={Home}/>
            
            <Route path="/login" component={Login}/>

            <Route path="/register" component={Register}/>

            <Route path="/admin"  name="Admin"  render={(props)=><MasterLayout {...props}/>} />

      </Switch>
      </BrowserRouter>
    </div>
  ); 
}

export default App;
