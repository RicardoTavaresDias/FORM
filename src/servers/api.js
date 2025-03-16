import axios, { Axios } from "axios";

// Get api externo de cep
export const api = axios.create({
  baseURL: 'https://viacep.com.br/ws'
})