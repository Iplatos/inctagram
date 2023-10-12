import React from 'react';
import {getLayout} from "@/components/Layout/Layout";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";

function TermsOfService() {
    return (
        <>
            <HeadMeta title={"Terms of Service"}/>
            Terms of Service
        </>
    );
};

TermsOfService.getLayout = getLayout
export default TermsOfService