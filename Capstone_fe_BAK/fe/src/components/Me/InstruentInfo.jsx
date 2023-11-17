import React, {useContext, useEffect, useState} from 'react'
import {UserProvider} from "../../context/UserContext";
import {Button, Input, Typography} from "@material-tailwind/react";
import NavAccount from "../nav/NavAccount";
import DetailTable from "../Table/DetailTable";
import {RingLoader} from "react-spinners";
import useSession from "../../hooks/useSession";
import {useNavigate} from "react-router-dom";

const InstrumentInfo = () => {

    const {user, loading, setLoading, error, setError} = useContext(UserProvider)

    const [formData, setFormData] = useState({})
    /*  const [NarrowBandFilters, setNarrowBandFilters] = useState([{filters: ""}])
      const [BroadBandFilters, setBroadBandFilters] = useState([{filters: ""}])
      const [telescopes, setTelescopes] = useState([{telescopes: ""}])
      const [cameras, setCameras] = useState([{cameras: ""}])
      const [mounts, setMounts] = useState([{mounts: ""}])
      const [guide, setGuide] = useState([{guide: ""}])

      const navigate = useNavigate()

      const handleInputAddNarrow = () => {
          setNarrowBandFilters([...NarrowBandFilters, {filters: ""}])
      }

      const handleInputAddBroad = () => {
          setBroadBandFilters([...BroadBandFilters, {filters: ""}])
      }

      const handleInputTelescopes = () => {
          setTelescopes([...telescopes, {telescopes: ""}])
      }

      const handleInputCameras = () => {
          setCameras([...cameras, {cameras: ""}])
      }

      const handleInputMounts = () => {
          setMounts([...mounts, {mounts: ""}])
      }

      const handleInputGuide = () => {
          setGuide([...guide, {guide: ""}])
      }
  */
    const handleInputChange = (e) => {
        const {name, value} = e.target

        setFormData({
                ...formData,
                [`${name}`]: value,
            }
        )

        console.log(formData)
    }

    const convertObj = (obj, stringToIncludes) => {

        const newObj = {}

        obj.filter(([k, v], i = 0) => {
            if (k.includes(stringToIncludes)) {
                newObj[`${stringToIncludes}-${i}`] = v
            }
        })

        return newObj

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(formData)

        const finalBody = {
            instruments: {
                ...formData,
            }
        }

        try {
            await fetch(`${process.env.REACT_APP_ENDPOINT}/users/${JSON.parse(localStorage.getItem('loggedInUser'))}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": JSON.parse(localStorage.getItem('loggedInUser')),
                },
                body: JSON.stringify(finalBody)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const session = useSession()
    const navigate = useNavigate()

    useEffect(() => {
        if (!session) navigate('/')
    }, [])

    return (
        <>
            <NavAccount/>

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

            {!loading && !error && user.userEmail && (

                <>
                    <div className="flex flex-col w-full justify-center bg-[url('https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-center bg-cover bg-no-repeat bg-gray-800 bg-blend-soft-light">
                        <div className="flex justify-center w-full mt-6">
                            <DetailTable
                                telescope={user.userEmail.instruments.telescopes}
                                camera={user.userEmail.instruments.camera}
                                narrow={user.userEmail.instruments.narrowband}
                                broad={user.userEmail.instruments.broadband}
                                mounts={user.userEmail.instruments.mounts}
                                guide={user.userEmail.instruments.guides}
                            />
                        </div>

                        <div className="mt-6">
                            <Typography variant="h3" className="text-center mt-4 text-mat_gray-300">Edit instrumentation</Typography>
                            <div className="py-6">
                                <div className="flex justify-center px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                                    <form
                                        className="w-screen flex flex-col justify-center rounded-[20px] p-12 bg-gray-100"
                                        onSubmit={handleSubmit}>
                                        <div>
                                            <Typography
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telescopes</Typography>
                                            <div className="flex mb-4">

                                                <Input type="text"
                                                       name="telescopes"
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                       onChange={handleInputChange}/>
                                            </div>
                                        </div>

                                        <div>
                                            <Typography
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cameras</Typography>
                                            <div className="flex mb-4">
                                                <Input type="text"
                                                       name={"cameras"}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                       onChange={handleInputChange}/>
                                            </div>
                                        </div>

                                        <div>
                                            <Typography
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Narrowband filters</Typography>
                                            <div className="flex mb-4">
                                                <Input type="text"
                                                       name={"narrowband"}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                       onChange={handleInputChange}/>
                                            </div>
                                        </div>

                                        <div>
                                            <Typography
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Broadband filters</Typography>
                                            <div className="flex mb-4">
                                                <Input type="text"
                                                       name={"broadband"}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                       onChange={handleInputChange}/>
                                            </div>
                                        </div>


                                        <div>
                                            <Typography
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mounts</Typography>
                                            <div className="flex mb-4">
                                                <Input type="text"
                                                       name={"mounts"}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                       onChange={handleInputChange}/>
                                            </div>
                                        </div>

                                        <div>
                                            <Typography
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Guides</Typography>
                                            <div className="flex mb-4">
                                                <Input type="text"
                                                       name={"guides"}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                       onChange={handleInputChange}/>
                                            </div>
                                        </div>

                                        <Button type="submit"

                                                className="bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Submit
                                            changes</Button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>)
}

export default InstrumentInfo