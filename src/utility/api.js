import axios from 'axios'
import { config as server } from '@src/config'

export const ethplorerAPI = 'EK-thsF6-hhht3dj-wdJSw'

export function axiosInstance() {
  const accessToken = localStorage.getItem('token')
  let headers = {
    'Content-Type': 'application/json'
  }

  if (accessToken) {
    headers = {
      Authorization: `Bearer ${accessToken}`
    }
  }

  return axios.create({
    baseURL: server.server.apiURL,
    headers
  })
}

