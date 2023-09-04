import { doc, updateDoc } from "firebase/firestore";
import { Button } from "@arco-design/web-react";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { PiArmchairFill } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { RiToolsFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

export const Seats = () => {
	const db = useFirestore();

	const [service] = useState("YW_3PM");
	const [serviceData, setServiceData] = useState<{ [key: string]: string[] }>(
		{},
	);
	const seatsRef = doc(db, "seats", "hallsConfig");
	const serviceRef = doc(db, "seats", service);

	const functionAreaRef = useRef<HTMLDivElement>(null);

	const { status, data: seatsData } = useFirestoreDocData<{
		[key: string]: {
			zone_A: SeatsConfig;
			zone_B: SeatsConfig;
			zone_C: SeatsConfig;
			zone_D: SeatsConfig;
		};
	}>(seatsRef, {
		idField: "_id",
	});

	const { status: serviceFetchStatus, data } = useFirestoreDocData(serviceRef);

	useEffect(() => {
		const copy = { ...data };
		delete copy.NO_ID_FIELD;

		setServiceData(copy);
	}, [data]);

	const defaultStruct = {
		L5: {
			zone_A: {
				broken: [],
				col: 12,
				row: 5,
			},
			zone_B: {
				broken: [],
				col: 12,
				row: 5,
			},
			zone_C: {
				broken: [],
				col: 12,
				row: 5,
			},
			zone_D: {
				broken: [],
				col: 12,
				row: 5,
			},
		},
	};
	const generateSectionGrid = (
		sectionName: string,
		section: { row: number; col: number; broken: string[] },
		occupiedSeats?: string[],
	) => {
		const { row, col, broken } = section;
		const grid = [];

		// Create the rows
		for (let c = 0; c < col; c++) {
			const rowCells = [];

			// Create the columns
			for (let r = 0; r < row; r++) {
				const seatCoordinates = `${r + 1},${c + 1}`;
				const isBroken = broken && broken.includes(seatCoordinates);
				const isOccupied =
					occupiedSeats && occupiedSeats.includes(seatCoordinates);
				rowCells.push(
					isBroken ? (
						<RiToolsFill
							onClick={() => alert("broken seat")}
							key={`${r}-${c}`}
							className="bg-[rgb(245,63,63)] text-white border border-[#ccc] p-[5px] text-center text-[25px]"
						/>
					) : isOccupied ? (
						<TiTick
							onClick={() => {
								const idx =
									serviceData[sectionName]?.indexOf(seatCoordinates) ?? -1;

								if (idx > -1) {
									updateDoc(serviceRef, {
										...serviceData,
										[sectionName]: serviceData[sectionName]
											?.slice(0, idx)
											.concat(serviceData[sectionName]?.slice(idx + 1) ?? ""), //serviceData[sectionName]?.toSpliced(idx, 1),
									});
								}
							}}
							key={`${r}-${c}`}
							className="bg-[#4bb543] text-white border border-[#ccc] p-[5px] text-center text-[25px]"
						/>
					) : (
						<PiArmchairFill
							key={`${r}-${c}`}
							onClick={() => {
								serviceData[sectionName]?.push(seatCoordinates);
								updateDoc(serviceRef, serviceData);
							}}
							className="bg-[rgb(22,93,255)] text-white border border-[#ccc] p-[5px] text-center text-[25px]"
						/>
					),
				);
			}

			grid.push(<div key={c}>{rowCells}</div>);
		}

		return grid;
	};

	return status === "success" &&
		serviceFetchStatus === "success" &&
		seatsData &&
		seatsData["L5"] ? (
		<div
			style={{ position: "relative" }}
			className="app-component full-screen-app-component overflow-scroll"
			ref={functionAreaRef}
		>
			<div
				className="grid gap-3"
				style={{
					gridTemplateColumns: `repeat(${
						Object.entries(seatsData["L5"]).length
					}, minmax(400px, 1fr))`,
				}}
			>
				{Object.entries(seatsData["L5"])
					.sort((a, b) => {
						if (a[0] < b[0]) {
							return -1;
						}
						if (a[0] > b[0]) {
							return 1;
						}
						return 0;
					})
					.map(([sectionName, section]) => (
						<div
							key={sectionName}
							className="w-[400px] m-[10px] p-[10px] border border-[#ccc]"
						>
							<h3 className="w-full text-center">
								{sectionName.replace("_", " ").toUpperCase()}
							</h3>
							<div
								className="grid gap-2"
								style={{
									gridTemplateColumns: `repeat(${section.col}, minmax(0, 1fr))`,
								}}
							>
								{generateSectionGrid(
									sectionName,
									section,
									serviceData[sectionName],
								)}
							</div>
						</div>
					))}
			</div>
			<Button
				onClick={() => {
					updateDoc(seatsRef, defaultStruct);
					updateDoc(serviceRef, {
						zone_A: [],
						zone_B: [],
						zone_C: [],
						zone_D: [],
					});
				}}
			>
				Reset
			</Button>
			{/* <pre>{JSON.stringify(serviceData, null, 2)}</pre> */}
		</div>
	) : (
		<div className="app-component full-screen-app-component">Loading</div>
		// <Button
		// 	onClick={() => {
		// 		updateDoc(seatsRef, defaultStruct);
		// 		updateDoc(serviceRef, {
		// 			zone_A: [],
		// 			zone_B: [],
		// 			zone_C: [],
		// 			zone_D: [],
		// 		});
		// 	}}
		// >
		// 	Reset
		// </Button>
	);
};
