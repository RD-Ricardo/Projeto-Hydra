import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "../pages/Home";
import Assistente from "../pages/Assistente";
import Funcao from "../pages/Funcao";
export default  function  Routes() {
  return (
    <Switch>
        <Route path="/" exact>
            <Home/>
        </Route>
        <Route path="/Assistente" exact>
            <Assistente/>
        </Route>
        <Route path="/Funcao" exact>
          <Funcao/>
        </Route>
    </Switch>
  )
}
