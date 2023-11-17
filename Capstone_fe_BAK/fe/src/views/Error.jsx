import React from 'react';
import {Typography} from "@material-tailwind/react";

const Error = () => {
    return (
        <div className="h-screen w-full flex justify-center">
            <Typography className="text-blue_gray-900">
                Error 404 Page Not Found
            </Typography>
        </div>
    );
};

export default Error;
