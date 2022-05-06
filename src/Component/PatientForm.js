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
import {fetchCountryFromCoordinates} from '../utils';
import {getUser} from "../Services/AuthService";

const FormSample2 = (props) => {
    const {rangeWithShowValueId, onSubmit } = props;
    const user = getUser()
    let [country, setCountry] = useState("egypt");
    let [coordinates, setCoordinates] = useState({lat:0,lon:0});
    let [temprature, setTemprature] = useState(35);
    let [weight, setWeight] = useState(undefined);
    let [dateOfBirth, setDateOfBirth] = useState(undefined);
    let [gender, setGender] = useState("male");
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
        let coords = position.coords;
        setCoordinates({lat: coords.latitude,lon:coords.longitude})
        fetchCountryFromCoordinates(position).then(res=>{
            console.log("successfully retrieved country patient form",res);
            setCountry(res);
        }).catch(err =>{
            console.log("error while retrieving country",err)
        });
    }

    const failure = (err) => {
        console.error("Failed to get coordinates", err)
    }
    const onFormSubmit = () =>{
        let data = {
            temprature,
            country,
            weight,
            gender,
            coordinates,
            dateOfBirth,
            name:user.name
        }

        onSubmit(data);
    }

    return(
        <EuiForm component="form" >

            <EuiFormRow label="Temprature" helpText="select your temprature in celisus">
                <EuiRange
                    id={rangeWithShowValueId}
                    min={30}
                    max={50}
                    name="poprange"
                    showLabels
                    showValue
                    onChange={(event)=>{setTemprature(event.target.value)}}
                    value={temprature}
                    step={0.1}
                />
            </EuiFormRow>


            <EuiSpacer/>
            <h2>Optional info</h2>
            <EuiSpacer/>
            <EuiFormRow label="Country">
                <EuiFieldText
                    value={country}
                    disabled
                />
            </EuiFormRow>

            <EuiFormRow label="Birth date">
                <EuiDatePicker

                    selected={moment('1990-09-28')}
                    openToDate={moment('1990-09-28')}
                    onChange={(value)=>{setDateOfBirth(value)}}
                    value={dateOfBirth}
                />
            </EuiFormRow>
            <EuiFormRow label="weight">
                <EuiFieldNumber
                    onChange={(event)=>{setWeight(event.target.value)}}
                    value={weight}
                />
            </EuiFormRow>
            <EuiFormRow label="Gender">
                <EuiSelect
                    options={options}
                    onChange={(event)=>{setGender(event.target.value)}}
                    value={gender}
                />
            </EuiFormRow>
            <EuiButton fullWidth onClick={onFormSubmit}>Add</EuiButton>
        </EuiForm>
    )};

export default (props) => {
    const [isPopover2Open, setIsPopover2Open] = useState(false);

    const {onSubmit} = props;
    const rangeWithShowValueId = useGeneratedHtmlId({
        prefix: 'rangeWithShowValue',
    });

    const verticalFormPopoverId = useGeneratedHtmlId({
        prefix: 'verticalFormPopover',
    });
    const verticalFormSwitchId = useGeneratedHtmlId({
        prefix: 'verticalFormSwitch',
    });



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
                    onSubmit={(value) =>{onSubmit(value);
                        closePopover2();
                        window.location.reload();
                    }}
                    rangeWithShowValueId={rangeWithShowValueId}
                /></div>
            </EuiPopover>
        </div>
    );
};