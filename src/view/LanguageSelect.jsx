import React from 'react'
import {
    CButton,
    CCol,
    CFormGroup,
    CInputCheckbox,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from "@coreui/react";
import axios from "axios";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

const LANGUAGE_LIST = [
    'JavaScript',
    'Python',
    'Go',
    'Java',
    'C++',
    'PHP',
    'TypeScript',
    'C',
    'C#',
    'Shell',
    'Swift',
    'Ruby',
    'Objective-C',
    'Rust',
    'Kotlin',
    'Dart',
    'Scala',
    'Vim script',
    'Haskell',
    'Lua',
    'PowerShell',
    'Emacs Lisp',
    'CoffeeScript',
    'Elixir',
    'Perl',
    'Clojure',
    'Groovy',
    'OCaml',
    'R',
    'Erlang',
    'Vala',
    'Pascal',
    'Matlab',
    'Jsonnet',
    'Common Lisp',
    'Assembly',
    'TSQL',
    'F#',
    'MATLAB',
    'Crystal',
    'Julia',
    'Vim script',
    'Scheme',
    'Nim',
    'Elm',
    'Fortran',
    'Verilog',
    'AutoHotkey',
    'D',
    'Visual Basic',
]

//언어 선택 모달
const LanguageSelect = props => {
    const {
        close,
        open,
        alert
    } = props

    const request = () => {
        close()
        const data = new FormData()
        const selectLanguageList = document.getElementsByName('language');
        for (const selectLanguageListElement of selectLanguageList) {
            if (selectLanguageListElement.checked)
                data.append('languageList', selectLanguageListElement.value)
        }
        axios.post('/analysis/list', data).then(r => {
            console.log(r.data)
            if (r.data) {
                alert({open: true, content: '전체 지원자의 GitHub Repository Clone을 완료하였습니다.', header: '분석 완료'})
            }
        })
    }

    return (
        <CModal show={open} onClose={close}>
            <CModalHeader><CModalTitle className="my-auto">대상 언어 선택</CModalTitle></CModalHeader>
            <CModalBody>
                <CFormGroup row>
                    <CCol md="3"><CLabel>Checkboxes</CLabel></CCol>
                    <CCol md="9">
                        {
                            LANGUAGE_LIST.map((language, idx) => {
                                return (
                                    <CFormGroup variant="checkbox" className="checkbox">
                                        <CInputCheckbox
                                            id={`language${idx}`}
                                            name="language"
                                            value={language}
                                        />
                                        <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">
                                            {language}
                                        </CLabel>
                                    </CFormGroup>
                                )
                            })
                        }
                    </CCol>
                </CFormGroup>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={request}>확인</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default LanguageSelect