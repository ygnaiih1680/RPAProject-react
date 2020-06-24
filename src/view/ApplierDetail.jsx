import React from 'react'
import {controlDetailModal, loadApplyDetail} from "../store";
import {connect} from 'react-redux'
import {
    CButton,
    CFade,
    CLabel,
    CLink,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CTextarea
} from "@coreui/react";
import axios from "axios";
import {Loading} from "./Loading";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'
const ApplierDetail = props => {
    const {id, detail, loadDetail, name, show = false, control} = props
    const applyDetail = detail[id]
    if (!applyDetail && id) {
        axios.get(`/admin/apply/detail?id=${id}`).then(r => loadDetail(r.data));
    }
    const {introduce, study, experience, github} = applyDetail ? applyDetail : {}
    const close = () => {
        control({id, detail, name, show: false})
    }
    console.log(show)
    return (
        <CModal show={show} onClose={close}>
            <CModalHeader><CModalTitle className="my-auto">{name}</CModalTitle></CModalHeader>
            <CModalBody>
                <CFade>
                    {
                        !applyDetail ? <Loading/> :
                            <>
                                <CLabel htmlFor='introduce'>1. 자기소개 및 지원동기를 작성하시오.</CLabel>
                                <CTextarea id='introduce' style={{height: '10rem'}} className='mb-5' value={introduce}
                                           readOnly/>
                                <CLabel htmlFor='study'>2. 지원하는 분야와 관련하여 학습한 전공과목 혹은 외부강의를 3개 이내로 기재하시오.</CLabel>
                                <CTextarea id='study' style={{height: '10rem'}} className='mb-5' required value={study}
                                           readOnly/>
                                <CLabel htmlFor='experience'>3. 자신의 열정과 기술적인 전문성을 나타낼 수 있는 경험/이력/생각을 자유롭게 기술하시오.<br/>
                                    (대회, 해커톤, 프로젝트, 오픈소스 코드 기여, 논문 등)</CLabel>
                                <CTextarea id='experience' style={{height: '10rem'}} className='mb-5' required
                                           value={experience} readOnly/>
                                <CLabel>4. 자신의 GitHub링크를 기재하시오.</CLabel><br/>
                                <CLink href={github} target='_blank'>{github}</CLink>
                            </>
                    }

                </CFade>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={close}>확인</CButton>
            </CModalFooter>
        </CModal>
    )
}

const mapStateToProps = (state) => {
    const {apply: {detail}, detailModal} = state
    return {
        detail,
        ...detailModal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadDetail: (detail) => dispatch(loadApplyDetail(detail)),
        control: (state) => dispatch(controlDetailModal(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplierDetail)