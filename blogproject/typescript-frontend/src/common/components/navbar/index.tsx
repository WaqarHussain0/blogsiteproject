import React from "react";
import { PAGES_ROUTES } from "../../../routes";
import { Link } from "react-router-dom";
import routes from "../../../routes";
import Row from "../row";

const Navbar = () => {
    return (
        <Row className="bg-gray-700 py-4 flex items-center justify-center w-fulls">
            <div className="flex items-center">
                <div className="ml-10 flex items-baseline space-x-4">
                    {routes.map(({ path }) => (
                        <Link
                            key={path}
                            to={path}
                            className="text-white px-3 py-2 rounded-md text-sm font-medium capitalize"
                        >
                            {path === PAGES_ROUTES.home ? "Home" : path.slice(1)}
                        </Link>
                    ))}
                </div>
            </div>
        </Row>
    );
};

export default Navbar;