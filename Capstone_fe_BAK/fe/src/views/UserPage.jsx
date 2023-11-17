import React, {useContext, useEffect} from 'react';
import Banner from "../components/UserProfile/Banner";
import NavigationPostLogin from "../components/nav/NavigationPostLogin";
import UserPost from "../components/UserProfile/UserPost";
import {ProfileProvider} from "../context/ProfileContext";
import UserIntruments from "../components/UserProfile/UserIntruments";
import {RingLoader} from "react-spinners";
import useSession from "../hooks/useSession";
import {useNavigate} from "react-router-dom";

const UserPage = () => {

    const {profile, loading, error} = useContext(ProfileProvider)

    console.log(profile)

    const session = useSession()
    const navigate = useNavigate()

    useEffect(() => {
        if (!session) navigate('/')
    }, [])

    return (
        <>
            <NavigationPostLogin/>

            {error && <h1>Error</h1>}
            {loading && !error && (
                <div className="flex justify-center items-center h-full">
                    <RingLoader
                        size={300}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            )}

            {!loading && !error && profile &&
                <>
                    <Banner
                        avatar={profile.userToGet.avatar}
                        headerImg={profile.userToGet.header}
                        userName={profile.userToGet.userName}/>

                    <div className="p-8">
                        <UserPost/>
                    </div>

                    <UserIntruments

                    />
                </>
            }
        </>
    );
};

export default UserPage;