import React, {useState} from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
} from '@coreui/react'
import {Loading} from "./Loading";
import {CIcon} from "@coreui/icons-react";
import axios from "axios";

//axios기본설정
axios.defaults.withCredentials = true//CORS 허용
axios.defaults.baseURL = 'http://localhost:8080'//tomcat port로 접속

//회원가입 페이지
const SignUp = props => {
    const [validationTarget, setValidationTarget] = useState('')
    const [load, setLoad] = useState(false)
    const [success, setSuccess] = useState('계정 생성하기')

    const setCriteria = () => {
        setValidationTarget(document.getElementById('userPassword1').value)
    }

    const completeRegister = (result) => {
        console.log(result)
        if (result.result) {
            setLoad(false)
            setSuccess('이메일 인증을 완료해주세요.')
        } else {
            setSuccess(result.error)
        }
    }

    const register = (e) => {
        e.preventDefault()
        console.log('validating')
        const name = document.getElementById('userName').value
        const upw = document.getElementById('userPassword1').value
        const email = document.getElementById('userEmail').value
        const phone = document.getElementById('userPhone').value
        const data = new FormData()
        data.append('name', name)
        data.append('upw', upw)
        data.append('email', email)
        data.append('phone', phone)
        setLoad(true)
        axios.post('register/new', data).then(r => completeRegister(r.data))
            .catch(()=> {
                setLoad(false)
                setSuccess('에러가 발생했습니다.')
            })
    }

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="9" lg="7" xl="6">
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm onSubmit={(e) => register(e)}>
                                    <h1>가입하기</h1>
                                    <p className="text-muted">계정을 생성하세요</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-user"/>
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id='userName' type="text" placeholder="이름" autoComplete="username"
                                                required/>
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>@</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id='userEmail' type="email" placeholder="이메일" autoComplete="email"
                                                required/>
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-lock-locked"/>
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id='userPassword1' type="password" placeholder="비밀번호"
                                                autoComplete="new-password" required onBlur={setCriteria}/>
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-lock-locked"/>
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id='userPassword2' type="password" placeholder="비밀번호 재확인"
                                                autoComplete="new-password" required pattern={validationTarget}/>
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-phone"/>
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput id='userPhone' type="tel" placeholder="전화번호" autoComplete="tel" required
                                                pattern='010-[0-9]{4}-[0-9]{4}'/>
                                    </CInputGroup>
                                    <CButton type='submit' color="success" block><div>{load ? <Loading /> : null}{success}</div></CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default SignUp