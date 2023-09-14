# App-component

```jsx
export default function Interview_table() {
	const breadcrumbItems = [
		{
			name: 'Recruitment',
			link: '/',
			clickable: false,
		},
		{
			name: 'Evaluation',
			link: '/recruitment_pre_appointment',
			clickable: true,
		},
	];
	return (
		<>
			{/*<UIBreadcrumb items={breadcrumbItems} />*/}
			<div className="app-component full-screen-app-component">
				<h1>Interview_table</h1>
			</div>
		</>
	);
}
```

```jsx
<Modal
	title="Modal Title"
	visible={visible}
	onOk={() => setVisible(false)}
	onCancel={() => setVisible(false)}
	autoFocus={false}
	focusLock={true}
>
	<p>
		You can customize modal body text by the current situation. This modal will
		be closed immediately once you press the OK button.
	</p>
</Modal>
```

```jsx

```
