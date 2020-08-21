import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import './styles.scss';

// Material
import { Typography, Fade, CircularProgress , Button, Card, CardContent, FormControl, InputLabel, Input, FormHelperText, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const Login = () => {
  const history = useHistory();
  const googleLogin = new firebase.auth.GoogleAuthProvider();
  const [values, setValues] = useState({
    email: "",
    emailExtra: "",
    password: "",
    passwordExtra: "",
    show: false,
    stuck: false,
    loading: true
  })
  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: event.target.value
    })
  }
  const handleVisibility = () => {
    setValues({
      ...values,
      show: !values.show
    });
  }
  const handleGoogleLogin = () => {
    firebase.auth().signInWithPopup(googleLogin)
      .catch(err => {
        console.log(err);
      });
  }
  const handleLogin = e => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(values.email, values.password).catch(err => {
      // Reset Previous Errors
      setValues(oldValues => {
        return { ...oldValues, passwordExtra: "", emailExtra: "" }
      });
      switch(err.code) {
        case "auth/invalid-email":
          setValues(oldValues => {
            return { ...oldValues, emailExtra: "Invalid Email." }
          });
          break;
        case "auth/user-disabled":
          setValues(oldValues => {
            return { ...oldValues, emailExtra: "Account disabled." }
          });
          break;
        case "auth/user-not-found":
          setValues(oldValues => {
            return { ...oldValues, emailExtra: "User not found." }
          });
          break;
        case "auth/wrong-password":
          setValues(oldValues => {
            return { ...oldValues, passwordExtra: "The password is invalid." }
          });
          break;
        default:
          setValues(oldValues => {
            return { ...oldValues, passwordExtra: "Something went wrong. Try again later." }
          });
          break;
      }
    });
  }
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        history.push("/listings");
      } else {
        setTimeout(() => {
          setValues(oldValues => {
            return { ...oldValues, loading: false }
          });
        }, 500);
      }
    });
    return () => unsubscribe();
  }, [history]);

  return (
    <div className="loginContainer">
      {values.loading ? <CircularProgress /> : (
        <Fade in={!values.loading}>
          <Card
            elevation={7}
            className="loginCard"
          >
            <CardContent
              className="loginCardInner"
            > 
              <div className="formContainer">
                <Typography
                  variant="h5"
                  className="title"
                >
                  Login
                </Typography>
                <Typography
                  className="lead"
                >
                  Welcome Back. Please login to your account.
                </Typography>

              <form
                onSubmit={handleLogin}
              >
                  <FormControl
                    error={values.emailExtra !== "" ? true : false}
                  >
                    <InputLabel htmlFor="login-email">Email</InputLabel>
                    <Input
                      required
                      id="login-email"
                      type="email"
                      value={values.email}
                      onChange={handleChange("email")}
                    />
                    <FormHelperText>{values.emailExtra}</FormHelperText>
                  </FormControl>
                  
                  <FormControl
                    error={values.passwordExtra !== "" ? true : false}
                  >
                    <InputLabel htmlFor="login-password">Password</InputLabel>
                    <Input
                      required
                      id="login-password"
                      type={values.show ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleVisibility}
                          >
                            {values.show ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>{values.passwordExtra}</FormHelperText>
                  </FormControl>
                  
                  <Button
                    type="submit"
                    color="primary"
                    size="large"
                    variant="contained"
                  >
                    Login
                  </Button>
                </form>
              
                <GoogleButton
                  className="loginGoogle"
                  onClick={handleGoogleLogin}
                />
              </div>

              <Typography className="noAccount">
                Don't have an account? <Link to="/signup">Signup here</Link>
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      )}
    </div>
  );
}

export default Login;