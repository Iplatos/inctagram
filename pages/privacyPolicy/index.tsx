import React, { useState } from "react";
import {getLayout} from "@/components/Layout/Layout";
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import { TextField } from "@/components/textField/textField";

function PrivacyPolicy () {
  const [value, setValue] = useState("as")
    return (
        <>
            <HeadMeta title={" Terms of Service"}/>
          Privacy Policy
          <TextField
                     isSearchInput={true}
                     value={value}
                     onChangeValue={setValue}
                     label={"label"}

                    />

        </>
    );
};

PrivacyPolicy.getLayout = getLayout
export default PrivacyPolicy