import React from 'react'
import {connect} from 'react-redux'
import {CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CButton} from "@coreui/react";
import {controlModal} from "../store";

const CommonModal = props => {
    const {
        modal: {open, content, header},
        close
    } = props
    return(
        <CModal show={open} onClose={close}>
            <CModalHeader><CModalTitle className="my-auto">{header}</CModalTitle></CModalHeader>
            <CModalBody>
                {content}
            </CModalBody>
            <CModalFooter>
                <CButton color="primary">확인</CButton>
                <CButton color="secondary" onClick={close}>취소</CButton>
            </CModalFooter>
        </CModal>
    )
}

const mapStateToProps = (state) => {
    const {modal} = state
    return {
        modal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        close: () => dispatch(controlModal({open: false}))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommonModal)