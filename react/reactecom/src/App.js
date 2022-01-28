import React from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home';
 
 function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/admin"  name="Admin"  render={(props)=><MasterLayout {...props}/>} />
      </Switch>
      </BrowserRouter>
    </div>
  ); 
}

export default App;
