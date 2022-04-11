import React, { useState } from 'react';
import {
    EuiButtonEmpty,
    EuiContextMenuPanel,
    EuiContextMenuItem,
    EuiPopover,
    useGeneratedHtmlId, EuiHeaderSectionItemButton, EuiAvatar,
} from '@elastic/eui';
import {useAuth0} from "@auth0/auth0-react";

export default () => {
    let {user}= useAuth0();
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
        <EuiContextMenuItem key="edit" icon="pencil" onClick={closePopover}>
            Edit
        </EuiContextMenuItem>,
        <EuiContextMenuItem key="share" icon="push" onClick={closePopover}>
            Logout
        </EuiContextMenuItem>,
    ];

    const button = (
        <EuiButtonEmpty iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
            <EuiHeaderSectionItemButton aria-label="Spaces menu">
                <EuiAvatar type="space" name={user.nickname} size="s" />
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