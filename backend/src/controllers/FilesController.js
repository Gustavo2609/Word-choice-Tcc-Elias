const fs = require('fs');
const ServerDir = 'D:/Aulas_EAD/TCC_Web/UserFiles/';
const connection = require('../database/connection');

module.exports = {
    async Create(request, response){
        const { UserId, ArqName , ArqExtension } = request.body;       
        const NameFolder = (await connection('user').select('NameFolder').where('id', UserId))[0].NameFolder + '/';
        var Text = '';
        var Name = ''; 
        if(ArqExtension == '.html'){
            Text = '<!DOCTYPE html>\n<html lang="pt-br">\n<head>\n<meta charset="UTF-8">\n<title>' + ArqName + '</title>\n</head>\n<body>\n</body>\n</html>'
        }
        if(ArqName.indexOf(ArqExtension) > -1){
            Name = ArqName;
        }else{
            Name = ArqName + ArqExtension;
        }
        fs.exists(ServerDir + NameFolder + Name, function (exists) {
            if(exists){
                console.log('exists')
                return response.json({result: '!Já há Arquivo Com Este Nome " '+ Name +' " !'});
            }else{
                fs.writeFile(ServerDir + NameFolder + Name, Text , function(err){
                    if(!err){
                        return response.json({result: 'Arquivo Criado Com Nome ' + Name });
                    }       
                });  
            }
        });     
    }, 

    async List(request, response) {
        const UserId = request.headers.authorization; 
        const NameFolder = (await connection('user').select('NameFolder').where('id', UserId))[0].NameFolder + '/';
        var NameArq = fs.readdirSync(ServerDir + NameFolder);
        var ArqsAndFiles = [];
        const SiseFiles = NameArq.length;
        for(let I = 0; I < SiseFiles; I++){
            ArqsAndFiles[I] = new Object;
            ArqsAndFiles[I].id = I+1;
            ArqsAndFiles[I].NameArq = NameArq[I];
        }   
        return response.json(ArqsAndFiles); 
    }, 

    async Rename(request, response){
        const { UserId, ArqNameAnt, ArqNameNew } = request.body;
        const NameFolder = (await connection('user').select('NameFolder').where('id', UserId))[0].NameFolder + '/';
        fs.exists(ServerDir + NameFolder + ArqNameNew, function (exists) {
            if(exists){
                return response.json({result: '!Já há Arquivo Com Este Nome " '+ ArqName +' " !'});
            }else{
            fs.rename(ServerDir + NameFolder + ArqNameAnt, ServerDir + NameFolder + ArqNameNew, function(err){
                if(!err){
                    return response.json({result: '!Arquivo " '+ ArqNameAnt +' " Renomeado para " '+ ArqNameNew +' "!'});
                }
            });
            }
        });
    }, 

    async Delete(request, response){
        const { ArqName } = request.params;
        const UserId = request.headers.authorization;
        const NameFolder = (await connection('user').select('NameFolder').where('id', UserId))[0].NameFolder + '/';
        fs.unlink(ServerDir + NameFolder + ArqName, function(err){
            if(!err){
                return response.json({result: '!Arquivo " '+ ArqName +' " Deletado com Sucesso!'}); 
            }
        });
    },
}             