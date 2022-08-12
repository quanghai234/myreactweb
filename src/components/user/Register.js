import React,{useEffect,useState,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../api/products'


    const USER_REGEX = /^[A-Z][a-zA-Z0-9_]{3,23}$/;
    const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const nav = useNavigate();

    const [user,setUser] = useState('');
    const [validName,setValidName] = useState(false);
    const [userFocus,setUserFocus] = useState(false);

    const [pwd,setPwd] = useState('');
    const [validPwd,setValidPwd] = useState(false);
    const [pwdFocus,setPwdFocus] = useState(false);

    const [matchPwd,setMatchPwd] = useState('');
    const [validMatch,setValidMatch] = useState(false);
    const [matchFocus,setMatchFocus] = useState(false);

    const [errMsg,setErrMsg] = useState('');
    const [success,setSuccess] = useState(false);

    useEffect(()=>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        const result = USER_REGEX.test(user);
        setValidName(result);
    },[user])   

    useEffect(()=>{
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    },[pwd,matchPwd])

    useEffect(()=>{
        setErrMsg('')
    },[user,pwd,matchPwd])

    const handleRegister = async (e)=>{
        e.preventDefault();
        try {
            const userExist = await axios.get(`/user?username=${user}`);
            if(userExist.data.length>0){
                setErrMsg('User Name Already Exist');
            }else{
                await axios.post("/user",
                    {
                    username:user,
                    password:pwd,
                    firstname:'',
                    lastname:'',
                    displayname:user,
                    email:'',
                    avatar:'https://image.shutterstock.com/image-vector/user-login-authenticate-icon-human-260nw-1365533969.jpg'
                    }
                );
                toast.success("Regist success")
                setSuccess(true)
            }
            
        } 
        catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if( err.response?.status === 409){
                setErrMsg('Username Taken');
            }else{
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    }

  return (
    <>
        <div className="login-register-title">
            <h3>REGISTER</h3>
            <p>
            Create new account today to reap the benefits of a personalized
            shopping experience.
            </p>
            <p ref={errRef} className={errMsg?"errmsg":"offscreen"} 
                aria-live="assertive">
                    {errMsg}
            </p>
        </div>
        <div className="login-register-form">
            <form >
                <div className="login-register-input">
                <span className={validName?"valid":"hide"}>
                    <i className="fa-solid fa-check"></i>
                </span>
                <span className={validName || !user ?"hide":"invalid"}>
                    <i className="fa-solid fa-xmark"></i>
                </span>
                <input type="text" name="user-name" 
                    placeholder="Username" 
                    autoComplete='off'
                    ref={userRef}
                    onChange={(e)=>setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby='uidnote'
                    onFocus={()=>setUserFocus(true)}
                    onBlur={()=>setUserFocus(false)}
                />
                <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    4 to 24 characters.<br/>
                    Must begin with a uppercase letter.<br/>
                </p>

                </div>

                <div className="login-register-input">
                <span className={validPwd ? "valid" : "hide"}>
                    <i className="fa-solid fa-check"></i>
                </span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <i className="fa-solid fa-xmark"></i>
                </span>
                <input type="password" name="user-password" 
                    placeholder="Password" 
                    onChange={(e)=> setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={()=> setPwdFocus(true)}
                    onBlur={()=> setPwdFocus(false)}
                />
                <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    8 to 24 characters.<br/>
                    Must include uppercase and Lowercase letter, a number and a special character.<br/>
                    Allowed special characters: ! @ # $ %
                </p>

                </div>

                <div className="login-register-input">
                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <i className="fa-solid fa-check"></i>
                </span>
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                    <i className="fa-solid fa-xmark"></i>
                </span>
                <input type="password" name="confirm-pwd" 
                    placeholder="Confirm Password" 
                    required
                    onChange={(e)=>setMatchPwd(e.target.value)}
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={()=>setMatchFocus(true)}
                    onBlur={()=>setMatchFocus(false)}
                />
                <p id='confirmnote' className={matchFocus && !validMatch ? "instructions":"offscreen"}>
                    Must match password field.
                </p>

                </div>

                <div className="login-register-paragraph">
                <p>
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account, and for
                    other purposes described in our <span> privacy policy </span>.
                </p>
                </div>
                
                <button  disabled={!validMatch || !validName || !validPwd ? true : false} 
                onClick={(e)=>handleRegister(e)}>
                        REGISTER
                </button>
            </form>
        </div>
      
    </>
  )
}

export default Register