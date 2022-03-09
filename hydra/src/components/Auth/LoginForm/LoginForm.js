import "./LoginForm.scss";
import React, { useState } from 'react'
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import {validateEmail} from "../../../utils/Validation";
import { db } from "../../../utils/Firebase";
import { FactorId, getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm(props) {

  const { setSelectedForm } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);


  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const handlerShowPassword = () =>{
    setShowPassword(!showPassword);
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

    setFormError(errors);

    if(formOk) {
      setIsLoading(true);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((response)=>{
        setUser(response.user);
      })
      .catch(()=>{
        toast.error("Erro no login");
      })
    }
  }

  return (
    <div className="login-form">
        <Form onChange={onChange}>
          <Form.Field>
              <Input type="text"
                    name="email"
                    placeholder="Email:"
                    icon="mail outline"
                    error = {formError.email}
                    />
                    {formError.email &&(
                        <span>
                            E-mail incorreto - Digite novamente.
                        </span>
                      )
                    }
          </Form.Field>
          <Form.Field>
              <Input type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="senha:"
                    error={formError.password}
                    icon=
                    {showPassword ? (
                      <Icon name="eye slash outline" link
                      onClick={handlerShowPassword}/>
                    ) :(
                      <Icon name="eye" link
                      onClick={handlerShowPassword}/>
                    )}
                    />
                    {formError.password && (
                      <span>
                          Senha incorreta - Digite novamente
                      </span>
                    )
                    }
          </Form.Field>
          <Button type="submit" loading={isLoading}  onClick={onSubmit}>Iniciar Sessão</Button>
        </Form>

        <div className="login-form__options">
            <p onClick={()=>{setSelectedForm(null)}}>Voltar</p>
            <p>
              Não registrado ?
                <span onClick={()=>{setSelectedForm("Register")}}>Cadastra - se</span>
            </p>
        </div>
    </div>
  )
}




function defaultValueForm(){
  return{
    email:"",
    password:""
  }
}