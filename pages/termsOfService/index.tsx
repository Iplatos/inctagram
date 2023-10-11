import React from 'react';
import {getLayout} from "@/components/Layout/Layout";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";

function LogIn () {
    return (
        <>
            <HeadMeta title={" Terms of Service"}/>
           Terms of Service
        </>
    );
};

LogIn.getLayout = getLayout
export default LogIn