import React, {useContext, useEffect, useState} from 'react';
import {DetailProvider} from "../../context/DetailsContext";
import PostForm from "./PostForm";
import {useNavigate, useParams} from "react-router-dom";
import NavigationPostLogin from "../nav/NavigationPostLogin";
import {RingLoader} from "react-spinners";
import useSession from "../../hooks/useSession";

const PostEditComponent = () => {

    const {details, loading, setLoading, error, setError} = useContext(DetailProvider)

    const [postForm, setFormData] = useState(details)
    const [file, setFile] = useState(null)

    const session = useSession()
    const navigate = useNavigate()
    const {id} = useParams()
    console.log(id)

    const uploadFile = async (cover) => {
        const fileData = new FormData()
        fileData.append('mainPic', cover)

        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/skyPost/cloudUpload`, {
                method: "POST",
                body: fileData
            })
            console.log(fileData)
            return await response.json()
        } catch (error) {
            console.log(error, 'Errore in uploadFile')
        }
    }
    const onChangeSetFile = (e) => {
        setFile(e.target.files[0])
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target

        setFormData({
            ...postForm,
            [name]: value
        })

        console.log(postForm)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (file) {
            console.log(file)
            try {
                const uploadCover = await uploadFile(file)

                const finalBody = {
                    object: postForm.object,
                    title: postForm.title,
                    mainPic: uploadCover.url,
                    description: {
                        instrumentation: {
                            telescope: postForm.telescope,
                            camera: postForm.camera,
                            filters: {
                                narrowband: {
                                    ha: postForm.ha,
                                    oiii: postForm.oiii,
                                    sii: postForm.sii
                                },

                                broadband: {
                                    l: postForm.l,
                                    r: postForm.r,
                                    g: postForm.g,
                                    b: postForm.b
                                }
                            },
                            mounts: postForm.mounts,
                            guides: postForm.guides,
                        },


                        place: {
                            coordinates: {
                                latitude: postForm.latitude,
                                longitude: postForm.longitude,
                                ra: postForm.ra,
                                dec: postForm.dec,
                                date: postForm.date
                            },
                        },
                    },
                }

                console.log(finalBody)

                setLoading(true)
                await fetch(`${process.env.REACT_APP_ENDPOINT}/skyPost/edit/${id}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": JSON.parse(localStorage.getItem('loggedInUser'))
                    },
                    body: JSON.stringify(finalBody),
                })
                setLoading(false)
                navigate("/personalHome")

            } catch (e) {
                console.log(e)
            }
        } else {
            alert('Carica un file')
            console.error('Carica un file!')
        }
    }

    useEffect(() => {
        if (!session) navigate('/')
    }, [])

    return (
        <>

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

            {!loading && !error && details &&
                <div
                    className="bg-[url(https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-center bg-cover bg-no-repeat bg-gray-700 bg-blend-soft-light">
                    <NavigationPostLogin/>
                    <div className="w-auto mt-12">
                        <PostForm
                            header={"Edit post"}
                            isMenuEnabled={false}
                            isFileUploadEnabled={true}
                            submit={handleSubmit}
                            change={handleInputChange}
                            onChangeSetFile={onChangeSetFile}
                            mainPicPlaceholder={details.mainPic}
                            titlePlaceholder={details.title}
                            descPlaceholder={details.description.text}
                            cameraPlaceholder={details.description.instrumentation.camera}
                            constPlaceholder={details.description.place.constellation}
                            datePlaceholder={details.description.place.coordinates && details.description.place.coordinates.date}
                            telescopePlaceholder={details.description.instrumentation.telescope}
                            latPlaceholder={details.description.place.coordinates && details.description.place.coordinates.latitude}
                            longPlaceholder={details.description.place.coordinates && details.description.place.coordinates.longitude}
                            raPlaceholder={details.description.place.coordinates && details.description.place.coordinates.ra}
                            decPlaceholder={details.description.place.coordinates && details.description.place.coordinates.dec}
                            buttonText={"Edit post"}
                        />
                    </div>
                </div>
            }
        </>
    );
};

export default PostEditComponent;
