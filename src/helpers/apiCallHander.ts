import axios from 'axios'

// eslint-disable-next-line no-undef
const axiosInstatnce = axios.create({ baseURL: 'https://reqres.in/' })
/* export const setAuthToken: any = (token: any) => {
  if (token) {
    axiosInstatnce.defaults.headers.common['Authorization'] = 'Bearer ' + token
  } else {
    delete axiosInstatnce.defaults.headers.common['Authorization']
  }
} */

const GET = async (ApiName: any, data: any) => {
  try {
    const response = await axiosInstatnce.get(ApiName, data)
    return response?.data
  } catch (err: any) {
    return err.response.data
  }
}

const POST = async (ApiName: any, data: any) => {
  try {
    const response = await axiosInstatnce.post(ApiName, data)
    return response?.data
  } catch (err: any) {
    return err.response.data
  }
}

const PUT = async (ApiName: any, data: any) => {
  try {
    const response = await axiosInstatnce.put(ApiName, data)
    return response?.data
  } catch (err: any) {
    return err.response.data
  }
}

export const apiService: any = {
  GET,
  POST,
  PUT
}
