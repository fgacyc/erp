import {
	Button,
	Input,
	Space,
	Table,
	TableColumnProps,
} from '@arco-design/web-react';
import UIBreadcrumb from '@/components/UIBreadcrumb';
import { IconDelete, IconPlus, IconSearch } from '@arco-design/web-react/icon';
import { useEffect, useRef, useState } from 'react';
import { getReq } from '@/tools/requests';
import { formatData } from './data';
import { addKeys } from '@/tools/tableTools';
import { RefInputType } from '@arco-design/web-react/es/Input/interface';

const UserManagementPastoral = () => {
	const breadcrumbItems = [
		{
			name: 'Users',
			link: '/',
			clickable: false,
		},
		{
			name: 'Pastoral management',
			link: '/users/pastoral',
			clickable: true,
		},
	];

	const [data, setData] = useState<(CGL & { key: number })[]>([]);
	const inputRef = useRef<RefInputType>(null);
	// const [type, setType] = useState('checkbox');
	const type = 'checkbox';
	const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(
		[],
	);

	useEffect(() => {
		getReq('/cgls').then((res: { status: boolean; data: CGL[] }) => {
			if (res.status) setData(addKeys(formatData(res.data)));
		});
	}, []);

	const columns: TableColumnProps[] = [
		{
			title: 'CYC ID',
			dataIndex: 'CYC_ID',
			sorter: (a, b) => a.CYC_ID < b.CYC_ID,
			filterIcon: <IconSearch />,
			filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
				return (
					<div className="arco-table-custom-filter">
						<Input.Search
							ref={inputRef}
							searchButton
							placeholder="Please enter a ministry"
							value={filterKeys?.[0] || ''}
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
				return String(row.CYC_ID) === value;
			},
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					setTimeout(() => inputRef.current?.focus(), 150);
				}
			},
		},
		{
			title: 'Name',
			dataIndex: 'name',
			sorter: (a, b) => a.name.localeCompare(b.name),
			filterIcon: <IconSearch />,
			filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
				return (
					<div className="arco-table-custom-filter">
						<Input.Search
							ref={inputRef}
							searchButton
							placeholder="Please enter a ministry"
							value={filterKeys?.[0] || ''}
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
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					setTimeout(() => inputRef.current?.focus(), 150);
				}
			},
		},

		{
			title: 'Role',
			dataIndex: 'role',
		},
		// {
		//     title: 'Phone',
		//     dataIndex: 'phone_number',
		//     filterIcon: <IconSearch />,
		//     filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
		//         return (
		//             <div className='arco-table-custom-filter'>
		//                 <Input.Search
		//                     ref={inputRef}
		//                     searchButton
		//                     placeholder='Please enter a ministry'
		//                     value={filterKeys[0] || ''}
		//                     onChange={(value) => {
		//                         setFilterKeys(value ? [value] : []);
		//                     }}
		//                     onSearch={() => {
		//                         confirm();
		//                     }}
		//                     allowClear={true}
		//                 />
		//             </div>
		//         );
		//     },
		//     onFilter: (value, row) => {
		//         return  String(row.phone_number).toLowerCase().includes(value.toLowerCase());
		//     },
		//     onFilterDropdownVisibleChange: (visible) => {
		//         if (visible) {
		//             setTimeout(() => inputRef.current.focus(), 150);
		//         }
		//     },
		// },
		{
			title: 'Email',
			dataIndex: 'email',
			filterIcon: <IconSearch />,
			filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
				return (
					<div className="arco-table-custom-filter">
						<Input.Search
							ref={inputRef}
							searchButton
							placeholder="Please enter a ministry"
							value={filterKeys?.[0] || ''}
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
				return row.email.toLowerCase().includes(value.toLowerCase());
			},
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					setTimeout(() => inputRef.current?.focus(), 150);
				}
			},
		},
		{
			title: 'Operation',
			render: (_, record) => (
				<Space>
					{
						<Button
							type="secondary"
							icon={<IconDelete />}
							onClick={() => console.log(record)}
						></Button>
					}
				</Space>
			),
		},
	];

	return (
		<>
			<UIBreadcrumb items={breadcrumbItems} />
			<div className="app-component full-screen-app-component">
				<Button type="primary" icon={<IconPlus />} style={{ margin: '10px 0' }}>
					Register new
				</Button>
				<Table
					columns={columns}
					data={data}
					renderPagination={(paginationNode) => (
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								marginTop: 10,
							}}
						>
							<Space style={{ marginLeft: 16 }}>
								{data ? <span>{data.length} Items</span> : <span>0 items</span>}
							</Space>
							{paginationNode}
						</div>
					)}
					rowSelection={{
						type,
						selectedRowKeys,
						onChange: (selectedRowKeys) => {
							// console.log('onChange:', selectedRowKeys, selectedRows);
							setSelectedRowKeys(selectedRowKeys);
						},
						// onSelect: (selected, record, selectedRows) => {
						//console.log('onSelect:', selected, record, selectedRows);
						// },
					}}
				/>
			</div>
		</>
	);
};
export default UserManagementPastoral;
