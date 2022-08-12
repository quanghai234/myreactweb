import React,{useState,useEffect,useRef} from 'react'
import axios from '../../api/products'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const luserRef = useRef();
    const lerrRef = useRef();

    const [loginUser,setLoginUser] = useState('');
    const [loginPwd,setLoginPwd] = useState('');
    const [errMsg,setErrMsg] = useState('');
  
    const nav = useNavigate()

    useEffect(()=>{
        luserRef.current.focus();
    },[])

    useEffect(()=>{
        setErrMsg('');
    },[loginUser,loginPwd])

    const handleLogin = async(e)=>{
       e.preventDefault()
        try {
            const resp = await axios.get(`/user?username=${loginUser}`);
            const user = resp.data
        
            if(user.length===0){
                setErrMsg('User not exist')
            }else if(user[0].password !== loginPwd){
                setErrMsg('Password not match')
            }else{
                localStorage.setItem('displayname', user[0].displayname)
                localStorage.setItem('username',loginUser)
                localStorage.setItem('userid',user[0].id)
                localStorage.setItem('useravatar',user[0].avatar)
                localStorage.setItem('logged',true)
                toast.success("login success",{
                    position:'top-center',
                    autoClose:'3000',
                });
                nav('/')
            }
         } 
         catch (err) {
             if (!err?.response) {
                 setErrMsg('No Server Response');
             }else{
                 setErrMsg('Login Failed');
             }
             lerrRef.current.focus();
         }
    }

  return (
    <>
        <div className="login-register-title">
            <h3>LOGIN</h3>
            <p>Welcome back! Please enter your username and password to login.</p>
            <p ref={lerrRef} className={errMsg ? "errmsg":"offscreen"} 
                aria-live="assertive">{errMsg}</p>
        </div>

        <div className="login-register-form">
            <form onSubmit={handleLogin}>

            <div className="login-register-input">
                <input type="text" 
                    name="user-name"
                    placeholder="Username" 
                    ref={luserRef}
                    autoComplete="off"
                    onChange={(e)=>setLoginUser(e.target.value)}
                    value={loginUser}
                    required
                />
            </div>

            <div className="login-register-input">
                <input
                    type="password"
                    name="user-password"
                    placeholder="Password"
                    onChange={(e)=>setLoginPwd(e.target.value)}
                    value={loginPwd}
                    required
                />
            </div>
            
                <button disabled={loginUser===''||loginPwd===""?true:false} onClick={(e)=>handleLogin(e)}>LOGIN</button>

            </form>
        </div>
    </>
  )
}

export default Login