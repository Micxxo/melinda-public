'use client';
import { useState, Fragment, useEffect } from 'react';
import { Tab, Listbox, Transition } from '@headlessui/react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import cookies from 'universal-cookie';

export default function UserManagementComponent() {
	const [userDatas, setUserDatas] = useState<any>({ count: 0, results: [] });
	const [modal, setModal] = useState('');
	const [searchUser, setSearch] = useState('');
	const [inputVolume, setInputVolume] = useState('');
	const [berhasilVerif, setBerhasilVerif] = useState('');
	const [selected, setSelected] = useState(5);
	const [waktuData, setWaktuData] = useState('baru');
	const [jmlData, setJmlData] = useState(5);
	const [passsingNama, setPassingNama] = useState({ nama: '' });
	const [loading, setLoading] = useState(true);
	const nextPage = userDatas.next;
	const prevPage = userDatas.previous;
	const router = useRouter();

	const getuserDatas = async (uri: string) => {
		if (!uri) return;
		setLoading(true);
		const res = await axios.get(uri);
		setLoading(false);
		setUserDatas(res.data);
	};

	useEffect(() => {
		getuserDatas('https://fadhli.pythonanywhere.com/minyak/setor/?page=1');
	}, []);

	const modalTrigger = (id: any) => {
		setModal(id);
	};

	const searchUserSubmit = (e: any) => {
		e.preventDefault();
		getuserDatas(
			`https://fadhli.pythonanywhere.com/minyak/setor/?ordering=createdAt&search=${searchUser}`
		);
	};

	const submitVolume = async (e: any) => {
		try {
			e.preventDefault();
			if (modal == '') return;
			setModal('');
			const res = await axios.post(
				`https://fadhli.pythonanywhere.com/minyak/setor/${modal}/verifikasi/`,
				{ volume: inputVolume }
			);
			getuserDatas(`https://fadhli.pythonanywhere.com/minyak/setor/?page=1`);
		} catch (error) {
			console.log(error);
		}
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
			{/* MODAL BERHASIL VERIF */}
			<div
				className={`berhasilVerif fixed ${
					berhasilVerif ? '' : 'hidden'
				} bg-[#00000040] h-screen w-full z-20 flex justify-center items-center`}
			>
				<div className="bg-[#F8FFE9] px-8 py-5 rounded relative">
					<h1 className="text-[#94D60A] text-3xl">Verfikasi berhasil</h1>
					<AiOutlineClose
						className="absolute top-3 right-2 text-[#94D60A] text-xl cursor-pointer"
						onClick={(e) => setBerhasilVerif('')}
					/>
				</div>
			</div>

			{/* MODAL  */}
			<div
				className={` modal fixed ${
					modal != '' ? '' : 'hidden'
				} bg-[#00000040] h-screen w-full z-10 flex justify-center items-center`}
			>
				<div className="bg-[#F8FFE9] rounded pt-3 pl-8 pr-8 pb-5">
					<div className="flex w-full justify-center items-center gap-5 relative">
						<h1 className="text-[#94D60A] text-3xl">Verifikasi</h1>
						<AiOutlineClose
							className="text-[#94D60A] text-xl absolute right-0 top-0 cursor-pointer"
							onClick={(e) => modalTrigger('')}
						/>
					</div>
					<p className=" w-1/2 mx-auto text-center mt-10 text-sm text-[#00000080]">
						Verifikasi untuk akun
						<span className="text-[#94D60A]"> {passsingNama.nama}</span>,
						masukan
						<span className="text-[#94D60A]"> inputan minyak </span> di bawah
						ini dalam satuan <span className="text-[#94D60A]">mL</span>
					</p>
					<h1 className="text-[#00000080] mt-2 w-2/3 text-xl block mx-auto">
						Masukan Minyak
					</h1>
					<form
						action=""
						onSubmit={(e) => {
							submitVolume(e);
						}}
					>
						<input
							type="number"
							placeholder="Ex: 1200"
							className=" bg-transparent border-[#94D60A] text-[#00000080] rounded-lg border-2 w-2/3 block mx-auto pl-2 "
							value={inputVolume}
							onChange={(e) => {
								setInputVolume(e.target.value);
							}}
						/>

						<button
							className={` ${
								inputVolume != '' && inputVolume != '0'
									? 'hidden'
									: 'text-white rounded-md bg-gray-300 mt-10 w-2/3 block mx-auto font-semibold p-1 text-xl focus:outline-none'
							}  `}
							disabled
							onClick={(e) => {
								setBerhasilVerif(inputVolume);
							}}
						>
							Masukan
						</button>
						<button
							className={` ${
								inputVolume != '' && inputVolume != '0'
									? 'bg-[#94D60A] rounded-md text-white mt-10 w-2/3 block mx-auto font-semibold p-1 text-xl hover:scale-95 duration-200 cursor-pointer'
									: 'hidden'
							}  `}
							onClick={(e) => {
								{
									setBerhasilVerif(inputVolume);
								}
							}}
						>
							Masukan
						</button>
					</form>
				</div>
			</div>

			<div
				className={`${loading ? '' : 'hidden'} bg-red-300 
				text-center absolute right-0 animate-spin rounded-md`}
			></div>

			<h1 className="text-[#94D60A] pl-2 md:pl-10 lg:pl-72 pt-6 font-bold text-3xl">
				Penyetoran
			</h1>

			<div className=" ml-0 md:ml-10 lg:ml-72 mt-10 w-full md:w-auto min-h-full px-2 sm:px-0 bg-[#F8FFE9] relative rounded shadow-md">
				<div
					className={`${loading ? '' : 'hidden'} w-full relative text-center `}
				>
					<h1 className="absolute right-0 left-0 top-5">Loading...</h1>
				</div>
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
														`https://fadhli.pythonanywhere.com/minyak/setor/?limit=${e.target.value}`
													);
											  }, 100)
											: setTimeout(() => {
													getuserDatas(
														`https://fadhli.pythonanywhere.com/minyak/setor/?ordering=created&limit=${e.target.value}`
													);
											  }, 100);
									}
								}}
							>
								<option
									value="5"
									className=" cursor-pointer"
									onClick={() => {
										setJmlData(5);
									}}
								>
									5
								</option>
								<option
									value="10"
									className=" cursor-pointer"
									onClick={() => {
										setJmlData(10);
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
											'https://fadhli.pythonanywhere.com/minyak/setor/?limit=5&page=1'
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
											'https://fadhli.pythonanywhere.com/minyak/setor/?ordering=updated'
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
							{
								searchUserSubmit(e);
							}
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

				{/* <TableUser /> */}
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
									<td
										className="rounded-tr-lg rounded-br-lg bg-[#94D60A] pr-2"
										onClick={modalTrigger}
									>
										Aksi
									</td>
								</tr>
							</thead>
							<tbody className="">
								{userDatas['results'].map((datas: any, key: any) => {
									return (
										<tr key={key}>
											<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas.user}
											</td>
											<td className="pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas.id_user}
											</td>
											<td className="pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas.email}
											</td>
											<td className="pt-5 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas.phone}
											</td>
											<td
												className="pt-5 pr-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer"
												onClick={(e) => {
													setPassingNama({
														nama: datas.user,
													}),
														modalTrigger(datas.id);
												}}
											>
												<div className="p-1 border-2 border-[#94D60A] text-[#94D60A] rounded text-center hover:scale-95 duration-200">
													Verifikasi
												</div>
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
							{/* PREV PAGE  */}
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
								className={` btn border-2 border-[#D3EC9F] p-2 rounded-md cursor-not-allowed   ${
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
		</div>
	);
}
