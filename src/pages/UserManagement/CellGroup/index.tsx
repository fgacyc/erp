import { CGForm } from "@/components/Form/CG";
import UIBreadcrumb from "@/components/UIBreadcrumb";
import { useAPI } from "@/lib/openapi";
import { addKeys } from "@/tools/tableTools";
import { transformCGFromAPI } from "@/utils/transform";
import { Button, Input, Space, Table } from "@arco-design/web-react";
import { IconPlus, IconSearch } from "@arco-design/web-react/icon";
import { FunctionComponent, useEffect, useState } from "react";

const CellGroupPage = () => {
	const breadcrumbItems = [
		{
			name: "Users",
			link: "/",
		},
		{
			name: "Members",
			link: "/users/pastoral",
		},
		{
			name: "Cell Groups",
			link: "/users/pastoral/cg",
		},
	];

	const api = useAPI();
	const [cgs, setCGs] = useState<CG[]>();
	const [selectedCG, setSelectedCG] = useState<CG>();
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);

	const getCGs = () => {
		setLoading(true);
		api.GET("/connect-groups", {}).then((res) => {
			if (!res.data) return;
			setCGs(addKeys<CG>(res.data.map((d) => transformCGFromAPI(d))));
			setLoading(false);
		});
	};

	useEffect(() => {
		getCGs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalVisible]);

	return (
		<>
			<CGForm
				visible={modalVisible}
				setVisible={setModalVisible}
				cg={selectedCG}
				title={selectedCG?.name ?? "Add New CG?"}
				checkDetails={selectedCG ? true : false}
				onClose={() => setSelectedCG(undefined)}
			/>
			<UIBreadcrumb items={breadcrumbItems} />
			<div className="app-component full-screen-app-component">
				<Button
					type="primary"
					icon={<IconPlus />}
					onClick={() => setModalVisible(true)}
					className="mt-5 mx-5"
				>
					Add new CG
				</Button>

				<Table
					loading={loading}
					className="m-3"
					data={cgs?.sort((a, b) => a.no - b.no)}
					columns={[
						{
							title: "Name",
							dataIndex: "name",

							render: (_, record) => <strong>{record.name}</strong>,
							filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
								return (
									<div className="arco-table-custom-filter">
										<Input.Search
											searchButton
											placeholder="Please enter a name"
											value={filterKeys?.[0] || ""}
											onChange={(value) => {
												setFilterKeys?.(value ? [value] : []);
											}}
											onSearch={() => {
												confirm?.();
											}}
											allowClear={true}
										/>
									</div>
								);
							},
							onFilter: (value, row) => {
								return row.name.toLowerCase().includes(value.toLowerCase());
							},
						},

						{
							title: "Satellite",
							render: (_, record) => <Satellite id={record.satelliteId} />,
						},
						{
							title: "Details",
							render: (_, record) => (
								<Space>
									{
										<Button
											type="secondary"
											icon={<IconSearch />}
											onClick={async () => {
												setLoading(true);
												api
													.GET("/connect-groups/{id}", {
														params: {
															path: {
																id: record.id,
															},
														},
													})
													.then((res) => {
														if (!res.data) return;
														setSelectedCG(transformCGFromAPI(res.data));
														setModalVisible(true);
													});
											}}
										/>
									}
								</Space>
							),
						},
					]}
				/>
			</div>
		</>
	);
};

export default CellGroupPage;

const Satellite: FunctionComponent<{ id: string }> = ({ id }) => {
	const api = useAPI();

	const [sat, setSat] = useState("Loading...");

	useEffect(() => {
		setSat("Loading...");
		if (!id) {
			setSat("No Assigned Satellites.");
			return;
		}
		api
			.GET("/satellites/{id}", {
				params: { path: { id: id } },
			})
			.then(({ data }) => setSat(String(data?.name)))
			.catch(() => setSat("Error."));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	return <>{sat}</>;
};
