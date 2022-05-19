import { useState } from "react";
import axios from "axios";
const Login = () => {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const [savedId, setSavedId] = useState("");
    const [savedPw, setSavedPw] = useState("");

    const sessionStorage = window.sessionStorage;

    const handleInputId = (e) => {
        setInputId(e.target.value);
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const refreshPage = ()=>{
        window.location.reload();
     }

    const onClickLogin = () => {
        console.log('click login')
        // console.log(inputId)
        // console.log(inputPw)
        if(inputPw.length < 10){ // 복호화 전 회원가입 했던 유저 로그인
            axios.post('/usersRouter/loginCheck', {
                data: {
                    user_id: inputId,
                    // password: inputPw
                }
            })
            .then((response) => {
                // console.log(response.data);
                // alert(123)
                if (response===undefined) {
                    alert('존재하지 않는 아이디입니다.');
                } else {
                    console.log(123)
                    console.log(response.data[0]);
                    if (response.data[0].password === inputPw) {
                        alert('비밀번호가 일치함');
                        sessionStorage.setItem("Id", inputId);
                        sessionStorage.setItem("Pw", inputPw);
    
                        setSavedId(sessionStorage.getItem("Id"));
                        setSavedPw(sessionStorage.getItem("Pw"));
                        refreshPage();
                    }
                     else {
                        alert('비밀번호가 일치하지 않습니다.');
                    }
                }
            }).catch(function (error) {
                console.log(error);
            })
        } else { // 복호화 후 회원가입한 유저 로그인
            axios.post('/usersRouter/loginBcrypt', {
                data: {
                    user_id: inputId,
                    password: inputPw
                }
            })
            .then((response) => {
                // console.log(response.data);
                // alert(123)
                if (response===undefined) {
                    alert('존재하지 않는 아이디입니다.');
                } else {
                    console.log(123)
                    console.log(response.data[0]);
                    if (response.data.status === 'success') {
                        sessionStorage.setItem("Id", inputId);
                        sessionStorage.setItem("Pw", inputPw);
    
                        setSavedId(sessionStorage.getItem("Id"));
                        setSavedPw(sessionStorage.getItem("Pw"));
                        refreshPage();
                    } 
                    // if (response.data[0].password === inputPw) {
                    //     // alert('비밀번호가 일치함');
                    // }
                     else {
                        alert('비밀번호가 일치하지 않습니다.');
                    }
                }
            }).catch(function (error) {
                console.log(error);
            })
        }
        // axios.post('/usersRouter/loginBcrypt', {
        //     data: {
        //         user_id: inputId,
        //         password: inputPw
        //     }
        // })
        
    }

    const onClickSignUp = () => {
        alert("회원가입")
    }

    return (
        <div>
            <div className="modal-body">
                <div>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput"value={inputId} onChange={handleInputId} placeholder="ID" />
                        <label htmlFor="floatingInput">ID</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" value={inputPw} onChange={handleInputPw} placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        {/* <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label> */}
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" onClick={onClickLogin} >로그인</button>
                </div>
            </div>
            <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Understood</button> */}
            </div>
        </div>
    )
}
export default Login;