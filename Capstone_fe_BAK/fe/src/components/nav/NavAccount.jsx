import React from 'react';
import {NavLink} from "react-router-dom";
import {FaImages, FaRegUser, FaTools} from "react-icons/fa";

const NavAccount = () => {
    return (
        <nav>
            <div className="2xl:flex justify-evenly my-4">
                <div>
                    <NavLink to="/account" title=""
                             className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-gray-900 group">
                        <FaRegUser className="text-xl mr-4"/>
                        Acccount
                    </ NavLink>
                </div>
                <div>
                    < NavLink to="/account/instruments"
                              className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-gray-900 group">
                        <FaTools className="text-xl mr-4"/>
                        Instrumentation
                    </ NavLink>
                </div>

                <div>
                    < NavLink to="/account/posts"
                              className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-gray-900 group">
                        <FaImages className="text-xl mr-4"/>
                        My posts
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default NavAccount;
