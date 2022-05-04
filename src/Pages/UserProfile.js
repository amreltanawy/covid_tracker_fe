import React from 'react';
import {
    EuiPageTemplate,
    EuiButton,
    EuiFlexGrid,
    EuiFlexItem,
    EuiPanel,
    EuiFlexGroup
} from '@elastic/eui';
import {useAuth0} from "@auth0/auth0-react";


export default ({ button = <></> }) => (

    <EuiPageTemplate
        restrictWidth={false}
        template="empty"
        pageHeader={{
            pageTitle: 'Profile',
            rightSideItems: [button, <EuiButton>edit</EuiButton>],
        }}
    >
        <EuiFlexGroup >
            <EuiFlexItem grow={false}>
                <EuiPanel style={{ height: 200 }} />
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiPanel style={{ height: 200 }} />
            </EuiFlexItem>

        </EuiFlexGroup>
    </EuiPageTemplate>
);