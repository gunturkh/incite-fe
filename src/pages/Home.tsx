/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { API_URL } from '../constants'
import { useAuthStore } from '../store'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
type Props = {}

function Home(props: Props) {
    const accessToken = useAuthStore(state => state.accessToken)
    const [data, setData] = useState<any>(null)
    const [statistics, setStatistics] = useState<any>(null)
    console.log('accessToken', accessToken)

    const getStatistic = async () => {
        const response = await fetch(`${API_URL}/log/statistic`, {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        })
        const result = await response.json()
        console.log('statistic', result.data)
        setStatistics(result)
    }

    const getUsers = async () => {
        const response = await fetch(`${API_URL}/users/all`, {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        })
        const result = await response.json()
        console.log('users', result)
        setData(result)
    }

    useEffect(() => {
        getStatistic()
        getUsers()
    }, [])

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="INCIT TEST"
                />

            </div>

            <div className='flex flex-row justify-between mt-6 gap-8'>
                <div className='font-bold text-xl border border-gray-400 rounded-md w-1/2 p-8'>
                    {/* Active Today: {statistics?.data?.filter((s: any) => moment(s.updated_time).isAfter(s.logout_time))} */}
                    Active Today: {data?.data?.filter((s: any) => moment(s.updated_time).isAfter(s.logout_time) && moment(s.updated_time).isAfter(moment().startOf('day'))).length}
                </div>
                <div className='font-bold text-xl border border-gray-400 rounded-md w-1/2 p-8'>
                    Active Last 7 Days: {data?.data?.filter((s: any) => moment(s.updated_time).isAfter(s.logout_time) && moment(s.updated_time).isAfter(moment().startOf('day'))).length}

                </div>

            </div>

            <ul role="list" className="divide-y divide-gray-100">
                {data?.data?.map((user: any) => (
                    <li key={user.email} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Login {user.login_count} times</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className={`text-sm leading-6 ${user.is_verified ? 'text-emerald-500' : 'text-gray-900'}`}>{user.is_verified ? 'Verified' : 'Not Verified'}</p>
                            {moment(user.updated_time).isAfter(user.logout_time) && (
                                <div className="mt-1 flex items-center gap-x-1.5">
                                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                    <p className="text-xs leading-5 text-gray-500">Online</p>
                                </div>
                            )}
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Logged out: {moment(user.logout_time).format('DD-MM-YYYY hh:mm:ss')}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                <p className="mt-10 text-center text-sm text-gray-500">

                    <Link className="font-semibold text-indigo-600 hover:text-indigo-500" to="/profile">Profile</Link>
                </p>
            </div>
        </div >
    )
}

export default Home