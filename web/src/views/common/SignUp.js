import { useState } from "react";
import axios from "axios";

const SignUp = () => {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const [inputName, setInputName] = useState('');
    const [gender, setGender] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [residence, setResidence] = useState('');

    const sessionStorage = window.sessionStorage;

    const handleInputId = (e) => {
        setInputId(e.target.value);
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }
    const handleName = (e) => {
        setInputName(e.target.value);
    }
    const handleGender = (e) => {
        console.log(e.target.value);
        setGender(e.target.value);
    }
    const handleResidence = (e) => {
        setResidence(e.target.value);
    }
    const handleBirth = (e) => {
        setBirthDay(e.target.value);
    }


    const onClickSignUp = () => {
        if (!inputId) {
            alert('아이디를 입력해주세요');
            return;
        }
        if (!inputPw) {
            alert('비밀번호를 입력해주세요');
            return;
        }
        if (!inputName) {
            alert('이름을 입력해주세요');
            return;
        }
        if (!birthDay) {
            alert('생년월일을 입력해주세요');
            return;
        }
        if (!gender) {
            alert('성별을 입력해주세요');
            return;
        }
        if (!residence) {
            alert('거주지를 입력해주세요');
            return;
        }
        axios.post('/usersRouter/save', {
            data: {
                user_id: inputId,
                password: inputPw,
                name: inputName,
                bday: birthDay,
                gender: gender,
                location: residence
            }
        }).then((response) => {
            if (response.data.status === 'success') {
                alert('회원가입이 되었습니다!');
                sessionStorage.setItem("Id", inputId);
                sessionStorage.setItem("Pw", inputPw);
                window.location.reload();
            } else {
                alert('이미 존재하는 아이디입니다.');
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    return (
        <div>
            <div className="modal-body">
                <div>
                    <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput"value={inputId} onChange={handleInputId} placeholder="ID" />
                        <label htmlFor="floatingInput">ID</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" value={inputPw} onChange={handleInputPw} placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingName" value={inputName} onChange={handleName} placeholder="이름" />
                        <label>이름</label>
                    </div>
                    <label>성별</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="남" onChange={handleGender}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1" >
                            남
                        </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="여" onChange={handleGender}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            여
                        </label>
                        </div>
                    <div className="form-floating">
                        <input type="date" className="form-control" id="floatingBirth" value={birthDay} onChange={handleBirth} placeholder="생년월일" />
                        <label htmlFor="floatingPassword">생년월일</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingResidence" value={residence} onChange={handleResidence} placeholder="거주지" />
                        <label htmlFor="floatingPassword">거주지</label>
                    </div>
                    <div className="checkbox mb-3">
                        {/* <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label> */}
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" onClick={onClickSignUp} >회원가입</button>
                </div>
            </div>
            <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Understood</button> */}
            </div>
        </div>
    )
}
export default SignUp;