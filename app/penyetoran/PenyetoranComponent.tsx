'use client';
import { useState, Fragment, useEffect } from 'react';
import { Tab, Listbox, Transition } from '@headlessui/react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';

export default function UserManagementComponent() {
	const [userDatas, setUserDatas] = useState<any>({ count: 0, results: [] });
	const [userDeleting, setUserDeleting] = useState('');
	const [modal, setModal] = useState('');
	const [searchUser, setSearch] = useState('');
	const [inputVolume, setInputVolume] = useState('');
	const [berhasilVerif, setBerhasilVerif] = useState('');
	const [gagalVerif, setGagalVerif] = useState('');
	const [selected, setSelected] = useState(5);
	const [waktuData, setWaktuData] = useState('baru');
	const [jmlData, setJmlData] = useState(5);

	const getuserDatas = async (uri: string) => {
		if (!uri) return;
		const res = await axios.get(uri);
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
			// setBerhasilVerif('');
			setModal('');
			const res = await axios.post(
				`https://fadhli.pythonanywhere.com/minyak/setor/${modal}/verifikasi/`,
				{ volume: inputVolume }
			);
			getuserDatas(`https://fadhli.pythonanywhere.com/minyak/setor/?page=1`);
		} catch (error) {
			setGagalVerif('gagal');
		}
	};

	console.log(berhasilVerif);
	return (
		<div className="pr-0 md:pr-5 z-0 pb-10">
			{/* MODAL BERHASIL VERIF */}
			<div
				className={`berhasilVerif fixed ${
					berhasilVerif ? '' : 'hidden'
				} bg-[#00000040] h-screen w-full z-20 flex justify-center items-center`}
			>
				<div className="bg-[#F8FFE9] rounded py-10 pl-8 pr-8 relative">
					<h1 className="text-[#94D60A] text-3xl">Verfikasi berhasil</h1>
					<AiOutlineClose
						className="absolute top-3 right-2 text-[#94D60A] text-xl cursor-pointer"
						onClick={(e) => setBerhasilVerif('')}
					/>
				</div>
			</div>

			{/* MODAL GAGAL VERIF */}
			<div
				className={`berhasilVerif fixed ${
					gagalVerif == 'gagal' ? '' : 'hidden'
				} bg-[#00000040] h-screen w-full z-20 flex justify-center items-center`}
			>
				<div className="bg-[#F8FFE9] border-[red] border-2 rounded py-10 pl-8 pr-8 relative">
					<h1 className="text-[red] text-3xl">Verfikasi Gagal</h1>
					<p className="text-[red] text-xs pt-2">
						Pastikan untuk menginput jml minyak
					</p>
					<AiOutlineClose
						className="absolute top-3 right-2 text-[red] text-xl cursor-pointer"
						onClick={(e) => setGagalVerif('')}
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
					{/* <p className=" w-1/2 mx-auto text-center mt-10 text-sm text-[#00000080]">
						Verifikasi untuk akun <span className=" text-[#94D60A]"> Mico</span>
						,masukan inputan minyak di bawah ini
					</p> */}
					<p className=" w-1/2 mx-auto text-center mt-10 text-sm text-[#00000080]">
						Verifikasi dengan memasukan{' '}
						<span className="text-[red]">inputan minyak </span> di bawah ini
						dalam satuan <span className="text-[red]">ml</span>
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
							className="bg-[#94D60A] rounded-md text-white mt-10 w-2/3 block mx-auto font-semibold p-1 text-xl"
							// type="submit"
							// onClick={(e) => verifyUser(datas.id)}
							onClick={(e) => {
								// setGagalVerif(inputVolume),
								setBerhasilVerif(inputVolume);
							}}
						>
							Masukan
						</button>
					</form>
				</div>
			</div>

			<h1 className="text-[#94D60A] pl-2 md:pl-10 lg:pl-72 pt-6 font-bold text-3xl">
				Penyetoran
			</h1>

			<div className=" ml-0 md:ml-10 lg:ml-72 mt-10 w-full md:w-auto min-h-full px-2 sm:px-0 bg-[#F8FFE9] relative rounded shadow-md">
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
											'https://fadhli.pythonanywhere.com/minyak/setor/?ordering=created'
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
											<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas.id_user}
											</td>
											<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas.email}
											</td>
											<td className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas.phone}
											</td>
											<td
												className="pt-5 pl-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer"
												onClick={(e) => modalTrigger(datas.id)}
											>
												<div className="p-1 border-2 border-[#94D60A] text-[#94D60A]  rounded text-center">
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
						<div className="btn-group border-[#94D60A] border-2 md:w-44 w-32 justify-between rounded-lg flex">
							<button
								className="btn"
								onClick={(e) => getuserDatas(userDatas.previous)}
							>
								<p className="text-[#94D60A] pl-1 md:pl-3 text-sm md:text-md">
									Previous
								</p>
							</button>
							<button className="btn bg-[#94D60A] text-[#94D60A] p-1 rounded rounded-tl-none rounded-tr-none rounded-br-none rounded-bl-none  text-sm">
								|
							</button>
							<button
								className="btn"
								onClick={(e) => {
									getuserDatas(userDatas.next);
								}}
							>
								<p className="text-[#94D60A] pr-1 md:pr-3  text-sm	">Next</p>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
