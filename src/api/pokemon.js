import axios from './index'

export const getPokemon = async () => {
  const res = await axios.get('/pokemon/?limit=50000&offset=0')
  return new Promise((resolve, reject) => resolve(res.data.results))
}
