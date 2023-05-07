import {Post} from '../types'


const api = 'http://localhost:5000/'

export const listPosts = async (): Promise<Post[]> => {
  const res = await fetch(`${api}posts/list`)
  if (!res.ok) {
    const {error} = await res.json()
    throw error
  }
  const data = await res.json()
  return data.data
}
