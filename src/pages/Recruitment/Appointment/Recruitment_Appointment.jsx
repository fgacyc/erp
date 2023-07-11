import UI_Breadcrumb from "../../../components/UI-Breadcrumb/UI-Breadcrumb.jsx";

export default function Recruitment_Appointment() {
    const breadcrumbItems = [
        {
            name: "Recruitment",
            link: "/",
            clickable: false
        },
        {
            name: "Appointment",
            link: "/recruitment_pre_appointment",
            clickable: true
        }
    ]


    return (
        <>
            <UI_Breadcrumb items={breadcrumbItems}/>
            <div >
                <h1>Recruitment_Appointment</h1>
            </div>
        </>
    )
}