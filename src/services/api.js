import axios from 'axios';

// https://sujeitoprogramador.com/r-api/?api=filmes/

// Base URL - https://sujeitoprogramador.com/
//rotas de todos os filmes -  r-api/?api=filmes/
//rota de um filme -  r-api/?api=filmes/id

const api = axios.create({
    baseURL : 'https://sujeitoprogramador.com'
})

export default api;