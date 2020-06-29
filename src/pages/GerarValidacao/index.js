//Npm Imports
import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

//Project Imports
import api from '../../services/api';
import './styles.css';
import logo from '../../assets/logo.png';

export default function GerarValidacao(){

    const centralId = localStorage.getItem('centralId');
    const history = useHistory();

    async function handleNovaValidacao(e){
        e.preventDefault();

        const data = "teste";
        try{
            await api.post('validacoes', data, {
                headers: {
                    Authorization: centralId,
                }
            })
            toast.success("Você Cadastrou um novo código de validação com sucesso!");
            history.push('/homeCentral');
        }catch(err){
            toast.error(err.response.data.error);
        }
    }
    return (
        <div className="nova-validacao-container">
            <ToastContainer/>
            <div className="content">
                <section>
                    <img src= {logo} alt="Central de Estagio"/>

                    <h1>Cadastro Nova Validacao</h1>
                    <p>Efetue o cadastro da Nova validacao</p>

                    <Link className="back-link" to="/homeCentral">
                       <FiArrowLeft size={16} color="#E02041"/>
                       Voltar para tela inicial
                   </Link>
                </section>

                <form onSubmit={handleNovaValidacao}>
                    <button className="button" type="submit">Gerar Novo Código Validação</button>
                </form>
            </div>
        </div>

    );
}