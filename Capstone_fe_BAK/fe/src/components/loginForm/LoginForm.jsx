import NavigationLogin from "../nav/NavigationLogin";
import logo from "../../assets/logo_upscayl_16x_realesrgan-x4plus-anime.png";
import {Button, Card, Input, Typography} from "@material-tailwind/react";
import React from "react";
import {Link} from "react-router-dom";


export const LoginForm = ({handleSubmit, handleInputChange, field1, field2}) => {
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[url('https://stsci-opo.org/STScI-01H44AY5ZTCV1NPB227B2P650J.png')] bg-center bg-cover bg-no-repeat bg-gray-700 bg-blend-soft-light">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto w-[300px]"
                        src={logo}
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-mat_gray-300">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 h-[50vh] sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-mat_gray-300">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={handleInputChange}
                                    className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-mat_gray-300">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={handleInputChange}
                                    className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-white">
                        Registered?{' '}
                        <Link to="/signup" className="font-semibold leading-6 text-blue_gray-200 hover:text-blue_gray-100">
                            Login now!
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default LoginForm