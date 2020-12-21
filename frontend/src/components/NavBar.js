/* eslint-disable linebreak-style */
import React from 'react';
import './NavBar.css';
import {
  Link,
} from 'react-router-dom';

export default function NavBar() {
  return (

    <div className="Navbar">
      <Link to="/"><h1>Secret Task</h1></Link>
      <div className="Spacer" />
      <ul>
        <Link to="/tasks"><li>Tasks</li></Link>
        <Link to="/login"><li>Login</li></Link>
      </ul>
    </div>

  );
}
