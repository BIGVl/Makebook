import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

type Props = {
  user: any;
};

const Profile = ({ user }: Props) => {
  const navigate = useNavigate();

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
      {user} profile
      <button className="sign-out" onClick={signingOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
