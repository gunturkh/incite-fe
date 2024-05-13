/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../constants'
import { useAuthStore } from '../store'
import { useFormik } from 'formik';
import * as Yup from 'yup';

type Props = {}

function ForgotPassword(props: Props) {
    const setAuthenticated = useAuthStore(state => state.setAuthenticated)
    const setAccessToken = useAuthStore(state => state.setAccessToken)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: async values => {
            setLoading(true)
            const { email } = values
            try {
                if (email) {
                    const response = await fetch(`${API_URL}/auth/email/forgot-password/${email}`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        mode: 'cors',
                    })
                    const result = await response.json()
                    console.log('forgot password result', result)

                    if (response.ok) {
                        setLoading(false)
                        setAuthenticated(true)
                        setAccessToken(result.data.accessToken)
                        navigate('/')
                    }
                    else {
                        setLoading(false)
                        alert(result.message);
                    }

                }
            } catch (error) {
                setLoading(false)
                alert(error);
            }
        },
    });
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="INCIT TEST"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Forgot your password?
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                {touched.email && errors.email ? (
                                    <div className='text-red-500'>{errors.email}</div>
                                ) : null}
                            </div>
                            { }
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex w-full justify-center rounded-md ${loading ? 'bg-gray-500' : 'bg-indigo-600'} px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            >
                                {loading ? 'Loading...' : 'Reset Password'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link className="font-semibold text-indigo-600 hover:text-indigo-500" to={'/register'}>Register</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword