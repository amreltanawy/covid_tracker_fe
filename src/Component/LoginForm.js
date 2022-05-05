import React, {useState} from 'react';
import {
    EuiButton,
    EuiFlexGroup,
    EuiFlexItem,
    EuiForm,
    EuiFormRow,
    EuiFieldText,
    EuiButtonEmpty
    } from "@elastic/eui";

import {sendOtpEmail,verifyOtpEmail} from '../Services/AuthService';



const EmailForm = (props) => {
    let {onSubmit} = props;
    let [email, setEmail] = useState();
    return (
        <EuiForm component="form">
            <EuiFormRow label="Email" helpText="A one time password will be sent to this email">
                <EuiFieldText
                    name="Email"
                    onChange={(value) =>{setEmail(value.target.value)}}
                    value={email}
                />
            </EuiFormRow>


            <EuiButton
                fill
                onClick={(event) => {onSubmit(email)}}
            >
                Send Otp
            </EuiButton>
        </EuiForm>
    );
}

const OtpForm = (props) => {
    const {email, onBack, otpSubmit} = props;
    let [otp, setOtp] = useState();

    return (
        <EuiForm component="form">
        <EuiFormRow label="Email">
            <EuiFieldText name="Email" disabled value={email} />
        </EuiFormRow>
        <EuiFormRow label="OTP" helpText="Enter the otp received on your mail">
            <EuiFieldText
                name="OTP"
                onChange={(event)=>{setOtp(event.target.value)}}
                value={otp}
            />
        </EuiFormRow>

        <EuiFormRow>
            <EuiFlexGroup style={{flexWrap:'nowrap'}}>
            <EuiFlexItem >
                <EuiButton
                    onClick={()=>{otpSubmit(otp)}}
                    fill>
                    Login
                </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiButtonEmpty
                    color="text"
                    onClick={onBack}
                >
                    Back
                </EuiButtonEmpty>
            </EuiFlexItem>
            </EuiFlexGroup>
        </EuiFormRow>
    </EuiForm>
);
}

export default (props) =>{

    let [selectedForm, setSelectedForm] = useState("email");
    let [email, setEmail] = useState(undefined);

    const emailSubmit = async (value) => {
        setEmail(value);
        let result = await sendOtpEmail(value);
        setSelectedForm('otp');
    }
    const setMailForm = () =>{
        setSelectedForm('email');
    }
    const otpSubmit = async (otp) =>{

        let response = await verifyOtpEmail({email,otp});
        window.location.reload();
    }
   return (
       <EuiFlexGroup style={{height:'95vh', width:'100vw'}} alignItems="center" justifyContent="spaceAround">
           <EuiFlexItem grow={false} style={{maxWidth:'50%'}} >
               {(selectedForm==="otp")?
                   <OtpForm email={email} onBack={setMailForm} otpSubmit={otpSubmit}/>
                   :<EmailForm onSubmit={emailSubmit}/>}
           </EuiFlexItem>
       </EuiFlexGroup>
   )
}