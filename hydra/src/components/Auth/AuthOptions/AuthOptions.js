import React from 'react';
import { Button } from "semantic-ui-react";
import "./AuthOptions.scss";

export default function AuthOptions(props) {
  const { setSelectedForm } = props;

  return (
    <div className="auth-options">
    
     
      <Button className="login" onClick={()=>{setSelectedForm("login")}}>
        iniciar sessão
      </Button>
      <Button className="register" onClick={()=>{setSelectedForm("Register")}}>
        cadastrar-se
      </Button>
    </div>
  )
}
