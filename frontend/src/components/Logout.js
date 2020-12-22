import React, { useEffect } from 'react'
import { connect } from  'react-redux'
import { authorization } from '../actions/authActions'
import Axios from 'axios'

function Logout(props) {

    useEffect(() => {

        props.authorization(false)
  
        Axios({
            method: "POST",
            data: {
              username: false,
              password: false,
            },
            withCredentials: true,
            url: "http://localhost:4000/login",
          }).then((res) => { console.log(res)
          })
    }, [])

    return (
        <div>
            Logout!
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      authorization: (auth) => { dispatch(authorization(auth))}
    }
  }
  
  export default connect(null, mapDispatchToProps)(Logout);
  
