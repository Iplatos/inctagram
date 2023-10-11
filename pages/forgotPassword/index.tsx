import React from 'react';
import {getLayout} from "@/components/Layout/Layout";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";

function LogIn () {
    return (
        <>
            <HeadMeta title={"Forgot Password?"}/>
          Forgot Password?
        </>
    );
};

LogIn.getLayout = getLayout
export default LogIn