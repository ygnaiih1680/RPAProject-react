import React from 'react'
import {CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCardTitle, CContainer, CFade} from "@coreui/react";
import {Link, Redirect} from "react-router-dom";
import {logout} from "../store";
import {connect, useStore} from 'react-redux'

//메인 페이지
const Home = ({logoutDispatch}) => {
    const {user} = useStore().getState()
    console.log(user)
    if (user) if (user.auth === 'ADMIN') return <Redirect to='/admin'/>
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CFade>
                    <CCard>
                        <CCardHeader><CCardTitle className='my-auto'>(주) 퐁신</CCardTitle></CCardHeader>
                        <CCardBody>
                            {user ? user.name ? <div>반갑습니다. {user.name}님<br/><br/></div> : null : null}
                            IT인력 채용 시작<br/>
                            모집 기간 : 2020.06.01-2020.06.24
                        </CCardBody>
                        <CCardFooter className='d-flex justify-content-between'>
                            <Link to='/login'>
                                {
                                    user ?
                                        <CButton color='primary' onClick={logoutDispatch}>로그아웃</CButton> :
                                        <CButton color='primary'>로그인</CButton>
                                }
                            </Link>
                            <Link to='/apply'>
                                <CButton color='primary'>지원하기</CButton>
                            </Link>
                        </CCardFooter>
                    </CCard>
                </CFade>

            </CContainer>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutDispatch: () => {
            dispatch(logout())
        }
    }
}

export default connect(null, mapDispatchToProps)(Home)