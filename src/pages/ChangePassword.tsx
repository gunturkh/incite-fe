/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../constants'
import { useAuthStore } from '../store'
import { useFormik } from 'formik';
import * as Yup from 'yup';

type Props = {}

function ChangePassword(props: Props) {
    const setAuthenticated = useAuthStore(state => state.setAuthenticated)
    const accessToken = useAuthStore(state => state.accessToken)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const googleLogin = async () => {
        try {
            console.log(`${API_URL}/auth/google/login`);
            window.open(`${API_URL}/auth/google/login`, "_self");
        } catch (ex) {
            console.log(ex)
        }
    }

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
        initialValues: {
            currentPassword: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string()
                .required('Required')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .max(20, 'Must be 20 characters or less')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, 'Password must have 1 number, 1 symbol, 1 uppercase & 1 lowercase'),
            password: Yup.string()
                .required('Required')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .max(20, 'Must be 20 characters or less')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, 'Password must have 1 number, 1 symbol, 1 uppercase & 1 lowercase'),
            confirmPassword: Yup.string()
                //@ts-ignore
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .max(20, 'Must be 20 characters or less')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, 'Password must have 1 number, 1 symbol, 1 uppercase & 1 lowercase')
        }),
        onSubmit: async values => {
            setLoading(true)
            const { currentPassword, password } = values
            try {
                if (currentPassword && password) {
                    const response = await fetch(`${API_URL}/auth/change-password`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`
                        },
                        mode: 'cors',
                        method: 'POST',
                        body: JSON.stringify({ current_password: currentPassword, password })
                    })
                    const result = await response.json()
                    console.log('login result', result)

                    if (result.statusCode === 200) {
                        setLoading(false)
                        navigate('/')
                    }
                    else {
                        setLoading(false)
                        alert(result.msg);
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
                        Change your password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="currentPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                    Current Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.currentPassword}
                                />
                                {touched.currentPassword && errors.currentPassword ? (
                                    <div className='text-red-500'>{errors.currentPassword}</div>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    New Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                {touched.password && errors.password ? (
                                    <div className='text-red-500'>{errors.password}</div>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="confirm-password"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                />
                                {touched.confirmPassword && errors.confirmPassword ? (
                                    <div className='text-red-500'>{errors.confirmPassword}</div>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex w-full justify-center rounded-md ${loading ? 'bg-gray-500' : 'bg-indigo-600'} px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            >
                                {loading ? 'Loading...' : 'Change Password'}
                            </button>
                        </div>
                    </form>
                    <div className='mt-4'>
                        <Link
                            to="/profile"
                            className={`flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                            Back
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ChangePassword