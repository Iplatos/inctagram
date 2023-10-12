import React from 'react';
import {getLayout} from "@/components/Layout/Layout";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";

function PrivacyPolicy () {
    return (
        <>
            <HeadMeta title={" Terms of Service"}/>
          Privacy Policy
        </>
    );
};

PrivacyPolicy.getLayout = getLayout
export default PrivacyPolicy