import React from "react";
import Footer from "./Footer";
import Navbar from './Navbar';
import SideBar from "./Sidebar";
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';
import routes from "../../routes/routes.js";
import {Route,Switch,Redirect} from 'react-router-dom';
const MasterLayout= ()=>{

    return(
        <div className="sb-nav-fixed">
           <Navbar /> 
           <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <SideBar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <Switch>
                            {routes.map((route,idx)=>{
                                return (
                                    route.component && (
                                        <Route key={idx}  
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        render={(props) =>(
                                            <route.component {...props}/>
                                        )}
                                        />
                                    
                                    )
                                )
                            })}
                            <Redirect from="/admin" to="/admin/dashboard" />
                        </Switch>
                    </main>
                    <Footer/>
                </div>
            </div>

        </div>
    );

}

export default MasterLayout;