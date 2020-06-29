import './styles.css';
//Npm Imports
import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2, FiHome, FiMail} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

//Project Imports
import logo from '../../assets/logo.png';
import api from '../../services/api';


export default function Profile(){

    const history = useHistory();
    const [vagas, setVagas] = useState([]);

    const empresaId = localStorage.getItem('empresaId');
    const nomeEmpresa = localStorage.getItem('nomeEmpresa');

    //Auth
    useEffect(()=>{
        api.get('profile', {
            headers:{
                Authorization: empresaId,
            }
        }).then(response=>{
            setVagas(response.data)
        })
    }, [empresaId]);
    
    //Função Delete
    async function handleDeleteVaga(id){
        try{
            await api.delete(`vagas/${id}`,{
                headers: {
                    Authorization: empresaId,
                }
            });

            setVagas(vagas.filter(vagas => vagas.id !== id));
            toast.success("Você deletou a vaga com sucesso!");
            
        }catch(err){
            toast.error(err.response.data.error);
        }
    }

    //Mail
    async function handleMail(id){
        localStorage.setItem(
            'vagaId', id
        );
        history.push('/filtrarAlunos');
    }

    //Home Function
    function handleHome(){
        history.push('/HomeEmpresa');
    }

    //Logout Func
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <ToastContainer/>
            <header>
                <img src={logo} alt="Central de Estágios"/>
                <span>Boas vindas, {nomeEmpresa}</span>

                <Link className="button" to="/vagas/new">Cadastrar nova vagas</Link>
                <button onClick={handleHome} type="button">
                    <FiHome size={18} color="#E02041"/>
                </button>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Vagas Cadastradas</h1>


      

            <ul>
                {vagas.map(vagas => (
                    <li key={vagas.id}>

                        <button onClick={()=>handleMail(vagas.id)} type="button">
                            <FiMail size={20} color="#a8a8b3"/>
                        </button>
                        
                        <button onClick={()=>handleDeleteVaga(vagas.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>

                        <strong>VAGAS:</strong>
                        <p>{vagas.nomeVaga}</p>

                        <strong>CARGO:</strong>
                        <p>{vagas.cargoVaga}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{vagas.descricaoVaga}</p>

                        <strong>DATA INÍCIO</strong>
                        <p>{Intl.DateTimeFormat('pt-BR').format(vagas.dataInicioVagas)}</p>

                        <strong>DATA FIM</strong>
                        <p>{Intl.DateTimeFormat('pt-BR').format(vagas.dataTerminoVagas)}</p>   
                        
                    </li>
                ))}        
            </ul>
        </div>
    );
}