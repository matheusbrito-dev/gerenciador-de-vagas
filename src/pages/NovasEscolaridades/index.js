import React from 'react';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';

import logo from '../../assets/logo.png';
export default function NovaEscolaridade(){
    return (
        <div className="nova-escolaridade-container">
            <div className="content">
                <section>
                    <img src= {logo} alt="Central de Estagio"/>

                    <h1>Cadastro nova escolaridade</h1>
                    <p>Efetue o cadastro da nova escolaridade</p>

                    <Link className="back-link" to="/profileAluno">
                       <FiArrowLeft size={16} color="#E02041"/>
                       Voltar para Home
                   </Link>
                </section>

                <form>
                    <input placeholder="Nome da Instituição"/>
                    <input placeholder="Nome do Curso"/>
                    <div className="input-group">
                        <input placeholder="Cidade"/>
                        <input placeholder="UF"/>
                    </div>
                    <input type="date" placeholder="Data Início"/>
                    <input type="date" placeholder="Data Conclusão(Previsão)"/>
 
                    <button className="button" type="submit">Adicionar Escolaridade</button>

                </form>
            </div>
        </div>

    );
}