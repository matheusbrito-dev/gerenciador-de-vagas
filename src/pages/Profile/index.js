import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import { FiPower, FiTrash2} from 'react-icons/fi';
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
            alert(`Você deletou a vaga com sucesso!`);
        }catch(err){
            alert('Erro ao deletar vagas, tente novamente');
        }
    }

    //Logout Func
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Central de Estágios"/>
                <span>Boas vindas, {nomeEmpresa}</span>

                <Link className="button" to="/vagas/new">Cadastrar nova vagas</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Vagas Cadastradas</h1>

            <ul>
                {vagas.map(vagas => (
                    <li key={vagas.id}>
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

                        <button onClick={()=>handleDeleteVaga(vagas.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}        
            </ul>
        </div>
    );
}