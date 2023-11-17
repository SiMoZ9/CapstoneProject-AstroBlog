import React, {createContext, useState, useEffect} from "react";
import {useFetch} from "../hooks/useFetch";
import {Outlet} from "react-router-dom";

export const UserProvider = createContext()

const UserContext = ({children}) => {
    const [loading, setLoading] =  useState(true)
    const [error, setError] = useState("")
    const [user, setUser] = useState({})

    const userFetch = useFetch(`${process.env.REACT_APP_ENDPOINT}/users/me/${JSON.parse(localStorage.getItem('loggedInUser'))}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${JSON.parse(localStorage.getItem('loggedInUser'))}`
        }
    })

    useEffect(() => {

        setLoading(true)
        userFetch.then((res) => {
            console.log(res)
            setUser(res)
            setLoading(false)
        }).catch(err => {
            setError(err)
        })

    }, []);

    return (
        <UserProvider.Provider value={{user, setUser, loading, setLoading, error, setError} }>
            {children}
            <Outlet />
        </UserProvider.Provider>
    )

}

export default UserContext