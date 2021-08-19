const express = require('express');
const server = express();
const path = require('path');
const bodyParser = require('body-parser');


// Setando o view engine
server.engine('html', require('ejs').renderFile);
server.set('view engine', 'ejs');

// Definindo a pasta public
server.use('/public', express.static(path.join(__dirname, 'public')))

// Definindo a pasta de views
server.set('views', path.join(__dirname, '/views'));

// Configurando o body-parser
server.use(express.urlencoded({extended: true})); 
server.use(express.json()); 

let tarefas = []

// Criando rotas para o projeto
server.get("/", (req, res)=>{
    res.render('index', {tarefasList:tarefas});
});

server.get('/deletar/:id', (req, res)=>{
    const index = tarefas.indexOf(req.params.id);
    console.log(req.params.id)
    tarefas.splice(index,1)
    
    res.redirect('/');
});

server.post('/form', (req, res,)=>{
    const {campo1} = req.body
    console.log(campo1)
    
    function erro(res){
        if(res.status > 302){
            console.log(res)
        }
    }

    function criarTarefa(){
        console.log(req.body)
        if(campo1 != undefined && campo1.trim()){
            tarefas.push(campo1)
            res.redirect('/');
        }else{
            res.redirect('/');
            return false
        }
    }
    // if(campo1.length === 0 || !campo1.trim()){
    //     console.log("Deu errado")
    //     return false
    // }

    criarTarefa()
})

// Iniciando o servidor
const port = 3033;
server.listen(port, ()=> console.log("Servidor rodando"));