import UIBreadcrumb from "@/components/UIBreadcrumb";

export  default function FaithDashboard() {
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
                <h1>FaithflixDashboard</h1>
            </div>
        </>
    );
}
