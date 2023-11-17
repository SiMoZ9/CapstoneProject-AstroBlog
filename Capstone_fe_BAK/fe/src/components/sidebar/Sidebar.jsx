import React, {useContext, useEffect, useState} from 'react';
import {Typography} from "@material-tailwind/react";
import {PostsProvider} from "../../context/PostsContext";
import LatestPost from "../Latest/LatestPost/LatestPost";
import ResponsivePagination from "react-responsive-pagination";

const PostSide = ({children}) => {

    const {posts, loading, error, currentPage, setCurrentPage} = useContext(PostsProvider)
    const [search, setSearch] = useState("");
    const parsedPosts = JSON.parse(localStorage.getItem(`posts`))


    const [filteredPosts, setFilterPosts] = useState(posts.posts || parsedPosts);

    const totalPages = posts.totalPages
    console.log(posts)

    const onClickPagination = (v) => {
        setCurrentPage(v)
        console.log(currentPage)
    }

    useEffect(() => {

        if (parsedPosts) {
            setFilterPosts(
                parsedPosts.filter(post =>
                    post.title.toLowerCase().includes(search.toLowerCase())
                )
            )
        }

        else {
            setFilterPosts(
                posts.posts.filter(post =>
                    post.title.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [search, posts.posts])

    return (

        <div className="mt-6">
            {!loading && !error && posts && (posts.posts || parsedPosts) &&
                <>
                    <div className="flex justify-center items-center w-full flex-col">
                        <Typography variant="h6" className="text-4xl mb-8 text-mat_gray-100">Search by post's
                            name</Typography>
                        <input type="text"
                               name={"title"}
                               className={"rounded-[10px]"}
                               onChange={(e) => setSearch(e.target.value)}/>

                    </div>

                    <div className="bg-mat_gray-50 p-4 mx-12 my-12 h-auto rounded-[20px]">
                        <LatestPost whatMap={filteredPosts}/>
                        <ResponsivePagination
                            className="pagination"
                            current={currentPage}
                            total={totalPages}
                            onPageChange={onClickPagination}
                        />
                    </div>
                </>
            }
        </div>
    )
}


export default PostSide;
