import React from 'react';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';

import logo from '../../assets/logo.png';
export default function NovaEscolaridade(){
    return (
        <div className="nova-habilidade-container">
            <div className="content">
                <section>
                    <img src= {logo} alt="Central de Estagio"/>

                    <h1>Cadastro nova Habilidade</h1>
                    <p>Efetue o cadastro da nova Habilidade</p>

                    <Link className="back-link" to="/profileAluno">
                       <FiArrowLeft size={16} color="#E02041"/>
                       Voltar para Home
                   </Link>
                </section>

                <form>
                    <input placeholder="Nome da Habilidade"/>
                    <textarea placeholder="Descrição"/>
 
                    <button className="button" type="submit">Adicionar Habilidade</button>

                </form>
            </div>
        </div>

    );
}