import React from 'react';
import {getLayout} from "@/components/Layout/Layout";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";

function ForgotPassword() {
    return (
        <>
            <HeadMeta title={"Forgot Password?"}/>
            Forgot Password?
        </>
    );
};

ForgotPassword.getLayout = getLayout
export default ForgotPassword