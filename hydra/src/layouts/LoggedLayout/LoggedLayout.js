import React from 'react'
import "./LoggedLayout.scss";
import { Grid} from 'semantic-ui-react';
import Routes from "../../routes/Routes";
import { BrowserRouter as Router} from "react-router-dom";
import MenuLeft from '../../components/MenuLeft';
import Nav from "../../pages/Nav";

export default function LoggedLayout(props){
  const { user  } = props;
  console.log(user);
  return (
    <Router>
        <Grid className='logged-layouts'>
          <Grid.Row>
            <Grid.Column width={3}>
                <MenuLeft user={user}/>
            </Grid.Column>
            <Grid.Column width={13} className='teste'>
               <Nav/>
                <Routes/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    </Router>     
  )
}
