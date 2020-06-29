//Npm Imports
import React, { useState}  from 'react';
import {Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

//Project Imports
import './styles.css';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function NovaEscolaridade(){

    const [ nomeEmpresaExp, setNomeEmpresaExp] = useState('');
    const [ descricaoExp, setDescricaoExp] = useState('');
    const [ cidadeExp, setCidadeExp] = useState('');
    const [ ufExp, setUfExp] = useState('');
    const [ cargoExp, setCargoExp] = useState('');
    const [ dataAdmissao, setDataAdmissao] = useState('');
    const [ dataExoneracao, setDataExoneracao] = useState('');

    const alunoId = localStorage.getItem('alunoId');

    const history = useHistory();

    async function handleNovaExperiencia(e){
        e.preventDefault();

        const data ={
            nomeEmpresaExp,
            descricaoExp,
            cidadeExp,
            ufExp,
            cargoExp,
            dataAdmissao,
            dataExoneracao,
        };
        
        try{
            await api.post('experiencias', data,{
                headers: {
                    Authorization: alunoId,
                }
            })
            toast.success("Você cadastrou a Experiencia com sucesso!");
            history.push('/profileAluno');
        }catch(err){
            toast.error(err.response.data.error);
        }
    }
    return (
        <div className="nova-experiencia-container">
            <ToastContainer/>
            <div className="content">
                <section>
                    <img src= {logo} alt="Central de Estagio"/>

                    <h1>Cadastro nova Experiencia</h1>
                    <p>Efetue o cadastro da nova Experiencia</p>

                    <Link className="back-link" to="/profileAluno">
                       <FiArrowLeft size={16} color="#E02041"/>
                       Voltar para o Curriculo
                   </Link>
                </section>

                <form onSubmit={handleNovaExperiencia}>
                    <input 
                    placeholder="Nome da Empresa"
                    value={nomeEmpresaExp}
                    onChange={e=>setNomeEmpresaExp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                        placeholder="Cidade"
                        value={cidadeExp}
                        onChange={e=>setCidadeExp(e.target.value)}
                        />
                        <input 
                        placeholder="UF"
                        value={ufExp}
                        onChange={e=>setUfExp(e.target.value)}
                        />
                    </div>
                    <input 
                    placeholder="Cargo"
                    value={cargoExp}
                    onChange={e=>setCargoExp(e.target.value)}
                    />
                    <textarea 
                    placeholder="Descrição"
                    value={descricaoExp}
                    onChange={e=>setDescricaoExp(e.target.value)}
                    />
                    <input 
                    type="date" 
                    placeholder="Data Admissão"
                    value={dataAdmissao}
                    onChange={e=>setDataAdmissao(e.target.value)}
                    />
                    <input 
                    type="date" 
                    placeholder="Data Exoneração"
                    value={dataExoneracao}
                    onChange={e=>setDataExoneracao(e.target.value)}
                    />
 
                    <button className="button" type="submit">Adicionar Experiencia</button>

                </form>
            </div>
        </div>

    );
}