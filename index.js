/****
 * Objetivo: Criar uma API para ter seus dados consumidos 
 * Data: 24/03/23
 * Autor: Artur Alves
 * Version 1.0
 ****/

/***
  * Express - Dependência para realizar requisições de API pelo protocolo HTTP
  *     npm install express --save
  * 
  * Cors - Dependência para gerenciar permissões de requisição da API
  *     npm install cors --save
  * 
  * Body-Parser - Dependência que gerencia o corpo das requisições
  *     npm install body-parser --save
  */
// Import das dependecias do projeto teste

//Dependecia para criar as requisições da API
const express = require('express');

//Dependecia para gerenciar as permissões da API
const cors = require('cors');

//Dependecia para gerenciar o corpo das requisições da API
const bodyParser = require('body-parser');

const { request, response } = require('express');

const listaCursos = require('./module/modulo.js')
const listaAlunos = require('./module/modulo.js');
const alunos = require('./json/alunos.js');
const funcoes = require('./module/modulo.js');

// Cria um objeto com características express
const app = express();

app.use((request, response, next) => {

    //Defininindo nossa API como uso público
    response.header('Access-Control-Allow-Origin', '*');

    //Definindo os métodos utiliados na nossa API
    response.header('Access-Control-Allow-Methods', 'GET')

    //Enviando para o cors as regras de permissões
    app.use(cors());

    next();
})

// EndPoints

app.get('/v1/lion-school/cursos', cors(), async function (request, response, next) {

    let cursos = listaCursos.getListaCursos();

    // Tratamento de validação de requisição
    if (cursos) {
        response.status(200)
        response.json(cursos)
    } else {
        response.status(500);
    }
})

app.get('/v1/lion-school/alunos', cors(), async function (request, response, next) {
    let statusCode;

    let aluno;
    let dadosAluno = {}

    let siglaCurso = request.query.sigla;
    let statusAluno = request.query.status;

    if (siglaCurso != undefined && statusAluno != undefined) {
        if (siglaCurso == '' || siglaCurso == undefined || !isNaN(siglaCurso)) {
            statusCode = 400;
            dadosSiglaCurso.messsage = 'Sigla do curso inválida! Verifique se a mesma está correta.'
        } else {
            aluno = listaAlunos.getAlunosCurso(siglaCurso)
        }

    } else if (statusAluno != undefined && statusAluno != undefined) {
        if (statusAluno == '' || statusAluno == undefined || !isNaN(statusAluno)) {
            statusCode = 400;
            dadosStatusAluno.messsage = 'Status do aluno inválido, verifique se o mesmo está correto.'

        } else {
            aluno = listaAlunos.getStatusAluno(statusAluno)
        }
    }else if(siglaCurso != undefined && statusAluno != undefined){
        if (siglaCurso == '' || !isNaN(siglaCurso) || statusAluno == '' || !isNaN(statusAluno)) {
            statusCode = 400;
            dadosSiglaCurso.messsage = 'Sigla do curso ou status inválido! Verifique se a mesma está correta.'
        } else {
            let alunosCurso = funcoes.getAlunosCurso(siglaCurso, listaAlunos.alunos)
            alunos = funcoes.getStatusAluno(statusAluno, alunosCurso.aluno)

            if (alunos) {
                statusCode = 200
                dadosAluno = aluno
            } else {
                statusCode = 500
            }
        }
    } else{
        aluno = listaAlunos.getListaAlunos()
    }

    // Tratamento de validação de requisição
    if (alunos) {
        statusCode = 200
        dadosAluno = aluno
    } else {
        statusCode = 500
    }
    response.json(dadosAluno)
    response.status(statusCode)
})
app.get('/v1/lion-school/alunos/:matricula', cors(), async function (request, response, next) {

    let statusCode;
    let dadosMatricula = {};

    let alunoMatricula = request.params.matricula;

    if (alunoMatricula == '' || alunoMatricula == undefined || isNaN(alunoMatricula)) {
        statusCode = 400;
        dadosMatricula.messsage = 'Número de matrícula inválido, verifique se o mesmo está correto.'
    } else {
        let aluno = listaAlunos.getAlunoMatricula(alunoMatricula)

        if (aluno) {
            statusCode = 200;
            dadosMatricula = aluno;
        } else {
            statusCode = 404;
        }
    }
    response.status(statusCode)
    response.json(dadosMatricula)
})

//Rodar o serviço da API para aguardar requisições
app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080')
})