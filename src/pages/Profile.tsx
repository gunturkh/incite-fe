/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { API_URL } from '../constants'
import { useAuthStore } from '../store'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
type Props = {}

type InitialData = {
    id: 7,
    name: string,
    email: string,
    password: string,
    created_time: string,
    updated_time: string,
    logout_time: string,
    login_count: number,
    is_verified: boolean

}
function Profile(props: Props) {
    const accessToken = useAuthStore(state => state.accessToken)
    const [data, setData] = useState<InitialData | null>(null)
    const [toggleEditName, setToggleEditName] = useState<boolean>(false)
    const [editedName, setEditedName] = useState('')
    const navigate = useNavigate()
    console.log('accessToken', accessToken)
    const getUserData = async () => {
        const response = await fetch(`${API_URL}/auth/protected`, {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        })
        const result = await response.json()
        console.log('HOME', result)
        setData(result)

        if (result && !result.is_verified) navigate('/email-verification')
    }

    const getStatistic = async () => {
        const response = await fetch(`${API_URL}/log/statistic`, {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        })
        const result = await response.json()
        console.log('statistic', result)
        // setData(result)

        // if (result && !result.is_verified) navigate('/email-verification')
    }
    useEffect(() => {
        getUserData()
        getStatistic()
    }, [])

    const handleEditName = async () => {
        try {
            const response = await fetch(`${API_URL}/users/name`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                mode: 'cors',
                method: 'PUT',
                body: JSON.stringify({ id: data?.id, name: editedName })
            })
            const result = await response.json()
            console.log('update name', result)

            if (response.ok) {
                alert(result.msg)
                window.location.reload()
            }
            else {
                alert(result.msg);
            }

        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="INCIT TEST"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Welcome {data?.name}
                </h2>
                {toggleEditName && <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedName(e.target.value)}
                        value={editedName}
                    />
                    <button onClick={() => handleEditName()}
                        className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-2`}
                    >
                        Save
                    </button>
                    <button onClick={() => setToggleEditName(!toggleEditName)} className='flex justify-center items-center w-full border border-gray-200 rounded-md px-4 py-2 hover:cursor-pointer' >
                        Close
                    </button>
                </div>}

                <h4 className="mt-10 text-center text-md font-bold leading-9 tracking-tight text-gray-900">
                    Total Login: {data?.login_count} times
                </h4>
                {data?.updated_time &&
                    <h4 className="mt-10 text-center text-md font-bold leading-9 tracking-tight text-gray-900">
                        Last Login: {new Date(data.updated_time).toString()}
                    </h4>
                }
                {data?.logout_time &&
                    <h4 className="mt-10 text-center text-md font-bold leading-9 tracking-tight text-gray-900">
                        Last Logout: {new Date(data?.logout_time).toString()}
                    </h4>
                }
            </div>


            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className='flex flex-col gap-5 mt-4'>
                    <button onClick={() => setToggleEditName(!toggleEditName)} className='flex justify-center items-center w-full border border-gray-200 rounded-md px-4 py-2 hover:cursor-pointer' >
                        Edit Name
                    </button>
                    <Link className='flex justify-center items-center w-full border border-gray-200 rounded-md px-4 py-2 hover:cursor-pointer' to="/change-password">
                        Change Password
                    </Link>
                    <button onClick={async () => {

                        const response = await fetch(`${API_URL}/auth/logout`, {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                "Content-Type": 'application/json',
                                Authorization: `Bearer ${accessToken}`
                            }
                        })
                        console.log('response', await response.json())
                        if (response.ok) {
                            localStorage.removeItem('auth-storage')
                            navigate('/login')
                        }
                    }} className='flex justify-center items-center w-full border border-gray-200 rounded-md px-4 py-2 hover:cursor-pointer' >
                        Logout
                    </button>
                </div>

            </div>

        </div >
    )
}

export default Profile