import { useState } from "react";
import axios from "axios";
const Login = () => {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');

    const handleInputId = (e) => {
        setInputId(e.target.value);
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const onClickLogin = () => {
        console.log('click login')
        console.log(inputId)
        console.log(inputPw)

        axios.post('/usersRouter/findOne', {
            data: {
                user_id: inputId
            }
        }).then((response) => {
            // console.log(response.data);
            // alert(123)
            if (!response.data) {
                alert('존재하지 않는 아이디입니다.');
            } else {
                console.log(response.data[0]);
                if (response.data[0].password === inputPw) {
                    alert('비밀번호가 일치함');
                } else {
                    alert('비밀번호가 일치하지 않습니다.');
                }
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    return (
        <div>
            <div class="modal-body">
                <div>
                    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                    <div class="form-floating">
                        <input type="text" class="form-control" id="floatingInput"value={inputId} onChange={handleInputId} placeholder="ID" />
                        <label for="floatingInput">ID</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" value={inputPw} onChange={handleInputPw} placeholder="Password" />
                        <label for="floatingPassword">Password</label>
                    </div>

                    <div class="checkbox mb-3">
                        {/* <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label> */}
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" onClick={onClickLogin} >Sign in</button>
                </div>
            </div>
            <div class="modal-footer">
                {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Understood</button> */}
            </div>
        </div>
    )
}
export default Login;