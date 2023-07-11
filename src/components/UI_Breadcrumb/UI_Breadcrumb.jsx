import {Breadcrumb} from "@arco-design/web-react";
import {IconHome} from "@arco-design/web-react/icon";
// import {useNavigate} from "react-router-dom";
const BreadcrumbItem = Breadcrumb.Item;

export  default  function UI_Breadcrumb({items}) {
    // const navigate = useNavigate();

    return (
        <Breadcrumb style={{marginLeft:15,marginTop:10}}>
            <BreadcrumbItem href="/">
                <IconHome style={{ fontSize: '16px' }} />
            </BreadcrumbItem>
            {
                items.map((item, index) => {
                    if(item.clickable){
                        return <BreadcrumbItem key={index} href={item.link}>{item.name}</BreadcrumbItem>
                    }else{
                        return <BreadcrumbItem key={index} >{item.name}</BreadcrumbItem>
                    }
                })
            }
        </Breadcrumb>
    )
}