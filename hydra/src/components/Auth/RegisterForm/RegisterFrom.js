import "./RegisterForm.scss";
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import "firebase/auth";
import { useState } from "react";
import { validateEmail } from "../../../utils/Validation";
import { getAuth, createUserWithEmailAndPassword , updateProfile} from "firebase/auth";
import { toast } from "react-toastify";

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
        chagerUserName();        
      })
      .catch((e)=>{
        toast.error("Deu erro maladro")
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