import React, {useContext, useEffect} from 'react';
import NavigationPostLogin from "../components/nav/NavigationPostLogin";
import useSession from "../hooks/useSession";
import {useNavigate} from "react-router-dom";
import {Jumbotron} from "../components/jumbo/Jumbotron";
import LatestPost from "../components/Latest/LatestPost/LatestPost";
import LatestNews from "../components/Latest/LatestNews/LatestNews";
import {PostsProvider} from "../context/PostsContext";

const PersonalHome = () => {

    const session = useSession()
    const navigate = useNavigate()

    const {posts} = useContext(PostsProvider)

    useEffect(() => {
        if (!session) navigate('/')
        console.log(session)
    }, []);

    return (
        <>
            <NavigationPostLogin/>
            <Jumbotron
                title={"Latest Post"}
                needButton={true}
                buttonText={"All posts"}
                linkTo={'/skyPosts/all'}
            />
            <div className="p-8">
                <LatestPost whatMap={posts.posts}/>
            </div>
            <Jumbotron
                title={"Latest news"}
                needButton={false}
            />
            <div className="p-8">
                <LatestNews/>
            </div>
        </>
    );
};

export default PersonalHome;
