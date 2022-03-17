import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
// import { Redirect, useParams } from 'react-router-dom'
import { useParams, useHistory } from "react-router-dom"

const Copy = () => {
    const [name, setname] = useState('')
    const [email, setEmail] = useState('')
        const [phone, setphone] = useState('')
    const token = localStorage.getItem("token");
    const { id } = useParams();
    let history = useHistory()

    

    function updatebackenddat() {

        let item = {
            name: name,
            email: email,
            phone: phone,
        }
        axios.post(`http://localhost:8500/adduser`, item, { headers: { 'x-access-token': token } }).then((res) => {
            console.log("data", res.data)
        })
        history.push('/success')

    }
    


    return (

        <>
            <p class="oo" ><span>Add User </span></p>

            <form class="MM">
                <div class="bb">
                    <label htmlfor='name'>Enter Name:</label>
                    <input required type='text' name='name' value={name} onChange={(e) => setname(e.target.value)}></input>
                    <br />
                </div>
                <br />
                <div class='A'>
                    <lable htmlFor='email'> Email:  </lable>
                    <input required type='text' name='email' autoComplete='off'
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <br />
                <div class='A'>
                    <lable htmlFor='phone'> Phone  </lable>
                    <input required type='number' name='phone' autoComplete='off'
                        value={phone} onChange={(e) => setphone(e.target.value)} />
                </div>
                <br />
                <Button type='button' class='btn btn-success'>
                    <button type='submit' onClick={updatebackenddat}>Submit</button>
                </Button>
            </form>
            <br />


        </>
    )


}


export default Copy;
