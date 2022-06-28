import React, { useState } from 'react';
import './style.css';
import './Cores.css';
import MudarCores from './MudarCores'
import '../../global.css';
//import { AiFillHtml5 } from 'react-icons/ai';
//import { DiCss3 } from 'react-icons/di';
//import { DiJavascript1 } from 'react-icons/di';
import { FiPower } from 'react-icons/fi';
import logo from '../../assets/Wc.png';


import HtmlIcon from '../../assets/Icons/Html.png';
import CssIcon from '../../assets/Icons/Css.png';
import JsIcon from '../../assets/Icons/Js.png';

import wcl from '../../assets/Wcl.png';
import { Link } from 'react-router-dom'

import api from '../../services/api';

//propiedades vindas de outro formulario
export default function MainPage() {
    const UserId = localStorage.getItem('UserId');
    const ArqName = localStorage.getItem('ArqName');
    const NameUser = localStorage.getItem('NameUser');

    const txt = '';//"<!--- Bem vindo ao seu editor de códigos web ---!>\n criado e desenvolvido por \n Gustavo Majid,\n Luis Gambatti e\n Guilherme Henrique";
    let counter = 0;

  
function loadPage(){ 

  //criando os elementos do background      
  const htmlField = document.getElementById("html");
  const cssField = document.getElementById("css");
  const jsField = document.getElementById("js");
  const preview = document.getElementById("compilationOfCode");
  let Html = '';
  let HtmlC = '';
  let TxT_Html = '';
  let TxT_Css = '';
  let TxT_Js = '';
  let container = document.getElementsByClassName('container')[0];
  let ContSalvar = false;
  
  //my scroll personalized 
  const progessBar = document.getElementById('barra');
  //const percent = document.getElementById('porcentagem');

  let totalHeight = document.body.scrollHeight - window.innerHeight;

  window.onscroll = function(){
    let progress = ((window.pageYOffset / totalHeight) * 60 );
    progessBar.style.height = progress + '%'; 
  }

    for(let i=0; i<40; i++){
    let divRow = document.createElement('div');
    divRow.setAttribute('class', 'row');
    container.appendChild(divRow);

      for(let i=0; i<17; i++){	
        let divHex = document.createElement('div');
        divHex.setAttribute('class', 'hex');
        divRow.appendChild(divHex);
      }
    }
  document.createElement('div')         
        async function renderizador(){
          let iframeComponent = preview.contentWindow.document;
          
          Html = '<html>\n<head>\n<title>'+ ArqName +'</title>\n</head>\n<body>' + htmlField.value + '\n</body>\n<style>' + cssField.value + '</style>\n<script>' + jsField.value +'</script>\n</html>';
          let dataPut = {
            UserId,
            ArqName,
            Html
          }
          
          if(ContSalvar === true){
            await api.put('/Programing/', dataPut);
            await QuebraLinhas();
          }
          let Res = await CarregaProj();
          HtmlC = Res.data.Html; 
          iframeComponent.open();
          iframeComponent.writeln(`${HtmlC}`);
          iframeComponent.close();        
        }
        async function compilador() {
          document.addEventListener('keyup', function(){
            renderizador();
          });
        };
        
        compilador();
        renderizador();

        async function CarregaProj(){
          let dataPost = {
            UserId,
            ArqName
          }
          return await api.post('/Programing/', dataPost); 
        }
     
        async function CarregaArq(){
          let Res = await CarregaProj();
          let HtmlC = Res.data.Html;
          let HTMLRes = HtmlC.replace(/(\n)/g, "<pulalinha>"); 
          let ResHTML = /(<body>)(.*)(<[/]body>)/.exec(HTMLRes);
          if(ResHTML !== null){
            TxT_Html = ResHTML[2];
          }
      
          let ResCss = /(<style>)(.*)(<[/]style>)/.exec(HTMLRes);
          if(ResCss !== null){
            TxT_Css = ResCss[2];
          }

          let ResJs = /(<script>)(.*)(<[/]script>)/.exec(HTMLRes);
          if(ResJs !== null){
            TxT_Js = ResJs[2];
          }
        }
        CarregaArq();

        function eventsOfthePage(){
              document.getElementById('div-starts-html').style.display = 'none';
              document.getElementById('div-starts-css').style.display = 'none';
              document.getElementById('div-starts-js').style.display = 'none';
              if(counter < txt.length){
                htmlField.value += txt.charAt(counter);
                cssField.value += txt.charAt(counter);
                jsField.value += txt.charAt(counter);
                counter++;
                setTimeout(eventsOfthePage, 80);

                }else if(counter >= txt.length){
                    htmlField.value = TxT_Html.replace(/(<pulalinha>)/g, "\n"); 
                    cssField.value = TxT_Css.replace(/(<pulalinha>)/g, "\n");  
                    jsField.value = TxT_Js.replace(/(<pulalinha>)/g, "\n"); ;
                    htmlField.style.border = '3px solid #e44d26';
                    cssField.style.border = '3px solid #0063C6';
                    jsField.style.border = '3px solid #63a814';
                    htmlField.style.color = '#636363';
                    cssField.style.color = '#636363';
                    jsField.style.color = '#fff';
                    htmlField.style.pointerEvents = 'all';
                    QuebraLinhas();
                    ContSalvar = true;
                }
            }
            
            document.getElementById('div-starts-html').addEventListener('click',eventsOfthePage);
            document.getElementById('div-starts-css').addEventListener('click',eventsOfthePage);
            document.getElementById('div-starts-js').addEventListener('click',eventsOfthePage);

            function TXT_Html(){
              document.getElementById('TXT_Html').style.display = 'inline-block';
              document.getElementById('TXT_Css').style.display = 'none';
              document.getElementById('TXT_Js').style.display = 'none';
              document.getElementById('Img_Html').style.opacity = '1';
              document.getElementById('Img_Css').style.opacity = '0.5';
              document.getElementById('Img_Js').style.opacity = '0.5';
            }        
            
            function TXT_Css(){
              document.getElementById('TXT_Css').style.display = 'inline-block';
              document.getElementById('TXT_Html').style.display = 'none';
              document.getElementById('TXT_Js').style.display = 'none';
              document.getElementById('Img_Css').style.opacity = '1';
              document.getElementById('Img_Html').style.opacity = '0.5';
              document.getElementById('Img_Js').style.opacity = '0.5';
            }
            
            function TXT_Js(){
              document.getElementById('TXT_Js').style.display = 'inline-block';
              document.getElementById('TXT_Css').style.display = 'none';
              document.getElementById('TXT_Html').style.display = 'none';
              document.getElementById('Img_Js').style.opacity = '1';
              document.getElementById('Img_Css').style.opacity = '0.5';
              document.getElementById('Img_Html').style.opacity = '0.5';
            }
            TXT_Html();
            document.getElementById('BT_Html').addEventListener('click', TXT_Html);
            document.getElementById('BT_Css').addEventListener('click', TXT_Css);
            document.getElementById('BT_Js').addEventListener('click', TXT_Js);

            async function QuebraLinhas(){
              let ValueHtml = document.getElementById('html');
              let Divhtml = document.getElementById('Mhtml');
              let ValueCss = document.getElementById('css');
              let DivCss = document.getElementById('Mcss');

              let ArrayHtml = ValueHtml.value.split('\n');
              Divhtml.innerHTML = '';
              let TamanhoArrayHtml = ArrayHtml.length;
              for(let i=0; i < TamanhoArrayHtml;i++){
                if(ArrayHtml[i] !== ''){
                  ArrayHtml[i] = await MudarCores.CorHTML(ArrayHtml[i]);
                  Divhtml.innerHTML += '<div>'+ ArrayHtml[i] +'</div>';
                }else{
                  Divhtml.innerHTML += '<div><br></div>';
                }
              }
              DivCss.innerHTML = '';
              let ArrayCss = ValueCss.value.split('\n');
              let TamanhoArrayCss = ArrayCss.length;
              for(let i=0; i < TamanhoArrayCss;i++){
                if(ArrayCss[i] !== ''){
                  ArrayCss[i] = await MudarCores.CorCSS(ArrayCss[i]);
                  DivCss.innerHTML += '<div>'+ ArrayCss[i] +'</div>';
                }else{
                  DivCss.innerHTML += '<div><br></div>';
                }
              }     
            }

    }   

window.addEventListener('load', loadPage);

return ( 
  <div className="App-body">  
    <header>
      <img src={logo} alt="logo" className="logo" title="World Choice"/>
      <img src={wcl}  alt="Wcl" />
      <p>Bem Vindo ao seu Arquivo: {ArqName}, {NameUser}!</p>
      <Link id='Logon'> 
        <FiPower size="100%" />
      </Link>
    </header>
    <div className= "out_background">  
      <div className="Frame">  
        <iframe title="Compilador" id="compilationOfCode"src="" frameborder="1"></iframe>
      </div>
      <div className="cod-div">
        <ul className="cod" id="cod">
          <li>
            <input type="checkbox" name="TT" value="Html" id="BT_Html" selected/>
            <label for="BT_Html">
              <img src={HtmlIcon} id="Img_Html" alt="Html"/>
            </label>
          </li>
          <li>
            <input type="checkbox" name="TT" value="Css" id="BT_Css" />
            <label for="BT_Css">
              <img src={CssIcon} id="Img_Css" alt="Css"/>
            </label>
          </li>
          <li>
            <input type="checkbox" name="TT" value="Js" id="BT_Js" />
            <label for="BT_Js">
              <img src={JsIcon} id="Img_Js" alt="Js"/>
            </label>
          </li>
        </ul>
        <div className="TXT">
          <div id="TXT_Html">
            <div id="div-starts-html">
              <h2 className="h2-starts"> Clique aqui começar a programar </h2>
            </div>
            <div id="Mhtml" spellCheck="false"></div>
            <textarea spellCheck="false" id="html" className="area-cod"></textarea> 
          </div>  
          <div id="TXT_Css">
            <div id="div-starts-css">
              <h2 className="h2-starts"> Clique aqui começar a programar </h2>
            </div>
            <div id="Mcss" spellCheck="false"></div>
            <textarea spellCheck="false" id="css" className="area-cod"></textarea>
          </div>
          <div id="TXT_Js">
            <div id="div-starts-js">
              <h2 className="h2-starts"> Clique aqui começar a programar </h2>
            </div>
            <textarea spellCheck="false" id="js" className="area-cod"></textarea>
          </div>   
        </div>
      </div>
    <div className="container"></div>
    <div id="barra"></div>
    <div id="scroll"></div>
    <div id="porcentagem"></div>
    </div>
  </div>
 );
}