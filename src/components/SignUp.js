import {useContext, useEffect, useState} from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../index";


export const SignUp = () => {

    const [email, setEmail] = useState("");
    const [emailForm, setEmailForm] = useState("");
    const [passwordForm, setPasswordForm] = useState("");
    const [error, setError] = useState();

    const navigate = useNavigate();
    const { setUser, link } = useContext(UserContext);
    // console.log('context user', user);
    // console.log('context link', link);
    // console.log('context setUser', setUser);
    //
    // console.log("auth?.currentUser?.email", auth?.currentUser);
    // console.log("email", email);

    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, emailForm, passwordForm);
            if (auth?.currentUser?.email) {
                setEmail(auth?.currentUser?.email);
            }

        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError("");
            }, 2000);
        }
    }, [error])

    useEffect(() => {

        if (email && link) {
            navigate('/' + link);
        }

        if (auth?.currentUser?.email) {

            setUser({ mail: auth?.currentUser?.email });
            if (link) {
                navigate('/' + link);
            } else {
                navigate('/');
            }
        }
        // eslint-disable-next-line
    }, [email])

    const routeToLogin = () => {
        navigate('/login');
    }

  return (
      <div className="sing">
          <input className="input" placeholder="Email" onChange={(e) => setEmailForm(e.target.value)}/>
          <input className="input" placeholder="Password" onChange={(e) => setPasswordForm(e.target.value)}/>
          { error && <div style={{ color: 'red' }}>
              {error}
            </div>
          }
          <button id="btn" style={{letterSpacing: "2px", padding: "6px 5px"}} onClick={signUp}> Sign up</button>
          <button id="btn" style={{letterSpacing: "2px", padding: "6px 5px"}} onClick={routeToLogin}> Return to login</button>
      </div>
  )
}
