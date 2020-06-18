//Npm Imports
import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { FiPower, FiTrash2, FiHome} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

//Project Imports
import './styles.css';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function ListarCodigo(){

    const history = useHistory();
    const [validacoes, setValidacoes] = useState([]);

    const centralId = localStorage.getItem('centralId');
    const nomeCentral = localStorage.getItem('nomeCentral');

    //Auth
    useEffect(()=>{
        api.get('listarCodigos', {
            headers:{
                Authorization: centralId,
            }
        }).then(response=>{
            setValidacoes(response.data)
        })
    }, [centralId]);
    
    //Função Delete
    async function handleDeleteVaga(id){
        try{
            await api.delete(`validacoes/${id}`,{
                headers: {
                    Authorization: centralId,
                }
            });

            setValidacoes(validacoes
                                .filter(validacoes => validacoes.id !== id));
            toast.success("Você deletou a vaga com sucesso!");
        }catch(err){
            toast.error(err.response.data.error);
        }
    }

    //Home Function
    function handleHome(){
        history.push('/HomeCentral');
    }

    //Logout Func
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="listar-codigo-container">
            <ToastContainer/>
            <header>
                <img src={logo} alt="Central de Estágios"/>
                <span>Boas vindas, {nomeCentral}</span>

                <button onClick={handleHome} type="button">
                    <FiHome size={18} color="#E02041"/>
                </button>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Validações Cadastradas</h1>

            <ul>
                {validacoes.map(validacoes => (
                    <li key={validacoes.id}>

                        <strong>CÓDIGOS:</strong>
                        <p>{validacoes.codValidacao}</p>
                        <button onClick={()=>handleDeleteVaga(validacoes.id)} 
                                type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}        
            </ul>
        </div>
    );
}