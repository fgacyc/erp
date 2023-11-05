import {Modal} from "@arco-design/web-react";
import {Dispatch, FunctionComponent, SetStateAction} from "react";
import {AppAvatar} from "@/components/UI_Modal/UI_AppMenu/AppAvatar.tsx";

interface UIAppMenuProps {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}



export const UI_AppMenu: FunctionComponent<UIAppMenuProps> = ({visible, setVisible}) => {
    const Apps: {name: string,slug: string, url: string}[] = [
        {
            name: "Square",
            slug: "SQ",
            url: "https://square.fgacyc.com/"
        },
        {
            name: "KMS",
            slug: "KMS",
            url: "https://knowledge.fgacyc.com/"
        },
        {
            name: "Aaron",
            slug: "Aa",
            url: "https://aaron.fgacyc.com/"
        },{
            name: "Kanban",
            slug: "KB",
            url: "https://kanban.fgacyc.com/"
        },
        {
            name: "BI",
            slug: "BI",
            url: "https://bi.fgacyc.com/"
        },
        {
            name: "Number",
            slug: "NB",
            url: "https://numbers.fgacyc.com/"
        },{
            name: "Connect Group",
            slug: "CG",
            url: "https://numbers.fgacyc.com/nb-admin"
        },{
            name: "Attendance",
            slug: "AD",
            url: "https://numbers.fgacyc.com/nb-attendance "
        }
    ];


    return (
        <Modal
            title="FGACYC Applications"
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
        >
            <div className="grid grid-cols-4 gap-4">
                {
                    Apps.map((app,index:number) => {
                        return (
                            <AppAvatar name={app.name} url={app.url} slug={app.slug} key={index} />
                        );
                    })
                }
            </div>
        </Modal>
    );
};
