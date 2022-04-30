import "./RegisterForm.scss";
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { useState } from "react";
import { validateEmail } from "../../../utils/Validation";
import { getAuth, createUserWithEmailAndPassword , updateProfile} from "firebase/auth";
import { toast } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";
import  { db }  from "../../../utils/Firebase"
 
export default function RegisterForm(props) {
  
  const { setSelectedForm } = props;
  const [formData, setFormData] = useState(defaultValueForm());
  const [showPassword, setShowPassWord] = useState(false);
  const [formError, setFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowPassword = ()=>{
    setShowPassWord(!showPassword);
  }

  const onChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = ()=>{
    
    setFormError({});
    let errors = {};
    let formOk = true;

    if(!validateEmail(formData.email)){
      errors.email = true;
      formOk = false;
    }

    if(formData.password.length < 6){
      errors.password = true;
      formOk = false;
    }

    if(!formData.username){
      errors.username = true;
      formOk = false;
    }

    setFormError(errors);

    if(formOk){
      setIsLoading(true);
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(()=>{
        testeDoc();
        chagerUserName();        
      })
      .catch((e)=>{
        toast.error("Deu erro Login")
      })
    }
  };

  const chagerUserName = ()=>{
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: formData.username
    }).catch(()=>{
      toast.error("Deu erro no login")
    })
  }

  const testeDoc = async () =>{

    const auth = getAuth();

    const assitenteDoc = await addDoc(collection(db, "assitente"),{ 
        idUser: auth.currentUser.uid, 
        name: "Hydra", 
        createDate: Date.now()
     }
    ) 
    
    await addDoc(collection(db, `assitente/${assitenteDoc.id}/funcao`),
    {
      nome: "Abrir Googgle",
      palavraChave : "ir para google",
      ativo: true
    },)

    await addDoc(collection(db, `assitente/${assitenteDoc.id}/funcao`),
    {
      nome: "Abrir youtube",
      palavraChave : "ir para google",
      ativo: true
    },)
    await addDoc(collection(db, `assitente/${assitenteDoc.id}/funcao`),
    {
      nome: "Abrir Netflix",
      palavraChave : "ir para netflix",
      ativo: true
    },)
    await addDoc(collection(db, `assitente/${assitenteDoc.id}/funcao`),
    {
      nome: "Abrir Instagram",
      palavraChave : "ir para instragram",
      ativo: true
    },)
    await addDoc(collection(db, `assitente/${assitenteDoc.id}/funcao`),
    {
      nome: "Abrir WhatsApp",
      palavraChave : "ir para whatsapp",
      ativo: true
    },)
    await addDoc(collection(db, `assitente/${assitenteDoc.id}/funcao`),
    {
      nome: "Pesquisar no Google",
      palavraChave : "pesquisa por",
      ativo: true
    },)
    await addDoc(collection(db, `assitente/${assitenteDoc.id}/funcao`),
    {
      nome: "Pesquisar no YouTube",
      palavraChave : "ver video",
      ativo: true
    },)
    await addDoc(collection(db, `assitente/${assitenteDoc.id}/funcao`),
    {
      nome: "Anuncio do YouTube",
      palavraChave : "pular anuncio",
      ativo: true
    },)
    await addDoc(collection(db, `assitente/${assitenteDoc.id}/funcao`),
    {
      nome: "Pular Abertura Netflix",
      palavraChave : "pular abertura",
      ativo: true
    },)
  }

  return (
    <div className="register-form">
      <Form onSubmit={ onSubmit } onChange={onChange}>
        <Form.Field>
          <Input type="text" 
                name="email" 
                icon="mail outline" 
                placeholder="email:"
                error={formError.email}
                />
                {formError.email && (
                  <span className="error-text">
                    Email errado
                  </span>
                )}
        </Form.Field>
        <Form.Field>
            <Input type={showPassword ? "text": "password"} 
                   name="password" 
                   placeholder="senha:"
                   error={formError.password}
                   icon={showPassword ? (
                      <Icon name="eye slash outline" 
                      link onClick={handleShowPassword}/>
                   ):(
                      <Icon name="eye" 
                      link onClick={handleShowPassword}/>
                   )
                  } 
                  />
                  {formError.password &&(
                    <span className="error-text">
                      Insira uma senha maior que 5 caracteres
                    </span>
                  )}
        </Form.Field>
        <Form.Field>
          <Input type="text" 
                  name="username" 
                  icon="user circle outline" 
                  placeholder="nome:"
                  error={formError.username}
                  />
                  {formError.username &&(
                    <span className="error-text">
                      um nome
                    </span>
                  )}
        </Form.Field>
        <Button type="submit" loading={isLoading}>cadastrar-se</Button>
      </Form>

      <div className="register-form__options">
        <p onClick={()=>{setSelectedForm(null)}}>Voltar</p>
        <p>já tem uma conta ?<span onClick={()=>setSelectedForm("login")}>Iniciar sessão</span> </p>  
      </div>
    </div>
  )
}

function defaultValueForm(){
  return({
      email: "",
      password:"",
      username:""
  })
}