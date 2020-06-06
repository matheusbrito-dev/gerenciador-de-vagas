import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import { FiPower} from 'react-icons/fi';
import logo from '../../assets/logo.png';


export default function HomeAluno(){
    const history = useHistory();

    const nomeAluno = localStorage.getItem('nomeAluno');



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
        
            <h1>Aqui será uma tabela de pesquisa de vagas</h1>
        </div>
    );
}