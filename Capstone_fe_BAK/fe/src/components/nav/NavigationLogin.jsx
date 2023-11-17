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
import logo from "../../assets/logo_upscayl_16x_realesrgan-x4plus-anime.png";

const NavigationLogin = () => {
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);


    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 overflow-hidden">
            <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal"
            >
                <Link to="#" className="flex items-center">
                    Esplora
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal"
            >
                <Link to="#" className="flex items-center">
                    Chi siamo
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal"
            >
                <Link to="#" className="flex items-center">
                    Contatti
                </Link>
            </Typography>
        </ul>
    );

    return (
        <div className="max-h-[768px] w-screen overflow-scroll">
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-blend border-0">
                <div className="flex items-center justify-between text-white">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="logo"
                            className="w-[100px]"
                        />
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
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
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <Link to='/login'>
                            <Button fullWidth variant="text" size="sm" className="">
                                <span>Accedi</span>
                            </Button>
                        </Link>
                        <Link to='/signup'>
                            <Button fullWidth variant="gradient" size="sm" className="">
                                <span>Registrati</span>
                            </Button>
                        </Link>
                    </div>
                </MobileNav>
            </Navbar>
        </div>
    );
}

export default NavigationLogin