'use client';
import React, { useEffect, useState } from 'react';
import { GiOilDrum } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi2';
import { FaUserPlus } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import {
	Chart as Chartjs,
	BarElement,
	CategoryScale,
	LinearScale,
	ArcElement,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';

Chartjs.register(CategoryScale, LinearScale, BarElement, ArcElement);

export default function DasboardComponent() {
	const router = useRouter();
	const [warna, setWarna] = useState('baru');

	var data = {
		labels: [
			'Januari',
			'Februari',
			'Maret',
			'April',
			'Mei',
			'Juni',
			'Juli',
			'Agustus',
			'September',
			'Oktober',
			'November',
			'Desember',
		],
		datasets: [
			{
				label: '# of Votes',
				data: [
					80, 100, 130, 150, 200, 500, 800, 700, 600, 950, 900, 1200, 1800,
				],
				backgroundColor: ['red', 'blue', 'green', 'purple', 'black', 'orange'],
				borderWidth: 1,
			},
		],
	};

	var option = {
		maintainAspectRatio: false,
		legend: {
			labels: {
				fontSize: 16,
			},
		},
	};

	const checkAuth = () => {
		const cookie = new cookies();
		const getCookie = cookie.get('jwt');
		if (!getCookie) {
			console.log('Lom Login');
			router.push('/');
		} else {
			console.log('sudah login');
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<div className="md:pr-5 pr-0 pb-8">
			<div className="header ml-0 md:ml-10 lg:ml-72 mt-6 md:flex block justify-between items-center pr-10">
				<h1 className="text-[#94D60A] lg:text-3xl font-bold text-lg md:text-xl px-5 lg:px-0">
					Dashboard
				</h1>
				<div className="waktu block md:flex items-center gap-10">
					<div className="btn-group grid grid-cols-4 md:w-52 w-10/12 pt-1 mx-auto mt-3 md:mt-0 ">
						<button
							className={`border-[#94D60A] text-white border-2 btn btn-outline  rounded-tl-md rounded-bl-md border-r-0 ${
								warna == 'baru' ? 'text-white bg-[#94D60A]' : 'text-[#94D60A]'
							} text-sm`}
							onClick={(e) => setWarna('baru')}
						>
							Baru
						</button>
						<button
							className={`border-[#94D60A] text-white border-2 btn btn-outline  ${
								warna == 'hari' ? 'text-white bg-[#94D60A]' : 'text-[#94D60A]'
							} text-sm`}
							onClick={(e) => setWarna('hari')}
						>
							7 hari
						</button>
						<button
							className={` border-2 border-[#94D60A] border-l-0 btn btn-outlinerounded-br-md ${
								warna == 'bulan' ? 'text-white bg-[#94D60A]' : 'text-[#94D60A]'
							} text-sm`}
							onClick={(e) => setWarna('bulan')}
						>
							1 bulan
						</button>
						<button
							className={` border-2 border-[#94D60A] border-l-0 btn btn-outline rounded-tr-md rounded-br-md ${
								warna == 'tahun' ? 'text-white bg-[#94D60A]' : 'text-[#94D60A]'
							} text-sm`}
							onClick={(e) => setWarna('tahun')}
						>
							1 tahun
						</button>
					</div>
					<div className="input mx-auto w-10/12 mt-3 md:mt-0">
						<input
							type="date"
							placeholder="p"
							className="bg-[#F8FFE9] text-[#94D60A] border-[#94D60A] border-2 rounded-md p-[1px] md:text-sm mt-1 px-2 |pr-5 text-sm border-r-0 rounded-tr-none rounded-br-none w-auto"
						/>
						<input
							type="date"
							placeholder="p"
							className="bg-[#F8FFE9] text-[#94D60A] border-[#94D60A] border-2 rounded-md p-[1px] md:text-sm mt-1 px-2 |pr-5 text-sm border-l-0 rounded-tl-none rounded-bl-none w-auto"
						/>
					</div>
				</div>
			</div>
			<div className="card block md:flex md:ml-10 lg:ml-72 m-5 items-center justify-between pr-10 mt-5 w-10/12 md:w-auto mx-auto">
				<div className="totalMinyak shadow-md mt-5 lg:mt-0 bg-[#94D60A] text-white p-5 rounded-md text-center px-10 hover:scale-105 duration-200 cursor-pointer ">
					<GiOilDrum className="mx-auto block text-lg" />
					<h1 className="text-xl font-bold mt-2">
						{warna == 'baru' ? '1000 ML' : ''}
						{warna == 'hari' ? '5000 ML' : ''}
						{warna == 'bulan' ? '15000 ML' : ''}
						{warna == 'tahun' ? '65000 ML' : ''}
					</h1>
					<p className=" text-xs">Total Minyak</p>
				</div>
				<div className="TotalTransaksi shadow-md mt-5 lg:mt-0 bg-[#2F80ED] text-white p-5 rounded-md text-center px-10 hover:scale-105 duration-200 cursor-pointer">
					<HiUserGroup className="mx-auto block text-lg" />
					<h1 className="text-xl font-bold mt-2">
						{warna == 'baru' ? '2 User' : ''}
						{warna == 'hari' ? '10 User' : ''}
						{warna == 'bulan' ? '15.000 User' : ''}
						{warna == 'tahun' ? '1.000.000 User' : ''}
					</h1>
					<p className=" text-xs">Total Transaksi</p>
				</div>
				<div className="UserBaru shadow-md mt-5 lg:mt-0 bg-[#EB5757] text-white p-5 rounded-md text-center px-10 hover:scale-105 duration-200 cursor-pointer">
					<FaUserPlus className="mx-auto block text-lg" />
					<h1 className="text-xl font-bold mt-2">
						{warna == 'baru' ? '1 User' : ''}
						{warna == 'hari' ? '10 User' : ''}
						{warna == 'bulan' ? '100 User' : ''}
						{warna == 'tahun' ? '250 User' : ''}
					</h1>
					<p className=" text-xs">Baru</p>
				</div>
				<div className="VerifikasiBaru shadow-md mt-5 lg:mt-0 bg-[#F2C94C] text-white p-5 rounded-md text-center px-10 hover:scale-105 duration-200 cursor-pointer">
					<IoIosAddCircle className="mx-auto block text-lg" />
					<h1 className="text-xl font-bold mt-2">
						{warna == 'baru' ? '5' : ''}
						{warna == 'hari' ? '6' : ''}
						{warna == 'bulan' ? '12' : ''}
						{warna == 'tahun' ? '33' : ''}
					</h1>
					<p className=" text-xs">Verifikasi Baru</p>
				</div>
			</div>
			<div className=" ml-0 md:ml-10 lg:ml-72 mt-10 md:w-auto w-full min-h-full shadow-md block md:flex justify-around items-center bg-[#F8FFE9] px-5">
				<div className="BarChart w-full md:w-2/3 ">
					<Bar height={400} data={data} options={option} />
				</div>
				<div className="DoughChartWrap">
					<div className="data mt-5">
						<div className="jmlMinyak flex items-center gap-2">
							<div className="info bg-[#94D60A] w-[5px] h-[5px] p-2"></div>
							<p>Jumlah Minyak</p>
						</div>
						<div className="jmlMinyak flex items-center gap-2">
							<div className="info bg-[#2F80ED] w-[5px] h-[5px] p-2 "></div>
							<p>Jumlah Transaksi</p>
						</div>
						<div className="jmlMinyak flex items-center gap-2">
							<div className="info bg-[#EB5757] w-[5px] h-[5px] p-2"></div>
							<p>User Baru</p>
						</div>
						<div className="DoughChart w-10/12 md:w-28 mx-auto ">
							<Doughnut height={400} data={data} options={option} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
