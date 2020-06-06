import React from 'react';
import{ BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './pages/RegisterEmpresa';
import Logon from './pages/Logon';
import Profile from './pages/Profile';
import NovaVaga from './pages/NovasVagas';
import RegisterAluno from './pages/RegisterAluno';
import ProfileAluno from './pages/ProfileAluno';
import NovaEscolaridade from './pages/NovasEscolaridades';
import NovaExperiencias from './pages/NovasExperiencias';
import NovaHabilidades from './pages/NovasHabilidades';
import EscolherCadastro from './pages/EscolherCadastro';
import HomeAluno from './pages/HomeAluno';
import HomeEmpresa from './pages/HomeEmpresa';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component= {Logon}/>
                <Route path="/register" component= {Register}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/profileAluno" component={ProfileAluno}/>
                <Route path="/vagas/new" component={NovaVaga}/>
                <Route path="/registerAluno" component={RegisterAluno}/>
                <Route path="/escolaridade/new" component={NovaEscolaridade}/>
                <Route path="/experiencia/new" component={NovaExperiencias}/>
                <Route path="/habilidade/new" component={NovaHabilidades}/>
                <Route path="/escolherCadastro" component={EscolherCadastro}/>
                <Route path="/homeEmpresa" component={HomeEmpresa}/>
                <Route path="/homeAluno" component={HomeAluno}/>
            </Switch>
        </BrowserRouter>
    );
}