import React, {useEffect, useState} from 'react';
import PostForm from "../components/posts/PostForm";
import NavigationPostLogin from "../components/nav/NavigationPostLogin";
import useSession from "../hooks/useSession";
import {useNavigate} from "react-router-dom";

const NewPost = () => {

    const [postForm, setPostForm] = useState({})
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [file, setFile] = useState(null)

    const session = useSession()
    const navigate = useNavigate()

    const onChangeSetFile = (e) => {
        setFile(e.target.files[0])
    }

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

    useEffect(() => {
        if (!session) navigate('/')
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target

        setPostForm({
            ...postForm,
            [name]: value,
        })

        console.log(postForm)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (file) {
            console.log(file)
            try {
                console.log(postForm)
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
                            constellation: postForm.constellation.toLowerCase().slice(0, 3)
                        },
                    },
                }

                console.log(finalBody)

                setLoading(true)
                await fetch(`${process.env.REACT_APP_ENDPOINT}/skyPost/post/${JSON.parse(localStorage.getItem('loggedInUser'))}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": JSON.parse(localStorage.getItem('loggedInUser'))
                    },
                    body: JSON.stringify(finalBody),
                })
                setLoading(false)

            } catch (e) {
                console.log(e)
            }
        } else {
            alert('Carica un file')
            console.error('Carica un file!')
        }
    }

    return (
        <div className="bg-[url(https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-center bg-cover bg-no-repeat bg-gray-700 bg-blend-soft-light">
            <NavigationPostLogin/>
            <div className="w-auto mt-12">
                <PostForm
                    header={"New post"}
                    change={handleInputChange}
                    submit={handleSubmit}
                    onChangeSetFile={onChangeSetFile}
                    isFileUploadEnabled={true}
                    isMenuEnabled={true}
                    buttonText={"Post"}
                />
            </div>
        </div>
    )
}

export default NewPost