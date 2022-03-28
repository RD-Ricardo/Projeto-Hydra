import React , { useState}from 'react';
import "./Home.scss";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Grid, GridColumn, Segment } from 'semantic-ui-react';

const Home = () => {
  
  const [audio, setAudio] = useState(true);

  const command = [
    {
      command:["Ir para *"],
      callback:(param, out) => {

        if(param ===  "YouTube"){
          window.open(`https://www.youtube.com/results?search_query=${out}`);
        }
      }
    },
  ]

  const {
    transcript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition( {commands:command} );

  const handleAudio = () =>{
    if(audio === true){
      SpeechRecognition.startListening({continuous: true});
      setAudio(false)
    }
    else{
      SpeechRecognition.stopListening();
      setAudio(true)
      document.getElementById('teste').innerText = '';
      
    }
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <Grid className='homepage'>
      <Grid.Row>
        <GridColumn width={16} className="teste" >
        <Segment className="logger">
            <pre id='teste' style={{ height:450, overflowY: 'scroll' }}>
             {transcript}
            </pre>
          </Segment>
       
        </GridColumn>
        <GridColumn width={16}>
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
           
        </GridColumn>
      </Grid.Row>    
    </Grid>
  )
}


export default Home