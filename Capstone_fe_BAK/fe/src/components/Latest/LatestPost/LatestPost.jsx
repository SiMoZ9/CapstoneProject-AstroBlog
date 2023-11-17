import React, {useState, useEffect, useContext} from 'react';
import {useFetch} from "../../../hooks/useFetch";
import PostCard from "../PostCard/PostCard";
import {RingLoader} from "react-spinners";
import {nanoid} from "nanoid";
import login from "../../../views/Login";
import {PostsProvider} from "../../../context/PostsContext";

const LatestPost = ({whatMap}) => {

    const {posts, loading, error} = useContext(PostsProvider)

    return (
        <section>

            <div
                className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 justify-center gap-y-20 gap-x-14 mt-10 mb-5 w-fit mx-auto">
                {error && <h1>Errore durante il caricamento dei post</h1>}
                {loading && !error && (
                    <RingLoader
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                )}

                {!loading &&
                    !error && posts.posts && whatMap.map(post => (
                        <>
                            <PostCard
                                key={nanoid()}
                                title={post.title}
                                avatar={post.author.avatar}
                                author={post.author.userName}
                                id={post.author._id}
                                cover={post.mainPic}
                                linkTo={`/skyPosts/${post._id}`}
                                buttonText="Vai al post"
                            />
                        </>
                    ))
                }
            </div>
        </section>
    )
}

export default LatestPost;