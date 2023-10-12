import React from 'react';
import {getLayout} from "@/components/Layout/Layout";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";

function SignUp() {
    return (
        <>
            <HeadMeta title={"Sign Up"}/>
            Sign Up page
        </>
    );
};

SignUp.getLayout = getLayout
export default SignUp