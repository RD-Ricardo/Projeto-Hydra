import React from 'react'
import "./MenuLeft.scss";
import { Menu, Icon, Button } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import logoHydra from "../../assets/img/logoHydra.png"
export default function MenuLeft (props) {
    const { user} = props;

    return (
      <Menu className="menu-left" vertical>
          <div className="top">
            <div className="logo">
              <img src={logoHydra}/>
              <h2>
                HYDRA
              </h2>
            </div>

              <Menu.Item name="home">
                <Icon name="home"/>Home
              </Menu.Item>
              <Menu.Item name="home">
                <Icon name="home"/>Home
              </Menu.Item>
              <Menu.Item name="home">
                <Icon name="home"/>Home
              </Menu.Item>
              <Menu.Item name="home">
                <Icon name="settings"/>settigns
              </Menu.Item>
          </div>
          <div className="footer"> 
            <Button > 
              Sair
            <Icon name="power off"/>  
            </Button>
          </div>  
      </Menu>
    )
}
