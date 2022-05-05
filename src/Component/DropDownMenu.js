import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import {
    EuiButtonEmpty,
    EuiContextMenuPanel,
    EuiContextMenuItem,
    EuiPopover,
    useGeneratedHtmlId, EuiHeaderSectionItemButton, EuiAvatar,
} from '@elastic/eui';
import {getUser, logout} from "../Services/AuthService";

export default () => {
    let user= getUser();
    const [isPopoverOpen, setPopover] = useState(false);
    const smallContextMenuPopoverId = useGeneratedHtmlId({
        prefix: 'smallContextMenuPopover',
    });

    const onButtonClick = () => {
        setPopover(!isPopoverOpen);
    };

    const closePopover = () => {
        setPopover(false);
    };

    const items = [
        <EuiContextMenuItem
            key="edit"
            icon="pencil"
            onClick={closePopover}
        >
            <Link to="/users">Edit</Link>
        </EuiContextMenuItem>,
        <EuiContextMenuItem
            key="share" icon="push"
            onClick={()=>{ closePopover(); logout()}}
        >
            Logout
        </EuiContextMenuItem>,
    ];

    const button = (
        <EuiButtonEmpty iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
            <EuiHeaderSectionItemButton aria-label="Spaces menu">
                <EuiAvatar type="space" name={user.nickname || user.email} size="s" />
            </EuiHeaderSectionItemButton>
        </EuiButtonEmpty>
    );

    return (
        <EuiPopover
            id={smallContextMenuPopoverId}
            button={button}
            isOpen={isPopoverOpen}
            closePopover={closePopover}
            panelPaddingSize="none"
            anchorPosition="downLeft"
        >
            <EuiContextMenuPanel size="s" items={items} />
        </EuiPopover>
    );
};