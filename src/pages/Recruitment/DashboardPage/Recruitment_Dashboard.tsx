import {
	ForwardRefExoticComponent,
	FunctionComponent,
	RefAttributes,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { Card, Typography, Space, Cascader } from '@arco-design/web-react';
import { IconCheck, IconProps } from '@arco-design/web-react/icon';
import {
	Chart as ChartJS,
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);
import './recruitment_dashboard.css';
import { getReq } from '@/tools/requests';
import { getInfoCount, getTotals } from './dataCalculate';
import UIBreadcrumb from '@/components/UIBreadcrumb';
import {
	getEvaluationRatio,
	getInterviewRatio,
	getPreScreeningRatio,
	getRecruiterRatio,
	options_bar_data,
	options_pie_data,
} from './data';

interface RecruitmentDashboardCardProps {
	color: `#${string}`;
	text: string;
	num: number;
	Icon: ForwardRefExoticComponent<IconProps & RefAttributes<unknown>>;
}

interface BarChartDataset {
	label: string;
	data: number[];
	backgroundColor: string;
}

interface PieChartDataset {
	overall: number[];
	people_experience: number[];
	people: number[];
	general_affair: number[];
	technology: number[];
	creative: number[];
	production: number[];
	arts: number[];
	worship: number[];
	communication: number[];
	social_media: number[];
	design: number[];
	photography: number[];
	wonderkids: number[];
}

interface PieChartLabel {
	overall: string[];
	people_experience: string[];
	people: string[];
	general_affair: string[];
	technology: string[];
	creative: string[];
	production: string[];
	arts: string[];
	worship: string[];
	communication: string[];
	social_media: string[];
	design: string[];
	photography: string[];
	wonderkids: string[];
}

interface PieChartDatasetWithLabel {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		backgroundColor: (string | undefined)[];
		borderWidth: number;
	}[];
}

// eslint-disable-next-line react-refresh/only-export-components
const RecruitmentDashboardCard: FunctionComponent<
	RecruitmentDashboardCardProps
> = ({ color, text, num, Icon }) => {
	return (
		<Card className="recruitment-dashboard-card" hoverable>
			<Space
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Icon
					style={{ backgroundColor: color }}
					className="recruitment-dashboard-card-icon"
				/>
				<Space
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography.Text>{text}</Typography.Text>
					<Typography.Text style={{ fontWeight: 600 }}>{num}</Typography.Text>
				</Space>
			</Space>
		</Card>
	);
};

const defaultPieChartDatasetWithLabel = {
	datasets: [
		{
			label: '',
			data: [],
			backgroundColor: [],
			borderWidth: 0,
		},
	],
	labels: [],
};

export default function Recruitment_Dashboard() {
	// const [allData, setAllData] = useState<Recruiter[]>();
	const [totals, setTotals] = useState([0, 0, 0]);
	const [allBarChartData, setAllBarChartData] = useState<{
		[key: string]: BarChartDataset[];
	}>({});
	const [barChartLabels, setBarChartLabels] = useState<string[]>([]);
	const [barChartData, setBarChartData] = useState<BarChartDataset[]>([]);
	// const [allPieChartData, setAllPieChartData] = useState<PieChartDataset>();
	const [pieChartLabels, setPieChartLabels] = useState<string[]>();
	const [pieChartData, setPieChartData] = useState<number[]>();
	const [pre_screening_pie, setPre_screening_pie] =
		useState<PieChartDatasetWithLabel>(defaultPieChartDatasetWithLabel);
	const [interview_pie, setInterview_pie] = useState<PieChartDatasetWithLabel>(
		defaultPieChartDatasetWithLabel,
	);
	const [evaluation_pie, setEvaluation_pie] =
		useState<PieChartDatasetWithLabel>(defaultPieChartDatasetWithLabel);
	const [recruiter_pie, setRecruiter_pie] = useState<PieChartDatasetWithLabel>(
		defaultPieChartDatasetWithLabel,
	);

	const colors: `#${string}`[] = useMemo(
		() => [
			'#D8E2DC',
			'#FFE5D9',
			'#FFCAD4',
			'#F4ACB7',
			'#9D8189',
			'#A8D8EA',
			'#FFAAA6',
			'#FF8C94',
			'#FF1D47',
			'#F28123',
			'#FFC90E',
			'#FFFF72',
			'#D1D075',
			'#C7EF86',
			'#7BE495',
		],
		[],
	);

	const barChartLabel: {
		[key: string]: string[];
	} = {
		overall: ['Wonderkids', 'Young Warrior', 'General Service', 'Others'],
		wonderkids: ['Wonderkids'],
		young_warrior: ['Heart', 'Move', 'Force', 'Voice', 'Mind'],
		general_service: ['YP Zone', 'Pro Family', 'Young Dreamer', 'Joshua Zone'],
		others: [
			'Serdang',
			'Kepong',
			'USJ',
			'Sg Long',
			'Setapak',
			'The Blessing',
			'To Be Confirmed',
		],
	};

	const pieChartLabel: PieChartLabel = {
		overall: ['People Experience', 'Creative', 'Communication', 'Wonderkids'],
		people_experience: ['People', 'General Affair', 'Technology'],
		people: ['Usher', 'Security'],
		general_affair: ['Admin', 'Lounge', 'Shuttle'],
		technology: ['Software Development', 'Project Management'],
		creative: ['Production', 'Arts', 'Worship'],
		production: [
			'Stage Management',
			'Multimedia',
			'Sound',
			'Lighting',
			'Translation',
		],
		arts: ['Dance', 'Fashion & Image', 'Drama'],
		worship: ['Musician', 'Vocal'],
		communication: ['Social Media', 'Design', 'Photography'],
		social_media: ['Content Creation', 'Editorial'],
		design: ['Graphic Design', 'Multimedia Design'],
		photography: ['Photographer'],
		wonderkids: ['Children Minister'],
	};

	useEffect(() => {
		getReq('/recruiters?account=admin&password=admin').then(
			(res: Recruiter[]) => {
				// setAllData(res);
				setTotals(getTotals(res));

				const barChartDatasets: {
					overall: BarChartDataset[];
					wonderkids: BarChartDataset[];
					young_warrior: BarChartDataset[];
					general_service: BarChartDataset[];
					others: BarChartDataset[];
				} = {
					overall: [
						{
							label: 'Wonderkids',
							data: [
								getInfoCount(res, 'pastoral_team', 0, 'wonderkids'),
								0,
								0,
								0,
							],
							backgroundColor: colors[0] ?? '',
						},
						{
							label: 'Young Warrior',
							data: [
								0,
								getInfoCount(res, 'pastoral_team', 0, 'young_warrior'),
								0,
								0,
							],
							backgroundColor: colors[1] ?? '',
						},
						{
							label: 'General Service',
							data: [
								0,
								0,
								getInfoCount(res, 'pastoral_team', 0, 'general_service'),
								0,
							],
							backgroundColor: colors[2] ?? '',
						},
						{
							label: 'Others',
							data: [0, 0, 0, getInfoCount(res, 'pastoral_team', 0, 'others')],
							backgroundColor: colors[3] ?? '',
						},
					],
					wonderkids: [
						{
							label: 'Wonderkids',
							data: [getInfoCount(res, 'pastoral_team', 1, 'wonderkids')],
							backgroundColor: colors[0] ?? '',
						},
					],
					young_warrior: [
						{
							label: 'Heart',
							data: [
								getInfoCount(res, 'pastoral_team', 1, 'heart'),
								0,
								0,
								0,
								0,
							],
							backgroundColor: colors[0] ?? '',
						},
						{
							label: 'Move',
							data: [0, getInfoCount(res, 'pastoral_team', 1, 'move'), 0, 0, 0],
							backgroundColor: colors[1] ?? '',
						},
						{
							label: 'Force',
							data: [
								0,
								0,
								getInfoCount(res, 'pastoral_team', 1, 'force'),
								0,
								0,
							],
							backgroundColor: colors[2] ?? '',
						},
						{
							label: 'Voice',
							data: [
								0,
								0,
								0,
								getInfoCount(res, 'pastoral_team', 1, 'voice'),
								0,
							],
							backgroundColor: colors[3] ?? '',
						},
						{
							label: 'Mind',
							data: [0, 0, 0, 0, getInfoCount(res, 'pastoral_team', 1, 'mind')],
							backgroundColor: colors[4] ?? '',
						},
					],
					general_service: [
						{
							label: 'YP Zone',
							data: [getInfoCount(res, 'pastoral_team', 1, 'yp_zone'), 0, 0, 0],
							backgroundColor: colors[0] ?? '',
						},
						{
							label: 'Pro Family',
							data: [
								0,
								getInfoCount(res, 'pastoral_team', 1, 'pro_family'),
								0,
								0,
							],
							backgroundColor: colors[1] ?? '',
						},
						{
							label: 'Young Dreamer',
							data: [
								0,
								0,
								getInfoCount(res, 'pastoral_team', 1, 'young_dreamer'),
								0,
							],
							backgroundColor: colors[2] ?? '',
						},
						{
							label: 'Joshua Zone',
							data: [
								0,
								0,
								0,
								getInfoCount(res, 'pastoral_team', 1, 'joshua_zone'),
							],
							backgroundColor: colors[3] ?? '',
						},
					],
					others: [
						{
							label: 'Serdang',
							data: [
								getInfoCount(res, 'pastoral_team', 1, 'serdang'),
								0,
								0,
								0,
								0,
								0,
							],
							backgroundColor: colors[0] ?? '',
						},
						{
							label: 'Kepong',
							data: [
								0,
								getInfoCount(res, 'pastoral_team', 1, 'kepong'),
								0,
								0,
								0,
								0,
							],
							backgroundColor: colors[1] ?? '',
						},
						{
							label: 'USJ',
							data: [
								0,
								0,
								getInfoCount(res, 'pastoral_team', 1, 'usj'),
								0,
								0,
								0,
							],
							backgroundColor: colors[2] ?? '',
						},
						{
							label: 'Sg Long',
							data: [
								0,
								0,
								0,
								getInfoCount(res, 'pastoral_team', 1, 'sg_long'),
								0,
								0,
							],
							backgroundColor: colors[3] ?? '',
						},
						{
							label: 'Setapak',
							data: [
								0,
								0,
								0,
								0,
								getInfoCount(res, 'pastoral_team', 1, 'setapak'),
								0,
								0,
							],
							backgroundColor: colors[4] ?? '',
						},
						{
							label: 'The Blessing',
							data: [
								0,
								0,
								0,
								0,
								0,
								getInfoCount(res, 'pastoral_team', 1, 'the_blessing'),
								0,
							],
							backgroundColor: colors[5] ?? '',
						},
						{
							label: 'To Be Confirmed',
							data: [
								0,
								0,
								0,
								0,
								0,
								0,
								getInfoCount(res, 'pastoral_team', 1, 'to_be_confirmed'),
							],
							backgroundColor: colors[6] ?? '',
						},
					],
				};

				setAllBarChartData(barChartDatasets);
				setBarChartLabels(barChartLabel.overall ?? []);
				setBarChartData(barChartDatasets.overall);

				const pieChartDatasets: PieChartDataset = {
					overall: [
						getInfoCount(res, 'ministry', 0, 'people_experience'),
						getInfoCount(res, 'ministry', 0, 'creative'),
						getInfoCount(res, 'ministry', 0, 'communication'),
						getInfoCount(res, 'ministry', 0, 'wonderkids'),
					],
					people_experience: [
						getInfoCount(res, 'ministry', 1, 'people'),
						getInfoCount(res, 'ministry', 1, 'general_affair'),
						getInfoCount(res, 'ministry', 1, 'technology'),
					],
					people: [
						getInfoCount(res, 'ministry', 2, 'usher'),
						getInfoCount(res, 'ministry', 2, 'security'),
					],
					general_affair: [
						getInfoCount(res, 'ministry', 2, 'admin'),
						getInfoCount(res, 'ministry', 2, 'lounge'),
						getInfoCount(res, 'ministry', 2, 'shuttle'),
					],
					technology: [
						getInfoCount(res, 'ministry', 2, 'software development'),
						getInfoCount(res, 'ministry', 2, 'project management'),
					],
					creative: [
						getInfoCount(res, 'ministry', 1, 'production'),
						getInfoCount(res, 'ministry', 1, 'arts'),
						getInfoCount(res, 'ministry', 1, 'worship'),
					],
					production: [
						getInfoCount(res, 'ministry', 2, 'stage management'),
						getInfoCount(res, 'ministry', 2, 'multimedia'),
						getInfoCount(res, 'ministry', 2, 'sound'),
						getInfoCount(res, 'ministry', 2, 'lighting'),
						getInfoCount(res, 'ministry', 2, 'translation'),
					],
					arts: [
						getInfoCount(res, 'ministry', 2, 'dance'),
						getInfoCount(res, 'ministry', 2, 'fashion&image'),
						getInfoCount(res, 'ministry', 2, 'drama'),
					],
					worship: [
						getInfoCount(res, 'ministry', 2, 'musician'),
						getInfoCount(res, 'ministry', 2, 'vocal'),
					],
					communication: [
						getInfoCount(res, 'ministry', 1, 'social_media'),
						getInfoCount(res, 'ministry', 1, 'design'),
						getInfoCount(res, 'ministry', 1, 'photography'),
					],
					social_media: [
						getInfoCount(res, 'ministry', 2, 'content creation'),
						getInfoCount(res, 'ministry', 2, 'editorial'),
					],
					design: [
						getInfoCount(res, 'ministry', 2, 'graphic design'),
						getInfoCount(res, 'ministry', 2, 'multimedia design'),
					],
					photography: [getInfoCount(res, 'ministry', 2, 'photography')],
					wonderkids: [getInfoCount(res, 'ministry', 2, 'children minister')],
				};

				// setAllPieChartData(pieChartDatasets);
				setPieChartLabels(pieChartLabel.overall);
				setPieChartData(pieChartDatasets.overall);

				setPre_screening_pie(getPreScreeningRatio(res));
				setInterview_pie(getInterviewRatio(res));
				setEvaluation_pie(getEvaluationRatio(res));
				//console.log(getRecruiterRatio(res))
				setRecruiter_pie(getRecruiterRatio(res));
			},
		);
	}, [barChartLabel.overall, colors, pieChartLabel.overall]);

	const options_bar = options_bar_data;

	const options_pie = options_pie_data;

	const options_chart = {
		plugins: {
			title: {
				display: false,
			},
		},
		responsive: true,
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
			},
		},
	};

	const barchart_data = {
		labels: barChartLabels,
		datasets: barChartData,
	};

	const data_pie = {
		labels: pieChartLabels,
		datasets: [
			{
				label: '# of Applicants',
				data: pieChartData,
				backgroundColor: colors,
			},
		],
	};

	const breadcrumbItems = [
		{
			name: 'Recruitment',
			link: '/',
			clickable: false,
		},
		{
			name: 'Dashboard',
			link: '/recruitment_dashboard',
			clickable: true,
		},
	];

	return (
		<>
			<UIBreadcrumb items={breadcrumbItems} />
			<div className="recruitment-dashboard-con app-component">
				<div style={{ display: 'flex', height: '100%', flexDirection: 'row' }}>
					<div className="left-side">
						<div className="upper">
							<RecruitmentDashboardCard
								color={colors[0] ?? '#'}
								text="Applicants"
								num={totals[0] ?? 0}
								Icon={IconCheck}
							/>
							<RecruitmentDashboardCard
								color={colors[2] ?? '#'}
								text="Pending"
								num={totals[1] ?? 0}
								Icon={IconCheck}
							/>
							<RecruitmentDashboardCard
								color={colors[1] ?? '#'}
								text="Pre-Pass"
								num={totals[2] ?? 0}
								Icon={IconCheck}
							/>
							<RecruitmentDashboardCard
								color={'#d8e2dc'}
								text="Pass"
								num={totals[3] ?? 0}
								Icon={IconCheck}
							/>
						</div>
						<Card hoverable>
							<Space>
								<Typography.Text style={{ fontWeight: 600 }}>
									Pastoral Team Summary
								</Typography.Text>
								<Cascader
									placeholder="Select Pastoral Team"
									options={options_bar}
									changeOnSelect
									allowClear
									showSearch
									onChange={(value) => {
										if (!value || value.length === 0) return;

										const pastoral_team_value =
											(value as string[]).length > 1 ? value[1] : value[0];

										if (pastoral_team_value !== undefined) {
											setBarChartLabels(
												barChartLabel[pastoral_team_value as string] ?? [],
											);
											setBarChartData(
												allBarChartData[pastoral_team_value as string] ?? [],
											);
										}
									}}
								/>
							</Space>
							{barChartLabels && barChartData && (
								<Bar options={options_chart} data={barchart_data} />
							)}
						</Card>
						<div className="left-side-bottom">
							<div className="smallPie">
								<Typography.Text style={{ fontWeight: 600 }}>
									Pre-Screening
								</Typography.Text>
								{pre_screening_pie && <Pie data={pre_screening_pie} />}
							</div>
							<div className="smallPie">
								<Typography.Text style={{ fontWeight: 600 }}>
									Interview
								</Typography.Text>
								{pre_screening_pie && <Pie data={interview_pie} />}
							</div>
							<div className="smallPie">
								{evaluation_pie !== null &&
								evaluation_pie?.datasets[0]?.data.toString() === '0,0,0,0' ? (
									<Typography.Text style={{ fontWeight: 600 }}>
										Evaluation(Not Started)
									</Typography.Text>
								) : (
									<Typography.Text style={{ fontWeight: 600 }}>
										Evaluation
									</Typography.Text>
								)}
								{pre_screening_pie && <Pie data={evaluation_pie} />}
							</div>
						</div>
					</div>
					<div className="right-side">
						<Card className="right-side-bottom" hoverable>
							<Space
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								<Typography.Text style={{ fontWeight: 600 }}>
									Ministry Application Summary
								</Typography.Text>
								<Cascader
									placeholder="Select Ministry Team"
									style={{ marginTop: 10 }}
									options={options_pie}
									changeOnSelect
									expandTrigger="hover"
									// allowClear
									// showSearch
									onChange={(value) => {
										const ministry_value =
											value.length > 1 ? value[1] : value[0];
										if (ministry_value !== undefined) {
											setBarChartLabels(
												barChartLabel[ministry_value as string] ?? [],
											);
											setBarChartData(
												allBarChartData[ministry_value as string] ?? [],
											);
										}
									}}
								/>
							</Space>
							<Doughnut data={data_pie} style={{ marginTop: 10 }} />
						</Card>
						<Card className="right-side-bottom">
							<Typography.Text style={{ fontWeight: 600 }}>
								Overall progress
							</Typography.Text>
							{recruiter_pie && <Doughnut data={recruiter_pie} />}
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}
