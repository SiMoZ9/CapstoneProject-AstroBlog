import React, {useContext, useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch";
import PostCard from "../Latest/PostCard/PostCard";
import {UserProvider} from "../../context/UserContext";
import {RingLoader} from "react-spinners";
import {Button, Typography} from "@material-tailwind/react";
import {FaRegSadTear} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {MdAddPhotoAlternate} from "react-icons/md";
import NavAccount from "../nav/NavAccount";
import useSession from "../../hooks/useSession";

const MyPosts = () => {

    const {details, loading, setLoading, error, setError} = useContext(UserProvider);

    const [myPosts, setMyPosts] = useState({})

    const fetchMyPosts = useFetch(`${process.env.REACT_APP_ENDPOINT}/skyPost/account/posts/${JSON.parse(localStorage.getItem('loggedInUser'))}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.parse(localStorage.getItem('loggedInUser'))
        }
    })

    let id = ""

    const deletePost = useFetch(`${process.env.REACT_APP_ENDPOINT}/skyPost/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.parse(localStorage.getItem('loggedInUser'))
        }
    })

    useEffect(() => {
        setLoading(true)
        fetchMyPosts.then((res) => {
            setMyPosts(res)
            setLoading(false)
        })
            .catch(err => setError(err))
    }, []);

    console.log(myPosts.userInfo)

    const session = useSession()
    const navigate = useNavigate()

    useEffect(() => {
        if (!session) navigate('/')
    }, [])

    return (
        <>
            <NavAccount/>
            <div className="bg-[url('https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-center bg-cover bg-no-repeat bg-gray-800 bg-blend-soft-light
            h-screen p-12">

                {error && <h1>Error</h1>}

                {loading && !error && <>
                    <RingLoader
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </>}

                {!loading && !error && (myPosts.length === 0) &&
                    <div className="w-screen h-full mt-12 flex flex-col items-center">
                        <FaRegSadTear className="text-[24em] mb-4"/>
                        <Typography variant="h1" className="text-4xl">
                            No posts found
                        </Typography>
                        <Link to="/publish">
                            <Button
                                variant="gradient"
                                size="md"
                                className="hidden mt-4 lg:inline-block"
                            >
                                <span className="flex items-center justify-center">Upload!<MdAddPhotoAlternate
                                    className="ml-1"/></span>
                            </Button>
                        </Link>
                    </div>
                }

                {!loading && error &&
                    <>
                        <Typography variant="h1">
                            Error loading posts
                        </Typography>
                    </>
                }

                <div
                    className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 justify-center gap-y-20 gap-x-14 mt-10 mb-5 w-fit mx-auto bg-gray-100 p-8 rounded-[20px] ">
                    {!loading && !error && myPosts.userInfo && myPosts.userInfo.map((post, i) => (
                        <PostCard
                            title={post.title}
                            cover={post.mainPic}
                            buttonText={"Edit post"}
                            linkTo={`/skyPost/edit/${post._id}`}
                            deleteButton={true}
                            deleteFunc={
                            async () => {
                                try {
                                    await fetch(`${process.env.REACT_APP_ENDPOINT}/skyPost/delete/${post._id}`, {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Authorization": JSON.parse(localStorage.getItem('loggedInUser'))
                                        }
                                    })
                                    window.location.reload(true)
                                } catch (e) {
                                    console.log(e)
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyPosts