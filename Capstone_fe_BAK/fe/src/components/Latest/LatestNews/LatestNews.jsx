import NasaCarousel from "../../Carusel/Carousel";
import React, {useEffect, useState} from "react";
import {RingLoader} from "react-spinners";
import {Typography} from "@material-tailwind/react";
import {useFetch} from "../../../hooks/useFetch";
import NewsCard from "../../NewsCard/NewsCard";
import ResponsivePagination from 'react-responsive-pagination';
import pagination from './pagination.css'

const LatestNews = () => {


    const API_KEY = "98c822f8-5530-4c14-aa09-053c2fb5ee9f"

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [JWSTdata, setJWSTdata] = useState({})
    const [news, setNews] = useState({})

    const [currentPage, setCurrentPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(0)

    const pageSize = 8

    const jwstFetch = async () => {
        try {
            setLoading(true)
            const jwst = await fetch(`https://api.jwstapi.com/all/suffix/_cal?page=1&perPage=10`, {
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": `${API_KEY}`
                    }
                }
            )
            const data = await jwst.json()
            if (data) {
                setJWSTdata(data)
                setLoading(false)
            }
            console.log(loading)
        } catch (e) {
            setError(e)
        }
    }

    const newsFetch = useFetch(`https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=71c1e9bdaec346348adf04e84dbd99da`)

    useEffect(() => {
        jwstFetch()

        setLoading(true)
        newsFetch.then((data) => {
            console.log(data)
            setNews(data)
            setTotalArticles(data.articles.length)
        })
    }, []);


    const skippedElements = (currentPage - 1) * pageSize
    const totalPages = Math.ceil(totalArticles / pageSize)

    console.log(news.totalResults)

    const onClickPagination = (v) => {
        setCurrentPage(v)
        console.log(currentPage)
    }
    console.log(skippedElements)
    console.log(skippedElements + 8)

    console.log(JWSTdata)
    const currentDate = new Date()
    console.log(currentDate)

    return (
        <>
            <div className="flex flex-col justify-center items-center m-5 p-4 rounded-[20px] bg-gray-200">
                <Typography variant="h3" className="p-4">
                    Latest JWST data
                </Typography>
                <div className="w-full h-96">
                    {error && <h1>Errore durante il caricamento dei post</h1>}
                    {loading && !error && (
                        <div className="flex justify-center items-center h-full">
                            <RingLoader
                                size={300}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            <NasaCarousel
                                pic1={JWSTdata.body[0].location}
                                pic2={JWSTdata.body[1].location}
                                pic3={JWSTdata.body[2].location}
                            />
                        </>
                    )}
                </div>
            </div>

            <Typography variant="h3" className="text-center p-4">
                News
            </Typography>
            <div
                className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 justify-center gap-y-20 gap-x-14 mt-10 mb-5 w-fit mx-auto">
                {error && <h1>Errore durante il caricamento dei post</h1>}
                {loading && !error && (
                    <div className="flex justify-center items-center h-full">
                        <RingLoader
                            size={300}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                )}

                {!loading &&
                    !error && news.articles && (
                        news.articles.map(article => (
                            <>
                                <NewsCard
                                    title={article.title}
                                    imageUrl={article.urlToImage}
                                    description={article.description}
                                    author={article.author}
                                    url={article.url}
                                />
                            </>
                        )).slice(skippedElements, skippedElements + 8)
                    )}

                    <ResponsivePagination
                        className="pagination"
                        current={currentPage}
                        total={totalPages}
                        onPageChange={onClickPagination}
                    />

            </div>
        </>
    )
}

export default LatestNews