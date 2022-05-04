import React from "react";
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiButton
} from '@elastic/eui'

export default (props)=>{

    const {onClick} =  props;
    return (
        <EuiFlexGroup style={{height:'95vh', width:'100vw'}} alignItems="center" justifyContent="spaceAround">
            <EuiFlexItem grow={false} style={{maxWidth:'20%'}} >
                <EuiButton  fullWidth fill onClick={onClick}>Login</EuiButton>
            </EuiFlexItem>
        </EuiFlexGroup>
    )
}