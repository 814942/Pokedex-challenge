import axios, { AxiosError, AxiosRequestConfig } from "axios";

import IPokemonsProps, { IRequestProp, ITypes } from "@/interfaces/pokemons.interface";

export class APIManager {
  private url = process.env.NEXT_PUBLIC_BACK_URL

  async login(path: string, username: string): Promise<IRequestProp<string>> {
    try {
      const { status, data } = await axios.post(`${this.url}${path}`, { username }, { withCredentials: true })

      localStorage.setItem("token", data.token)

      return { status, data: data.username }
    } catch (err: unknown) {
      const { response } = err as AxiosError;
      return { status: response?.status, message: response?.statusText }
    }
  }

  async getAllPokemons(path: string): Promise<IRequestProp<IPokemonsProps[]>> {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        const { status, data } = await axios.get(`${this.url}${path}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        })
        
        return { status, data: data.data, count: data.count }
      }
      return { message: "No hay token" }
    } catch (err) {
      const { response } = err as AxiosError;
      return { status: response?.status, message: response?.statusText }
    }
  }

  async getPokemonByName(path: string, pokemon?: number | string): Promise<IRequestProp<IPokemonsProps>> {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        const { status, data } = await axios.get(`${this.url}${path}${pokemon}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        })
        
        return { status, data: data.data, count: data.count }
      }
      return { message: "No hay token" }
    } catch (err) {
      const { response } = err as AxiosError;
      return { status: response?.status, message: response?.statusText }
    }
  }

  async getPokemonsByType(path: string, page: number, type?: string): Promise<IRequestProp<IPokemonsProps[]>> {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        const { status, data } = await axios.get(`${this.url}${path}${type}?page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        })
        
        return { status, data: data.data, count: data.count }
      }
      return { message: "No hay token" }
    } catch (err) {
      const { response } = err as AxiosError;
      return { status: response?.status, message: response?.statusText }
    }
  }

  async getPokemonType(path: string): Promise<IRequestProp<ITypes[]>> {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        const { status, data } = await axios.get(`${this.url}${path}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        })
        
        return { status, data: data.data, count: data.count }
      }
      return { message: "No hay token" }
    } catch (err) {
      const { response } = err as AxiosError;
      return { status: response?.status, message: response?.statusText }
    }
  }
}