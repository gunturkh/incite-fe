/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useParams } from 'react-router-dom'

type Props = {}

function ErrorPage(props: Props) {
    let { message } = useParams();

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
                        There is an error
                    </h2>
                    <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {message}
                    </h3>
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <p className="mt-10 text-center text-sm text-gray-500">

                        <Link className="font-semibold text-indigo-600 hover:text-indigo-500" to="/">Back</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default ErrorPage