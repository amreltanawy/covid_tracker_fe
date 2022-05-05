import React from 'react';
import {
    EuiPageTemplate,
    EuiButton,
    EuiFlexItem,
    EuiPanel,
    EuiFlexGroup,
    EuiText,
    EuiImage,
    EuiTitle
} from '@elastic/eui';
import { getUser} from '../Services/AuthService';
import UserInfoForm from "../Component/UserInfoForm";


export default ({ button = <></> }) => {
    let user = getUser();

    let userChosenName = (user.user_metadata && user.user_metadata.name)||user.name;
    return (

        <EuiPageTemplate
            restrictWidth={false}
            template="empty"
            pageHeader={{
                pageTitle: 'Profile',
                rightSideItems: [button, <UserInfoForm />],
            }}
        >
            <EuiFlexGroup style={{wrap:'nowrap'}} >
                <EuiFlexItem grow={false}>
                    <EuiPanel style={{height: 200, width: 'fit-content'}}>
                        <EuiFlexGroup>
                            <EuiFlexItem >
                            <EuiImage
                                style={{borderRadius:"50%"}}
                                size={100}
                                alt="profile picture"
                                src={user.picture}
                            />
                            </EuiFlexItem>
                        </EuiFlexGroup>
                        <EuiText grow={false}>
                            <h3>{user.nickname}</h3>
                        </EuiText>
                    </EuiPanel>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiPanel style={{height: 200, width:'fit-content'}}>
                        <EuiFlexGroup columns={2}>
                            <EuiFlexItem>
                                <EuiTitle size='s'>
                                    <h2>Name</h2>
                                </EuiTitle>
                                <EuiFlexItem grow={false}>
                                    <EuiTitle size='s'>
                                        <h2>{userChosenName}</h2>
                                    </EuiTitle>
                                </EuiFlexItem>
                            </EuiFlexItem>

                            <EuiFlexItem>
                                <EuiTitle size="s">
                                    <h2>Email: </h2>
                                </EuiTitle>
                                <EuiFlexItem grow={false}>
                                    <EuiTitle size='s'>
                                        <h2>{user.email}</h2>
                                    </EuiTitle>
                                </EuiFlexItem>
                            </EuiFlexItem>
                            <EuiFlexItem></EuiFlexItem>

                        </EuiFlexGroup>
                    </EuiPanel>
                </EuiFlexItem>

            </EuiFlexGroup>
        </EuiPageTemplate>
    );
}