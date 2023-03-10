'use client';
import { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import cookies from 'universal-cookie';

export default function UserManagementComponent() {
	const [userDatas, setUserDatas] = useState<any>({ count: 0, results: [] });
	const [penukaranDatas, setPenukaranDatas] = useState<any>({
		count: 0,
		results: [],
	});
	const [loading, setLoading] = useState(true);
	const [searchUser, setSearch] = useState('');
	const [searchPenukaran, setSearchPenukaran] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [selected, setSelected] = useState(5);
	const [waktuData, setWaktuData] = useState('baru');
	const nextPage = userDatas.next;
	const prevPage = userDatas.previous;
	const nextPenukaranPage = penukaranDatas.next;
	const prevPenukaranPage = penukaranDatas.previous;
	const router = useRouter();

	const getuserDatas = async (uri: string) => {
		try {
			if (!uri) return;
			setLoading(true);
			const res = await axios.get(uri);
			setLoading(false);
			setUserDatas(res.data);
		} catch (error) {
			getuserDatas('https://fadhli.pythonanywhere.com/minyak/?limit=5&page=1');
		}
	};

	const getPenukaranData = async (uri: string) => {
		if (!uri) return;
		setLoading(true);
		const res = await axios.get(uri);
		console.log(res);
		setLoading(false);
		setPenukaranDatas(res.data);
	};

	useEffect(() => {
		getuserDatas('https://fadhli.pythonanywhere.com/minyak/?limit=5&page=1');
	}, []);

	useEffect(() => {
		getPenukaranData(
			'https://fourtour.site/melinda/produk/penukaran?status=ok'
		);
	}, []);

	const searchUserSubmit = (e: any) => {
		e.preventDefault();
		getuserDatas(
			`https://fadhli.pythonanywhere.com/minyak/?ordering=createdAt&search=${searchUser}`
		);
	};

	const searchDataPenukaran = (e: any) => {
		e.preventDefault();
		getPenukaranData(
			`https://fourtour.site/melinda/produk/penukaran?status=ok&search=${searchPenukaran}`
		);
	};

	console.log(searchPenukaran);

	const resetDate = () => {
		setStartDate('');
		setEndDate('');
		getuserDatas('https://fadhli.pythonanywhere.com/minyak/?limit=5&page=1');
	};

	const searchFromDate = (e: any) => {
		e.preventDefault();
		const cek = getuserDatas(
			`https://fadhli.pythonanywhere.com/minyak/?start=${startDate}&end=${endDate}`
		);
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
		<div className="pr-0 md:pr-5 z-0 pb-10">
			<h1 className="text-[#94D60A] pl-2 md:pl-10 lg:pl-72 pt-6 font-bold text-3xl">
				Transaksi
			</h1>

			<div className="waktu ml-2 md:ml-10 lg:ml-72 my-2 overflow-auto">
				<form
					action=""
					onSubmit={(e) => {
						searchFromDate(e);
					}}
				>
					<table>
						<thead>
							<tr>
								<td>Dari tanggal: </td>
								<td className="pl-2">Sampai tanggal: </td>
								<td></td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<input
										type="date"
										placeholder="."
										className=" placeholder-transparent border-[#94D60A] border-2 bg-[#F8FFE9] rounded-md px-1"
										onChange={(e) => {
											setStartDate(e.target.value);
										}}
										value={startDate}
									/>
								</td>
								<td>
									<input
										type="date"
										placeholder="."
										className=" placeholder-transparent border-[#94D60A] border-2 bg-[#F8FFE9] rounded-md px-1 ml-2"
										onChange={(e) => {
											setEndDate(e.target.value);
										}}
										value={endDate}
									/>
								</td>
								<td>
									<button
										className="bg-[#94D60A] text-white rounded-md text-[26px] ml-2 cursor-pointer mt-1"
										title="Search"
									>
										<AiOutlineSearch />
									</button>
								</td>
								<td>
									<IoMdRefresh
										className="bg-[#94D60A] text-white rounded-md text-[26px] ml-2 cursor-pointer"
										onClick={(e) => {
											resetDate();
										}}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>

			<div className=" ml-0 md:ml-10 lg:ml-72 mt-10 w-full md:w-auto min-h-full px-2 sm:px-0 bg-[#F8FFE9] relative rounded shadow-md">
				<div
					className={`${loading ? '' : 'hidden'} w-full  text-center relative`}
				>
					<h1 className="absolute right-0 left-0 top-5">Loading...</h1>
				</div>
				<h1 className="text-[#94D60A] pl-5 pt-6 font-bold text-3xl">
					Transaksi Penyetoran
				</h1>

				<div className="wrapper flex justify-between items-center">
					<div className=" p-5 flex gap-5 items-center">
						<div className="jmlData">
							<select
								name=""
								title="jmlData"
								id=""
								value={selected}
								className="bg-[#94D60A] rounded-md outline-none text-white p-[2px] mt-[3px] cursor-pointer"
								onChange={(e) => {
									setSelected(parseInt(e.target.value));
									{
										waktuData == 'baru'
											? setTimeout(() => {
													getuserDatas(
														`https://fadhli.pythonanywhere.com/minyak/?limit=${e.target.value}`
													);
											  }, 100)
											: setTimeout(() => {
													getuserDatas(
														`https://fadhli.pythonanywhere.com/minyak/?limit=${e.target.value}`
													);
											  }, 100);
									}
								}}
							>
								<option
									value="5"
									className=" cursor-pointer"
									onChange={(e) => {
										setSelected(5);
									}}
								>
									5
								</option>
								<option
									value="10"
									className=" cursor-pointer"
									onChange={(e) => {
										setSelected(5);
									}}
								>
									10
								</option>
							</select>
						</div>
						<div className="btn-group grid grid-cols-2 md:w-44 pt-1 w-28">
							<button
								className={`border-[#94D60A] border-r-0 text-white border-2 btn btn-outline  rounded-tl-md rounded-bl-md ${
									waktuData == 'baru'
										? 'text-white bg-[#94D60A]'
										: 'text-[#94D60A]'
								}`}
								onClick={(e) => {
									setWaktuData('baru'),
										getuserDatas(
											'https://fadhli.pythonanywhere.com/minyak/?limit=5&page=1'
										);
								}}
							>
								Baru
							</button>
							<button
								className={` border-2 border-[#94D60A] border-l-0 btn btn-outline rounded-tr-md rounded-br-md ${
									waktuData == 'lama'
										? 'text-white bg-[#94D60A]'
										: 'text-[#94D60A]'
								} `}
								onClick={(e) => {
									setWaktuData('lama'),
										getuserDatas(
											'https://fadhli.pythonanywhere.com/minyak/?ordering=updated'
										);
								}}
							>
								Lama
							</button>
						</div>
					</div>
					<form
						action=""
						className="relative"
						onSubmit={(e) => {
							searchUserSubmit(e);
						}}
					>
						<input
							className="search flex items-center border-[#94D60A] border-[1px] mr-6 p-1 gap-2 md:w-60 w-10/12 rounded-lg bg-transparent placeholder:font-semibold peer z-20 pl-7"
							placeholder="Search"
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							value={searchUser}
						/>
						<AiOutlineSearch className="text-[#00000080] font-semibold absolute top-2 left-1 duration-200 peer-placeholder-shown:font-bold z-0" />
					</form>
				</div>

				{/* TRNSAKSI PENYETORAN */}
				<div className="w-full px-5">
					<div className="overflow-auto">
						<div className="btn-group grid grid-cols-2"></div>
						<table className="w-full">
							<thead className="bg-[#94D60A] rounded text-white">
								<tr>
									<td className="rounded-bl-lg rounded-tl-lg bg-[#94D60A] p-1 pl-3">
										Nama
									</td>
									<td>NIU</td>
									<td>Email</td>
									<td>No.Tlp</td>
									<td>Jumlah minyak</td>
									<td>Poin</td>
									<td>status</td>
								</tr>
							</thead>
							<tbody className="">
								{userDatas['results'].map((datas: any, key: any) => {
									return (
										<tr key={key}>
											<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas?.user}
											</td>
											<td className="pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas?.id_user}
											</td>
											<td className="pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas?.email}
											</td>
											<td className="pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas?.phone}
											</td>
											<td className="pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas?.volume} ml
											</td>
											<td className="pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas?.poin}
											</td>
											<td className="pt-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas?.status}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<div className="footer flex justify-between mt-5 pb-5 p-1 items-center">
						<h1 className="font-semibold text-xs md:text-lg">
							Showing {selected} data
						</h1>
						<h1 className="font-semibold text-xs md:text-lg">
							Total data: {userDatas.count}
						</h1>
						<div className="flex gap-2">
							<button
								className={`btn border-2 border-[#94D60A] p-2 rounded-md hover:scale-95 duration-200 ${
									prevPage == null ? 'hidden' : ''
								}`}
								onClick={(e) => getuserDatas(userDatas.previous)}
							>
								<p className="text-[#94D60A] text-sm md:text-md px-3">
									Previous
								</p>
							</button>

							<button
								className={` btn border-2 border-[#D3EC9F] p-2 rounded-md cursor-not-allowed ${
									prevPage == null ? '' : 'hidden'
								}`}
								onClick={(e) => getuserDatas(userDatas.previous)}
								disabled
							>
								<p className="text-[#D3EC9F] text-sm md:text-md px-3">
									Previous
								</p>
							</button>

							{/* NEXT PAGE  */}
							<button
								className={`btn border-2 border-[#94D60A] p-2 rounded-md hover:scale-95 duration-200 ${
									nextPage == null ? 'hidden' : ''
								}`}
								onClick={(e) => {
									getuserDatas(userDatas.next);
								}}
							>
								<p className="text-[#94D60A] text-sm md:text-md px-3">Next</p>
							</button>

							<button
								className={` btn border-2 border-[#D3EC9F] p-2 rounded-md cursor-not-allowed ${
									nextPage == null ? '' : 'hidden'
								}`}
								disabled
								onClick={(e) => {
									getuserDatas(userDatas.next);
								}}
							>
								<p className="text-[#D3EC9F] text-sm md:text-md px-3">Next</p>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* TRANSAKSI PENUKARAN */}
			<div className=" ml-0 md:ml-10 lg:ml-72 mt-10 w-full md:w-auto min-h-full px-2 sm:px-0 bg-[#F8FFE9] relative rounded shadow-md">
				<div
					className={`${
						loading ? '' : 'hidden'
					} w-full relative text-center relative`}
				>
					<h1 className="absolute right-0 left-0 top-5">Loading...</h1>
				</div>
				<h1 className="text-[#94D60A] pl-5 pt-6 font-bold text-3xl">
					Transaksi Penukaran
				</h1>
				<div className="wrapper flex justify-between items-center">
					<div className=" p-5 flex gap-5 items-center">
						{/* <div className="jmlData">
							<select
								name=""
								title="jmlData"
								id=""
								value={selected}
								className="bg-[#94D60A] rounded-md outline-none text-white p-[2px] mt-[3px] cursor-pointer"
								onChange={(e) => {
									setSelected(parseInt(e.target.value));
									{
										waktuData == 'baru'
											? setTimeout(() => {
													getuserDatas(
														`https://fadhli.pythonanywhere.com/minyak/?limit=${e.target.value}`
													);
											  }, 100)
											: setTimeout(() => {
													getuserDatas(
														`https://fadhli.pythonanywhere.com/minyak/?limit=${e.target.value}`
													);
											  }, 100);
									}
								}}
							>
								<option value="5" className=" cursor-pointer">
									5
								</option>
								<option value="10" className=" cursor-pointer">
									10
								</option>
							</select>
						</div> */}
						<div className="btn-group grid grid-cols-2 md:w-44 pt-1 w-28">
							<button
								className={`border-[#94D60A] border-r-0 text-white border-2 btn btn-outline  rounded-tl-md rounded-bl-md ${
									waktuData == 'baru'
										? 'text-white bg-[#94D60A]'
										: 'text-[#94D60A]'
								}`}
								onClick={(e) => {
									setWaktuData('baru'),
										getPenukaranData(
											'https://fourtour.site/melinda/produk/penukaran?status=ok'
										);
								}}
							>
								Baru
							</button>
							<button
								className={` border-2 border-[#94D60A] border-l-0 btn btn-outline rounded-tr-md rounded-br-md ${
									waktuData == 'lama'
										? 'text-white bg-[#94D60A]'
										: 'text-[#94D60A]'
								} `}
								onClick={(e) => {
									setWaktuData('lama'),
										getPenukaranData(
											'https://fourtour.site/melinda/produk/penukaran?status=ok&ordering=created'
										);
								}}
							>
								Lama
							</button>
						</div>
					</div>
					<form
						action=""
						className="relative"
						onSubmit={(e) => {
							searchDataPenukaran(e);
						}}
					>
						<input
							className="search flex items-center border-[#94D60A] border-[1px] mr-6 p-1 gap-2 md:w-60 w-10/12 rounded-lg bg-transparent placeholder:font-semibold peer z-20 pl-7"
							placeholder="Search"
							onChange={(e) => {
								setSearchPenukaran(e.target.value);
							}}
							value={searchPenukaran}
						/>
						<AiOutlineSearch className="text-[#00000080] font-semibold absolute top-2 left-1 duration-200 peer-placeholder-shown:font-bold z-0" />
					</form>
				</div>

				<div className="w-full px-5">
					<div className="overflow-auto">
						<div className="btn-group grid grid-cols-2"></div>
						<table className="w-full">
							<thead className="bg-[#94D60A] rounded text-white">
								<tr>
									<td className="rounded-bl-lg rounded-tl-lg bg-[#94D60A] p-1 pl-3">
										Nama
									</td>
									<td>Email</td>
									<td>Jumlah</td>
									<td>Poin</td>
									<td>status</td>
								</tr>
							</thead>
							<tbody className="">
								{penukaranDatas['results'].map((datas: any, key: any) => {
									return (
										<tr key={key}>
											<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas.nama}
											</td>
											<td className="pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas.email}
											</td>
											<td className="pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas.jumlah}
											</td>
											<td className="pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas.biaya}
											</td>
											<td className="pt-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas.status}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>

					<div className="footer flex justify-between mt-5 pb-5 p-1 items-center">
						{/* <h1 className="font-semibold text-xs md:text-lg">
							Showing {selected} data
						</h1> */}
						<h1 className="font-semibold text-xs md:text-lg">
							Total data: {penukaranDatas.count}
						</h1>
						<div className="flex gap-2">
							<button
								className={`btn border-2 border-[#94D60A] p-2 rounded-md hover:scale-95 duration-200 ${
									prevPenukaranPage == null ? 'hidden' : ''
								}`}
								onClick={(e) => getuserDatas(penukaranDatas.previous)}
							>
								<p className="text-[#94D60A] text-sm md:text-md px-3">
									Previous
								</p>
							</button>

							<button
								className={` btn border-2 border-[#D3EC9F] p-2 rounded-md cursor-not-allowed ${
									prevPenukaranPage == null ? '' : 'hidden'
								}`}
								onClick={(e) => getuserDatas(penukaranDatas.previous)}
								disabled
							>
								<p className="text-[#D3EC9F] text-sm md:text-md px-3">
									Previous
								</p>
							</button>

							{/* NEXT PAGE  */}
							<button
								className={`btn border-2 border-[#94D60A] p-2 rounded-md hover:scale-95 duration-200 ${
									nextPenukaranPage == null ? 'hidden' : ''
								}`}
								onClick={(e) => {
									getuserDatas(penukaranDatas.next);
								}}
							>
								<p className="text-[#94D60A] text-sm md:text-md px-3">Next</p>
							</button>

							<button
								className={` btn border-2 border-[#D3EC9F] p-2 rounded-md cursor-not-allowed ${
									nextPenukaranPage == null ? '' : 'hidden'
								}`}
								disabled
								onClick={(e) => {
									getuserDatas(penukaranDatas.next);
								}}
							>
								<p className="text-[#D3EC9F] text-sm md:text-md px-3">Next</p>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
