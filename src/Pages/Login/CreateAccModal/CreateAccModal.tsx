import './CreateAccModal.css';
import { auth, db } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import close from '../../../assets/close.png';
import BirthdaySection from './BirthdaySection';
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';

type props = {
  setCreate: any;
  create: boolean;
};

const CreateAccModal = ({ setCreate, create }: props) => {
  const [inputs, setInputs] = useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    gender: ''
  });
  const transitions = useTransition(create, {
    from: {
      opacity: 0,
      y: 500
    },
    enter: {
      opacity: 1,
      y: 0
    },
    leave: {
      opacity: 0,
      y: -500
    },
    delay: 100
  });
  const navigate = useNavigate();

  const onChange = (e: any) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //Saving the user's id, gender and name in the firestore as well as sending him to his profile page
  const formSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
      const user = userCredentials.user;
      await setDoc(doc(db, 'users', user.uid), {
        user: user.uid,
        gender: inputs.gender,
        name: `${inputs.fName} ${inputs.lName}`
      });
      navigate(`/profile/${user.uid}`);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-acc">
      {transitions((style: any, item: boolean) => {
        return (
          item && (
            <animated.div style={style} className="create-div">
              <img
                src={close}
                alt="close create account pop-up"
                onClick={() => {
                  setCreate(false);
                }}
              />

              <form action="" onSubmit={formSubmit}>
                <legend>Sign Up</legend>
                <div className="name">
                  <input type="text" name="fName" placeholder="First name" id="fname" onChange={onChange} required />
                  <input type="text" name="lName" placeholder="Last name" id="lname" onChange={onChange} required />
                </div>
                <input type="email" name="email" placeholder="Email" id="email" onChange={onChange} required />
                <input type="password" name="password" placeholder="Password" id="password" onChange={onChange} required />
                <BirthdaySection />
                <div className="gender">
                  <div className="gender-text">Gender</div>
                  <span className="gender-opts">
                    <label htmlFor="female">Female</label>
                    <input
                      type="radio"
                      value="female"
                      name="gender"
                      id="female"
                      className="female"
                      onChange={onChange}
                      required
                    />
                    <label htmlFor="male">Male</label>
                    <input type="radio" value="male" name="gender" id="male" onChange={onChange} required />
                    <label htmlFor="custom">Other</label>
                    <input type="radio" value="other" name="gender" id="other" onChange={onChange} required />
                  </span>
                </div>
                <button type="submit" className="submit">
                  Sign Up
                </button>
              </form>
            </animated.div>
          )
        );
      })}
    </div>
  );
};

export default CreateAccModal;
