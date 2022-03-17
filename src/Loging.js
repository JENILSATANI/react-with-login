/* eslint-disable default-case */
/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react'
import { Grid, Paper, TextField } from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { omit } from 'lodash'
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom"
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { InputAdornment, useTheme } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Slide from '@mui/material/Slide';
function Loging() {
    let history = useHistory()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(false)
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);

    const [errors, setErrors] = useState('');
    const [values, setValues] = useState({
        name: '',
        email: "",
        phone: "",
        password: ''
    })
    useEffect(() => {
        localStorage.clear()
    })

    function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
    }

    const validate = (event, name, value) => {
        switch (name) {
            case 'email':
                if (
                    !new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}').test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address'
                    })
                } else {

                    let newObj = omit(errors, "email");
                    setErrors(newObj);

                }
                break;
            case 'password':
                if (
                    !new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        password: 'Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.'
                    })
                } else {

                    let newObj = omit(errors, "password");
                    setErrors(newObj);

                }
                break;

        }
    }
    // function submitfrom(){
    //     if (email === ''|| password === '') {
    //         console.log("ehee",submitfrom)
    //         setErrors("Fields are required");
    //         return false;
    //       }
          
    // }
    function postdata(e) {
        handleClick()
        e.preventDefault();
        let item = {
            email: values.email,
            password: values.password
        }
        console.log(item)
        axios.post("http://localhost:8500/login", item).then((res) => {
            console.log("updare", res)
            if (res.data.success === true) {
                localStorage.setItem("token", res.data.token)
                history.push('/success')
            }
        })

    }
    const handleClick = (Transition) => {
        setTransition(() => Transition);
        console.log("hvj");
        setOpen(true)
    };

    const handleChange = (event) => {
        event.preventDefault();
        event.persist();
        let name = event.target.name;
        let val = event.target.value;
        validate(event, name, val);
        setValues({
            ...values,
            [name]: val,
        })
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleonclick = () => {
        setPassword(!password)
    }
    const handleonmousedown = () => {
        setPassword(!password)
    }

    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }

    return (
        <div>
            <div>
                <Grid>

                    <Paper elevation={20} style={paperStyle}>
                        <Grid align='center'>
                            <h2> Login Form</h2>
                        </Grid>
                        <form>
                            <TextField name='email'
                                variant='filled'
                                fullWidth label='Email'
                                value={values.email}
                                onChange={handleChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email} />
                            <TextField name='password'
                                type={password ? 'text' : 'password'}
                                variant='filled'
                                fullWidth label='password'
                                value={values.password}
                                onChange={handleChange}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton

                                                onClick={handleonclick}
                                                onMouseDown={handleonmousedown}
                                            >
                                                {password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}


                            />
                            <br />
                            <br />
                            <Grid align='center'>
                                <Button type='submit' class='btn btn-info' onClick={postdata}>Login
                                    <Snackbar
                                        open={open}
                                        onClose={handleClose}
                                        TransitionComponent={transition}
                                        message="email and password required"
                                        key={transition ? transition.name : ''}
                                    />
                                </Button>
                            </Grid>
                            <br />
                            <Grid align='center'>
                                <Link to='/Reg'>New Register</Link>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </div >

        </div>
    )
}

export default Loging