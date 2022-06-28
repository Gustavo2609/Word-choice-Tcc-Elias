module.exports = {

    async CorHTML(Text){
      let ArrayHTML = Text.split('');
      let ResultLine = '';
      let LengthArrayHTML = ArrayHTML.length;
      let ControlTag = false;
      let ControlAspas = false;
      for(let y=0;y < LengthArrayHTML; y++){
        if((ArrayHTML[y] === '<') && (ArrayHTML[y] !== '=')){
          ResultLine += '<spam class="TagHtml"><</spam><spam  class="codHtml">';
          ControlTag = true;
        }else{
          if((ArrayHTML[y] === '>') && (ArrayHTML[y] !== '=')){
            ResultLine += '</spam><spam class="TagHtml">></spam>';
            ControlTag = false;
          }else{
            if((ArrayHTML[y] === "'")  && (ControlTag === true) && (ControlAspas === false)){
              ResultLine += '<spam class="compleHtmlAspas">'+ ArrayHTML[y];
            }
            if(((ArrayHTML[y] === '"') || (ArrayHTML[y] === "'")) && (ControlTag === true)){
              if(ControlAspas === false){
                ResultLine += '<spam class="compleHtmlAspas">'+ ArrayHTML[y];
                ControlAspas = true;
              }else{
                if(ControlAspas === true){
                  ResultLine +=  ArrayHTML[y] + '</spam>';
                  ControlAspas = false;
                }
              }
            }else{
              if((ArrayHTML[y] === ' ') && (ControlTag === true) && (ControlAspas === false) && (ArrayHTML[y] !== '=')){
                ResultLine += '</spam><spam class="compleHtml">'+ ArrayHTML[y];
              }else{
                if((ArrayHTML[y] === '=') && (ControlTag === true)) {
                  ResultLine += '</spam>=';
                }else{
                  ResultLine += ArrayHTML[y];
                }
              }
            }
          }
        }
      }
      if(ResultLine !== ''){
        return ResultLine;
      }
    },

    async CorCSS(Text){
      let ArrayCSS = Text.split('');
      let ResultLine = '';
      let LengthArrayCSS = ArrayCSS.length;
      let ControleToken = false;
      let ControlAspas = false;
      for(let y=0;y < LengthArrayCSS; y++){
        if(((ArrayCSS[y] === '.') || (ArrayCSS[y] === '#')) && (ControleToken === false)){
          ResultLine += '<spam class="Tipo01">'+ ArrayCSS[y];
        }else{
          if((ArrayCSS[y] === ' ') && (ControleToken === false)){
            ResultLine += '</spam>' + ArrayCSS[y];
          }else{
            if (ArrayCSS[y] === '{'){
              ControleToken = true;
              ResultLine += '<spam class="Token">' + ArrayCSS[y] + '</spam><spam class="DpsToken">';
            }else{
              if((ArrayCSS[y] === ':') && (ControleToken === true)){
                ResultLine += '</spam>' + ArrayCSS[y] + '<spam class="DpsDoisPontos">';
              }else{
                if((ArrayCSS[y] === ';') && (ControleToken === true)){
                  ResultLine += '</spam><spam class="Token">' + ArrayCSS[y] + '</spam><spam class="DpsToken">';
                }else{
                  if(ArrayCSS[y] === '}'){
                    ControleToken = false;
                    ResultLine += '</spam><spam class="Token">' + ArrayCSS[y] + '</spam>';
                  }else{
                    if((ArrayCSS[y] === '"') || (ArrayCSS[y] === "'")){
                      if(ControlAspas === false){
                        ResultLine += '<spam class="CSSAspas">'+ ArrayCSS[y];
                        ControlAspas = true;
                      }else{
                        if(ControlAspas === true){
                          ResultLine +=  ArrayCSS[y] + '</spam>';
                          ControlAspas = false;
                        }
                      }
                    }else{
                      ResultLine += ArrayCSS[y];
                    }
                  }
                }
              } 
            }
          }
        }
      }
      if(ResultLine !== ''){
        return ResultLine;
      }
    },

    async CorJS(Text){
        
    }
}