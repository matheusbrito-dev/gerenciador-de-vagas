import React from 'react';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';

import logo from '../../assets/logo.png';
export default function NovaEscolaridade(){
    return (
        <div className="nova-experiencia-container">
            <div className="content">
                <section>
                    <img src= {logo} alt="Central de Estagio"/>

                    <h1>Cadastro nova Experiencia</h1>
                    <p>Efetue o cadastro da nova Experiencia</p>

                    <Link className="back-link" to="/profileAluno">
                       <FiArrowLeft size={16} color="#E02041"/>
                       Voltar para Home
                   </Link>
                </section>

                <form>
                    <input placeholder="Nome da Empresa"/>
                    <div className="input-group">
                        <input placeholder="Cidade"/>
                        <input placeholder="UF"/>
                    </div>
                    <input placeholder="Cargo"/>
                    <textarea placeholder="Descrição"/>
                    <input type="date" placeholder="Data Admissão"/>
                    <input type="date" placeholder="Data Exoneração"/>
 
                    <button className="button" type="submit">Adicionar Experiencia</button>

                </form>
            </div>
        </div>

    );
}