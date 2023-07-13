import { useState } from 'react';
import { Menu, Trigger } from '@arco-design/web-react';
import {IconMessage, IconClose, IconBug, IconBulb, IconQuestion} from '@arco-design/web-react/icon';
const MenuItem = Menu.Item;
import "./UI_FloatingHelpMenu.css"

export default function UI_FloatingHelpMenu() {
    const renderMenu = () => {
        return (
            <Menu
                style={{ marginBottom: -4 }}
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
            </Menu>
        );
    };

    const [popupVisibleOne, setPopupVisibleOne] = useState(false);
    const [popupVisibleTwo, setPopupVisibleTwo] = useState(false);
    return (
        <Trigger
            className="floating-menu-trigger"
            popup={renderMenu}
            trigger={['click', 'hover']}
            clickToClose
            position='top'
            onVisibleChange={(v) => setPopupVisibleTwo(v)}

        >
            <div className={`button-trigger ${popupVisibleTwo ? 'button-trigger-active' : ''}`}>
                {popupVisibleTwo ?
                    <IconClose style={{fontSize:18}} /> :
                    <IconQuestion style={{fontSize:18}} />}
            </div>
        </Trigger>
    );
}
