const express = require('express');
const routes = express.Router();
const FilesController = require('./controllers/FilesController');
const EditFileControler = require('./controllers/EditFileControler');
const UserController = require('./controllers/UserController');

routes.get('/Profile/', FilesController.List);
routes.put('/Profile/', FilesController.Rename);
routes.post('/Profile/', FilesController.Create);
routes.delete('/Profile/:ArqName', FilesController.Delete);

routes.get('/Download/UserFiles/:NameFolder/:ArqDownload', EditFileControler.Download);

routes.put('/Programing/', EditFileControler.Save);
routes.get('/Programing/', EditFileControler.Open);


routes.post('/', UserController.Create);
routes.post('/Sessions', UserController.Login);

 module.exports = routes;