import React, {useContext, useEffect, useState} from "react"
import {useFetch} from "../../hooks/useFetch";
import {DetailProvider} from "../../context/DetailsContext";
import { Card, Typography } from "@material-tailwind/react";
import login from "../../views/Login";
import {RingLoader} from "react-spinners";

const StarMap = ({type}) => {

    const {details, star, setStar, typeOfView, setTypeOfView, error, setError} = useContext(DetailProvider)
    const [loading, setLoading] = useState(true)

    const authString = btoa(`${process.env.REACT_APP_ASTRO_APP_ID}:${process.env.REACT_APP_ASTRO_APP_SECRET}`);

    const body = {

        "style": "navy",

        "observer": {
            "latitude": details.description.place.coordinates && details.description.place && details.description.place.coordinates.latitude,
            "longitude": details.description.place.coordinates && details.description.place && details.description.place.coordinates.longitude,
            "date": details.description.place.coordinates && details.description.place && details.description.place.coordinates.date,
        },
        "view": {
            "type": "area",
            "parameters": {
                "position": {
                    "equatorial": {
                        "rightAscension": details.description.place.coordinates && details.description.place && details.description.place.coordinates.ra,
                        "declination": details.description.place.coordinates && details.description.place && details.description.place.coordinates.dec
                    }
                },
                "zoom": 3 //optional
            }
        }
    }



    const starFetch = useFetch(`${process.env.REACT_APP_ASTRONOMY_API}/studio/star-chart`, {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": `Basic ${authString}`,
        },
        body: JSON.stringify(body),
    })

    useEffect(() => {
        setLoading(true)
        starFetch.then((res) => {
            console.log(res)
            setStar(res)
            console.log(star)
            setLoading(false)

        }).catch(err => {
            setError(err)
            setLoading(false)

        })
    }, []);

    return (
        <>
            {console.log(loading)}
            {loading && !error && (
                <div className="flex flex-col items-center justify-center mt-6">
                    <RingLoader
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />

                    <Typography variant="h6">
                        Loading star chart
                    </Typography>

                </div>
            )}

            {!loading && !error && star.data && (
            <Card className="w-fit p-4 lg:w-[100rem] md:w-fit">
                {localStorage.setItem('starChart', star.data.imageUrl)}
                <img src={localStorage.getItem('starChart') && localStorage.getItem('starChart')} alt="star-chart" className={"object-fit"} />
                <img src={!localStorage.getItem('starChart') && star.data.imageUrl} alt="star-chart" className={"object-fit"} />
            </Card>
            )
            }
        </>

    )
}
export default StarMap