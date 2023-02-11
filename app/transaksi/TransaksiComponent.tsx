// 'use client';
// import { useState, Fragment, useEffect } from 'react';
// import { Tab, Listbox, Transition } from '@headlessui/react';
// import { HiOutlineChevronDown } from 'react-icons/hi';
// import { AiOutlineSearch } from 'react-icons/ai';
// import TableTransaksi from './TableTransaksi';
// import { BiSearchAlt2 } from 'react-icons/bi';
// import { GrRefresh } from 'react-icons/gi';
// import axios from 'axios';

// function classNames(...classes: any) {
// 	return classes.filter(Boolean).join(' ');
// }

// export default function TransaksiComponent() {
// 	const [warna, setWarna] = useState(false);
// 	const togle = () => {
// 		setWarna(!warna);
// 	};

// 	const [datas, setDatas] = useState({ count: 0, results: [] });
// 	const [selected, setSelected] = useState(5);
// 	const [jmlData, setJmlData] = useState(5);
// 	const [waktuData, setWaktuData] = useState('baru');

// 	const getDatas = async (uri: string) => {
// 		if (!uri) return;
// 		const res = await axios.get(uri);
// 		setDatas(res.data);
// 	};

// 	useEffect(() => {
// 		getDatas('https://fadhli.pythonanywhere.com/minyak/?limit=5&page=1');
// 	}, []);

// 	return (
// 		<div className="pr-0 md:pr-5 z-0 pb-10">
// 			<h1 className="text-[#94D60A] pl-2 md:pl-10 lg:pl-72 pt-6 font-bold text-3xl">
// 				Transaksi
// 			</h1>

// 			<div className="waktu ml-2 md:ml-10 lg:ml-72 my-2">
// 				<form action="">
// 					<table>
// 						<thead>
// 							<tr>
// 								<td>Dari tanggal: </td>
// 								<td>Sampai tanggal: </td>
// 								<td></td>
// 								<td></td>
// 							</tr>
// 						</thead>
// 						<tbody>
// 							<tr>
// 								<td>
// 									<input type="date" />
// 								</td>
// 								<td>
// 									<input type="date" />
// 								</td>
// 							</tr>
// 						</tbody>
// 					</table>
// 				</form>
// 			</div>

// 			<div className=" ml-0 md:ml-10 lg:ml-72 mt-10 w-auto min-h-full overflow-visible px-2 sm:px-0 bg-[#F8FFE9] relative rounded shadow-md">
// 				<h1 className=" pt-5 pl-5 text-[#94D60A] text-2xl font-semibold">
// 					Transaksi Penyetoran
// 				</h1>

// 				<div className="wrapper flex justify-between items-center">
// 					<div className=" p-5 flex gap-5 items-center">
// 						<div className="btn-group grid grid-cols-2 md:w-44 w-28 pt-1">
// 							<div className="jmlData">
// 								<select
// 									name=""
// 									title="jmlData"
// 									id=""
// 									value={selected}
// 									className="bg-[#94D60A] rounded-md outline-none text-white p-[2px] mt-[3px] cursor-pointer"
// 									onChange={(e) => {
// 										setSelected(e.target.value);
// 										{
// 											waktuData == 'baru'
// 												? setTimeout(() => {
// 														getDatas(
// 															`https://fadhli.pythonanywhere.com/minyak/?limit=${e.target.value}&page=1`
// 														);
// 												  }, 100)
// 												: setTimeout(() => {
// 														getDatas(
// 															`https://fadhli.pythonanywhere.com/user/?ordering=createdAt&limit=${e.target.value}`
// 														);
// 												  }, 100);
// 										}
// 									}}
// 								>
// 									<option
// 										value="5"
// 										className=" cursor-pointer"
// 										onClick={() => {
// 											setJmlData(5);
// 										}}
// 									>
// 										5
// 									</option>
// 									<option
// 										value="10"
// 										className=" cursor-pointer"
// 										onClick={() => {
// 											setJmlData(10);
// 										}}
// 									>
// 										10
// 									</option>
// 								</select>
// 							</div>
// 							<button
// 								className={`border-[#94D60A] border-r-0 text-white border-2 btn btn-outline  rounded-tl-md rounded-bl-md ${
// 									warna ? 'text-[#94D60A]' : 'text-white bg-[#94D60A]'
// 								}`}
// 								onClick={togle}
// 							>
// 								Baru
// 							</button>
// 							<button
// 								className={` border-2 border-[#94D60A] border-l-0 btn btn-outline rounded-tr-md rounded-br-md ${
// 									warna ? 'text-white bg-[#94D60A]' : 'text-[#94D60A]'
// 								} `}
// 								onClick={togle}
// 							>
// 								Lama
// 							</button>
// 						</div>
// 					</div>
// 					<form action="" className="relative">
// 						<input
// 							className="search flex items-center border-[#94D60A] border-[1px] mr-6 p-1 gap-2 md:w-60 w-10/12 rounded-lg bg-transparent placeholder:font-semibold peer z-20 pl-7"
// 							placeholder="Search"
// 						/>
// 						<AiOutlineSearch className="text-[#00000080] font-semibold absolute top-2 left-1 duration-200 peer-placeholder-shown:font-bold z-0" />
// 					</form>
// 				</div>

// 				<div className="w-full px-5 overflow-auto">
// 					<div className="btn-group grid grid-cols-2"></div>
// 					<table className="w-full">
// 						<thead className="bg-[#94D60A] rounded text-white">
// 							<tr>
// 								<td className="rounded-bl-lg rounded-tl-lg bg-[#94D60A] p-1 pl-3">
// 									Nama
// 								</td>
// 								<td>NIU</td>
// 								<td>Email</td>
// 								<td>No.Tlp</td>
// 								<td>Jumlah Minyak</td>
// 								<td>Poin</td>
// 								<td className="rounded-tr-lg rounded-br-lg bg-[#94D60A] pr-2">
// 									Status
// 								</td>
// 							</tr>
// 						</thead>
// 						<tbody className="">
// 							{datas['results'].map((post, key) => {
// 								return (
// 									<tr key={key}>
// 										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
// 											{post.user}
// 										</td>
// 										<td className="pt-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
// 											{post.id_user}
// 										</td>
// 										<td className="pt-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
// 											{post.email}
// 										</td>
// 										<td className="pt-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
// 											{post.phone}
// 										</td>
// 										<td className="pt-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
// 											{post.volume} ml
// 										</td>
// 										<td className="pt-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
// 											{post.poin}
// 										</td>
// 										<td className="pt-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer ">
// 											{post.status}
// 										</td>
// 									</tr>
// 								);
// 							})}
// 						</tbody>
// 					</table>

// 					<div className="footer flex justify-between mt-5 pb-5 p-1">
// 						<h1 className="font-semibold">Showing 1 to 5</h1>

// 						<div className="btn-group border-[#94D60A] border-2 w-44 justify-between rounded-lg flex">
// 							<button className="btn">
// 								<p className="text-[#94D60A] pl-1">Previous</p>
// 							</button>
// 							<button className="btn bg-[#94D60A] p-1 rounded rounded-tl-none rounded-tr-none rounded-br-none rounded-bl-none text-white">
// 								Page 1
// 							</button>
// 							<button className="btn ">
// 								<p className="text-[#94D60A] pr-1">Next</p>
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			{/* TRANSAKSI PENUKARAN  */}
// 			<div className=" ml-0 md:ml-10 lg:ml-72 mt-5 w-auto min-h-full overflow-visible px-2 sm:px-0 bg-[#F8FFE9] relative rounded shadow-md">
// 				<h1 className=" pt-5 pl-5 text-[#94D60A] text-2xl font-semibold">
// 					Transaksi Penukaran
// 				</h1>
// 				<div className="wrapper flex justify-between items-center">
// 					<div className=" p-5 flex gap-5 items-center">
// 						<div className="btn-group grid grid-cols-2 md:w-44 w-28 pt-1">
// 							<button
// 								className={`border-[#94D60A] border-r-0 text-white border-2 btn btn-outline  rounded-tl-md rounded-bl-md ${
// 									warna ? 'text-[#94D60A]' : 'text-white bg-[#94D60A]'
// 								}`}
// 								onClick={togle}
// 							>
// 								Baru
// 							</button>
// 							<button
// 								className={` border-2 border-[#94D60A] border-l-0 btn btn-outline rounded-tr-md rounded-br-md ${
// 									warna ? 'text-white bg-[#94D60A]' : 'text-[#94D60A]'
// 								} `}
// 								onClick={togle}
// 							>
// 								Lama
// 							</button>
// 						</div>
// 					</div>
// 					<form action="" className="relative">
// 						<input
// 							className="search flex items-center border-[#94D60A] border-[1px] mr-6 p-1 gap-2 md:w-60 w-10/12 rounded-lg bg-transparent placeholder:font-semibold peer z-20 pl-7"
// 							placeholder="Search"
// 						/>
// 						<AiOutlineSearch className="text-[#00000080] font-semibold absolute top-2 left-1 duration-200 peer-placeholder-shown:font-bold z-0" />
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

'use client';
import { useState, Fragment, useEffect } from 'react';
import { Tab, Listbox, Transition } from '@headlessui/react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import axios from 'axios';

export default function UserManagementComponent() {
	const [userDatas, setUserDatas] = useState<any>({ count: 0, results: [] });
	const [userDeleting, setUserDeleting] = useState('');
	const [modal, setModal] = useState('');
	const [loading, setLoading] = useState(true);
	const [searchUser, setSearch] = useState('');

	const getuserDatas = async (uri: string) => {
		if (!uri) return;

		setLoading(true);
		const res = await axios.get(uri);
		setUserDatas(res.data);
	};

	useEffect(() => {
		getuserDatas('https://fadhli.pythonanywhere.com/minyak/?limit=5&page=1');
	}, []);

	const [selected, setSelected] = useState(5);

	const [waktuData, setWaktuData] = useState('baru');

	const [jmlData, setJmlData] = useState(5);
	console.log(waktuData);
	console.log(jmlData);
	console.log(selected);

	const searchUserSubmit = (e: any) => {
		e.preventDefault();
		getuserDatas(
			`https://fadhli.pythonanywhere.com/minyak/?ordering=createdAt&search=${searchUser}`
		);
	};

	return (
		<div className="pr-0 md:pr-5 z-0 pb-10 overflow-auto">
			<h1 className="text-[#94D60A] pl-2 md:pl-10 lg:pl-72 pt-6 font-bold text-3xl">
				Transaksi
			</h1>

			<div className="waktu ml-2 md:ml-10 lg:ml-72 my-2">
				<form action="">
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
									/>
								</td>
								<td>
									<input
										type="date"
										placeholder="."
										className=" placeholder-transparent border-[#94D60A] border-2 bg-[#F8FFE9] rounded-md px-1 ml-2"
									/>
								</td>
								<td>
									<AiOutlineSearch className="bg-[#94D60A] text-white rounded-md text-[26px] ml-2 cursor-pointer" />
								</td>
								<td>
									<IoMdRefresh className="bg-[#94D60A] text-white rounded-md text-[26px] ml-2 cursor-pointer" />
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>

			<div className=" ml-0 md:ml-10 lg:ml-72 mt-10 w-full md:w-auto min-h-full px-2 sm:px-0 bg-[#F8FFE9] relative rounded shadow-md">
				<h1 className="text-[#94D60A] pl-5 pt-6 font-bold text-3xl">
					Transaksi Penyetoran
				</h1>

				<h1
					className={`${
						loading ? 'block' : 'hidden'
					}  w-full text-center right-0 absolute`}
				>
					Loading....
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
								// onChange={(e) => {
								// 	setSelected(e.target.value);
								// 	{
								// 		waktuData == 'baru'
								// 			? setTimeout(() => {
								// 					getuserDatas(
								// 						`https://fadhli.pythonanywhere.com/minyak/?limit=${e.target.value}`
								// 					);
								// 			  }, 100)
								// 			: setTimeout(() => {
								// 					getuserDatas(
								// 						`https://fadhli.pythonanywhere.com/minyak/?limit=${e.target.value}`
								// 					);
								// 			  }, 100);
								// 	}
								// }}
							>
								<option value="5" className=" cursor-pointer">
									5
								</option>
								<option value="10" className=" cursor-pointer">
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
											'https://fadhli.pythonanywhere.com/minyak/?ordering=created'
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

				<div className="w-full px-5 overflow-auto">
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
										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											{datas?.id_user}
										</td>
										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											{datas?.email}
										</td>
										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											{datas?.phone}
										</td>
										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											{datas?.volume} ml
										</td>
										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											{datas?.poin}
										</td>
										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											{datas?.status}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					<div className="footer flex justify-between mt-5 pb-5 p-1 items-center">
						<h1 className="font-semibold">
							{/* Showing {selected} to {userDatas.count} */}
							Showing {selected} data
						</h1>
						<div className="btn-group border-[#94D60A] border-2 md:w-44 w-32 justify-between rounded-lg flex">
							<button
								className="btn"
								onClick={(e) => getuserDatas(userDatas.previous)}
							>
								<p className="text-[#94D60A] pl-1 text-sm md:text-md">
									Previous
								</p>
							</button>
							<button className="btn bg-[#94D60A] p-1 rounded rounded-tl-none rounded-tr-none rounded-br-none rounded-bl-none text-white text-sm">
								Page 1
							</button>
							<button
								className="btn"
								onClick={(e) => getuserDatas(userDatas.next)}
							>
								<p className="text-[#94D60A] pr-1 text-sm	">Next</p>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* TABLE PENUKARAN */}

			{/* <div className=" ml-0 md:ml-10 lg:ml-72 mt-10 w-full md:w-auto min-h-full px-2 sm:px-0 bg-[#F8FFE9] relative rounded shadow-md">
				<h1 className="text-[#94D60A] pl-5 pt-6 font-bold text-3xl">
					Transaksi Penukaran
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
									setSelected(e.target.value);
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
											'https://fadhli.pythonanywhere.com/minyak/?ordering=created'
										);
								}}
							>
								Lama
							</button>
						</div>
					</div>
					<form action="" className="relative">
						<input
							className="search flex items-center border-[#94D60A] border-[1px] mr-6 p-1 gap-2 md:w-60 w-10/12 rounded-lg bg-transparent placeholder:font-semibold peer z-20 pl-7"
							placeholder="Search"
						/>
						<AiOutlineSearch className="text-[#00000080] font-semibold absolute top-2 left-1 duration-200 peer-placeholder-shown:font-bold z-0" />
					</form>
				</div>

				<div className="w-full px-5 overflow-auto">
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
							{userDatas['results'].map((datas, key) => {
								return (
									<tr key={key}>
										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											{datas.user}
										</td>
										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											{datas.id_user}
										</td>
										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											{datas.email}
										</td>
										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											{datas.phone}
										</td>
										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											{datas.volume} ml
										</td>
										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											{datas.poin}
										</td>
										<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
											{datas.status}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					<div className="footer flex justify-between mt-5 pb-5 p-1 items-center">
						<h1 className="font-semibold">Showing {selected} data</h1>
						<div className="btn-group border-[#94D60A] border-2 md:w-44 w-32 justify-between rounded-lg flex">
							<button
								className="btn"
								onClick={(e) => getuserDatas(userDatas.previous)}
							>
								<p className="text-[#94D60A] pl-1 text-sm md:text-md">
									Previous
								</p>
							</button>
							<button className="btn bg-[#94D60A] p-1 rounded rounded-tl-none rounded-tr-none rounded-br-none rounded-bl-none text-white text-sm">
								Page 1
							</button>
							<button
								className="btn"
								onClick={(e) => getuserDatas(userDatas.next)}
							>
								<p className="text-[#94D60A] pr-1 text-sm	">Next</p>
							</button>
						</div>
					</div>
				</div>
			</div> */}
		</div>
	);
}
