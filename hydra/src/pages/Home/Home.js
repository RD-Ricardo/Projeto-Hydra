import React , { useState, useEffect}from 'react';
import "./Home.scss";
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import {  Grid, Button, Segment } from 'semantic-ui-react';
import { getAuth } from 'firebase/auth';
import  { db }  from "../../utils/Firebase"
import { collection, getDocs, query, where} from 'firebase/firestore';

const Home = () => {
  const [audio, setAudio] = useState(true);
  const [funcao, setFuncao] = useState([]);
  
  async function iso(){
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


    setFuncao(results);

  }

  useEffect(()=>{
    iso();
  },[])
  
  let arrayPalavra = []

  funcao.forEach(c =>{
    arrayPalavra.push(c.palavraResult)
  })

  const commands = [
    {
      command:[`${arrayPalavra[0]}`],
      callback: () => fetch("http://localhost:4000/google")
    }
  ]

  const {
    browserSupportsSpeechRecognition,
    transcript,
    resetTranscript
  } = useSpeechRecognition({ commands });

  const handleAudio = () =>{
    if(audio === true){
      SpeechRecognition.startListening({continuous: true});
      fetch("http://localhost:4000/iniciar");
      setAudio(false)
    }
    else{
      SpeechRecognition.stopListening();
      setAudio(true)
      fetch("http://localhost:4000/fechar");
      document.getElementById('teste').innerText = '';
      resetTranscript();
    }
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  console.log(transcript);

  return (
   <Grid className='home'>
     <Grid.Row className='home-row'>
       <Grid.Column className='home-column' width={16}>
       <Segment style={{ height: 600, overflowY: 'scroll' ,backgroundColor: '#21283b', color:"white"}}>
            <pre id='teste'>
              <p>{transcript}</p>  
            </pre>
       </Segment>
       </Grid.Column>
     </Grid.Row>
     <Grid.Row className='home-row'>
       <Grid.Column className='home-column' width={16} >
        {audio ? 
                (
                  <Button
                  icon="play"
                  positive
                    attached='bottom'
                    content='Ativar'
                    onClick={handleAudio}
                  />
                )
              :(
                <Button 
                  icon="stop"
                  negative
                  attached='bottom'
                  content='Desligar Audio'
                  onClick={handleAudio}
                />
              )
        }
       </Grid.Column>
     </Grid.Row>
   </Grid>
  )
}


export default Home