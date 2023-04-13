/****
 * Objetivo: Criar funções que percorrem JSON para criação de uma API
 * Data: 24/03/23
 * Autor: Artur Alves
 * Version 1.0
 ****/

 var listaCursos = require('../json/cursos.js')
 var listaAlunos = require('../json/alunos.js');
const alunos = require('../json/alunos.js');

 const getListaCursos = function(){
    return listaCursos;
 }

 const getListaAlunos = function(){

    let listaDadosAlunoJSON = false;
    let informacoes = []
    let alunos = {}

    listaAlunos.alunos.forEach(function(aluno){
        listaDadosAlunoJSON = {}

        
        listaDadosAlunoJSON.nome = aluno.nome;
        listaDadosAlunoJSON.foto = aluno.foto;
        listaDadosAlunoJSON.matricula = aluno.matricula;
        listaDadosAlunoJSON.sexo = aluno.sexo;

        informacoes.push(listaDadosAlunoJSON)

    })

    alunos = {
       informacoes
    }
    return alunos

 }

 const getAlunoMatricula = function(matricula){

   let alunoMatricula = matricula
   let listaDadosAlunoJSON = false;

   listaAlunos.alunos.forEach(function(aluno){
      if(aluno.matricula == alunoMatricula){
         listaDadosAlunoJSON = {}

         
         listaDadosAlunoJSON.nome = aluno.nome;
         listaDadosAlunoJSON.foto = aluno.foto;
         listaDadosAlunoJSON.matricula = aluno.matricula;
         listaDadosAlunoJSON.sexo = aluno.sexo;

      }
   })

   return listaDadosAlunoJSON;
 
 }

 const getAlunosCurso = function(cursoSigla){

   listaDadosAlunoJSON = false;
    let siglaCurso = cursoSigla;
    let alunos = {}
    let informacoes = []

    listaAlunos.alunos.forEach(function(lista){
       if(siglaCurso.toUpperCase() == lista.curso[0].sigla.toUpperCase()){

         listaDadosAlunoJSON = {}

         
         listaDadosAlunoJSON.nome = lista.nome;
         listaDadosAlunoJSON.foto = lista.foto;
         listaDadosAlunoJSON.matricula = lista.matricula;
         listaDadosAlunoJSON.sexo = lista.sexo,
         listaDadosAlunoJSON.status = lista.status,
         listaDadosAlunoJSON.curso = lista.curso[0].nome,
         listaDadosAlunoJSON.dataConclusao = lista.curso[0].conclusao

         informacoes.push(listaDadosAlunoJSON)

       }
    })
    alunos = {
       informacoes
    }
    return alunos

 }
 const getStatusAluno = function(status){

   listaDadosAlunoJSON = false;
   let statusAluno = status;
   let alunos = {}
   let informacoes = []

   listaAlunos.alunos.forEach(function(lista){
      if(statusAluno.toUpperCase() == lista.status.toUpperCase()){

         listaDadosAlunoJSON = {}

         
         listaDadosAlunoJSON.nome = lista.nome;
         listaDadosAlunoJSON.foto = lista.foto;
         listaDadosAlunoJSON.matricula = lista.matricula;
         listaDadosAlunoJSON.sexo = lista.sexo;
         listaDadosAlunoJSON.status = lista.status,
         listaDadosAlunoJSON.curso = lista.curso[0].nome,
         listaDadosAlunoJSON.dataConclusao = lista.curso[0].conclusao;

         informacoes.push(listaDadosAlunoJSON)

      }

   })
   alunos = {
      informacoes
   }
   return alunos
 }

 module.exports = {
    getListaCursos,
    getListaAlunos,
    getAlunoMatricula,
    getAlunosCurso,
    getStatusAluno
}