import {Avatar} from "@arco-design/web-react";

export const AppAvatar = ({name,slug,url}: {name: string,slug: string, url: string}) => {
    return (
        <div className={"h-[80px] text-center"}>
            <Avatar className={"cursor-pointer mb-1"}
                    size={64} shape='square' onClick={
                () => {
                    window.open(url, "_blank");
                }
            }>
                {slug}
            </Avatar>
            <div>{name}</div>
        </div>
    );
};
