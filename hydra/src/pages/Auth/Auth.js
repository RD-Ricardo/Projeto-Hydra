import AuthOptions from "../../components/Auth/AuthOptions"; 
import RegisterForm from "../../components/Auth/RegisterForm"; 
import LoginForm from "../../components/Auth/LoginForm"; 
import { useState } from "react";
import Logo from "../../assets/img/logoHydra.png"
import "./Auth.scss";

export default function Auth(){
    const [selectedForm, setSelectedForm] = useState(null);

    const handlerForm = ()=>{
        switch (selectedForm) {
            case "login":
               return <LoginForm setSelectedForm={setSelectedForm}/>
            case "Register":
               return <RegisterForm setSelectedForm={setSelectedForm}/>
            default:
              return <AuthOptions setSelectedForm={setSelectedForm}/>;
        }
    };


    return (
        <div className="auth">
            
            <div className="auth__box">
                <div className="auth__box-logo" >
                    <img src={Logo} />
                </div>  
                <div className="container">
                    <div className="container__content">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                        hydra
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    </div> 
                    <div className="container__separator"></div>
                </div>
                {handlerForm()}
            </div>    
        </div>
    );
}


