import React from 'react'
import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux'
import { login } from '../redux/apicall';
import { publicRequest } from '../importMethods';
import styled from "styled-components";

const Modal = styled.div`
    width: 33vw;
    height: 33vh;
    margin: 33vh, 33vw;
    border: 1px solid blue;
    border-radius: 10px;
`;
const Modalcontent = styled.div`
    padding: 20px;
    color: green;
`;
const Modalerror = styled.div`
    padding: 20px;
    color: red;
`;
const Button = styled.button`
    background-color:green;
    border:none;
    color: white;
`;

export const Success = (user) => {
    const dispatch =useDispatch();
    const [nuser, setNuser] = useState({username:"",password:""})
    const [error, setError] = useState(false)
    useEffect(async () => {
      try {
        const res = await publicRequest.post("auth/register",user);
        setNuser({
            username:res.data.username,
            password:res.data.password,
        })
      } catch (err) {
        setError(true);
      }
    }, [user])
    
    const handleClick = (e) =>{
        e.preventDefault();
        let username = nuser.username;
        let password = nuser.password;
        login(dispatch,{username , password});
    }

  return (
    <Modal>
      
        <Modalcontent>
            <h3>You have been registered Successfully</h3>
        </Modalcontent>
        
        

        <Button onClick={handleClick} disabled={error}> OK </Button>
    </Modal>
  )
}
