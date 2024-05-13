/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../constants'
import { useAuthStore } from '../store'

type Props = {}

function EmailVerification(props: Props) {
    const navigate = useNavigate()
    let { token } = useParams();
    console.log('email verification token', token)
    const accessToken = useAuthStore(state => state.accessToken)

    const verifyToken = async () => {
        try {
            if (token) {
                const response = await fetch(`${API_URL}/auth/email/verify/${token}`)
                const result = await response.json()

                if (response.status === 200) {
                    alert(result.msg)
                    navigate('/')
                }
                else alert(result.msg)
            }
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        if (token) verifyToken()
    }, [token])


    const handleResendEmail = async () => {

        try {
            const response = await fetch(`${API_URL}/auth/email/resend-verification`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                mode: 'cors',
                method: 'GET',
            })
            const result = await response.json()
            console.log('login result', result)

            if (response.ok) {
                alert(result.msg);
            }
            else {
                alert(result.message);
            }

        } catch (error) {
            alert(error);
        }

    }
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="INCIT TEST"
                    />
                    <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Please check your email inbox
                    </h3>
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Didn't get the email?{' '}
                        <button className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={() => handleResendEmail()}>Resend Email</button>
                    </p>
                </div>
            </div>
        </>
    )
}

export default EmailVerification