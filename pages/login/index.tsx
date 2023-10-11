import React from 'react';
import {getLayout} from "@/components/Layout/Layout";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {NavBar} from "@/components/NavBar/NavBar";

function LogIn () {
    return (
        <>
            <HeadMeta title={"login"}/>
           Login page
        </>
    );
};

LogIn.getLayout = getLayout
export default LogIn