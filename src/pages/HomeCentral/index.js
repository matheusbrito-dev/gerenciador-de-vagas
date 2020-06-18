//Npm Imports
import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower} from 'react-icons/fi';

//Project Imports
import './styles.css';
import logo from '../../assets/logo.png';

export default function EscolherLogin(){
    const history = useHistory();

    const nomeCentral = localStorage.getItem('nomeCentral');

    //Logout Func
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="home-central-container">
            <header>
                <img src={logo} alt="Central de Estágios"/>
                <span>Boas vindas, {nomeCentral}</span>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <section className="form">
               <form>
                   <Link className="button" to="/listarAlunos">Listar Alunos</Link>
                   <Link className="button" to="/listarEmpresas">Listar Empresas</Link>
                   <Link className="button" to="/listarCodigos">Listar Codigos</Link>
                   <Link className="button" to="/gerarValidacao">Gerar Validação</Link>
               </form>
            </section>
        
        </div>
    );
}
