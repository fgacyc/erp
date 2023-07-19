// import './settings_page.css'
import { Tag, Avatar } from '@arco-design/web-react';
import { IconCamera } from '@arco-design/web-react/icon';

export default function Account() {
    return (
        <>
            <h3 className="settings-title">Account and Security</h3>
            <div className="flex">
                <Avatar
                    size={64}
                    triggerIcon={<IconCamera />}
                    triggerIconStyle={{
                        color: '#3491FA',
                    }}
                    onClick={() => Message.info('Upload...')}
                    autoFixFontSize={false}
                    style={{
                        backgroundColor: '#168CFF',
                    }}
                >
                    A
                </Avatar>
                <h4 className="settings-text setting-name">Full Name</h4>
            </div>
            <h3 className="settings-title">Account information</h3>
            <div>
                <h4 className="settings-text">Password</h4>
                <a href="#">Set Password</a>
            </div>
            <div>
                <h4 className="settings-text">Email</h4>
                <div className="flex">
                    <div>email address</div>
                    <a href="#">Change Email</a>
                </div>
            </div>
            <div>
                <h4 className="settings-text">Manage Account</h4>
                <a href="#">Delete Account</a>
            </div>
            <h3 className="settings-title">Manage Devices</h3>
            <div className="flex">
                <input type="checkbox" name="" id="" />
                <h4 className="settings-text">Receive the email when you sign in</h4>
            </div>
            <div className="flex">
                <img src="/icons/devices.svg" alt="Devices Icon" style={{ width: "36px", height: "36px" }} />
                <div className="flex">
                    <div>
                        <div>Device Name</div>
                        <div>Browser, Time, Location</div>
                    </div>
                    <Tag color="green">This device</Tag>
                </div>
            </div>
        </>
    )
}