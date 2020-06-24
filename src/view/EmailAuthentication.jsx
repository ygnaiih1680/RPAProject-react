import React, {useLayoutEffect, useState} from 'react'
import qs from 'qs'
import axios from "axios";
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm, CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
} from "@coreui/react";
import {CIcon} from "@coreui/icons-react";
import {Loading} from "./Loading";
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

//이메일 인증 페이지
const EmailAuthentication = ({location}) => {
    const query = qs.parse(location.search, {ignoreQueryPrefix: true})
    const [load, setLoad] = useState(false)
    useLayoutEffect(()=>{
        const {id, value} = query
        const data = new FormData()
        data.append('id', id)
        data.append('value', value)
        axios.post('register/auth', data).then(r=>setLoad(r.data))
    } ,[])
    return(
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="9" lg="7" xl="6">
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <div>
                                    {query.id ? load ? '이메일 인증에 성공하셨습니다!' : <Loading/> : '잘못된 접근입니다!'}
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default EmailAuthentication