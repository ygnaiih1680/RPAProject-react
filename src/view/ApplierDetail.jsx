import React from 'react'
import {loadApplyDetail} from "../store";
import {connect} from 'react-redux'
import {CCardBody, CLabel, CTextarea, CFade, CInput, CLink} from "@coreui/react";
import axios from "axios";
import {Loading} from "./Loading";
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'
const ApplierDetail = props => {
    const {id, detail, loadDetail} = props
    const applyDetail = detail[id]
    if (!applyDetail) {
        axios.get(`/admin/apply/detail?id=${id}`).then(r=>loadDetail(r.data));
        return <Loading/>
    }
    const {introduce, study, experience, github} = applyDetail
    return(
        <CFade>
            <CLabel htmlFor='introduce'>1. 자기소개 및 지원동기를 작성하시오.</CLabel>
            <CTextarea id='introduce' style={{height: '10rem'}} className='mb-5' value={introduce} readOnly/>
            <CLabel htmlFor='study'>2. 지원하는 분야와 관련하여 학습한 전공과목 혹은 외부강의를 3개 이내로 기재하시오.</CLabel>
            <CTextarea id='study' style={{height: '10rem'}} className='mb-5' required value={study} readOnly/>
            <CLabel htmlFor='experience'>3. 자신의 열정과 기술적인 전문성을 나타낼 수 있는 경험/이력/생각을 자유롭게 기술하시오.<br/>
                (대회, 해커톤, 프로젝트, 오픈소스 코드 기여, 논문 등)</CLabel>
            <CTextarea id='experience' style={{height: '10rem'}} className='mb-5' required value={experience} readOnly/>
            <CLabel>4. 자신의 GitHub링크를 기재하시오.</CLabel><br/>
            <CLink href={github} target='_blank'>{github}</CLink>
        </CFade>
    )
}

const mapStateToProps = (state) => {
    const {apply: {detail}} = state
    return {
        detail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadDetail: (detail) => dispatch(loadApplyDetail(detail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplierDetail)