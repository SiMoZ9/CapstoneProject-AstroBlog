import React, {useContext, useEffect, useState} from 'react';
import {useFetch} from '../../hooks/useFetch'
import {Typography} from "@material-tailwind/react";
import {ProfileProvider} from "../../context/ProfileContext";
import {useParams} from "react-router-dom";
import PostCard from "../Latest/PostCard/PostCard";
import {RingLoader} from "react-spinners";
import {nanoid} from "nanoid";

const UserPost = () => {

    const {profile} = useContext(ProfileProvider)

    const [thisLoading, setThisLoading] = useState(true)
    const [thisError, setThisError] = useState(null)

    const [userPosts, setUserPosts] = useState({})
    const {id} = useParams()

    const fetchHandler = useFetch(`${process.env.REACT_APP_ENDPOINT}/skyPost/userPost/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.parse(localStorage.getItem("loggedInUser"))
        }
    })
    const fetchUserPosts = async () => {
        setThisLoading(true)
        fetchHandler.then(res => {
            setUserPosts(res.userInfo)
            setThisLoading(false)
        })
            .catch(err => console.log(err))

    }

    useEffect(() => {
        fetchUserPosts()
    }, []);


    return (
        <main>
            <div>
                {!thisLoading && !thisError && profile &&
                    <>
                        <div className="w-full flex justify-center mt-6">
                            <Typography variant="h4" className="text-center">
                                {profile.userToGet.userName}'s posts
                            </Typography>
                        </div>
                    </>
                }
                <section>
                    <div>{!thisLoading && !thisError}</div>
                    <div
                        className="grid grid-cols-1 p-4 rounded-[20px] xl:grid-cols-4 md:grid-cols-2 justify-center gap-y-20 gap-x-14 mt-10 mb-5 w-fit mx-auto bg-gray-100">
                        {thisError && <h1>Errore durante il caricamento dei userPosts</h1>}
                        {thisLoading && !thisError && (
                            <RingLoader
                                size={150}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        )}

                        {!thisLoading &&
                            !thisError && userPosts && userPosts.map(userPosts => (

                                    <PostCard
                                        key={nanoid()}
                                        title={userPosts.title}
                                        author={userPosts.author.userName}
                                        id={userPosts.author._id}
                                        cover={userPosts.mainPic}
                                        linkTo={`/skyPosts/${userPosts._id}`}
                                        buttonText="Vai al post"
                                    />
                            ))
                        }
                    </div>
                </section>
                <div>
                </div>
            </div>
        </main>
    );
};

export default UserPost;
