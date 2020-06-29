//Npm Imports
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { FiPower, FiHome} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import 'bootstrap/dist/css/bootstrap.min.css';

//Project Imports
import './styles.css';
import '../../../../fronted/node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function EscolhaAluno(){

    const history = useHistory();
    const [interesse, setInteresse] = useState('');
    const [alunos, setAlunos] = useState('');
    const [focoFiltro, setFocoFiltro] = useState('');

    const empresaId = localStorage.getItem('empresaId');
    const nomeEmpresa = localStorage.getItem('nomeEmpresa');
    const vagaId = localStorage.getItem('vagaId');

    async function handleInteresse(interesse){
        try{  
            const data ={
                interesse,
                focoFiltro,
            };
            
            api.post('filtrar', data, {
                headers:{
                    Authorization: empresaId,
                }
            }).then(response=>{
                setAlunos(response.data)
                const comboAluno = response.data;
                for(var i = 0; i<comboAluno.length; i++){
                    const nomeAluno = comboAluno[i].nomeAluno;
                    const emailAluno = comboAluno[i].emailAluno;
                    handleMail(vagaId, nomeAluno, emailAluno);
                }
            })
        }catch(e){
            toast.error(e.response.data.error);
        }
    }

    //Mail
    async function handleMail(vagaId, nomeAluno, emailAluno){
        console.log("Handle Vaga Entry: ", vagaId);
        console.log("Nome do aluno: ", nomeAluno);
        console.log("Email do aluno: ", emailAluno);
        try{     
            const data = {
                nomeAluno,
                emailAluno,
            }
            await api.post(`sendmail/${vagaId}`, data,{
                headers:{
                    Authorization: empresaId,
                }
            });  
            toast.success("Você enviou a vaga com sucesso!");
        }catch(err){
            toast.error(err.response.data.error);
        }
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
        <div className="filtrar-alunos-container">
            <ToastContainer/>
            <header>
                <img src={logo} alt="Central de Estágios"/>
                <span>Boas vindas, {nomeEmpresa}</span>

                <button onClick={handleHome} type="button">
                    <FiHome size={18} color="#E02041"/>
                </button>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <div className="group">   
                <select 
                    className="select" 
                    id="focoFiltro"
                    value={focoFiltro}
                    onChange={e=> setFocoFiltro(e.target.value)}>
                        <option value="">Escolha o que deseja</option>
                        <option value="Habilidade">Habilidade do Aluno</option>
                        <option value="Escolaridade">Escolaridade do Aluno</option>
                        <option value="Experiencia">Experiencia do Aluno</option>
                </select>

                <input 
                    className="input"
                    placeholder="Interesse"
                    value={interesse}
                    onChange={e=> setInteresse(e.target.value)}
                />

                <button onClick={()=>handleInteresse(interesse)} 
                        className="button" type="submit">Enviar</button>

            </div>  
                 
            <h1>Vaga enviada para: </h1>

            <BootstrapTable data={alunos} scrollTop={ 'Bottom' }>
                <TableHeaderColumn dataField='id'isKey>ID</TableHeaderColumn>

                <TableHeaderColumn dataField='nomeAluno'>
                    Nome do Aluno
                </TableHeaderColumn>

                <TableHeaderColumn dataField='sexoAluno'>
                    Sexo
                </TableHeaderColumn>

                <TableHeaderColumn dataField='cidadeAluno'>
                    Cidade 
                </TableHeaderColumn>

                <TableHeaderColumn dataField='ufAluno'>
                    Uf 
                </TableHeaderColumn>

                <TableHeaderColumn dataField='emailAluno'>
                    Email 
                </TableHeaderColumn>

                <TableHeaderColumn dataField='telefoneAluno'>
                    Telefone 
                </TableHeaderColumn>         

            </BootstrapTable>
            
        </div>
    );
}