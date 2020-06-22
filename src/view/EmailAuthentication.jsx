import React, {useLayoutEffect} from 'react'
import qs from 'qs'
import axios from "axios";
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

const EmailAuthentication = ({location}) => {
    const query = qs.parse(location.search, {ignoreQueryPrefix: true})
    useLayoutEffect(()=>{
        const {id, value} = query
        const data = new FormData()
        data.append('id', id)
        data.append('value', value)
        axios.post('register/auth', data).then(r=>console.log(r.data))
    } ,[])
    return(
        <div>auth</div>
    )
}

export default EmailAuthentication