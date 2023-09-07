import UIBreadcrumb from "@/components/UIBreadcrumb";

export  default function SectionManagement() {
    const breadcrumbItems = [
        {
            name: "My Group",
            link: "/",
            clickable: false,
        },
        {
            name: "Pastoring",
            link: "/group/pastoring",
            clickable: true,
        },
    ];


    return (
        <>
            <UIBreadcrumb items={breadcrumbItems} />
            <div className="app-component full-screen-app-component">
                <h1>SectionManagement</h1>
            </div>
        </>
    );
}
