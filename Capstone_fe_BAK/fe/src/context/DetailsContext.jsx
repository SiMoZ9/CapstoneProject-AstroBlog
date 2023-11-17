import React, {createContext, useEffect, useState} from 'react';
import {Outlet, useParams} from "react-router-dom";
import {useFetch} from "../hooks/useFetch";

export const DetailProvider = createContext(undefined)
const DetailsContext = ({children}) => {

    const [loading, setLoading] =  useState(true)
    const [error, setError] = useState("")
    const [details, setDetails] = useState({})

    const [typeOfView, setTypeOfView] = useState("")
    const [star, setStar] = useState({})



    const {id} = useParams()
    console.log(id)

    const fetchData = useFetch(`${process.env.REACT_APP_ENDPOINT}/skyPost/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.parse(localStorage.getItem('loggedInUser'))
        }
    })

    const fetchMyPosts = useFetch(`${process.env.REACT_APP_ENDPOINT}/skyPost/account/posts/${JSON.parse(localStorage.getItem('loggedInUser'))}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.parse(localStorage.getItem('loggedInUser'))
        }
    })

    useEffect(() => {
        setLoading(true)
        fetchData.then((res) => {
            setDetails(res.thisPost)
            console.log(details)
            setLoading(false)
        })
            .catch((err) => {
                setError(err)
                setLoading(false)
            })
    }, [])

    console.log(details)


    return (
        <DetailProvider.Provider value={{details, star, setStar, typeOfView, setTypeOfView, loading, setLoading, error, setError}}>
            {children}
            <Outlet />
        </DetailProvider.Provider>
    )
}

export default DetailsContext