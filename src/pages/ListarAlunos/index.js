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
    const [alunos, setAlunos] = useState([]);

    const centralId = localStorage.getItem('centralId');
    const nomeCentral = localStorage.getItem('nomeCentral');

    //Auth
    useEffect(()=>{
        api.get('listarAlunos', {
            headers:{
                Authorization: centralId,
            }
        }).then(response=>{
            setAlunos(response.data)
        })
    }, [centralId]);
    
    //Função Delete
    async function handleDeleteEmpresa(id){
        try{
            await api.delete(`alunos/${id}`,{
                headers: {
                    Authorization: centralId,
                }
            });

            setAlunos(alunos.filter(alunos => alunos.id !== id));
            toast.success("Você deletou o Aluno com sucesso!");
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
        <div className="listar-alunos-container">
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

            <h1>Alunos Cadastrados</h1>

            <ul>
                {alunos.map(alunos => (
                    <li key={alunos.id}>
                        <strong>R.A:</strong>
                        <p>{alunos.raAluno}</p>

                        <strong>SENHA DA CONTA:</strong>
                        <p>{alunos.senhaAluno}</p>

                        <strong>NOME DO ALUNO:</strong>
                        <p>{alunos.nomeAluno}</p>

                        <strong>CPF:</strong>
                        <p>{alunos.cpfAluno}</p>

                        <strong>SEXO:</strong>
                        <p>{alunos.sexoAluno}</p>

                        <strong>DATA DE NASCIMENTO:</strong>
                        <p>{alunos.dataNascAluno}</p>

                        <strong>CIDADE:</strong>
                        <p>{alunos.cidadeAluno}</p>

                        <strong>UF:</strong>
                        <p>{alunos.ufAluno}</p>

                        <strong>E-MAIL:</strong>
                        <p>{alunos.emailAluno}</p>

                        <strong>TELEFONE:</strong>
                        <p>{alunos.telefoneAluno}</p>

                        <button onClick={()=>handleDeleteEmpresa(alunos.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}        
            </ul>
        </div>
    );
}