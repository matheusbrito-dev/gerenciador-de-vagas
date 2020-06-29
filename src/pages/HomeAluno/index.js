//Npm Imports
import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower} from 'react-icons/fi';

//Project Imports
import './styles.css';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function HomeAluno() {
    const history = useHistory();
    
    const [vagas, setVagas] = useState([]);

    const alunoId = localStorage.getItem('alunoId');
    const nomeAluno = localStorage.getItem('nomeAluno');
    
    //Auth
    useEffect(()=>{
        api.get('HomeAluno', {
            headers:{
                Authorization: alunoId,
            }
        }).then(response=>{
            setVagas(response.data)
        })
        
    }, [alunoId]);

    //Logout Func
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    
    return (
        <div className="home-aluno-container">
            <header>
                <img src={logo} alt="Central de Estágios"/>
                <span>Boas vindas, {nomeAluno}</span>

                <Link className="button" to="/profileAluno">Curriculo</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
        
            <h1>Vagas Disponíveis</h1>

            <ul>
                {vagas.map(vagas => (
                    <li key={vagas.id}>
                        <strong>NOME DA EMPRESA:</strong>
                        <p>{vagas.nomeFantasiaEmp}</p>

                        <strong>SEDE DA EMPRESA:</strong>
                        <p>{vagas.cidadeEmpresa}</p>

                        <strong>E-MAIL DA EMPRESA:</strong>
                        <p>{vagas.emailEmp}</p>

                        <strong>TELEFONE DA EMPRESA:</strong>
                        <p>{vagas.telEmp}</p>

                        <strong>VAGAS:</strong>
                        <p>{vagas.nomeVaga}</p>

                        <strong>CARGO:</strong>
                        <p>{vagas.cargoVaga}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{vagas.descricaoVaga}</p>

                        <strong>DATA INÍCIO</strong>
                        <p>{Intl.DateTimeFormat('pt-BR').format(vagas.dataInicioVagas)}</p>

                        <strong>DATA FIM</strong>
                        <p>{Intl.DateTimeFormat('pt-BR').format(vagas.dataTerminoVagas)}</p>

                    </li>
                ))}        
            </ul>
        </div>
    );
}