import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FiPower, FiTrash, FiEdit2, FiEdit3 } from 'react-icons/fi';
import { BsFileDiff } from 'react-icons/bs'
import { AiOutlineCloudDownload } from 'react-icons/ai'

import api from '../../services/api';
import './styles.css';
import '../../global.css'


import logo from '../../assets/Wc.png';
import line from '../../assets/Line.png';
import wcl from '../../assets/Wcl.png';

export default function Logon(){
  const UserId = localStorage.getItem('UserId');
  const NameUser = localStorage.getItem('NameUser');
  const NameFolder = localStorage.getItem('NameFolder');
  const [Programs, setPrograms] = useState([]);
  const [ArqNameAnt, setArqNameAnt] = useState('');
  const [ArqNameNew, setArqNameNew] = useState('');
  const [ArqName, setArqName] = useState('');
  const ArqExtension = '.html';
  
  if(( UserId === '' )|| ( NameUser === '' ) || ( NameFolder === '' ) || ( UserId === null )|| ( NameUser === null ) || ( NameFolder === null )){
    window.location = 'http://localhost:3000/';
  }

  async function Rename(e){
    e.preventDefault(); 
    let data = {
      UserId,
      ArqNameAnt, 
      ArqNameNew
    }
    let Resultado = await api.put('Profile', data);
    document.getElementById('Rename').style.display= "none"; 
    Files();
    alert(Resultado.data.result);
  }

  async function Delete(){
    let Resultado = await api.delete(`Profile/${ ArqName }`,{
      headers: {
        Authorization: UserId,
      }
    });
    document.getElementById('Delete').style.display= 'none';
    Files();
    alert(Resultado.data.result);
  }

  async function NewArq(e){
    e.preventDefault();
    let data = {
      UserId,
      ArqName, 
      ArqExtension
    }
    let Resultado = await api.post('Profile', data);
    document.getElementById('Adicionar').style.display= 'none';
    Files();
    alert(Resultado.data.result);
  }

  function Load(){
    const divRename = document.getElementById('Rename');
    const divDelete = document.getElementById('Delete');
    const divAdd = document.getElementById('Adicionar');
      
    //Logon
    if(!(( UserId === '' )|| ( NameUser === '' ) || ( NameFolder === '' ) || ( UserId === null )|| ( NameUser === null ) || ( NameFolder === null ))){
      document.getElementById('Logon').addEventListener('click', function(){
      localStorage.clear();
      window.location = 'http://localhost:3000/';
    });
    //Editar_Arq
    document.getElementById('ArqEdit').addEventListener('click', function(){
      if(document.querySelector('input[name="Arq"]:checked')){
        localStorage.setItem('ArqName', document.querySelector('input[name="Arq"]:checked').value);
        window.location = 'http://localhost:3000/Programing';
      }else{
        alert('!Selecione algum Arquivo!');
      }
    });
    //Rename_Arq
    document.getElementById('ArqRename').addEventListener('click', function(){
      if(document.querySelector('input[name="Arq"]:checked')){
        setArqNameAnt(document.querySelector('input[name="Arq"]:checked').value);
        divRename.style.display= 'inline-block';
        divDelete.style.display= 'none';
        divAdd.style.display= 'none';
      }else{
        alert('!Selecione algum Arquivo!');
      }
    });
    //Deletar_Arq
    document.getElementById('ArqDel').addEventListener('click', function(){
      if(document.querySelector('input[name="Arq"]:checked')){
        setArqName(document.querySelector('input[name="Arq"]:checked').value);
        divRename.style.display= 'none';
        divDelete.style.display= 'inline-block';
        divAdd.style.display= 'none';
      }else{
        alert('!Selecione algum Arquivo!');
      }
    });
    //Criar_Arq
    document.getElementById('AddArq').addEventListener('click', function(){
      divRename.style.display= 'none';
      divDelete.style.display= 'none';
      divAdd.style.display= 'inline-block';
    });
    //Cancelar_Operação
    document.getElementById('BtnCancelar').addEventListener('click',  function(){
      divRename.style.display= 'none';
      divDelete.style.display= 'none';
      divAdd.style.display= 'none';
    });
    //Donwload_Arq
    document.getElementById('ArqDonw').addEventListener('click', async function(){
      if(document.querySelector('input[name="Arq"]:checked')){
        window.location.assign('http://localhost:3333/Download/' + document.querySelector('input[name="Arq"]:checked').value + '/' + UserId );
      }else{
        alert('!Selecione algum Arquivo!');
      }
    });
    }
  }

  function Files(){
    api.get('/Profile',{
      headers: {
        Authorization: UserId,
      }   
      }).then(response => {
        setPrograms(response.data);
    }); 
  }
  window.addEventListener('load',Files);
  window.addEventListener('load',Load);
  return(
    <div className="profile-container" name="div_1">
      <header>
        <img src={logo} alt="logo" className="logo" title="World Choice"/>
        <img src={line} alt="line" />
        <img src={wcl}  alt="Wcl" />
        <img src={line} alt="line" />
        <p className="TextM">Seja Bem vindo, {NameUser}</p>
        <Link id='Logon'> 
          <FiPower size="100%" color="#636363"/>
        </Link>
      </header>
      <div className="Menu-Fundo" name="div_2"> 
        <div className="DivSelect" name="div_3">
          <p className="TextM">Seus Arquivos:</p>
          <div>
          <ul>
            {               
              Programs.map(Program => (
              <li key={Program.id}>
                <input type="radio" name="Arq" value={Program.NameArq} id={"Radio_" + Program.id}/>
                <label for={"Radio_" + Program.id}>{Program.NameArq}</label>
              </li>)) 
            }
          </ul>
          </div>
            <br></br>
            <div className="ButtonsComands">
              <button id="ArqEdit">
                <div className="ButtonDiv">
                  <FiEdit2 size="30px" color="#636363"/>
                </div> 
              </button>
              <button id="ArqRename">
                <div className="ButtonDiv">
                  <FiEdit3 size="30px" color="#636363"/>
                </div> 
              </button>
              <button id="ArqDel">
                <div className="ButtonDiv">
                  <FiTrash size="30px" color="#636363"/>
                </div> 
              </button>
              <button id="ArqDonw">
                <div className="ButtonDiv">
                  <AiOutlineCloudDownload size="30px" color="#636363"/>
                </div> 
              </button>
              <button id="AddArq">
                <div className="ButtonDiv">
                  <BsFileDiff size="30px" color="#636363"/>
                </div> 
              </button>
            </div>
          </div>  
          <div className="BoxComands" id="Rename">
            <form onSubmit={Rename}>
              <p>Renomear</p>
              <input required="" type="text" id="ArqNameNew" onChange={e => setArqNameNew(e.target.value)} value={ArqNameNew} name="ArqNameNew" placeholder="Novo Nome do Arquivo:"/>
              <input required="" type="text" id="ArqNameAnt" name="ArqNameAnt" style={{display: "none"}}/>
              <div className="Buttons">
                <input type="button" id="BtnCancelar" className="BtnCancelar"/>
                <label className="LblCancelar" for="BtnCancelar">Cancelar</label>
                <div className="Button">
                  <button>Renomear</button>
                </div>
              </div>
            </form>
          </div>
          <div className="BoxComands" id="Delete">
            <p>Tem Certeza que quer apagar esse Arquivo?</p>
            <br></br><br></br><br></br>
              <div className="Buttons">
                <input type="button" id="BtnCancelar" className="BtnCancelar"/>
                <label className="LblCancelar" for="BtnCancelar">Cancelar</label>
                  <button onClick={() => Delete()}>Deletar</button>
              </div>
          </div>
          <div className="BoxComands" id="Adicionar">
            <form onSubmit={NewArq}>
              <p>Criar Arquivo</p>
              <input required="" type="text" autoComplete='off' name="ArqName" onChange={e => setArqName(e.target.value)} value={ArqName} placeholder="Novo Nome do Arquivo:"/>
              <br></br><br></br><br></br>
              <div className="Buttons">
                <input type="button" id="BtnCancelar" className="BtnCancelar"/>
                <label className="LblCancelar" for="BtnCancelar">Cancelar</label>
                <div className="Button">
                  <button>Criar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
       </div>
      );     
}