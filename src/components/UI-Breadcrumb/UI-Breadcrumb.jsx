import {Breadcrumb} from "@arco-design/web-react";
import {IconHome} from "@arco-design/web-react/icon";
// import {useNavigate} from "react-router-dom";
const BreadcrumbItem = Breadcrumb.Item;

export  default  function UI_Breadcrumb({items}) {
    // const navigate = useNavigate();

    items = [
        {
            name: "Home",
            link: "/recruitment_dashboard"
        },
        {
            name: "Pre-Screening",
            link: "/recruitment_pre_screening"
        }
    ]

    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <IconHome/>
            </BreadcrumbItem>
            {
                items.map((item, index) => {
                    return <BreadcrumbItem key={index} >{item.name}</BreadcrumbItem>
                })
            }
        </Breadcrumb>
    )
}