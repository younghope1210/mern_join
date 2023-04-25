
import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
// import {Auth} from '../../../hoc/auth';

// import { useNavigate } from "react-router-dom";


function LoginPage() {


  // 디스패치

  const dispatch = useDispatch();

 // 로그인 완료후 페이지 넘김
 const navigate = useNavigate();


  const [Email , setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHander = (event) => {

    setEmail(event.currentTarget.value);

  };

  const onPasswordHander = (event) => {
    setPassword(event.currentTarget.value);

  }


  const onSubmitHandler = (event) => {
    event.preventDefault(); 
  
    console.log('Email', Email)
    console.log('PW', Password)
  
    let body = {
      email : Email,
      password : Password
    }
  
    dispatch(loginUser(body))
    .then(response=>{
      if(response.payload.loginSuccess){
        // props.history.push('/')//메인페이지로 이동
        navigate('/')//메인페이지로 이동
      }
      else{
        console.log('Error');
      }
    })
  }
  
  return (
    <div className='Container'>
    
     <div>
      <h2 style={{textAlign:'center' ,padding:'0 0 20px 0', color:'#EAEBF0'}}>Welcome back :) </h2>
        <form 
            style={{display:'flex', flexDirection:'column', backgroundColor:'#080C2A', padding:'20px 50px 50px 50px', 
            border:'1px solid #040B38', color:'#fff', borderRadius:'0'
          }}
            onSubmit={onSubmitHandler}
            >

          <h3 style={{textAlign:'center', margin:'20px 0'}}> Login</h3>  
          
          <label>Email  </label>

          <input type="email" value={Email} onChange={onEmailHander} />
    
          <label>Pssword  </label>

          <input type="password" value={Password} onChange={onPasswordHander} />
          
          <br />
          
          <button
            style={{ backgroundColor:'#080C2A', border:'1px solid #fff', color:'#fff', height:'40px', lineheight:'40px'}}
            type="submit">
            Login
          </button>

        </form>    

      </div>

    </div>
  )
}

export default LoginPage