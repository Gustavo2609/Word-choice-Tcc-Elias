import React, { useState } from 'react';
import './style.css';
import '../../global.css'

import logo from '../../assets/Wc.png';
import line from '../../assets/Line.png';
import wcl from '../../assets/Wcl.png';

import api from '../../services/api';

export default function MainPage() {
  const [ NameUser , setNameUser ] = useState('');
  const [ Email , setEmail ] = useState('');
  const [ Password , setPassword ] = useState('');
  const [ NameEmailUser , setNameEmailUser ] = useState('');

  async function Login(e){
    e.preventDefault();
    let data = {
      NameEmailUser,
      Password
    }
    console.log(data)
    let Resultado = await api.post('/Sessions', data);
    if(Resultado.data.result !== undefined){
      return alert(Resultado.data.result);
    }else{
      await localStorage.setItem('UserId', Resultado.data.id);
      await localStorage.setItem('NameUser', Resultado.data.NameUser);
      await localStorage.setItem('NameFolder', Resultado.data.NameFolder);
      window.location = 'http://localhost:3000/profile';
    }
  }
  async function Cadastro(e){
    e.preventDefault();
    let data = {
      NameUser,
      Email,
      Password
    }
    let Resultado = await api.post('/', data);
    if(Resultado.data.result !== undefined){
      return alert(Resultado.data.result);
    }else{
      await localStorage.setItem('UserId', Resultado.data.id);
      await localStorage.setItem('NameUser', Resultado.data.NameUser);
      await localStorage.setItem('NameFolder', Resultado.data.NameFolder);
      window.location = 'http://localhost:3000/profile';
    }
  }

  function Load(){ 
    const divLogin = document.getElementById('div-login');
    const divCadastro = document.getElementById('div-cadastro');
    //login
    document.getElementById('login-cursor').addEventListener('click', function(){
      setNameEmailUser('');
      setPassword('');
      divLogin.style.display = "inline-block";
      divCadastro.style.display ="none";     
     });
     //cadastro
    document.getElementById('Cadastro-cursor').addEventListener('click', function(){
      setNameUser('');
      setEmail('');
      setPassword('');
      divLogin.style.display = "none";
      divCadastro.style.display ="inline-block";       
    });
  }
window.addEventListener('load', Load);
return (
<div className="App">  
  <div className="headOfPage"> 
    <div className="left-container">
      <img src={logo} alt="logo" className="logo" title="World Choice"/>
        <img src={line} alt="line" />
        <img src={wcl}  alt="Wcl" />
        <img src={line} alt="line" />
      </div>
      <div className="right-conteiner"> 
        <button id="login-cursor" className="login_decoration"> Login </button> <span> / </span>
        <button id="Cadastro-cursor"> Cadastro</button>
      </div>    
    </div>
    <div className="App-header">
      <h3> Word Choice da internet para internet facilitando a vida do Programador Web</h3>
      <div id="div-login" className="inputBoxLogin">
        <form onSubmit={Login}>
          <h2> Faça Seu login </h2>
          <div className="inputs">
            <input required="" type="text" onChange={ e => setNameEmailUser(e.target.value) } value={ NameEmailUser } placeholder="Usuario ou Email:"/>
          </div> 
          <div className="inputs">
            <input required="" type="password" onChange={ e => setPassword(e.target.value) } value={ Password } placeholder="Senha:"/>
          </div>
          <button>.</button>
        </form>
      </div>
      <div id="div-cadastro" className="inputBoxCadastro">
        <form onSubmit={Cadastro}>
          <h2> Faça seu cadastro </h2>
          <div className="inputs">
            <input required="" type="text" onChange={ e => setNameUser(e.target.value) } value={ NameUser } placeholder="Usuario:"/>
          </div>
          <div className="inputs">
            <input required="" type="text" onChange={ e => setEmail(e.target.value) } value={ Email } placeholder="Email:"/>
          </div>
          <div className="inputs">
            <input required="" type="password" onChange={ e => setPassword(e.target.value) } value={ Password } placeholder="Senha:"/>
          </div>
          <button>.</button>
        </form>
      </div>
    </div>
</div>
  );
}