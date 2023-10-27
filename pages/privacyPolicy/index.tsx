import React from 'react';
import {getLayout} from "@/components/Layout/Layout";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import { TextField } from "@/components/textField/textField";

function PrivacyPolicy () {
    return (
        <>
            <HeadMeta title={" Terms of Service"}/>
          Privacy Policy
          <TextField inputType={"password"} label={"label"}/>
        </>
    );
};

PrivacyPolicy.getLayout = getLayout
export default PrivacyPolicy