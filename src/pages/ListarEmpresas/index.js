//Npm Imports
import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { FiPower, FiTrash2, FiHome} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

//Project Imports
import './styles.css';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Profile(){

    const history = useHistory();
    const [empresas, setEmpresas] = useState([]);

    const centralId = localStorage.getItem('centralId');
    const nomeCentral = localStorage.getItem('nomeCentral');

    //Auth
    useEffect(()=>{
        api.get('listarEmpresas', {
            headers:{
                Authorization: centralId,
            }
        }).then(response=>{
            setEmpresas(response.data)
        })
    }, [centralId]);
    
    //Função Delete
    async function handleDeleteEmpresa(id){
        try{
            await api.delete(`empresas/${id}`,{
                headers: {
                    Authorization: centralId,
                }
            });

            setEmpresas(empresas.filter(empresas => empresas.id !== id));
            toast.success("Você deletou a empresa com sucesso!");
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
        <div className="listar-empresas-container">
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

            <h1>Empresas Cadastradas</h1>

            <ul>
                {empresas.map(empresas => (
                    <li key={empresas.id}>
                        <strong>ID:</strong>
                        <p>{empresas.id}</p>

                        <strong>SENHA:</strong>
                        <p>{empresas.senhaEmpresa}</p>

                        <strong>CIDADE:</strong>
                        <p>{empresas.cidadeEmpresa}</p>

                        <strong>UF:</strong>
                        <p>{empresas.ufEmpresa}</p>

                        <strong>NOME FANTASIA:</strong>
                        <p>{empresas.nomeFantasiaEmp}</p>

                        <strong>RAZÃO SOCIAL:</strong>
                        <p>{empresas.razaoSocialEmp}</p>

                        <strong>CNPJ:</strong>
                        <p>{empresas.cnpjEmp}</p>

                        <strong>NOME DO REPRESENTANTE:</strong>
                        <p>{empresas.nomeRepresentante}</p>

                        <strong>CPF DO REPRESENTANTE:</strong>
                        <p>{empresas.cpfRepresentante}</p>

                        <strong>E-MAIL DA EMPRESA:</strong>
                        <p>{empresas.emailEmp}</p>

                        <strong>TELEFONE DA EMPRESA:</strong>
                        <p>{empresas.telEmp}</p>

                        <button onClick={()=>handleDeleteEmpresa(empresas.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}        
            </ul>
        </div>
    );
}