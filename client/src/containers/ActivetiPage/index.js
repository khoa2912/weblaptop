import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/Notification/Notification'
import { activation } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from '../../components/Layout'

export const ActivationEmail=()=> {
    const {activation_token} = useParams()
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    useEffect(() => {
       console.log('1')
       if(activation_token){
        dispatch(activation(activation_token))
       }
    },[activation_token])
    return (
        <Layout>
            <div className="active_page">
                {auth.error && showErrMsg(auth.error )}
                {auth.messActivation && showSuccessMsg(auth.messActivation)}
            </div>
        </Layout>
    )
}

export default ActivationEmail