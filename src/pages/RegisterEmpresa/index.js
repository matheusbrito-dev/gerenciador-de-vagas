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

    const [cidadeEmpresa,setCidadeEmpresa] = useState('');
    const [ufEmpresa,setUfEmpresa] = useState('');
    const [nomeFantasiaEmp,setNomeFantasiaEmp] = useState('');
    const [razaoSocialEmp,setRazaoSocialEmp] = useState('');
    const [cnpjEmp,setCnpjEmp] = useState('');
    const [emailEmp,setEmailEmp] = useState('');
    const [telEmp,setTelEmp] = useState('');
    const [nomeRepresentante,setNomeRepresentante] = useState('');
    const [cpfRepresentante,setCpfRepresentante] = useState('');
    const [senhaEmpresa,setSenhaEmpresa] = useState('');

    const [codValidacao,setCodValidacao] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data ={
            codValidacao,
            cidadeEmpresa,
            ufEmpresa,
            nomeFantasiaEmp,
            razaoSocialEmp,
            cnpjEmp,
            emailEmp,
            telEmp,
            nomeRepresentante,
            cpfRepresentante,
            senhaEmpresa,
        };

        try{
            const response = await api.post('empresas', data)
            
            alert(`Seu ID de acesso: ${response.data.id}`);
            
            history.push('/');
        }catch(err){
            toast.error(err.response.data.error);
        }
    }
    

    return( 
        <div className="register-container">
            <ToastContainer />
            <div className="content">
                <section>
                    <img src= {logo} alt="Central de Estagio"/>

                    <h1>Cadastro de Empresa</h1>
                    <p>Efetue o cadastro para ter acesso ao sistema</p>

                    <Link className="back-link" to="/escolherCadastro">
                       <FiArrowLeft size={16} color="#E02041"/>
                       Voltar para a escolha de Cadastro
                   </Link>

                    <Link className="back-link" to="/">
                       <FiArrowLeft size={16} color="#E02041"/>
                       Voltar para a tela de Login
                   </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                    placeholder="Nome Fantasia"
                    value={nomeFantasiaEmp}
                    onChange={e=> setNomeFantasiaEmp(e.target.value)}
                    />
                    <input 
                    placeholder="Razão Social"
                    value={razaoSocialEmp}
                    onChange={e=> setRazaoSocialEmp(e.target.value)}
                    />
                    <input 
                    type="number" placeholder="CNPJ"
                    value={cnpjEmp}
                    onChange={e=> setCnpjEmp(e.target.value)}
                    />
                    <input 
                    type="tel" placeholder="Telefone de Contato da Empresa"
                    value={telEmp}
                    onChange={e=> setTelEmp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                        placeholder="Cidade"
                        value={cidadeEmpresa}
                        onChange={e=> setCidadeEmpresa(e.target.value)}
                        />
                        <input 
                        placeholder="UF"
                        value={ufEmpresa}
                        onChange={e=> setUfEmpresa(e.target.value)}
                        />
                    </div>
                    <input 
                    type="email" placeholder="E-mail da Empresa"
                    value={emailEmp}
                    onChange={e=> setEmailEmp(e.target.value)}
                    />
                    <input 
                    placeholder="Nome do Representante"
                    value={nomeRepresentante}
                    onChange={e=> setNomeRepresentante(e.target.value)}
                    />
                    <input 
                    type="number" placeholder="CPF do Representante"
                    value={cpfRepresentante}
                    onChange={e=> setCpfRepresentante(e.target.value)}
                    />

                    <input 
                    placeholder="Codigo de Validação"
                    value={codValidacao}
                    onChange={e=> setCodValidacao(e.target.value)}
                    />  

                    <input 
                    type="password" placeholder="Senha de acesso"
                    value={senhaEmpresa}
                    onChange={e=> setSenhaEmpresa(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}