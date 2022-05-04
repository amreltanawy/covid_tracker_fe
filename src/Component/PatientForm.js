import React, {useEffect, useState} from 'react';
import {
    EuiButton,
    EuiButtonIcon,
    EuiPopover,
    EuiForm,
    EuiFormRow,
    EuiFieldText,
    EuiFieldNumber,
    EuiRange,
    EuiSpacer,
    useGeneratedHtmlId,
    EuiDatePicker,
    EuiSelect
} from '@elastic/eui';
import moment from 'moment';
import {fetchCountryFromCoordinates} from '../utils'

const FormSample2 = (props) => {
    const {rangeWithShowValueId,temperatureValue,onChange} = props;
    const options = [
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Femaile' },
        { value: 'other', text: 'Other' },
    ];
    useEffect(() => {
        console.log("reached geoLocation logic")
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    console.log("permission results ")
                    if (result.state === "granted") {
                        console.log(result.state);
                        //If granted then you can directly call your function here
                        navigator.geolocation.getCurrentPosition(success);
                    } else if (result.state === "prompt") {
                        console.log(result.state);
                        navigator.geolocation.getCurrentPosition(success, failure);
                    } else if (result.state === "denied") {
                        //If denied then you have to show instructions to enable location
                        console.log("the state of geolocation permission is denied");
                    }
                    result.onchange = function () {
                        console.log(result.state);
                    };
                }).catch(err=>{
                console.log("something happened while requesting permission")
            });
        } else {
            alert("Sorry Not available!");
        }
    }, []);


    const success = (position) => {
        console.log("successfully got the coordinates", position);
        fetchCountryFromCoordinates(position).then(res=>{
            console.log("successfully retrieved country ptient form",res);
        }).catch(err =>{
            console.log("error while retrieving country",err)
        });
    }

    const failure = (err) => {
        console.error("Failed to get coordinates", err)
    }

    return(
        <EuiForm component="form" onChange={e=>{console.log("form submitted",e)}}>

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


            <EuiSpacer/>
            <h2>Optional info</h2>
            <EuiSpacer/>
            <EuiFormRow label="Country">
                <EuiFieldText
                    value={"Egypt"}
                    disabled
                />
            </EuiFormRow>

            <EuiFormRow label="Birth date">
                <EuiDatePicker

                    selected={moment('1990-09-28')}
                    openToDate={moment('1990-09-28')}
                    onChange={(e) => console.log(e)}
                />
            </EuiFormRow>
            <EuiFormRow label="weight">
                <EuiFieldNumber
                    value={50}
                    onChange={(e) => console.log(e)}
                />
            </EuiFormRow>
            <EuiFormRow label="Gender">
                <EuiSelect
                    options={options}
                    value={"male"}
                    onChange={(e) => console.log(e)}
                />
            </EuiFormRow>
            <EuiButton fullWidth>Add</EuiButton>
        </EuiForm>
    )};

export default () => {
    const [isPopover2Open, setIsPopover2Open] = useState(false);
    const [temperatureValue, setTemperatureValue] = useState(37);

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
            iconSize="xl"
            onClick={onButton2Click}
            style={{borderRadius:'50%', height:'7vw',width:'7vw'}}
        />
    );



    return (
        <div>

            <EuiPopover
                id={verticalFormPopoverId}
                button={button2}
                isOpen={isPopover2Open}
                closePopover={closePopover2}
                initialFocus="[name='popfirst']"
                style={{maxWidth:100}}
            >
                <div style={{ width: '300px' }}><FormSample2
                    onChange={onChange}
                    temperatureValue={temperatureValue}
                    rangeWithShowValueId={rangeWithShowValueId}
                /></div>
            </EuiPopover>
        </div>
    );
};