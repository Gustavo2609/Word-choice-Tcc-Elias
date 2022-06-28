const fs = require('fs');
const path = require('path');
const express = require('express');
const ServerDir = 'D:/Aulas_EAD/TCC_Web/UserFiles/';
const connection = require('../database/connection');


module.exports = {
    async Save(request, response){
        const { UserId, ArqName, Html } = request.body;       
        const NameFolder = (await connection('user').select('NameFolder').where('id', UserId))[0].NameFolder + '/';
        fs.exists(ServerDir + NameFolder + ArqName , function (exists) {  
            if(exists){
                fs.writeFile(ServerDir + NameFolder + ArqName , Html , function(err){
                    if(!err){
                        return response.send(null);
                    }
                });
            }else{
                return response.send(null);
            }
        });
    },
 
    async Open(request, response){
        const { UserId, ArqName} = request.body;   
        const NameFolder = (await connection('user').select('NameFolder').where('id', UserId))[0].NameFolder + '/';
        fs.readFile(ServerDir + NameFolder + ArqName, function(err,data){
            return response.json({ Html: data.toString('utf8', 0, data.length)});
        }); 
    },

    async Download(request, response){
        const NameFolder = request.params.NameFolder;
        const ArqDownload = request.params.ArqDownload;
        return response.download(ServerDir + NameFolder + '/' +  ArqDownload, ArqDownload);
    },
    
}