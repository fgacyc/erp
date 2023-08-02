import { doc, updateDoc } from 'firebase/firestore';
import { Button } from '@arco-design/web-react';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { PiArmchairFill } from 'react-icons/pi';
import { TiTick } from 'react-icons/ti';
import { RiToolsFill } from 'react-icons/ri';
import { useEffect, useRef, useState } from 'react';

export const Seats = () => {
	const db = useFirestore();

	const [service, setService] = useState('YW_3PM');
	const [serviceData, setServiceData] = useState({});
	const seatsRef = doc(db, 'seats', 'hallsConfig');
	const serviceRef = doc(db, 'seats', service);

	const functionAreaRef = useRef();

	const { status, data: seatsData } = useFirestoreDocData(seatsRef, {
		idField: '_id',
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
				broken: ['3,5'],
				col: 12,
				row: 5,
			},
			zone_B: {
				broken: ['7,3'],
				col: 12,
				row: 5,
			},
			zone_C: {
				broken: ['2,3'],
				col: 12,
				row: 5,
			},
			zone_D: {
				broken: ['3,5'],
				col: 12,
				row: 5,
			},
		},
	};
	const generateSectionGrid = (sectionName, section, occupiedSeats) => {
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
							onClick={() => alert('broken seat')}
							key={`${r}-${c}`}
							style={{
								background: 'rgb(245,63,63)',
								color: '#fff',
								border: '1px solid #ccc',
								padding: '5px',
								textAlign: 'center',
							}}
						/>
					) : isOccupied ? (
						<TiTick
							onClick={() => {
								const idx = serviceData[sectionName].indexOf(seatCoordinates);

								if (idx > -1) {
									updateDoc(serviceRef, {
										...serviceData,
										[sectionName]: serviceData[sectionName].toSpliced(idx, 1),
									});
								}
							}}
							key={`${r}-${c}`}
							style={{
								background: '#4bb543',
								color: '#fff',
								border: '1px solid #ccc',
								padding: '5px',
								textAlign: 'center',
							}}
						/>
					) : (
						<PiArmchairFill
							key={`${r}-${c}`}
							onClick={() => {
								serviceData[sectionName].push(seatCoordinates);
								updateDoc(serviceRef, serviceData);
							}}
							style={{
								background: 'rgb(22,93,255)',
								color: '#fff',
								border: '1px solid #ccc',
								padding: '5px',
								textAlign: 'center',
							}}
						/>
					),
				);
			}

			grid.push(<div key={c}>{rowCells}</div>);
		}

		return grid;
	};

	return status === 'success' && serviceFetchStatus === 'success' ? (
		<div
			style={{ position: 'relative' }}
			className="app-component full-screen-app-component overflow-scroll"
			ref={functionAreaRef}
		>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${
						Object.entries(seatsData['L5']).length
					}, minmax(400px, 1fr))`,
					gap: '10px',
				}}
			>
				{Object.entries(seatsData['L5'])
					.sort((a, b) => {
						if (a[0] < b[0]) {
							return -1;
						}
						if (a[0] > b[0]) {
							return 1;
						}
					})
					.map(([sectionName, section]) => (
						<div
							key={sectionName}
							style={{
								// width: '100%',
								width: '350px',
								margin: '10px',
								padding: '10px',
								border: '1px solid #ccc',
							}}
						>
							<h3 style={{ width: '100%', textAlign: 'center' }}>
								{sectionName.replace('_', ' ').toUpperCase()}
							</h3>
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: `repeat(${section.col}, minmax(0, 1fr))`,
									gap: '5px',
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
			<pre>{JSON.stringify(serviceData, null, 2)}</pre>
		</div>
	) : (
		<div className="app-component full-screen-app-component">Loading</div>
	);
};
