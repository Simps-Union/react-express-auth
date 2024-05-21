import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { useNavigate, Navigate } from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";

export default function LoginPage() {
  const [errorText, setErrorText] = useState('');


  return <div id="devpage" className="top-page">
    
  <header>
    <a id='logo' href='/'>Created by Isaac </a>
    <nav>
      <ul>
        <li><NavLink to='/'>Home</NavLink></li>
        <>
          <li><NavLink to='/login'>Creative</NavLink></li>
          <li><NavLink to='/sign-up'>Development</NavLink></li>
        </>
      </ul>
    </nav>
  </header>
  
  <h1>Designing Page</h1>

    <div>
      <div id="container">
        A 
        <div id="flip">
        <div><div>Designing</div></div>
        <div><div>Photographer</div></div>
        <div><div>Content Creating</div></div></div>
        Enthusiast
      </div>
    </div>

  <a id="dark-button" href="/sign-up">Developer</a>

  

    {!!errorText && <p>{errorText}</p>}
  </div>;
}
