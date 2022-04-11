import React, { useState } from 'react';
import {
    EuiButton,
    EuiButtonIcon,
    EuiPopover,
    EuiForm,
    EuiFormRow,
    EuiFieldText,
    EuiFlexGroup,
    EuiFlexItem,
    EuiFieldNumber,
    EuiRange,
    EuiSpacer,
    EuiSwitch,
    useGeneratedHtmlId,
} from '@elastic/eui';


export default () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isPopover2Open, setIsPopover2Open] = useState(false);
    const [isSwitchChecked, setIsSwitchChecked] = useState(true);
    const [temperatureValue, setTemperatureValue] = useState(37);

    const basicRangeId = useGeneratedHtmlId({ prefix: 'basicRange' });
    const rangeWithShowValueId = useGeneratedHtmlId({
        prefix: 'rangeWithShowValue',
    });

    const verticalFormPopoverId = useGeneratedHtmlId({
        prefix: 'verticalFormPopover',
    });
    const verticalFormSwitchId = useGeneratedHtmlId({
        prefix: 'verticalFormSwitch',
    });
    const onChange = (e) => {
        setTemperatureValue(e.target.value);
    };

    const onButtonClick = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    const closePopover = () => {
        setIsPopoverOpen(false);
    };

    const onSwitchChange = () => {
        setIsSwitchChecked(!isSwitchChecked);
    };

    const onButton2Click = () => {
        setIsPopover2Open(!isPopover2Open);
    };

    const closePopover2 = () => {
        setIsPopover2Open(false);
    };



    const button2 = (
        <EuiButtonIcon
            iconType="plus"
            display="fill"
            size="m"
            onClick={onButton2Click}
            style={{borderRadius:'50%'}}
        />
    );

    const formSample2 = (
        <EuiForm component="form">

            <EuiFormRow label="Temprature" helpText="select your temprature in celisus">
                <EuiRange
                    id={rangeWithShowValueId}
                    min={30}
                    max={50}
                    name="poprange"
                    showLabels
                    showValue
                    value={temperatureValue}
                    onChange={onChange}
                    step={0.1}
                />
            </EuiFormRow>

            <EuiSpacer />
            <EuiButton fullWidth>Add</EuiButton>
        </EuiForm>
    );

    return (
        <div>

            <EuiPopover
                id={verticalFormPopoverId}
                button={button2}
                isOpen={isPopover2Open}
                closePopover={closePopover2}
                initialFocus="[name='popfirst']"
                style={{maxWidth:50}}
            >
                <div style={{ width: '300px' }}>{formSample2}</div>
            </EuiPopover>
        </div>
    );
};