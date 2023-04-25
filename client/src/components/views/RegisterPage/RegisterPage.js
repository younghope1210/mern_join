import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_actions';
import './RegisterPage.css';
// import {Auth} from '../../../hoc/auth';      



function RegisterPage() {

  const dispatch = useDispatch();

  const navigate = useNavigate();
        
  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
      
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }
      
  const onSubmitHandler = (event) => {
    event.preventDefault(); 
      
    // 입력한 비밀번호와 재확인하는 비밀번호가 맞는지 확인

    if(Password !== ConfirmPassword){
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.")
    }
      
    let body = {
      email : Email,
      name : Name,
      password : Password
     
    }
      
    dispatch(registerUser(body))
    .then(response=>{
      if(response.payload.success){
        alert('회원가입에 성공하였습니다.')
        // props.history.push("/login")// 로그인페이지로 이동
        navigate('/login')// 로그인페이지로 이동
      }
      else{
        alert('회원가입에 실패하였습니다.')
      }
    })
  }
  return (
    <div className='Container'>
     <div>
      <h2 style={{textAlign:'center' ,padding:'0 0 20px 0', color:'#EAEBF0'}}>Welcome !</h2>
        <form style={{display:'flex', flexDirection:'column', backgroundColor:'#080C2A', padding:'20px 50px 50px 50px',
        border:'1px solid #040B38', color:'#fff', borderRadius:'0'
        }}
          onSubmit={onSubmitHandler}
          >

        <h3 style={{textAlign:'center', margin:'20px 0'}}> Register</h3>  
                
          <label>Email</label>
          <input type = "email" value= {Email} onChange ={onEmailHandler} />
                
          <label>Name</label>
          <input type = "name" value = {Name} onChange = {onNameHandler} />
                
          <label>Password</label>
          <input type = "password" value = {Password} onChange = {onPasswordHandler} />
                
          <label>Confirm Password</label>
          <input type = "password" value = {ConfirmPassword} onChange = {onConfirmPasswordHandler} />
        
          <br />
          <button type="submit"
            style={{ backgroundColor:'#080C2A', border:'1px solid #fff', color:'#fff', height:'40px', lineheight:'40px'}}
          >
            회원가입
          </button>
        
        </form>
      </div>
  )
  </div>
  )
}

export default RegisterPage   