import React from 'react'
import {CCol, CContainer, CRow} from '@coreui/react'

//예외 페이지
const Page404 = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">404</h1>
              <h4 className="pt-3">404 ERROR</h4>
              <p className="text-muted float-left">찾으시는 페이지가 없습니다.</p>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
