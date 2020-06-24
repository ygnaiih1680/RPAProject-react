import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCardTitle,
    CContainer,
    CForm,
    CInput,
    CLabel,
    CTextarea,
    CFade
} from "@coreui/react";
import {connect, useStore} from 'react-redux'
import {controlModal} from "../store";
import axios from "axios";
import {Redirect} from 'react-router-dom'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

const GITHUB_PATTERN = 'https://github.com/'

const Apply = props => {
    const {confirm, history} = props
    const {user} = useStore().getState()
    if (!user) {
        return <Redirect to='/home'/>
    }
    const {id} = user
    const homeRedirect = () => {
        history.push('/home')
        confirm({open: false})
    }

    const confirmAction = () => {
        const introduce = document.getElementById('introduce').value
        const study = document.getElementById('study').value
        const experience = document.getElementById('experience').value
        const github = document.getElementById('github').value
        const data = new FormData()
        data.append('introduce', introduce)
        data.append('study', study)
        data.append('experience', experience)
        data.append('github', github)
        data.append('id', id)
        axios.post('/apply', data).then(r => {
            if (r.data) confirm({open: true, content: '지원 서류가 성공적으로 저장되었습니다.', header: '제출 성공', confirmAction: homeRedirect})
            else confirm({open: true, content: '이미 지원하셨습니다!', header: '중복 지원'})
        }).catch(() => confirm({open: true, content: '오류가 발생 했습니다.', header: '제출 실패'}))
    }

    const submit = (e) => {
        e.preventDefault()
        if (checkGithub())
            confirm({open: true, content: 'GitHub링크가 아닙니다. 다시 확인하세요.', header: '형식 오류'})
        else confirm({open: true, content: '정말 제출하시겠습니까?', header: '제출 확인', confirmAction})
    }

    const checkGithub = () => {
        const github = document.getElementById('github').value
        return new RegExp(GITHUB_PATTERN).exec(github) === null
    }

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CFade>
                    <CCard>
                        <CForm onSubmit={(e) => submit(e)}>
                            <CCardHeader><CCardTitle className='my-auto'>(주) 퐁신 IT 인력 채용 지원서</CCardTitle></CCardHeader>
                            <CCardBody>
                                <CLabel htmlFor='introduce'>1. 자기소개 및 지원동기를 작성하시오.</CLabel>
                                <CTextarea id='introduce' style={{height: '10rem'}} className='mb-5' required/>
                                <CLabel htmlFor='study'>2. 지원하는 분야와 관련하여 학습한 전공과목 혹은 외부강의를 3개 이내로 기재하시오.</CLabel>
                                <CTextarea id='study' style={{height: '10rem'}} className='mb-5' required/>
                                <CLabel htmlFor='experience'>3. 자신의 열정과 기술적인 전문성을 나타낼 수 있는 경험/이력/생각을 자유롭게 기술하시오.<br/>
                                    (대회, 해커톤, 프로젝트, 오픈소스 코드 기여, 논문 등)</CLabel>
                                <CTextarea id='experience' style={{height: '10rem'}} className='mb-5' required/>
                                <CLabel htmlFor='github'>4. 자신의 GitHub링크를 기재하시오.</CLabel>
                                <CInput id='github' type='url' required/>
                            </CCardBody>
                            <CCardFooter className='d-flex justify-content-end'>
                                <CButton color='primary' type='submit'>서류 접수하기</CButton>
                            </CCardFooter>
                        </CForm>
                    </CCard>
                </CFade>

            </CContainer>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        confirm: (modal) => dispatch(controlModal(modal))
    }
}

export default connect(null, mapDispatchToProps)(Apply)