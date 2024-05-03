import React, { FC } from "react";
import { FcGoogle } from "react-icons/fc";
import Row from "../../../components/row";

interface GoogleButtonProps {
    btnTitle: string;
}

const GoogleButton: FC<GoogleButtonProps> = ({ btnTitle }) => {
    return (
        <Row className="w-full border-2 items-center justify-center  rounded-full">
            <FcGoogle size={23} className="" />
            <button type="button" className="px-4 py-2 rounded-sm  ">
                {btnTitle}
            </button>
        </Row>
    );
}

export default GoogleButton;