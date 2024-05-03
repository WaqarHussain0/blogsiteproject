import React from "react";
import Row from "../row";

const Footer: React.FC = () => {
    return (
        <Row className=" w-full justify-center text-[13px] text-[#6b6b6b] items-center gap-4 py-4 border-t-[1px]">
            <p>Help</p>
            <p>About</p>
            <p>Careers</p>
            <p>Privacy</p>
            <p>Terms</p>
            <p>Teams</p>
        </Row>
    );
};

export default Footer;