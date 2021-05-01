import React from "react";
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Collaborate from "./Collaborate";

ReactDOM.render(
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about/" component={About}/>
        <Route path="/collaborate/" component={Collaborate}/>
      </Switch>
    </HashRouter>,
    document.getElementById('react')
);
