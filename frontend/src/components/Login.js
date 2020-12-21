import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Login.css"
import { connect } from  'react-redux'
import { authorization } from '../actions/authActions'

function App(props) {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  
  useEffect(() => {  

    props.authorization(data)

   }, [data]);

  
  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => { console.log(res)
      setRegisterUsername("")
      setRegisterPassword("")
    });

  };

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => { console.log(res)
      setLoginUsername("")
      setLoginPassword("")

      Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/user",
      }).then((res) => {
        setData(!!res.data);
        console.log(!!res.data);
      });
    });
  };
  
  return (
    <>
    <h1 className="header"> Authorization</h1>
    <div className="login-container">
      <div>
        
        <input
          placeholder="username"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Register</button>
      </div>

      <div>
      
        <input
          placeholder="username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    </div>


        {data ? <h1 style={{textAlign: "center", color: "green"}}>Zalogowany</h1> : <h1 style={{textAlign: "center", color: "red"}}>Niezalogowany</h1>}
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    authorization: (auth) => { dispatch(authorization(auth))}
  }
}

export default connect(null, mapDispatchToProps)(App);
