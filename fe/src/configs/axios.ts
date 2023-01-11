import axios from 'axios'

export const initAxiosInterceptors = () => {
  axios.interceptors.request.use((config) => {
    config.url = `${process.env.REACT_APP_API_URL}${config.url}`

    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
      withCredentials: false,
    }
    return config
  })

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      throw new Error(error.response.data ?? 'Something went wrong')
    }
  )
}
