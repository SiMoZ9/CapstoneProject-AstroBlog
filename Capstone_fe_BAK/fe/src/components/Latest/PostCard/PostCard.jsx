import React from 'react'
import {Button, Card, CardBody, CardFooter, CardHeader, Typography,} from "@material-tailwind/react";
import {Link} from "react-router-dom";

function PostCard(
    {
        title,
        author,
        cover,
        avatar,
        id,
        description,
        linkTo,
        buttonText,
        deleteButton,
        deleteFunc
    }
) {
    return (
        <Card className="mt-6 w-auto">
            <CardHeader color="blue-gray" className="relative h-56">
                <img
                    src={cover}
                    alt="card-image"
                    className="w-full h-full"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {title}
                </Typography>

                <div className="flex">

                    <img src={avatar} alt="avatar" className="rounded-full mr-1 w-8 h-8"/>
                    <Link to={`/profile/${id}`}>
                        <Typography variant="h6" color="blue-gray" className="text-blue-600 underline">
                            {author}
                        </Typography>
                    </Link>
                </div>

                <Typography>
                    {description}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Link to={linkTo}>
                    <Button>{buttonText}</Button>
                </Link>
                {deleteButton &&
                    <Button className="ml-2" onClick={deleteFunc}>
                        Delete
                    </Button>
                }
            </CardFooter>
        </Card>
    );
}

export default PostCard