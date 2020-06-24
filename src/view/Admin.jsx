import React, {lazy} from 'react'
import {connect} from "react-redux";
import axios from "axios";
import {controlModal, loadAllApply} from "../store";
import {CCard, CCardBody, CCardHeader, CCardTitle, CContainer, CListGroup, CListGroupItem} from "@coreui/react";
import {Loading} from "./Loading";
import ApplierDetail from "./ApplierDetail";
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

const Admin = props => {
    const {history, user, loadList, list, control} = props
    if (!user) history.push('/404')
    else if (user.auth !== 'ADMIN') history.push('/404')
    if (!list) {
        axios.get('/admin/apply/list').then(r => loadList(r.data));
        return <Loading/>
    }
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CCard>
                    <CCardHeader><CCardTitle className='my-auto'>지원자 리스트</CCardTitle></CCardHeader>
                    <CCardBody>
                        <CListGroup flush>
                            {
                                list.map((applier, idx) => {
                                        const {id, userName} = applier
                                        return (
                                            <CListGroupItem key={idx} href='#' onClick={() => control({open:true, content: <ApplierDetail id={id}/>, header: userName})}>{userName}</CListGroupItem>
                                        )
                                    }
                                )
                            }
                        </CListGroup>
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
        control: (modal) => dispatch(controlModal(modal))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)