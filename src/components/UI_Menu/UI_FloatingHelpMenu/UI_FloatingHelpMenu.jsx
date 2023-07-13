import { useState } from 'react';
import { Menu, Trigger } from '@arco-design/web-react';
import {IconMessage, IconClose, IconBug, IconBulb, IconQuestion, IconBook, IconFile} from '@arco-design/web-react/icon';
const MenuItem = Menu.Item;
import "./UI_FloatingHelpMenu.css"

export default function UI_FloatingHelpMenu() {
    const renderMenu = () => {
        return (
            <Menu
                mode='popButton'
                tooltipProps={{ position: 'left' }}
                hasCollapseButton
            >
                <MenuItem key='1'>
                    <IconBug />
                    Bugs
                </MenuItem>
                <MenuItem key='2'>
                    <IconBulb />
                    Ideas
                </MenuItem>
                <MenuItem key='3'>
                    <IconFile />
                    Tutorial
                </MenuItem>
            </Menu>
        );
    };
    const [popupVisible, setPopupVisible] = useState(false);
    return (
        <Trigger
            className="floating-menu-trigger"
            popup={renderMenu}
            trigger={['click', 'hover']}
            clickToClose
            position='top'
            onVisibleChange={(v) => setPopupVisible(v)}
        >
            <div className={`button-trigger ${popupVisible ? 'button-trigger-active' : ''}`}>
                {popupVisible ?
                    <IconClose style={{fontSize:18}} /> :
                    <IconQuestion style={{fontSize:18}} />}
            </div>
        </Trigger>
    );
}
