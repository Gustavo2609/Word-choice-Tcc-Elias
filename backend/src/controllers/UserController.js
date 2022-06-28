const fs = require('fs');
const crypto = require('crypto');
const ServerDir = 'D:/Aulas_EAD/TCC_Web/UserFiles/';
const connection = require('../database/connection');


module.exports= {
    async Create(request, response){
    const { NameUser, Email, Password } = request.body; 
    if(await connection('user').select('*').where('NameUser', NameUser) != ''){
        return response.json({ result: 'Nome de Usuario Já Existente!' });
    }
    if(await connection('user').select('*').where('Email', Email) != ''){
        return response.json({ result: 'Esse Email Já Está Cadastrado!' });
    }
    
    const NameFolder = crypto.randomBytes(10).toString('hex');
    await  fs.mkdirSync(ServerDir + NameFolder);
    await connection('user').insert({ 
      NameUser,
      Email,
      Password,
      NameFolder 
    });
    const data = await connection('user').select('id','NameFolder').where('NameUser', NameUser);
    return response.json({ id: data[0].id , NameUser , NameFolder: data[0].NameFolder});
    },

    async Login(request, response){
        const { NameEmailUser,  Password } = request.body; 
        if(await connection('user').select('*').where('NameUser', NameEmailUser) == '' 
        && await connection('user').select('*').where('Email', NameEmailUser) == ''){
            return response.json({ result: 'Nome de Usuario ou Email Invalidos!' });
        }
        const data = await connection('user').select('id','NameUser','NameFolder').orWhere('Email', NameEmailUser).orWhere('NameUser', NameEmailUser).andWhere('Password', Password);
        if(data != ''){
            return response.json( { id: data[0].id , NameUser: data[0].NameUser , NameFolder: data[0].NameFolder} );
        }else{   
            return response.json({ result: 'Senha Invalida!' });
        }
    }
}