import React, {useState, useEffect} from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card,
} from "@material-tailwind/react";

import {Link} from "react-router-dom"
import logo from "../../assets/logo_upscayl_16x_realesrgan-x4plus-anime.png"

const NavigationNoLog = () => {
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    return (
        <div className="max-h-[768px] w-screen overflow-scroll">
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">

                    <Link to="/">
                        <img
                            src={logo}
                            alt="logo"
                            className="w-[100px]"
                        />
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-x-1">

                            <Link to="/login">

                                <Button
                                    variant="text"
                                    size="sm"
                                    className="hidden lg:inline-block"
                                >
                                    <span>Signin</span>
                                </Button>
                            </Link>

                            <Link to="/signup">
                            <Button
                                variant="gradient"
                                size="sm"
                                className="hidden lg:inline-block"
                            >
                                <span>Signup</span>
                            </Button>
                            </Link>
                        </div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <MobileNav open={openNav}>
                    <div className="flex items-center gap-x-1">
                        <Link to='/login'>
                            <Button fullWidth variant="text" size="sm" className="">
                                <span>Signin</span>
                            </Button>
                        </Link>
                        <Link to='/signup'>
                            <Button fullWidth variant="gradient" size="sm" className="">
                                <span>Signup</span>
                            </Button>
                        </Link>
                    </div>
                </MobileNav>
            </Navbar>
        </div>
    );
}

export default NavigationNoLog
