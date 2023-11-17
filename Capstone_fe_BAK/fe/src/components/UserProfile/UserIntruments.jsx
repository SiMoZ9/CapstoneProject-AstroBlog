import React, {useContext, useEffect, useState} from 'react';
import {useFetch} from '../../hooks/useFetch'
import {Typography} from "@material-tailwind/react";
import {ProfileProvider} from "../../context/ProfileContext";
import {useParams} from "react-router-dom";
import PostCard from "../Latest/PostCard/PostCard";
import {RingLoader} from "react-spinners";
import {nanoid} from "nanoid";
import DetailTable from "../Table/DetailTable";

const UserPost = () => {

    const {profile} = useContext(ProfileProvider)

    const [thisLoading, setThisLoading] = useState(true)
    const [thisError, setThisError] = useState(null)

    const [userInstruments, setUserInstruments] = useState({})
    const {id} = useParams()

    const fetchHandler = useFetch(`${process.env.REACT_APP_ENDPOINT}/users/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.parse(localStorage.getItem("loggedInUser"))
        }
    })
    const fetchUserInstruments = async () => {
        setThisLoading(true)
        fetchHandler.then(res => {
            setUserInstruments(res.instruments)
            setThisLoading(false)
            console.log(userInstruments)
        })
            .catch(err => console.log(err))

    }

    useEffect(() => {
        fetchUserInstruments()
    }, []);


    console.log(profile)

    return (
        <main>
            <div>
                <section>
                    <div>{!thisLoading && !thisError}</div>
                    <div
                        className="grid grid-cols-1 rounded-[20px] xl:grid-cols-1 md:grid-cols-1 justify-center gap-y-20 gap-x-14 mt-10 mb-5 w-fit mx-auto bg-gray-500">
                        {thisError && <h1>Errore durante il caricamento degli strumenti</h1>}
                        {thisLoading && !thisError && (
                            <RingLoader
                                size={150}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        )}

                        {!thisLoading && !thisError && profile && (
                                <DetailTable
                                    telescope={profile.userToGet.instruments.telescopes}
                                    camera={profile.userToGet.instruments.camera}
                                    narrow={profile.userToGet.instruments.narrowband}
                                    broad={profile.userToGet.instruments.broadband}
                                    mounts={profile.userToGet.instruments.mounts}
                                    guide={profile.userToGet.instruments.guide}
                                />
                        )}

                    </div>
                </section>
                <div>
                </div>
            </div>
        </main>
    );
};

export default UserPost;
