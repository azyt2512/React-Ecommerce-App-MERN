import { useEffect,useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch } from 'react-redux'
import { login } from '../redux/apicall';
import { publicRequest } from '../importMethods';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  margin:auto;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const FilterRole = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterRoleOption = styled.option``;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const Error = styled.div`
  margin: 0px auto;
  color:red;
  font-size:15px;
`;
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

const Register = () => {
  const [nuser, setNuser] = useState({});
  const [cnf, setCnf] = useState("");
  const [match, setMatch] = useState(true);
  
  let username;
  let password;
  useEffect(()=>{
    if(nuser.password)
    { if(cnf === nuser.password)
      setMatch(true);
      else
      setMatch(false);
    }
  },[cnf])
  const [error, setError] = useState(0)
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post("auth/register",nuser);
      // console.log(res.data);
      password=nuser.password;
      username=nuser.username;
      setError(1);
    } catch (err) {
      setError(2);
    }
  }
  const dispatch =useDispatch();
  // console.log(nuser);
  const handleClick1 = (e) =>{
    e.preventDefault();
    login(dispatch,nuser);
}

  const handleChange = (e) => {
    setNuser((nuser) => {
      return { ...nuser, [e.target.name]: e.target.value };
    });
  };
    



  return (
    <Container>
      <Wrapper>
        {error==0?
        <>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" />
          <Input placeholder="last name" />
          <Input placeholder="username"  name="username" onChange={handleChange}/> 
          <Input placeholder="email" name="email" onChange={handleChange}/>
          <Input type="password" placeholder="password" name="password" onChange={handleChange}/>
          <Input  placeholder="confirm password" onChange={(e)=>{setCnf(e.target.value)}}/>
          
         
          <Filter>
              <FilterTitle>Role</FilterTitle>
              <FilterRole name="isSeller" onChange={handleChange}>
              <FilterRoleOption value="true">Seller</FilterRoleOption>
              <FilterRoleOption value="false">Buyer</FilterRoleOption>   
              </FilterRole>
          </Filter>
          {!match ? <Error>Password mismatch</Error> : ""}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          
          <Button onClick={handleClick}>CREATE</Button>
          {error==2 ? <Error>Ooops Something went Wrong !!! just try again</Error> : ""}
        </Form>
        </>
      :<Modal>     
        <Modalcontent>
            <h3>You have been registered Successfully</h3>
        </Modalcontent>
        <Button onClick={handleClick1} > OK </Button>
      </Modal>}
      </Wrapper>
    </Container>
  );
};

export default Register;
