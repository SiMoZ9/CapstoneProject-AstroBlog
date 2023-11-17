import React, {createContext, useEffect, useState} from 'react';
import {useFetch} from "../hooks/useFetch";
import {Outlet} from "react-router-dom";

export const PostsProvider = createContext(undefined)

const PostsContext = ({children}) => {

    const [posts, setPosts] = useState({})
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    console.log(currentPage)

    const fetchData = useFetch(`${process.env.REACT_APP_ENDPOINT}/skyPost/all?page=${currentPage}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.parse(localStorage.getItem('loggedInUser'))
        }
    })

    useEffect(() => {
        setLoading(true)
        fetchData.then((res) => {
            setPosts(res)
            setLoading(false)
            localStorage.setItem('posts', JSON.stringify(res.posts))
        })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [currentPage])

    return (
        <PostsProvider.Provider value={{posts, loading, setLoading, error, setError, currentPage, setCurrentPage}}>
            {!loading && !error && posts && posts.posts && <>
                {children}
            </>}
            <Outlet />
        </PostsProvider.Provider>
    );
};

export default PostsContext;
