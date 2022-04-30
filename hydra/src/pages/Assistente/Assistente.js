import React from 'react'
import { Grid } from 'semantic-ui-react';
import "./Assitente.scss"
const Assistente = () => {
  return (
    <Grid className='assistente'>
     <Grid.Row className='assistente-row'>
       <Grid.Column className='assistente-column' width={16}>
         Assitente
       </Grid.Column>
     </Grid.Row>
   </Grid>
  )
}



export default Assistente;