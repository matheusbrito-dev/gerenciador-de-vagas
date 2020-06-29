import './styles.css';
import React from 'react';
import{ Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';


import logo from '../../assets/logo.png';
import rightImg from '../../assets/rightImg.png';


export default function EscolherLogin(){
    return(
        <div className="escolha-cadastro-container">
            <section className="form">
               <img src={logo} alt="Central de Estágio"/>
               <form>
                   <h1>Quem é você?</h1>
                   <Link className="button" to="/registerAluno">Aluno</Link>
                   <Link className="button" to="/register">Empresa</Link>
                   <Link className="back-link" to="/">
                       <FiLogIn size={16} color="#E02041"/>
                       Voltar para a tela de Login
                   </Link>
               </form>
            </section>

            <img src={rightImg} alt="rightImg"/>
        
        </div>
    );
}