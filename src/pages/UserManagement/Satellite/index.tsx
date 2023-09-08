import { SatelliteForm } from "@/components/Form/Satellite";
import { useAPI } from "@/lib/openapi";
import { addKeys } from "@/tools/tableTools";
import { transformSatelliteFromAPI } from "@/utils/transform";
import { Button, Input, Space, Table } from "@arco-design/web-react";
import { IconPlus, IconSearch } from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";

const PastoralRolesPage = () => {
	const api = useAPI();
	const [satellites, setSatellites] = useState<Satellite[]>();
	const [selectedSatellite, setSelectedSatellite] = useState<Satellite>();
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);

	const getSatellites = () => {
		setLoading(true);
		api.GET("/satellites", {}).then((res) => {
			if (!res.data) return;
			setSatellites(
				addKeys<Satellite>(res.data.map((d) => transformSatelliteFromAPI(d))),
			);
			setLoading(false);
		});
	};

	useEffect(() => {
		getSatellites();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalVisible]);

	return (
		<>
			<SatelliteForm
				visible={modalVisible}
				setVisible={setModalVisible}
				satellite={selectedSatellite}
				title={selectedSatellite?.name ?? "Add New Satellite?"}
				checkDetails={selectedSatellite ? true : false}
				onClose={() => setSelectedSatellite(undefined)}
			/>
			<div className="app-component full-screen-app-component">
				<Button
					type="primary"
					icon={<IconPlus />}
					onClick={() => setModalVisible(true)}
					className="mt-5 mx-5"
				>
					Add new satellite
				</Button>

				<Table
					loading={loading}
					className="m-3"
					data={satellites?.sort((a, b) => a.no - b.no)}
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
							title: "M100 No.",
							dataIndex: "no",
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
													.GET("/satellites/{id}", {
														params: {
															path: {
																id: record.id,
															},
														},
													})
													.then((res) => {
														if (!res.data) return;
														setSelectedSatellite(
															transformSatelliteFromAPI(res.data),
														);

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

export default PastoralRolesPage;
