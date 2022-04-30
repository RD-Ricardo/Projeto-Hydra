import React , { useState, useEffect }from 'react'
import  { db }  from "../../utils/Firebase"
import { collection, getDocs, query, where} from 'firebase/firestore';
import {Button, Icon, Table ,Checkbox, Grid} from "semantic-ui-react";
import "./Funcao.scss"
import { getAuth } from 'firebase/auth';

const Funcao =  () => {

 const [funcao, setFuncao] = useState([]);
 useEffect(()=>{
  getAllFunction();
 },[])
  
 async function getAllFunction(){

  let results = [];

  let idAssitente = "";

  const userAuth =  getAuth();
  const assitente = query(collection(db,"assitente"),where("idUser", "==", `${userAuth.currentUser.uid}`));
  const queryAssitente = await getDocs(assitente);
  queryAssitente.forEach(doc =>{
     idAssitente = doc.id;
  })
 
  const funcoes = query(collection(db, `assitente/${idAssitente}/funcao`))
  const queryFuncoes = await getDocs(funcoes);
  queryFuncoes.forEach((doc)=>{
    results.push({
      id:doc.id,
      nomeResult:doc.data().nome,
      ativoResult: doc.data().ativo,
      palavraResult: doc.data().palavraChave
    })
  }) 


  setFuncao(results)
 }


  return (
  
  <Grid className='funcao'>
    <Grid.Row className='funcao-row'>
      <Grid.Column className='funcao-column' width={16}  style={{ height: 630, overflowY: 'scroll' }}>
          <Table inverted selectable >
         <Table.Header style={{textTransform:"uppercase"}}>
           <Table.Row>
             <Table.HeaderCell>Funcao</Table.HeaderCell>
             <Table.HeaderCell>Palavra Chave</Table.HeaderCell>
             <Table.HeaderCell>Editar</Table.HeaderCell>
             <Table.HeaderCell>Ativa/Desativa</Table.HeaderCell>
           </Table.Row>
         </Table.Header>
         <Table.Body  >
           {
             funcao.map(c =>{
             return(
             <Table.Row key={c.id}>
               <Table.Cell >{c.nomeResult}</Table.Cell>
               <Table.Cell style={{textTransform:"uppercase"}}>" {c.palavraResult} "</Table.Cell>
               <Table.Cell >
                    <Button inverted color='blue'>
                      <Icon name='edit' />
                   </Button>  
               </Table.Cell>
               <Table.Cell>
               { c.ativoResult === true ?
                   <Checkbox checked toggle/>
                   :
                   <Checkbox toggle/>
               } 
               </Table.Cell>
             </Table.Row> 
             )
           }) 
         }
         </Table.Body>
       </Table> 
      </Grid.Column>
    </Grid.Row>
  </Grid>
  )
}


export default Funcao;
