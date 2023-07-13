# App-component
```jsx
export default function InterviewPage() {
    const breadcrumbItems = [
        {
            name: "Recruitment",
            link: "/",
            clickable: false
        },
        {
            name: "Evaluation",
            link: "/recruitment_pre_appointment",
            clickable: true
        }
    ]
    return (
        <>
            <UI_Breadcrumb items={breadcrumbItems}/>
            <div className="app-component full-screen-app-component">
                <h1>InterviewPage</h1>
            </div>
        </>
    )
}
```