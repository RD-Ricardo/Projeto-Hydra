import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "../pages/Home";

export default  function  Routes() {
  return (
    <Switch>
        <Route path="/" exact>
            <Home/>
        </Route>
        <Route path="/assitentes" exact>
            <h2>Assistentes</h2>
        </Route>
        <Route path="/settigns" exact>
            <h2>
                Configurações
            </h2>
        </Route>
    </Switch>
  )
}
