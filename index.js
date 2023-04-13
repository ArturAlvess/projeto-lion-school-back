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
const listaDeAlunos = require('./module/modulo.js');
const alunos = require('./json/alunos.js');
const funcoes = require('./module/modulo.js');
const { cursos } = require('./json/cursos.js');

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
    let dadosAluno = {}
    let statusCode
    let alunos
    let status = request.query.status
    let curso = request.query.curso

    //Filtrar por status
    if (status != undefined && curso == undefined) {

        if (!isNaN(status)) {
            statusCode = 400
            dadosAluno.message = 'Não foi possivel processar pois os dados de entrada que foram enviados não corresponde ao exigido, confira o valor, pois não pode ser vazio e precisa ser caracteres'
        } else {
            alunos = funcoes.getStatusAluno(status, listaDeAlunos.alunos)
        }

        if (alunos) {
            statusCode = 200
            dadosAluno = alunos
        } else {
            statusCode = 400
        }

        //Filtrar por curso
    } else if (curso != undefined && status == undefined) {

        if (!isNaN(curso)) {
            statusCode = 400
            dadosAluno.message = 'Não foi possivel processar pois os dados de entrada que foram enviados não corresponde ao exigido, confira o valor, pois não pode ser vazio e precisa ser caracteres'
        } else {
            alunos = funcoes.getAlunosCurso(curso, listaDeAlunos.alunos)
        }

        if (alunos) {
            statusCode = 200
            dadosAluno = alunos
        } else {
            statusCode = 400
        }

    } else if (curso != undefined && status != undefined) {

        if (!isNaN(status) || !isNaN(curso)) {
            statusCode = 400
            dadosAluno.message = 'Não foi possivel processar pois os dados de entrada que foram enviados não corresponde ao exigido, confira o valor, pois não pode ser vazio e precisa ser caracteres'
        } else {
            let alunosPorCurso = funcoes.getAlunosCurso(curso, listaDeAlunos.alunos);
            alunos = funcoes.getStatusAluno(status, alunosPorCurso.aluno);
        }

        if (alunos) {
            statusCode = 200
            dadosAluno = alunos
        } else {
            statusCode = 400
        }

    } else {
        alunos = funcoes.getListaAlunos()
    }

    if (alunos) {
        statusCode = 200
        dadosAluno = alunos
    } else {
        statusCode = 400
    }

    response.status(statusCode)
    response.json(dadosAluno)
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