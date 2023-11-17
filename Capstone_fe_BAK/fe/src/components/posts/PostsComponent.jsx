import React, {useContext, useEffect} from 'react';
import NavigationPostLogin from "../nav/NavigationPostLogin";
import {Typography} from "@material-tailwind/react";
import DetailTable from "../Table/DetailTable";
import StarMap from "../StarMap/StarMap";
import {DetailProvider} from "../../context/DetailsContext";
import {Link, useNavigate} from "react-router-dom";
import {RingLoader} from "react-spinners";
import useSession from "../../hooks/useSession";

const DetailComponent = () => {

    const {details, star, setStar, typeOfView, setTypeOfView, loading, setLoading, error} = useContext(DetailProvider)

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

            {!loading && !error && details && (
                <main className="w-screen h-full pt-12 bg-gray-900">
                    <div className="flex flex-col w-96">

                        <div className="flex flex-col justify-center w-screen items-center">
                            <Typography variant="h1" color="white">
                                {details.title}
                            </Typography>
                            <Typography variant="h6" color="white">
                                {details.object}
                            </Typography>

                            <img
                                className="lg:h-[100vh] rounded-lg object-cover object-center mt-4 mb-4"
                                src={details.mainPic}
                                alt="mainPic"
                            />

                            <div className="flex items-center justify-center p-4">
                                <img src={details.author.avatar} alt="avatar"
                                     className="h-20 w-20 rounded-full object-cover object-center"/>
                                <Link to={`/profile/${details.author._id}`}>

                                    <Typography variant="h1" color="white" className="ml-4 text-2xl">
                                        {details.author.userName}
                                    </Typography>
                                </Link>
                            </div>

                            <div>
                                <DetailTable
                                    telescope={details.description.instrumentation && details.description.instrumentation.telescope}
                                    camera={details.description.instrumentation && details.description.instrumentation.camera}
                                    narrow={details.description.instrumentation.filters && `${details.description.instrumentation.filters.narrowband.ha};${details.description.instrumentation.filters.narrowband.oiii};${details.description.instrumentation.filters.narrowband.sii}`}
                                    broadband={details.description.instrumentation.filters && `
                                        ${details.description.instrumentation.filters.broadband.l};
                                        ${details.description.instrumentation.filters.broadband.r};
                                        ${details.description.instrumentation.filters.broadband.g};
                                        ${details.description.instrumentation.filters.broadband.b}`}
                                    mounts={details.description.instrumentation.mounts}
                                    guide={details.description.instrumentation.guides}

                                    constellation={details.description.place.coordinates && details.description.place && details.description.place.constellation}
                                    lat={details.description.place.coordinates && details.description.place && details.description.place.coordinates.latitude}
                                    long={details.description.place.coordinates && details.description.place && details.description.place.coordinates.longitude}
                                    ra={details.description.place.coordinates && details.description.place && details.description.place.coordinates.ra}
                                    dec={details.description.place.coordinates && details.description.place && details.description.place.coordinates.dec}
                                    date={details.description.place.coordinates && details.description.place && details.description.place.coordinates.date}
                                    enableDesc={true}
                                />
                            </div>

                            <div className="mt-12 w-full p-4 xl:w-full 2xl:w-[100rem] overflow-scroll bg-white rounded-[20px]">
                                <Typography variant="h3" className="text-center m-4">Star chart</Typography>
                                <StarMap/>
                            </div>
                            {console.log(star)}
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default DetailComponent;
