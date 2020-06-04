import React from 'react';
import {Link ,useHistory} from 'react-router-dom';
import { FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import logo from '../../assets/logo.png';
import { useState } from 'react';

export default function Register(){
    //const [usuarioAluno, setUsuarioAluno] = useState('');
    const [senhaAluno, setSenhaAluno] = useState('');
    const [nomeAluno, setNomeAluno] = useState('');
    const [cpfAluno, setCpfAluno] = useState('');
    const [sexoAluno, setSexoAluno] = useState('');
    const [dataNascAluno, setDataNascAluno] = useState('');
    const [cidadeAluno, setCidadeAluno] = useState('');
    const [ufAluno, setUfAluno] = useState('');
    const [emailAluno, setEmailAluno] = useState('');
    const [telefoneAluno, setTelefoneAluno] = useState('');
    
    const history = useHistory();
    
    async function handleRegisterAluno(e){
        e.preventDefault();

        const data ={
            //usuarioAluno,
            senhaAluno,
            nomeAluno,
            cpfAluno,
            sexoAluno,
            dataNascAluno,
            cidadeAluno,
            ufAluno,
            emailAluno,
            telefoneAluno,
        };

        try{    
            const response = await api.post('alunos', data)
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        }catch(err){
            alert("Erro no cadastro, tente novamente.")
        }

    }


    return( 
        <div className="register-aluno-container">
            <div className="content">
                <section>
                    <img src= {logo} alt="Central de Estagio"/>

                    <h1>Cadastro de Aluno</h1>
                    <p>Efetue o cadastro para ter acesso ao sistema</p>

                    <Link className="back-link" to="/">
                       <FiArrowLeft size={16} color="#E02041"/>
                       Voltar para a tela de login
                   </Link>
                </section>

                <form onSubmit={handleRegisterAluno}>
                    <input 
                    placeholder="Nome Completo"
                    value={nomeAluno}
                    onChange={e=> setNomeAluno(e.target.value)}
                    />
                    <input 
                    type="number" placeholder="CPF"
                    value={cpfAluno}
                    onChange={e=> setCpfAluno(e.target.value)}
                    />
                    <input 
                    type="date"
                    placeholder="Data de Nascimento"
                    value={dataNascAluno}
                    onChange={e=> setDataNascAluno(e.target.value)}
                    />
                    <select 
                    className="select" 
                    id="sexo"
                    value={sexoAluno}
                    onChange={e=> setSexoAluno(e.target.value)}
                    >
                        <option value="">Escolha seu sexo</option>
                        <option value="masc">Masculino</option>
                        <option value="femi">Feminino</option>
                        <option value="outr">Outros</option>
                    </select>
                    <div className="input-group">
                        <input 
                        placeholder="Cidade"
                        value={cidadeAluno}
                        onChange={e=> setCidadeAluno(e.target.value)}
                        />
                        <input 
                        placeholder="UF"
                        value={ufAluno}
                        onChange={e=>setUfAluno(e.target.value)}
                        />
                    </div>
                    <input 
                    type="email" 
                    placeholder="E-mail do aluno"
                    value={emailAluno}
                    onChange={e=> setEmailAluno(e.target.value)}
                    />
                    <input 
                    type="tel" 
                    placeholder="Seu telefone para contato"
                    value={telefoneAluno}
                    onChange={e=> setTelefoneAluno(e.target.value)}
                    />
                    <input 
                    type="password" 
                    placeholder="Senha de acesso"
                    value={senhaAluno}
                    onChange={e=> setSenhaAluno(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}