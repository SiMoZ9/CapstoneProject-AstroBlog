import React, {useEffect} from 'react';
import NavigationPostLogin from "../components/nav/NavigationPostLogin";
import Posts from "../components/posts/Posts";
import useSession from "../hooks/useSession";
import {useNavigate} from "react-router-dom";

const AllPosts = () => {

    const session = useSession()
    const navigate = useNavigate()

    useEffect(() => {
        if (!session) navigate('/')
   }, [])

    return (
        <div className="bg-[url('/src/assets/rosetta.jpg')] bg-cover bg-no-repeat bg-mat_gray-800 bg-blend-soft-light h-screen">
            <NavigationPostLogin/>
            <Posts/>
        </div>
    );
};

export default AllPosts;
