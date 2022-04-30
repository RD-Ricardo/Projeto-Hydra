import React, {useState} from 'react';
import "./MenuLeft.scss";
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function MenuLeft (props) {
    let location = useLocation();
    const [activeMenu, setActiveMenu] = useState(location.pathname);
    const handlerMenu = (e , menu)=>{
      setActiveMenu(menu.to);
    }

    return (
     <Menu className='menu-left' vertical>
       <div className='top'>
          <Menu.Item 
            as={Link} 
            to="/" 
            active={activeMenu === "/"}
            onClick={handlerMenu}
          >
            <Icon name='home'/>Inicio
          </Menu.Item>
          <Menu.Item 
            as={Link} 
            to="/funcao" 
            active={activeMenu === "/funcao"}
            onClick={handlerMenu}
          >
            <Icon name='home'/>Função
          </Menu.Item>
          <Menu.Item 
            as={Link} 
            to="/assistente" 
            active={activeMenu === "/assistente"}
            onClick={handlerMenu}
          >
            <Icon name='home'/>Assistente
          </Menu.Item>
       </div>
       <div className='footer'>
          <Menu.Item>
              <Icon name='home'/>fim
          </Menu.Item>
       </div>
     </Menu>
    )
}
