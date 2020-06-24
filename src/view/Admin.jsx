import React, {useState} from 'react'
import {connect} from "react-redux";
import axios from "axios";
import {controlDetailModal, controlModal, loadAllApply} from "../store";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CContainer,
    CListGroup,
    CListGroupItem
} from "@coreui/react";
import {Loading} from "./Loading";
import ApplierDetail from "./ApplierDetail";
import LanguageSelect from "./LanguageSelect";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

//관리자 페이지
const Admin = props => {
    const {history, user, loadList, list, control, alert} = props
    if (!user) history.push('/404')
    else if (user.auth !== 'ADMIN') history.push('/404')
    const [load, setLoad] = useState(false)
    const [open, setOpen] = useState(false)
    if (!list) {
        axios.get('/admin/apply/list').then(r => loadList(r.data));
        return <Loading/>
    }

    const analysis = () => {
        setLoad(true)
        setOpen(true)
    }

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CCard>
                    <CCardHeader className='d-flex justify-content-between'>
                        <CCardTitle className='my-auto'>지원자 리스트</CCardTitle>
                        <CButton color='success' onClick={analysis}>{load ? <Loading/> : 'Repository Clone'}</CButton>
                    </CCardHeader>
                    <CCardBody>
                        <CListGroup flush>
                            {
                                list.map((applier, idx) => {
                                        const {id, userName} = applier
                                        return (
                                            <CListGroupItem key={idx} href='#' onClick={() => control({show: true, id, name: userName})}>{userName}</CListGroupItem>
                                        )
                                    }
                                )
                            }
                        </CListGroup>
                        <ApplierDetail/>
                        <LanguageSelect open={open} close={() => {
                            setOpen(false)
                            setLoad(false)
                        }} alert={alert}/>
                    </CCardBody>
                </CCard>
            </CContainer>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {user, apply: {list} = {}} = state
    return {
        user,
        list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadList: (list) => dispatch(loadAllApply(list)),
        control: (modal) => dispatch(controlDetailModal(modal)),
        alert: (state) => dispatch(controlModal(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)