import cookie from 'react-cookies'
import axios from 'axios'
// import { history } from 'index'

// import { connect } from 'react-redux'

// const mapStateToProps = ({ dispatch }) => ({
//   dispatch,
// })

const getNewJwt = () => {
  return axios
    .post(`${process.env.REACT_APP_BASE_URL}/auth/refreshToken`, {
      refreshToken: cookie.load('refreshToken'),
      activeToken: cookie.load('activeToken'),
    })
    .then(res => {
      if (res.data.status === 0) {
        // dispatch({
        //   type: 'user/SET_STATE',
        //   payload: {
        //     authorized: false,
        //   },
        // })
        cookie.remove('refreshToken', { path: '/' })
        cookie.remove('activeToken', { path: '/' })
        // window.location.reload()
        return false
      }
      if (res.data.status === 1) {
        const { activeToken } = res.data
        cookie.save('activeToken', activeToken, {
          path: '/',
          // secure: true,
          // httpOnly: true,
          maxAge: 31536000,
        })
        return activeToken
      }
      return 0
    })
    .catch(err => {
      console.log(err)
    })
}

export default getNewJwt

// export default connect(mapStateToProps)(getNewJwt)
