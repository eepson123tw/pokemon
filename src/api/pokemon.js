import axios from './index'

export const getPokemon = async () => {
  const res = await axios.get('/pokemon/?limit=50000&offset=0')
  return new Promise((resolve, reject) => resolve(res.data.results))
}
export const getPokemonInfo = async (id) => {
  const res = await axios.get(`/pokemon/${id}`)
  return new Promise((resolve, reject) => resolve(res.data))
}

export const getPokemonDetail = async (id) => {
  const res = await axios.get(`/pokemon-species/${id}`)
  return new Promise((resolve, reject) => resolve(res.data))
}
