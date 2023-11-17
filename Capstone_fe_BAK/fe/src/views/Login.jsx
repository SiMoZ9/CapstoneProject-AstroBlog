import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import useSession from "../hooks/useSession";
import LoginForm from "../components/loginForm/LoginForm";
const Login = () => {
    const [loginData, setLoginData] = useState({})
    const [login, setLogin] = useState(null)

    const navigate = useNavigate()
    const session = useSession()

    useEffect(() => {
        if (session) {
            navigate('/personalHome')
        } else navigate('/login')
    }, []);
    const handleInputChange = (e) => {
        const {name, value} = e.target

        setLoginData({
            ...loginData,
            [name]: value
        })

        console.log(loginData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const postData = await fetch(`${process.env.REACT_APP_ENDPOINT}/login`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(loginData)
            })
            const data = await postData.json()
            console.log(loginData)

            if (data.token) {
                localStorage.setItem('loggedInUser', JSON.stringify(data.token))
                navigate("/personalHome")
            }
            setLogin(data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <main className="">
            <LoginForm
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                field1="Email"
                field2="Password"
            />
        </main>
    );
};

export default Login;


