//Npm Imports
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

//Project Imports
import './styles.css';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function NovaEscolaridade(){

    const[nomeInstituicao,setNomeInstituicao] = useState('');
    const[cidadeInstituicao,setCidadeInstituicao] = useState('');
    const[cursoEsc, setCursoEsc] = useState('');
    const[ufInstituicao,setUfInstituicao] = useState('');
    const[dataInicio, setDataInicio] = useState('');
    const[dataPrevConclusao,setDataPrevConclusao] = useState('');

    const alunoId = localStorage.getItem('alunoId');

    const history = useHistory();

    async function handleNovaEscolaridade(e){
        e.preventDefault();

        const data ={
            nomeInstituicao,
            cidadeInstituicao,
            ufInstituicao,
            cursoEsc,
            dataInicio,
            dataPrevConclusao,      
        };

        try{
            await api.post('escolaridades', data,{
                headers:{
                    Authorization: alunoId,
                }
            })
            toast.success('Você cadastrou sua Escolaridade com sucesso!');
            history.push('/profileAluno');
        }catch(e){
            toast.error('Erro no cadastro. Tente novamente!');
        }
    }
    return (
        <div className="nova-escolaridade-container">
            <ToastContainer/>
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

                <form onSubmit={handleNovaEscolaridade}>
                    <input 
                    placeholder="Nome da Instituição"
                    value={nomeInstituicao}
                    onChange={e=> setNomeInstituicao(e.target.value)}
                    />
                    <input 
                    placeholder="Nome do Curso"
                    value={cursoEsc}
                    onChange={e=> setCursoEsc(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                        placeholder="Cidade"
                        value={cidadeInstituicao}
                        onChange={e=>setCidadeInstituicao(e.target.value)}
                        />
                        <input 
                        placeholder="UF"
                        value={ufInstituicao}
                        onChange={e=>setUfInstituicao(e.target.value)}
                        />
                    </div>
                    <input 
                    type="date" 
                    placeholder="Data Início"
                    value={dataInicio}
                    onChange={e=>setDataInicio(e.target.value)}
                    />
                    <input 
                    type="date" 
                    placeholder="Data Conclusão(Previsão)"
                    value={dataPrevConclusao}
                    onChange={e=>setDataPrevConclusao(e.target.value)}
                    />
 
                    <button 
                        className="button" 
                        type="submit">
                            Adicionar Escolaridade
                    </button>
                </form>
            </div>
        </div>
    );
}