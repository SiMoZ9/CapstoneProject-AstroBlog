import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import useSession from "../hooks/useSession";
import logo from "../assets/logo_upscayl_16x_realesrgan-x4plus-anime.png"

import {Button, Typography,} from "@material-tailwind/react";

const Register = () => {
    const [loginData, setLoginData] = useState({})
    const [login, setLogin] = useState(null)
    const [file, setFile] = useState(null)
    const [header, setHeader] = useState(null)

    const [verifyPwd, setVerifyPwd] = useState("")

    const navigate = useNavigate()
    const session = useSession()

    const onChangeSetFile = (e) => {
        setFile(e.target.files[0])
    }

    const onChangeSetHeader = (e) => {
        setHeader(e.target.files[0])
    }

    const uploadFile = async (cover) => {
        const fileData = new FormData()
        fileData.append('avatar', cover)

        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/users/create/cloudUpload`, {
                method: "POST",
                body: fileData
            })
            console.log(fileData)
            return await response.json()
        } catch (error) {
            console.log(error, 'Errore in uploadFile')
        }
    }

    const uploadFileHeader = async (cover) => {
        const fileData = new FormData()
        fileData.append('header', cover)

        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/users/create/cloudUploadHeader`, {
                method: "POST",
                body: fileData
            })
            console.log(fileData)
            return await response.json()
        } catch (error) {
            console.log(error, 'Errore in uploadFile')
        }
    }


    useEffect(() => {
        if (session) {
            navigate('/personalHome')
        } else navigate('/signup')
    }, [loginData]);

    const handleInputChange = (e) => {
        const {name, value} = e.target

        setLoginData({
            ...loginData,
            [name]: value
        })

        console.log(loginData)
    }

    const handlePWDChange = (e) => {
        const {name, value} = e.target
        setVerifyPwd(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (loginData.password !== verifyPwd) {
            alert(`Passwords don't match`)
            window.location.reload(true)
        }

        if (file && header) {
            console.log(file)
            console.log(header)
            try {
                const uploadAvatar = await uploadFile(file)
                const uploadHeader = await uploadFileHeader(header)

                const finalBody = {
                    ...loginData,
                    avatar: uploadAvatar.url,
                    header: uploadHeader.url
                }

                const postData = await fetch(`${process.env.REACT_APP_ENDPOINT}/users/create`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: 'POST',
                    body: JSON.stringify(finalBody)
                })

                const data = await postData.json()

                console.log(data)


                if (data.token) {
                    localStorage.setItem('loggedInUser', JSON.stringify(data.token))
                    navigate("/personalHome")
                    if (localStorage.getItem('registerStatusCode')) localStorage.removeItem('registerStatusCode')
                    if (localStorage.getItem('msg') && localStorage.getItem('path')) {
                        localStorage.removeItem('msg')
                        localStorage.removeItem('path')
                    }

                }
                if (data.statusCode === 400) {
                    window.location.reload(true)
                    localStorage.setItem(`registerStatusCode`, JSON.stringify(data.statusCode))
                }

                if(data.errors) {
                    window.location.reload(true)
                    localStorage.setItem(`msg`, JSON.stringify(data.errors[0].msg))
                    localStorage.setItem(`path`, JSON.stringify(data.errors[0].path))
                    localStorage.removeItem(`registerStatusCode`)
                }

                setLogin(data)
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <>
            <div
                className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[url('https://stsci-opo.org/STScI-01H44AY5ZTCV1NPB227B2P650J.png')] bg-center bg-cover bg-no-repeat bg-gray-700 bg-blend-soft-light">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto w-[300px]"
                        src={logo}
                        alt="Your Company"
                    />
                    <Typography variant="h1"
                                className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-mat_gray-300">
                        Create your account
                    </Typography>
                </div>

                {localStorage.getItem(`registerStatusCode`) &&
                    <div className="flex justify-center">
                        <Typography variant="h1"
                                    className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-mat_gray-300">
                            Email or user already registered
                        </Typography>
                    </div>
                }


                {localStorage.getItem(`msg`) &&
                    <div className="flex justify-center">
                        <Typography variant="h1"
                                    className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-mat_gray-300">
                            Password not valid
                        </Typography>
                    </div>
                }


                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-[10px]">
                    <form className="space-y-6" onSubmit={handleSubmit} encType={"multipart/form-data"}>
                        <div>
                            <Typography htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-mat_gray-300">
                                Email address
                            </Typography>
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
                            <Typography htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-mat_gray-300">
                                Username
                            </Typography>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="userName"
                                    type="text"
                                    onChange={handleInputChange}

                                    className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div>
                            <Typography htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-mat_gray-300">
                                Password
                            </Typography>
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
                            <Typography htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-mat_gray-300">
                                Verify password
                            </Typography>
                            <div className="mt-2">
                                <input
                                    id="verify_password"
                                    name="verify_password"
                                    type="password"
                                    onChange={handlePWDChange}
                                    className="block bg-white  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <Typography htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-mat_gray-300">
                                Birth
                            </Typography>
                            <div className="mt-2">
                                <input
                                    id="birth"
                                    name="birth"
                                    type="date"
                                    onChange={handleInputChange}
                                    className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <Typography className="block text-sm font-medium leading-6 text-mat_gray-300">
                                Profile picture
                            </Typography>
                            <div className="mt-2">
                                <input
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="file_input" type="file"
                                    onChange={onChangeSetFile}
                                    name={"avatar"}/>
                            </div>
                        </div>
                        <div>
                            <Typography className="block text-sm font-medium leading-6 text-mat_gray-300">
                                Header picture
                            </Typography>
                            <div className="mt-2">
                                <input
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="file_input" type="file"
                                    onChange={onChangeSetHeader}
                                    name={"header"}/>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                            >
                                Sign up
                            </Button>
                        </div>


                        <p className="mt-10 text-center text-sm text-white">
                            Registered?{' '}
                            <Link to="/login"
                                  className="font-semibold leading-6 text-blue_gray-200 hover:text-blue_gray-100">
                                Login now!
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;


