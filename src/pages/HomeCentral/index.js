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
                
                <Link className="button" to="/registerCentral">Central</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <section className="form">
               <form>
                   <ul>
                        <li>
                            <strong>ESTA FUNÇÃO LISTA TODOS OS ALUNOS CADASTRADOS NO SISTEMA</strong>
                            <Link className="button" to="/listarAlunos">Listar Alunos</Link>
                        </li>

                        <li>
                            <strong>ESTA FUNÇÃO LISTA TODAS AS EMPRESAS CADASTRADAS NO SISTEMA</strong>
                            <Link className="button" to="/listarEmpresas">Listar Empresas</Link>
                        </li>

                        <li>
                            <strong>ESTA FUNÇÃO LISTA TODOS OS CÓDIGOS DE VALIDAÇÃO CADASTRADOS</strong>
                            <Link className="button" to="/listarCodigos">Listar Codigos</Link>
                        </li>

                        <li>
                            <strong>ESTA FUNÇÃO CRIA CÓDIGOS DE VALIDAÇÃO PARA CADASTRO DE NOVAS EMPRESAS</strong>
                            <Link className="button" to="/gerarValidacao">Gerar Validação</Link>
                        </li>
                   </ul>
                                   
               </form>
            </section>
        
        </div>
    );
}
