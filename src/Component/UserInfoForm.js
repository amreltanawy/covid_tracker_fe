import React, {useState} from 'react';
import {
    EuiButton,
    EuiFlexGroup,
    EuiFlexItem,
    EuiForm,
    EuiFormRow,
    EuiFieldText,
    EuiButtonEmpty, EuiPopover, useGeneratedHtmlId, EuiButtonIcon
} from "@elastic/eui";

import {getUser, UserManager} from '../Services/AuthService';




const Form =  (props) => {
    let [name, setName] = useState();
    let user = getUser();

    const onsubmit = async ()=>{
       let response = await UserManager.patchUserData(user.sub,{name});

       console.log("this is userManager response", response)
    }
    return (
        <EuiForm component="form">
            <EuiFormRow label="Name">
                <EuiFieldText
                    name="name"
                    onChange={(value) =>{setName(value.target.value)}}
                    value={name}
                />
            </EuiFormRow>


            <EuiButton
                fill
                onClick={onsubmit}

            >
                Update
            </EuiButton>
        </EuiForm>
    );
}

export default ()=>{
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const verticalFormPopoverId = useGeneratedHtmlId({
        prefix: 'verticalFormPopover',
    });


    const onButtonClick = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    const closePopover = () => {
        setIsPopoverOpen(false);
    };


    const button = (
        <EuiButton
            onClick={onButtonClick}
        >edit</EuiButton>
    );
    return (
        <EuiPopover
            id={verticalFormPopoverId}
            button={button}
            isOpen={isPopoverOpen}
            closePopover={closePopover}
            initialFocus="[name='popfirst']"
            style={{maxWidth:100}}
        >
            <div style={{ width: '300px' }}><Form/></div>
        </EuiPopover>
    )
}
