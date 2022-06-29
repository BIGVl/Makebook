import './LoginPage.css';
import CreateAccModal from './CreateAccModal/CreateAccModal';
import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useTransition } from 'react-spring';

const LoginPage = () => {
  const [create, setCreate] = useState(false);
  const [signInInfo, setSignInInfo] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const transition = useTransition(create, {
    from: {
      opacity: 0,
      y: 1000
    },
    enter: {
      opacity: 1,
      y: 0
    },
    leave: {
      opacity: 0,
      y: 1000
    }
  });

  const signIn = async (e: any) => {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(auth, signInInfo.email, signInInfo.password);
      const user = userCred.user;
      navigate(`/profile/${user.uid}`);
    } catch (err) {
      setErrorMessage('Email or password incorrect!');
    }
  };

  //Update the state of email and pass so it can be send and verified to the backend
  const onChange = (e: any) => {
    setSignInInfo((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="login">
      {transition(
        (styles, item) => item && <CreateAccModal opacity={styles.opacity} style={styles} create={create} setCreate={setCreate} />
      )}
      <div className="left-login">
        <div id="makebook">Makebook</div>
        <p>Get as productive as possible while having fun with friends and associates.</p>
      </div>
      <form className="login-form" action="" onSubmit={signIn}>
        <input type="email" placeholder="Email" name="email" id="user" className="email" onChange={onChange} required />
        <input type="password" placeholder="Password" name="password" id="password" onChange={onChange} required />
        <button type="submit" className="login-submit">
          Log In
        </button>
        <button
          className="new-acc"
          type="button"
          onClick={() => {
            setCreate(true);
          }}
        >
          Create a new account
        </button>
      </form>
      {errorMessage === '' ? null : <div className="error"> {errorMessage} </div>}
    </div>
  );
};

export default LoginPage;
