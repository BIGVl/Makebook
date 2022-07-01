import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';

type Props = {
  user: string;
};

interface User {
  gender?: string;
  fName?: string;
  lName?: string;
  user?: string;
}

const Profile = ({ user }: Props) => {
  const [userData, setUserData]: any = useState<User>({});
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  //Get the data of the currently signed in user
  async function getUser() {
    const userRef = doc(db, 'users', user);
    const docSnap = await getDoc(userRef);
    setUserData(docSnap.data());
  }

  const signingOut = async () => {
    try {
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile">
      <div className="name">
        Name: {userData.fName} {userData.lName}
      </div>

      <button className="sign-out" onClick={signingOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
