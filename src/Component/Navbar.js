import React from 'react';
import {Link} from 'react-router-dom'
import {
    EuiHeader,
    EuiHeaderSectionItem,
    EuiHeaderLogo,
    EuiHeaderLinks,
    EuiHeaderLink,
    EuiHeaderSectionItemButton,
    EuiAvatar,
    EuiIcon
} from '@elastic/eui';
import {useAuth0} from "@auth0/auth0-react";
import DropDownMenu from "./DropDownMenu";

export default () => {
    let {user,isAuthenticated,loginWithRedirect}= useAuth0();

    console.log("tanawy is testing ", user)
    if(!isAuthenticated){
        return (
            <EuiHeader>
                <EuiHeaderSectionItem border="right">
                    <EuiHeaderLogo>CovidTracker</EuiHeaderLogo>
                </EuiHeaderSectionItem>

                <EuiHeaderSectionItem>
                    <EuiHeaderLinks aria-label="App navigation links example">
                        <EuiHeaderLink isActive><Link to="/"><EuiIcon type="alert" />

                            Home</Link></EuiHeaderLink>

                        <EuiHeaderLink><Link to="/login" onClick={loginWithRedirect}><EuiIcon type="alert" />

                            login</Link></EuiHeaderLink>

                    </EuiHeaderLinks>
                </EuiHeaderSectionItem>
            </EuiHeader>
        );
    } else {


    return (
        <EuiHeader>
            <EuiHeaderSectionItem border="right">
                <EuiHeaderLogo>CovidTracker</EuiHeaderLogo>
            </EuiHeaderSectionItem>

            <EuiHeaderSectionItem>
                <EuiHeaderLinks aria-label="App navigation links example">
                    <EuiHeaderLink isActive><Link to="/"><EuiIcon type="alert" />
                        Home</Link></EuiHeaderLink>
                    <EuiHeaderLink><Link to="/users"><EuiIcon type="alert" />
                        users</Link></EuiHeaderLink>
                    <DropDownMenu />

                </EuiHeaderLinks>
            </EuiHeaderSectionItem>
        </EuiHeader>
    );
            }
};