import React from "react";

import {Route,Switch} from 'react-router-dom';
import Navbar from "../../layouts/frontend/Navbar";
import PublicRouteList from "../../routes/PublicRouteList";
const FrontendLayout= ()=>{

    return(
        <div>
           <Navbar /> 
           
                <div>
                        <Switch>
                            {PublicRouteList.map((routeData,idx)=>{
                                return (
                                    routeData.component && (
                                        <Route key={idx}  
                                        path={routeData.path}
                                        exact={routeData.exact}
                                        name={routeData.name}
                                        render={(props) =>(
                                            <routeData.component {...props}/>
                                        )}
                                        />))
                                 })}
                        </Switch>
                    
                </div>
            </div>

    );

}

export default FrontendLayout;