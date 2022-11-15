import apiClient from "../services/axios";
import getNewJwt from "../services/jwt/getJwt";

const performRequest = async (url, method, body) => {
  return new Promise((resolve, reject) => {
    getNewJwt()
      .then((jwtVal) => {
        if (jwtVal) {
          apiClient({
            method,
            url,
            headers: {},
            data: body,
          })
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default performRequest;
