//Npm Imports
import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower} from 'react-icons/fi';

//Project Imports
import './styles.css';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function HomeEmpresa(){
    const history = useHistory();

    const [alunos, setAlunos] = useState([]);

    const empresaId = localStorage.getItem('empresaId');
    const nomeEmpresa = localStorage.getItem('nomeEmpresa');

    //Auth
    useEffect(()=>{
        api.get('homeEmpresa', {
            headers:{
                Authorization: empresaId,
            }
        }).then(response=>{
            setAlunos(response.data)
         
        })
        
    }, [empresaId]);

    //Logout Func
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="home-empresa-container">
            <header>
                <img src={logo} alt="Central de Estágios"/>
                <span>Boas vindas, {nomeEmpresa}</span>

                <Link className="button" to="/profile">Perfil da Empresa</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
        
            <h1>Alunos Disponíveis</h1>

            <ul>
                {alunos.map(alunos => (
                    <li key={alunos.id}>
                        <strong>R.A:</strong>
                        <p>{alunos.raAluno}</p>

                        <strong>SENHA DA CONTA:</strong>
                        <p>{alunos.senhaAluno}</p>

                        <strong>NOME DO ALUNO:</strong>
                        <p>{alunos.nomeAluno}</p>

                        <strong>CPF:</strong>
                        <p>{alunos.cpfAluno}</p>

                        <strong>SEXO:</strong>
                        <p>{alunos.sexoAluno}</p>

                        <strong>DATA DE NASCIMENTO:</strong>
                        <p>{alunos.dataNascAluno}</p>

                        <strong>CIDADE:</strong>
                        <p>{alunos.cidadeAluno}</p>

                        <strong>UF:</strong>
                        <p>{alunos.ufAluno}</p>

                        <strong>E-MAIL:</strong>
                        <p>{alunos.emailAluno}</p>

                        <strong>TELEFONE:</strong>
                        <p>{alunos.telefoneAluno}</p>

                    </li>
                ))}        
            </ul>
        </div>
    );
}