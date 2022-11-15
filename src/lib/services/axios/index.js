import axios from "axios";
import cookie from "react-cookies";
// import { notification } from 'antd'
import getNewJwt from "../jwt/getJwt";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

apiClient.interceptors.request.use((request) => {
  const activeToken = cookie.load("activeToken");
  if (activeToken) {
    request.headers.Authorization = `Bearer ${activeToken}`;
    // request.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOjEwMTMsInVzZXJOYW1lIjoicGVwc2lAcGVwc2ljby5pbiIsImV4cCI6MTYwqqc0MDQ3NSwidXNlcklkIjoxMDAyOX0.rrOX7XKEQkjuVCQ9mim1_VcTe05UjF2z1gViT983giI`
    request.headers.AccessToken = activeToken;
  }
  return request;
});

apiClient.interceptors.response.use(undefined, (error) => {
  // Errors handling
  console.log("Saw an error herer", error, error.response);
  // const { response } = error
  // // const { data } = response
  // console.log('Problemn', response)
  // if (response && response.data.level === 'ERROR') {
  //   notification.warning({
  //     message: response.data.message,
  //   })
  // }
  // console.log('@@@', getNewJwt)
  // getNewJwt().then(jwtRes => {
  //   console.log('New JWT', jwtRes)
  //   // update the error config with new token
  //   // error.config._isRetryRequest = true
  //   error.config.headers.token = jwtRes
  //   return apiClient(error.config)
  // })

  // const res = getJwt()
  // res.then()

  getNewJwt().then((jwtRes) => {
    error.config.headers.token = jwtRes;
  });
});

export default apiClient;
