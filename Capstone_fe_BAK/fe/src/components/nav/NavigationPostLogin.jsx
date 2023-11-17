import React, {useState, useEffect} from "react";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Collapse, MobileNav
} from "@material-tailwind/react";

import {Link, useNavigate, useParams} from "react-router-dom"
import {MdAddPhotoAlternate} from 'react-icons/md'
import logo from "../../assets/logo_upscayl_16x_realesrgan-x4plus-anime.png";

const NavigationPostLogin = ({userName, userPic}) => {
    const [openNav, setOpenNav] = useState(false);
    const [openAccountSettings, setOpenAccountSettings] = useState(false);

    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    return (
        <div className="max-h-[768px] w-screen">
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Link to="/personalHome">
                    <img
                        src={logo}
                        alt="logo"
                        className="w-[100px]"
                    />
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-x-1">
                            <Link to="/publish">
                            <Button
                                variant="gradient"
                                size="sm"
                                className="hidden lg:inline-block"
                            >
                                <span className="flex items-center justify-center">New post<MdAddPhotoAlternate className="ml-1"/></span>
                            </Button>
                            </Link>
                            <Button
                                variant="gradient"
                                size="sm"
                                className="hidden lg:inline-block"
                                onClick={() => setOpenAccountSettings(!openAccountSettings)}
                            >
                                <span>Your account</span>
                                <Collapse open={openAccountSettings}>
                                    <div className="flex items-center gap-x-1 mt-1">
                                        <Link to={`/account`}>
                                            <Button fullWidth variant="filled" color="white" size="sm">
                                                <span className="flex items-center justify-center text-[10px]">Settings</span>
                                            </Button>
                                        </Link>
                                        <Button fullWidth variant="filled" color="white" size="sm">
                                            <span className="flex items-center justify-center text-[10px]" onClick={
                                                () => {
                                                    localStorage.clear()
                                                    navigate('/')
                                                }
                                            }>Logout</span>
                                        </Button>
                                    </div>
                                </Collapse>
                            </Button>
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
                <Collapse open={openNav}>
                    <div className="flex items-center gap-x-1 h-auto">
                        <Link to="/publish">
                            <Button
                                variant="gradient"
                                size="sm"
                                className="lg:inline-block"
                            >
                                <span className="flex items-center justify-center">New post<MdAddPhotoAlternate className="ml-1"/></span>
                            </Button>
                        </Link>
                        <Button
                            variant="gradient"
                            size="sm"
                            className="lg:inline-block"
                            onClick={() => setOpenAccountSettings(!openAccountSettings)}
                        >
                            <span>Your account</span>
                            <Collapse open={openAccountSettings}>
                                <div className="flex items-center gap-x-1 mt-1">
                                    <Link to={`/account`}>
                                        <Button fullWidth variant="filled" color="white" size="sm">
                                            <span className="flex items-center justify-center text-[10px]">Settings</span>
                                        </Button>
                                    </Link>
                                    <Button fullWidth variant="filled" color="white" size="sm">
                                            <span className="flex items-center justify-center text-[10px]" onClick={
                                                () => {
                                                    localStorage.clear()
                                                    navigate('/')
                                                }
                                            }>Logout</span>
                                    </Button>
                                </div>
                            </Collapse>
                        </Button>
                    </div>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavigationPostLogin