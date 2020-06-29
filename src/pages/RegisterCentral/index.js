// NPM imports
import React, { useState } from 'react';
import { FiArrowLeft} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

// Project imports 
import api from '../../services/api';
import './styles.css';
import logo from '../../assets/logo.png';


export default function Register(){

    const [nomeCentral,setNomeCentral] = useState('');
    const [emailCentral,setEmailCentral] = useState('');
    const [telefoneCentral,setTelefoneCentral] = useState('');
    const [cpfCentral,setCpfCentral] = useState('');
    const [senhaCentral,setSenhaCentral] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data ={
            senhaCentral, 
            nomeCentral, 
            cpfCentral, 
            emailCentral, 
            telefoneCentral,
        };

        try{
            const response = await api.post('central', data)
            
            alert(`Seu ID de acesso: ${response.data.id}`);
            
            history.push('/');
        }catch(err){
            toast.error(err.response.data.error);
        }
    }

    return( 
        <div className="register-central-container">
            <ToastContainer />
            <div className="content">
                <section>
                    <img src= {logo} alt="Central de Estagio"/>

                    <h1>Cadastro de Central</h1>
                    <p>Efetue o cadastro para ter acesso ao sistema</p>

                    <Link className="back-link" to="/homeCentral">
                       <FiArrowLeft size={16} color="#E02041"/>
                       Voltar para a Home
                   </Link>

                </section>
                <form onSubmit={handleRegister}>
                    <input 
                    placeholder="Nome do Funcionário"
                    value={nomeCentral}
                    onChange={e=> setNomeCentral(e.target.value)}
                    />
                    <input 
                    type="tel" placeholder="Telefone de Contato"
                    value={telefoneCentral}
                    onChange={e=> setTelefoneCentral(e.target.value)}
                    />
                    <input 
                    type="email" placeholder="E-mail"
                    value={emailCentral}
                    onChange={e=> setEmailCentral(e.target.value)}
                    />
                    <input 
                    type="number" placeholder="CPF"
                    value={cpfCentral}
                    onChange={e=> setCpfCentral(e.target.value)}
                    />
                    <input 
                    type="password" placeholder="Senha de acesso"
                    value={senhaCentral}
                    onChange={e=> setSenhaCentral(e.target.value)}
                    />
                    <input type="password" placeholder="Confirme sua senha"/>

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}