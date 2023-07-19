import './settings_page.css'
import { Typography, Button, Tag, Avatar } from '@arco-design/web-react';
const { Title } = Typography;
import { IconCamera } from '@arco-design/web-react/icon';
import { settings_navs } from './settings_data';
import { NavLink, Outlet } from 'react-router-dom';

function SettingsNavigation() {
    return (
        <div className="settings-nav">
            <Typography>
                <Typography.Title heading={3}>Settings</Typography.Title>
            </Typography>
            <Button type='primary'>Done</Button>
        </div>
    )
}

function SettingContainerNavigation() {
    function handleSettingsNavClassName({ isActive }) {
        return isActive ? "settings-container-nav-item-active" : "settings-container-nav-item"
    }

    return (
        <div className="settings-container-nav">
            {
                settings_navs.map((item, index) => {
                    return (
                        <NavLink
                            key={index}
                            className={handleSettingsNavClassName}
                            to={item.route}
                        >
                            <Typography className="settings-container-nav-item-text">
                                <Typography.Text>{item.title}</Typography.Text>
                            </Typography>
                        </NavLink>
                    )
                })
            }
        </div>
    )
}

export function Calendar() {
    return (
        <div>Calendar</div>
    )
}

export function About() {
    return (
        <div>About</div>
    )
}

export default function SettingsPage() {


    return (
        <div className="settings-page">
            <SettingsNavigation />
            <div className="settings-container">
                <SettingContainerNavigation />
                <div className="settings-container-main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}