import React from "react";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import UserList from "./UserList"
import Userpage from "./Userpage"
import "./App.css";

function App() {
    return (
            <Router>
                <div className="">
                    
                    <Switch>
                        <Route exact path="/" component={UserList}/>
                        <Route render={(props) => <Userpage {...props}/>}/>
                        
                    </Switch>
                </div>
            </Router>
    );
}

export default App;
