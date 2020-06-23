import React from 'react'
import {CCardBody, CCard, CContainer, CCardTitle, CCardHeader, CButton} from "@coreui/react";
import {controlModal} from "../store";
import {connect} from 'react-redux'
import CommonModal from "./CommonModal";

const Home = props => {
    return(
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CCard>
                    <CCardHeader><CCardTitle className='my-auto'>aaa</CCardTitle></CCardHeader>
                    <CCardBody>
                        <CButton onClick={() => props.open({open: true, content: '내용', header: '제목'})}>테스트</CButton>
                        <CommonModal/>
                    </CCardBody>
                </CCard>
            </CContainer>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        open: (modal) => {
            dispatch(controlModal(modal))
        }
    }
}

export default connect(null, mapDispatchToProps)(Home)