import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import './App.css';

import Navbar from "./navbar/Navbar";

import Cliente from "./clientes/cliente";

class App extends React.Component{

  constructor(){
    super();

    this.state = {
      sesionActiva: true
    }
  }

  render(){
    console.log("render App");
    const { sesionActiva } = this.state;
    return (
      <div className="App">
        <Navbar sesionActiva={sesionActiva} />
        <Switch>
           <Route path="/" render={()=> <Cliente />} />             
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
