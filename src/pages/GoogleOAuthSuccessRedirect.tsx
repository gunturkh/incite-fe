/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store';
type Props = {}

function GoogleOAuthSuccessRedirect(props: Props) {
    let { accessToken, refreshToken } = useParams();
    const navigate = useNavigate()
    const setAccessToken = useAuthStore(state => state.setAccessToken)
    const setAuthenticated = useAuthStore(state => state.setAuthenticated)

    console.log('GoogleOAuthSuccessRedirect', { accessToken, refreshToken })
    useEffect(() => {
        if (accessToken) {
            setAccessToken(accessToken)
            setAuthenticated(true)
            navigate('/', { replace: true });
        }
    }, [accessToken])


    return (
        <div>Loading...</div>
    )
}

export default GoogleOAuthSuccessRedirect