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

 const getAlunosCurso = function(cursoSigla, listaAlunos){
   const cursoUpper = cursoSigla.toUpperCase();
   const alunoJson = {};
   const alunosArray = [];
   let status = false;

   listaAlunos.forEach(aluno => {
       let alunos = {};
       if (aluno.curso[0].sigla.toUpperCase() == cursoUpper) {
           if (cursoUpper == "DS") {
               alunoJson.NomeCurso = "Técnico em Desenvolvimento de Sistemas"
           } else {
               alunoJson.NomeCurso = "Técnico em Redes de Computadores"
           }
           alunos = aluno
           alunosArray.push(alunos);
           status = true;

       }
   })

   if (status) {
       alunoJson.aluno = alunosArray
       return alunoJson
   } else {
       return status;
   }

 }
 const getStatusAluno = function(statusAluno, listaAlunos){

   const statusAlunoUpper = statusAluno.toUpperCase()
   const alunoJson = {};
   const alunosArray = [];
   let status = false;

   listaAlunos.forEach(aluno => {
       let alunos = {};
       if (aluno.status.toUpperCase() == statusAlunoUpper) {
           alunos = aluno;
           alunosArray.push(aluno);
           status = true;

       }
   })

   alunoJson.aluno = alunosArray
   return alunoJson
 }

 module.exports = {
    getListaCursos,
    getListaAlunos,
    getAlunoMatricula,
    getAlunosCurso,
    getStatusAluno
}