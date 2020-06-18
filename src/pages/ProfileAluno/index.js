//Npm Imports
import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPlus ,FiPower, FiTrash2, FiHome} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

//Project Imports
import './styles.css';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function ProfileAluno(){

    const history = useHistory();

    const [habilidades, setHabilidade] = useState([]);
    const [experiencias, setExperiencia] = useState([]);
    const [escolaridades, setEscolaridade] = useState([]);

    const alunoId = localStorage.getItem('alunoId');
    const nomeAluno = localStorage.getItem('nomeAluno');

    //Auth
    useEffect(()=>{
        api.get('profileAluno', {
            headers:{
                Authorization: alunoId,
            }
        }).then(response=>{
            setEscolaridade(response.data.escolaridades)
            setExperiencia(response.data.experiencias)
            setHabilidade(response.data.habilidades)
        })
        
    }, [alunoId]);
    
    //Função Delete
    async function handleDeleteHabilidade(id){
        try{
            await api.delete(`habilidades/${id}`,{
                headers: {
                    Authorization: alunoId,
                }
            });

            setHabilidade(habilidades.filter(habilidades => habilidades.id !== id));
            toast.success("Você deletou a vaga com sucesso!");
        }catch(err){
            toast.error(err.response.data.error);
        }
    }

    async function handleDeleteEscolaridade(id){
        try{
            await api.delete(`escolaridades/${id}`,{
                headers: {
                    Authorization: alunoId,
                }
            });

            setEscolaridade(escolaridades.filter(escolaridades => escolaridades.id !== id));
            toast.success("Você deletou a vaga com sucesso!");
        }catch(err){
            toast.error("Erro ao deletar escolaridade, tente novamente");
        }
    }

    async function handleDeleteExperiencia(id){
        try{
            await api.delete(`experiencias/${id}`,{
                headers: {
                    Authorization: alunoId,
                }
            });

            setExperiencia(experiencias.filter(experiencias => experiencias.id !== id));
            toast.success("Você deletou a vaga com sucesso!");
        }catch(err){
            toast.error("Erro ao deletar experiencia, tente novamente");
        }
    }
    //Home Function
    function handleHome(){
        history.push('/homeAluno');
    }
    //Logout Func
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    
    return (
        <div className="profile-aluno-container">
            <ToastContainer/>
            <header>
                <img src={logo} alt="Central de Estágios"/>
                <span>Boas vindas, {nomeAluno}</span>
                <button onClick={handleHome} type="button">
                    <FiHome size={18} color="#E02041"/>
                </button>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Habilidades</h1>

            <ul>
                {habilidades.map(habilidades => (
                    <li key={habilidades.id}>
                        <strong>NOME DA HABILIDADE:</strong>
                        <p>{habilidades.nomeHabilidade}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{habilidades.descricaoHabilidade}</p>

                        <button onClick={()=>handleDeleteHabilidade(habilidades.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))} 
                <li>
                    <Link className="button" to="/habilidade/new"><FiPlus size={20} color="#ffffff"/></Link>
                </li>
                
            </ul>

            <h1>Experiências</h1>

            <ul>
                {experiencias.map(experiencias => (
                    <li key={experiencias.id}>
                        <strong>EMPRESA:</strong>
                        <p>{experiencias.nomeEmpresaExp}</p>

                        <strong>DESCRIÇÃO DA EXPERIÊNCIA:</strong>
                        <p>{experiencias.descricaoExp}</p>

                        <strong>CIDADE DA EXPERIÊNCIA:</strong>
                        <p>{experiencias.cidadeExp}</p>

                        <strong>ESTADO DA EXPERIÊNCIA:</strong>
                        <p>{experiencias.ufExp}</p>

                        <strong>CARGO DA EXPERIÊNCIA:</strong>
                        <p>{experiencias.cargoExp}</p>

                        <strong>DATA DE ADMISSÃO</strong>
                        <p>{experiencias.dataAdmissao}</p>

                        <strong>DATA DA EXONERAÇÃO</strong>
                        <p>{experiencias.dataExoneracao}</p>


                        <button onClick={()=>handleDeleteExperiencia(experiencias.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))} 
                <li>
                    <Link className="button" to="/experiencia/new"><FiPlus size={20} color="#ffffff"/></Link>
                </li>
                
            </ul>

            <h1>Escolaridade</h1>

            <ul>
                {escolaridades.map(escolaridades => (
                    <li key={escolaridades.id}>
                        <strong>NOME DA INSTITUIÇÃO:</strong>
                        <p>{escolaridades.nomeInstituicao}</p>

                        <strong>NOME DO CURSO:</strong>
                        <p>{escolaridades.cursoEsc}</p>

                        <strong>CIDADE:</strong>
                        <p>{escolaridades.cidadeInstituicao}</p>

                        <strong>ESTADO DA INSTITUIÇÃO:</strong>
                        <p>{escolaridades.ufInstituicao}</p>

                        <strong>DATA DO INICIO DO CURSO:</strong>
                        <p>{escolaridades.dataInicio}</p>

                        <strong>DATA DA PREVISÃO/FIM DO CURSO</strong>
                        <p>{escolaridades.dataPrevConclusao}</p>


                        <button onClick={()=>handleDeleteEscolaridade(escolaridades.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))} 
                <li>
                    <Link className="button" to="/escolaridade/new">
                        <FiPlus size={20} color="#ffffff"/>         
                    </Link>
                </li>
                
            </ul>
        </div>

    );
}