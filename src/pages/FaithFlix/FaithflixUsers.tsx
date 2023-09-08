import UIBreadcrumb from "@/components/UIBreadcrumb";


export  default function FaithflixUsers() {
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
                <h1>FaithflixUsers</h1>
            </div>
        </>
    );
}
