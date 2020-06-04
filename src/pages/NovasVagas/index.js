import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

import logo from '../../assets/logo.png';
export default function NovaVaga(){
    const [nomeVaga,setNomeVaga] = useState('');
    const [cargoVaga,setCargoVaga] = useState('');
    const [descricaoVaga,setDescricaoVaga] = useState('');
    const [dataInicioVaga,setDataInicioVaga] = useState('');
    const [dataTerminoVaga,setDataTerminoVaga] = useState('');

    const empresaId = localStorage.getItem('empresaId');

    const history = useHistory();

    async function handleNovaVaga(e){
        e.preventDefault();

        const data ={
            nomeVaga,
            cargoVaga,
            descricaoVaga,
            dataInicioVaga,
            dataTerminoVaga,
        };

        try{
            await api.post('vagas', data,{
                headers: {
                    Authorization: empresaId,
                }
            })
            alert(`Você Cadastrou a vaga com sucesso!`);
            history.push('/profile');
        }catch(err){
            alert('Erro no cadastro, tente novamente.');
        }
    }
    return (
        <div className="nova-vaga-container">
            <div className="content">
                <section>
                    <img src= {logo} alt="Central de Estagio"/>

                    <h1>Cadastro Nova Vaga</h1>
                    <p>Efetue o cadastro da Nova Vaga</p>

                    <Link className="back-link" to="/profile">
                       <FiArrowLeft size={16} color="#E02041"/>
                       Voltar para tela inicial
                   </Link>
                </section>

                <form onSubmit={handleNovaVaga}>
                    <input 
                    placeholder="Nome da vaga"
                    value={nomeVaga}
                    onChange={e=> setNomeVaga(e.target.value)}
                    />
                    <input 
                    placeholder="Cargo"
                    value={cargoVaga}
                    onChange={e=> setCargoVaga(e.target.value)}
                    />
                    <textarea 
                    placeholder="Descrição"
                    value={descricaoVaga}
                    onChange={e=> setDescricaoVaga(e.target.value)}
                    />
                    <input 
                    type="date" 
                    placeholder="Data Inicio da Vaga"
                    value={dataInicioVaga}
                    onChange={e=> setDataInicioVaga(e.target.value)}
                    />
                    <input 
                    type="date" 
                    placeholder="Data Fim da Vaga"
                    value={dataTerminoVaga}
                    onChange={e=> setDataTerminoVaga(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>

    );
}