import React, {useState} from 'react';
import{ Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.png';
import rightImg from '../../assets/rightImg.png';


export default function Logon(){
    const [tipoLogin, setTipoLogin] = useState('');
    const [id, setId] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            if(tipoLogin==="aluno"){
                const response = await api.post('sessionAluno', {id, senha});
                localStorage.setItem('alunoId', id);
                localStorage.setItem('nomeAluno', response.data.nomeAluno);
                history.push('/homeAluno');

            }else if(tipoLogin==="empresa"){
                const response = await api.post('session', {id, senha});
                localStorage.setItem('empresaId', id);
                localStorage.setItem('nomeEmpresa', response.data.nomeFantasiaEmp);
                history.push('/homeEmpresa');
            }else{
                alert('Falha no Login, Por favor insira as informações');
            }
                        
        }catch(err){
            alert('Falha no login, tente novamente.')
        }
    }
    

    return(
        <div className="logon-container">
            <section className="form">
               <img src={logo} alt="Central de Estágio"/>
               <form onSubmit={handleLogin}>
                   <h1>Faça seu logon</h1>
                   <select 
                    className="select" 
                    id="tipoLogin"
                    value={tipoLogin}
                    onChange={e=> setTipoLogin(e.target.value)}
                    required
                    >
                        <option value="">Escolha o Tipo de Login</option>
                        <option value="aluno">Aluno</option>
                        <option value="empresa">Empresa</option>
                    </select>
                   <input 
                    placeholder="Sua ID"
                    value={id}
                    onChange={e=> setId(e.target.value)}
                   />
                   <input 
                    type="password" placeholder="Sua Senha"
                    value={senha}
                    onChange={e=> setSenha(e.target.value)}
                   />
                   
                   <button className="button" type="submit">Entrar</button>

                   <Link className="back-link" to="/escolherCadastro">
                       <FiLogIn size={16} color="#E02041"/>
                       Não tenho cadastro
                   </Link>
               </form>
            </section>

            <img src={rightImg} alt="rightImg"/>

           
        </div>
    );
}