import React from 'react';
import "./MenuLeft.scss";
import { Menu, Icon, Button } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import logoHydra from "../../assets/img/logoHydra.png";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default function MenuLeft (props) {
    const { user} = props;
    

    const handleOpenApp = () =>{
    
      window.iso.doThing();

    }
    return (
      <Menu className="menu-left" vertical>
          <div className="top">
            <div className="logo">
              <img src={logoHydra}/>
              <h2>
                HYDRA
              </h2>
            </div>

              <Menu.Item  as={Link} to="/"  name="home">
                <Icon name="home"/>Home
              </Menu.Item>
              <Menu.Item  as={Link} to="/Assistente" name="home">
                <Icon name="assistive listening systems"/>Assitente
              </Menu.Item>
              <Menu.Item as={Link} to="/Funcao">
                <Icon name="computer"/>Funções
              </Menu.Item>
              <Menu.Item name="home">
                <Icon name="settings"/>settigns
              </Menu.Item>
          </div>
          <div className="footer"> 
            <Button onClick={handleOpenApp}> 
              Sair
            <Icon name="power off"/>  
            </Button>
          </div>  
      </Menu>
    )
}
