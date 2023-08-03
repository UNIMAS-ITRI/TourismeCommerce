// "user manual": You can set your footer here
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// @mui/material
import {
    Box,
    Grid,
    Button,
    Typography,
    IconButton,
    Stack,
    Badge,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    FormHelperText,
    Divider,
    Alert,

} from '@mui/material';


import { GitAction } from '../../store/action/gitAction';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginComponent() {

    const { logonUser } = useSelector(state => ({
        logonUser: state.counterReducer.logonUser,
      }));

    const dispatch = useDispatch();
    const [passwordErr, setPasswordErr] = useState(false);
    const [usernameErr, setUsernameErr] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [forgetPassword, setForgetPassword] = useState(false);
    const [signUpDialog, setSignUpDialog] = useState(false);  
    const [verificationError, setVerificationError] = useState(false);


    useEffect(() => {
        if (logonUser.length > 0) {
          if (logonUser[0].ReturnVal === 0)
            setVerificationError(true)
          else 
            setVerificationError(false)
          
        }
      }, [logonUser]);
    
 
  const handleSubmit = (username, password) => {
    dispatch(GitAction.CallUserLogin({ Username: username, Password: password }));
  }

    return (
        <Box sx={{ padding: 1.5 }}>
            <div className="text-center  mt-3">
                <img
                    src='https://www.sarawaktourism.com/images/logo_w.png'
                    alt="Sarawak tourism"
                    height="50px"
                    width="auto"
                    className="mx-auto"
                ></img>
            </div>
            <div className="mt-1">
                <div lg="5" md="5">
                    <div className="d-flex justify-content-center my-1"><h4>Sign In</h4></div>

                    {verificationError && <Alert severity="error" >Invalid Username or Password</Alert>}

                    <Typography variant='subtitle2' >Username :</Typography>
                    <TextField id="username" 
                    // label="Username" 
                    variant="outlined"
                        className="w-100" value={username}
                        onChange={({ target }) => {
                            setUsername(target.value)
                            if (target.value === "") setUsernameErr(true)
                            else setUsernameErr(false)
                        }}
                        error={usernameErr}
                        helperText={usernameErr && "Invalid username"} />

                    <Typography variant='subtitle2' sx={{paddingTop:"15px"}} >Password :</Typography>
                    <FormControl variant="outlined" className="w-100">
                        {/* <InputLabel htmlFor="password">Password</InputLabel> */}
                        <OutlinedInput
                            id="password"
                            // label="Password"
                            error={passwordErr}
                            type={hidden ? 'password' : 'text'}
                            value={password}
                            onChange={({ target }) => {
                                setPassword(target.value)
                                if (target.value === "") setPasswordErr(true)
                                else setPasswordErr(false)

                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setHidden(!hidden)}
                                    >
                                        {hidden ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>                    
                    {passwordErr && <FormHelperText style={{ color: "red" }}>Invalid password</FormHelperText>}
                    
                    <div className="form-group" style={{paddingTop:"15px"}}>
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                                value={rememberMe}
                                onChange={({ target }) => setRememberMe(target.checked)}
                            />    {" "}
                            <label className="custom-control-label" htmlFor="customCheck1">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div className="LoginForm-Submit" style={{ paddingTop: "10px" }}>
                        <button
                            type="submit"
                            variant="contained"
                            className="btn btn-primary w-100"
                            style={{ borderRadius: "5px" }}
                            disabled={username !== '' && password !== '' ? false : true}
                            onClick={() => handleSubmit(username, password)}
                        >
                            Sign In
                        </button>
                    </div>

                </div>
                <Divider className="pt-4 pb-4">OR</Divider>
                <div className="text-center w-100 xx-large">
                </div>
                <div>
                    <div>
                        <div className="text-center" style={{ fontSize: "13px", paddingTop: "8px" }}>
                            New to Tourism E-Market Place? {" "}
                            <label style={{ color: "darkblue", textDecoration: "underline", fontWeight: "bold" }} onClick={() => setSignUpDialog(true)}>
                                {" "}  Sign Up
                            </label>
                        </div>
                    </div>
                    <div>
                        <div className="forgot-password text-center">
                            <label style={{ fontWeight: "bold" }} onClick={() => setForgetPassword(true)}>Forgot password?</label>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}