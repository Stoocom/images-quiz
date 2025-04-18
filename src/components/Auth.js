import {useContext, useEffect, useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../index";


export const Auth = () => {

    const [email, setEmail] = useState("");

    const [emailForm, setEmailForm] = useState("");
    const [passwordForm, setPasswordForm] = useState("");
    const [error, setError] = useState();

    const navigate = useNavigate();
    const { setUser, user, link } = useContext(UserContext);
    console.log('context user', user);
    console.log('context link', link);
    // console.log('context setUser', setUser);
    //
    // console.log("auth?.currentUser?.email", auth?.currentUser);
    // console.log("email", email);

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, emailForm, passwordForm)
                .then((userCredential) => {
                    // Signed in
                    console.log('userCredential.user', userCredential.user);
                    // ...
                })
                .catch((err) => {
                    // if (
                    //     err.code === AuthErrorCodes.INVALID_PASSWORD ||
                    //     err.code === AuthErrorCodes.USER_DELETED
                    // ) {
                    //     setError("The email address or password is incorrect");
                    // } else {
                    console.log('userCredential, error', err);
                    setError(err.message);
                    // alert(err.code);
                })
                    // };
            // await createUserWithEmailAndPassword(auth, emailForm, passwordForm);
            if (auth?.currentUser?.email) {
                console.log('auth?.currentUser?.email',auth?.currentUser?.email)
                setEmail(auth?.currentUser?.email);
            }

        } catch (error) {
            console.error(error);
        }
    }

    // const signInGoogle = async () => {
    //     try {
    //         await signInWithPopup(auth, googleProvider);
    //         console.log('signInGoogle ok');
    //         setEmail(auth?.currentUser?.email);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    // const logOut = async () => {
    //     try {
    //         await signOut(auth);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const routeToSingUp = () => {
        navigate('/signup');
    }

    useEffect(() => {

        if (email && link) {
            navigate('/' + link);

        }

        if (auth?.currentUser?.email) {

            setUser({ mail: auth?.currentUser?.email });
            if (link) {
                // console.log('navigate', '/' + link);
                navigate('/' + link);
            } else {
                navigate('/');
            }
        }
        // eslint-disable-next-line
    }, [email])

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError("");
            }, 2000);
        }
    }, [error])

    // console.log('auth?.currentUser?.email',auth?.currentUser?.email)

    return (
          <div className="login">
              <input className="input" placeholder="Email" onChange={(e) => setEmailForm(e.target.value)}/>
              <input className="input" placeholder="Password" onChange={(e) => setPasswordForm(e.target.value)}/>
              {
                  error && <div style={{ color: 'red' }}>
                        {error}
                    </div>
              }
              <button id="btn" style={{letterSpacing: "2px", padding: "6px 5px"}} onClick={signIn}> Sign in</button>
              <button id="btn" style={{letterSpacing: "2px", padding: "6px 5px"}} onClick={routeToSingUp}> To sign up</button>
              {/*<button id="btn" style={{letterSpacing: "2px", padding: "6px 5px"}} onClick={signInGoogle}> Sign in with*/}
              {/*    Google*/}
              {/*</button>*/}
              {/*<button id="btnNo" style={{letterSpacing: "2px", padding: "6px 5px"}} onClick={logOut}> Log Out</button>*/}
          </div>
    )
}
