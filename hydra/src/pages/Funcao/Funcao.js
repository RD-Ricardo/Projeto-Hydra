import React , { useState, useEffect }from 'react'
import  { db }  from "../../utils/Firebase"
import { collection, getDocs, query} from 'firebase/firestore';
import {Button, Icon, Table ,Checkbox} from "semantic-ui-react";
import "./Funcao.scss"

const Funcao =  () => {

 const [funcao, setFuncao] = useState([]);
 useEffect(()=>{
  getAllFunction();
 },[])
  
 async function getAllFunction(){
  let funcaoArray = [];

  const funcoes = query(collection(db, 'funcao'));
  
  const queryFuncoes = await getDocs(funcoes);

  queryFuncoes.forEach((doc)=>{
    funcaoArray.push({
      id:doc.id,
      nomeArray: doc.data().nome,
      palavraChaveArray : doc.data().palavraChave,
      urlArray: doc.data().url
    })
    
  })
  setFuncao(funcaoArray);
 }


  return (
   <div className='testeFuncao' style={{ height:450, overflowY: 'scroll'}}>
       <Table inverted selectable>
        <Table.Header style={{textTransform:"uppercase"}}>
          <Table.Row>
            <Table.HeaderCell>Funcao</Table.HeaderCell>
            <Table.HeaderCell>Palavra Chave</Table.HeaderCell>
            <Table.HeaderCell>Data de Criação</Table.HeaderCell>
            <Table.HeaderCell>Editar</Table.HeaderCell>
            <Table.HeaderCell>Ativa/Desativa</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            funcao.map(c =>{
            return(
            <Table.Row key={c.id}>
              <Table.Cell>{c.nomeArray}</Table.Cell>
              <Table.Cell>{c.palavraChaveArray}</Table.Cell>
              <Table.Cell>{c.urlArray}</Table.Cell>
              <Table.Cell >
                <Button inverted color='blue'>
                    <Icon name='edit' />
                </Button>  
              </Table.Cell>
              <Table.Cell><Checkbox toggle/></Table.Cell>
            </Table.Row> 
            )
          }) 
        }
        </Table.Body>
      </Table>
   </div>
    
  )
}


export default Funcao;
