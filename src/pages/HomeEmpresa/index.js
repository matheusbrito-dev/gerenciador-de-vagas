//Npm Imports
import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower} from 'react-icons/fi';

//Project Imports
import './styles.css';
import logo from '../../assets/logo.png';

export default function HomeEmpresa(){
    const history = useHistory();

    const nomeEmpresa = localStorage.getItem('nomeEmpresa');

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

                <Link className="button" to="/profile">Perfil de Vagas</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
        
            <h1>Algo ficará aqui embaixo talvez uma tabela de pesquisa para decidir emails enviados automaticamente</h1>
        </div>
    );
}