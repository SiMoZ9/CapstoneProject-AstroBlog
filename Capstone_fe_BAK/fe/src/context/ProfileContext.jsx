import React, {createContext, useEffect, useState} from 'react';
import {useFetch} from "../hooks/useFetch";
import {Outlet, useParams} from "react-router-dom";

export const ProfileProvider = createContext()

const ProfileContext = ({children}) => {

    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const {id} = useParams()

    const fetchProfile = useFetch(`${process.env.REACT_APP_ENDPOINT}/users/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.parse(localStorage.getItem('loggedInUser'))
        }
    })

    const profileData = () => {
        setLoading(true)
        fetchProfile.then(data => {
            setProfile(data)
            console.log(data)
            setLoading(false)
        })
            .catch(err => {
                setError(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        profileData()
    }, []);


    return (
        <ProfileProvider.Provider value={{profile, setProfile, loading, setLoading, error, setError}}>
            {children}
            <Outlet />
        </ProfileProvider.Provider>
    );
};

export default ProfileContext;
