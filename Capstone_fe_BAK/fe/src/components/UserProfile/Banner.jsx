import React from 'react';
import {Typography} from "@material-tailwind/react";

const Banner = ({avatar, headerImg, userName}) => {
    return (
        <section>
            <div>
                <div className>
                    <div className="h-96 flex justify-center">
                        <img src={headerImg}
                             alt="header" className="w-full"/>
                    </div>
                    <div className="flex items-center mt-6">
                        <img
                            src={avatar}
                            alt="avatar" className="rounded-full w-36 h-36 ml-12"/>
                        <Typography variant="h1" className="ml-12">
                            {userName}
                        </Typography>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;