import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Typography,} from "@material-tailwind/react";
import {Link} from "react-router-dom";

const NewsCard = ({title, author, description, url, imageUrl}) => {
    return (
        <Card className="mt-6 w-auto">
            <CardHeader className="relative h-56 text-blue_gray-200">
                <img
                    src={imageUrl}
                    alt="newsImage"
                    className="h-full w-full"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" className="mb-2 text-mat_gray-900">
                    {title}
                </Typography>

                <Typography variant="h6" className="mb-2 text-mat_blue-500">
                    {author}
                </Typography>

                <Typography variant="small" className="text-blue_gray-600">
                    {description}
                </Typography>
            </CardBody>
            <Link to={url}>
                <CardFooter className="pt-0">
                    <Button className="bg-blue_gray-900">Read More</Button>
                </CardFooter>
            </Link>
        </Card>
    );
};

export default NewsCard;
