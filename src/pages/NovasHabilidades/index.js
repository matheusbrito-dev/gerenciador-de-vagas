//Npm Imports
import React, { useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

//Project Imports
import './styles.css';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function NovaEscolaridade(){

    const [nomeHabilidade, setNomeHabilidade] = useState('');
    const [descricaoHabilidade, setDescricaoHabilidade] = useState('');

    const alunoId = localStorage.getItem('alunoId');

    const history = useHistory();

    async function handleNovaHabilidade(e){
        e.preventDefault();
        const data ={
            nomeHabilidade,
            descricaoHabilidade,
        };

        try{
            await api.post('habilidades', data,{
                headers: {
                    Authorization: alunoId,
                }
            })
            toast.success("Você cadastrou a Habilidade com sucesso!");
            history.push('/profileAluno');
        }catch(err){
            toast.error("Erro no cadastro, tente novamente.");
        }
    }

    return (
        <div className="nova-habilidade-container">
            <ToastContainer/>
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

                <form onSubmit={handleNovaHabilidade}>
                    <input 
                    placeholder="Nome da Habilidade"
                    value={nomeHabilidade}
                    onChange={e=> setNomeHabilidade(e.target.value)}
                    />
                    <textarea 
                    placeholder="Descrição"
                    value={descricaoHabilidade}
                    onChange={e=> setDescricaoHabilidade(e.target.value)}
                    />
 
                    <button className="button" 
                            type="submit">Adicionar Habilidade</button>

                </form>
            </div>
        </div>

    );
}