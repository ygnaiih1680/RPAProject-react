import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import {login} from "../store";
import {connect} from 'react-redux'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

//로그인 페이지
const Login = ({history, loginSuccess}) => {
    const [success, setSuccess] = useState('로그인')

    const userAuthenticate = (e) => {
        e.preventDefault()
        const id = document.getElementById('uid').value
        const pw = document.getElementById('upw').value
        const data = new FormData()
        data.append('id', id)
        data.append('pw', pw)
        axios.post('/user/login', data).then(r=> {
            if (r.data.id) {
                loginSuccess(r.data)
                history.push('/home')
            }else {
                setSuccess(r.data.error)
            }
        })
    }

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={(e) => userAuthenticate(e)}>
                                        <h1>로그인</h1>
                                        <p className="text-muted">로그인 하세요.</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-user"/>
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput id='uid' type="text" placeholder="이메일" autoComplete="username"/>
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked"/>
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput id='upw' type="password" placeholder="비밀번호"
                                                    autoComplete="current-password"/>
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs="6">
                                                <CButton type='submit' color="primary" className="px-4">{success}</CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <br/>
                                        <p>당사에 지원하기 위해서는 회원가입이 필요합니다. 아직 계정이 없으시다면 지금 가입하세요.</p>
                                        <Link to="/signup">
                                            <CButton color="primary" className="mt-3" active
                                                     tabIndex={-1}>가입하기</CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginSuccess: (user) => dispatch(login(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)