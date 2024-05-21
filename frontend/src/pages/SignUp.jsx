import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";

// Controlling the sign up form is a good idea because we want to add (eventually)
// more validation and provide real time feedback to the user about usernames and passwords
export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // users shouldn't be able to see the sign up page if they are already logged in.
  // if the currentUser exists in the context, navigate the user to 
  // the /users/:id page for that user, using the currentUser.id value
  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    if (!username || !password) return setErrorText('Missing username or password');

    const [user, error] = await createUser({ username, password });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  return <div id="despage" className="top-page">
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
    <h1 className="dev-strobe">Development Page</h1>

    <a id="light-button" href="/login">Designer</a>

    {!!errorText && <p>{errorText}</p>}
    <p className="dev-strobe">Already have an account with us? <Link to="/login">Log in!</Link></p>
  </div>;
}
