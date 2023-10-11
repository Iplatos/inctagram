import React from 'react';
import {getLayout} from "@/components/Layout/Layout";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";

function LogIn () {
    return (
        <>
            <HeadMeta title={"Sign Up"}/>
           Sign Up page
        </>
    );
};

LogIn.getLayout = getLayout
export default LogIn