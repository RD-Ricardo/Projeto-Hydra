import React from 'react'
import "./LoggedLayout.scss";
import { Grid} from 'semantic-ui-react';
import Routes from "../../routes/Routes";
import { BrowserRouter as Router} from "react-router-dom";
import MenuLeft from '../../components/MenuLeft';
//import Nav from "../../pages/Nav";

export default function LoggedLayout(props){
  const { user  } = props;
  console.log(user);
  return (
    <Router>
        <Grid className='logged-layout'>
          <Grid.Row>
            <Grid.Column width={2}>
                <MenuLeft user={user}/>
            </Grid.Column>
            <Grid.Column width={14} className='content'>
              <h2>TopBar</h2>
              <Routes/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} style={{backgroundColor: '#21283b',borderRadius:"10px",margin:"6px 10px 2px 0px", color:"white", textAlign:"end", padding:"5px 70px 0px 0px"}}>
             <p>Criado</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    </Router>     
  )
}
