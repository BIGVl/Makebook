import './CreateAccModal.css';
import { auth, db } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import close from '../../../assets/close.png';
import BirthdaySection from './BirthdaySection';
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { animated } from 'react-spring';
import Spinner from '../../../Components/Spinner/Spinner';

type props = {
  setCreate: any;
  create: boolean;
  style: any;
  opacity: any;
};

const CreateAccModal = ({ setCreate, create, style, opacity }: props) => {
  const [inputs, setInputs] = useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    gender: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e: any) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //Saving the user's id, gender and name in the firestore as well as sending him to his profile page
  const formSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
      const user = userCredentials.user;
      await setDoc(doc(db, 'users', user.uid), {
        user: user.uid,
        gender: inputs.gender,
        fName: inputs.fName,
        lName: inputs.lName
      });
      navigate(`/profile/${user.uid}`);
      setIsLoading(true);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <animated.div style={{ opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }) }} className="create-acc">
      {isLoading && <Spinner />}
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
              <div>
                <label htmlFor="female">Female</label>
                <input type="radio" value="female" name="gender" id="female" className="female" onChange={onChange} required />
              </div>
              <div>
                <label htmlFor="male">Male</label>
                <input type="radio" value="male" name="gender" id="male" onChange={onChange} required />
              </div>
              <div>
                <label htmlFor="custom">Other</label>
                <input type="radio" value="other" name="gender" id="other" onChange={onChange} required />
              </div>
            </span>
          </div>
          <button type="submit" className="submit">
            Sign Up
          </button>
        </form>
      </animated.div>
    </animated.div>
  );
};

export default CreateAccModal;
