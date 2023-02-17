'use client';
import { useState, Fragment, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function UserManagementComponent() {
	const [userDatas, setUserDatas] = useState<any>({ count: 0, results: [] });
	// const [userDatas, setUserDatas] = useState({ [] });

	const [userDeleting, setUserDeleting] = useState('');
	const [loading, setLoading] = useState(true);
	const [modal, setModal] = useState({
		name: '',
		code: '',
		produk: '',
		biaya: '',
		id: '',
	});
	// const [currentPage, setCurrentPage] = useState('page=1');
	const [searchUser, setSearch] = useState('');
	const [error, setError] = useState('');
	const [waktuData, setWaktuData] = useState('baru');
	const [berhasilVerif, setBerhasilVerif] = useState('');
	const nextPage = userDatas.next;
	const prevPage = userDatas.previous;
	const router = useRouter();

	const getuserDatas = async (uri: any) => {
		try {
			if (!uri) return;
			setLoading(true);
			// setCurrentPage(uri);
			const res = await axios.get(uri);
			setLoading(false);
			setUserDatas(res.data);
			setError('berhasil');
		} catch (error) {
			setError('error');
		}
	};

	const verifyPenukaran = async (code: any) => {
		const res = await axios.get(
			`https://fourtour.site/melinda/produk/penukaran/${code}`
		);
		getuserDatas(
			'https://fourtour.site/melinda/produk/penukaran?status=menunggu'
		);
	};

	useEffect(() => {
		getuserDatas(
			'https://fourtour.site/melinda/produk/penukaran?status=menunggu'
		);
	}, []);

	const searchUserSubmit = (e: any) => {
		console.log(e);
		e.preventDefault();
		getuserDatas(
			`https://fourtour.site/melinda/produk/penukaran?status=menunggu&search=${searchUser}`
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
			{/* MODAL  */}
			<div
				className={` modal fixed ${
					modal.code != '' ? '' : 'hidden'
				} bg-[#00000040] h-screen w-full z-10 flex justify-center items-center`}
			>
				<div className="bg-[#F8FFE9] rounded pt-3 pl-8 pr-8 pb-5">
					<div className="flex w-full justify-center items-center gap-5 relative">
						<h1 className="text-[#94D60A] text-3xl pt-5"> Verifikasi </h1>
						<AiOutlineClose
							className="text-[#94D60A] text-xl absolute right-0 top-0 cursor-pointer"
							onClick={(e) =>
								setModal({ name: '', code: '', produk: '', biaya: '', id: '' })
							}
						/>
					</div>
					<p className=" w-1/2 mx-auto text-center mt-10 text-sm text-[#00000080]">
						User <span className="text-[#94D60A]">{modal.name}</span> akan
						menukar
						<span className="text-[#94D60A]"> {modal.produk}</span> dengan{' '}
						<span className="text-[#94D60A]"> {modal.biaya} </span>
						poin
						{/* <span className=" text-[#94D60A]"> {modal.name}</span> */}
					</p>
					<button
						className="bg-[#94D60A] w-full rounded-md text-white mt-10"
						onClick={(e) => {
							setBerhasilVerif('berhasil'),
								verifyPenukaran(modal.code),
								setModal({ name: '', code: '', produk: '', biaya: '', id: '' });
						}}
					>
						Iya
					</button>
				</div>
			</div>
			{/* MODAL END  */}
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
			<h1
				className={`${
					error == 'error' ? '' : 'hidden'
				} border-[red] text-[red] border-2 p-1 absolute right-28 top-10 rounded-md`}
			>
				Something Went Wrong
			</h1>
			;
			<h1 className="text-[#94D60A] pl-2 md:pl-10 lg:pl-72 pt-6 font-bold text-3xl">
				Penukaran
			</h1>
			{/* {loading ? (
				<h1 className="ml-72 bg-orange-500 w-32 text-center p-2 text-white rounded">
					Loading...
				</h1>
			) : (
				''
			)} */}
			<h1
				className={`${
					loading ? 'block' : 'hidden'
				}  w-full text-center right-0 absolute`}
			>
				Loading...
			</h1>
			<div className=" ml-0 md:ml-10 lg:ml-72 mt-10 w-full md:w-auto min-h-full px-2 sm:px-0 bg-[#F8FFE9] relative rounded shadow-md">
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
													getuserDatas(
														`https://fadhli.pythonanywhere.com/user/?limit=${e.target.value}`
														// `https://fourtour.site/melinda/produk/0`
													);
											  }, 100)
											: setTimeout(() => {
													getuserDatas(
														`https://fadhli.pythonanywhere.com/user/?ordering=createdAt&limit=${e.target.value}`
														// `https://fourtour.site/melinda/produk/0`
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
										getuserDatas(
											`https://fourtour.site/melinda/produk/penukaran?status=menunggu`
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
											`https://fourtour.site/melinda/produk/penukaran?status=menunggu&ordering=created`
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
									<td>Email</td>
									<td>Nama Barang</td>
									<td>Jumlah</td>
									<td
										className="rounded-tr-lg rounded-br-lg bg-[#94D60A] pr-2"
										// onClick={modalTrigger}
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
												{datas.nama}
											</td>
											<td className="pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas.email}
											</td>
											<td className="pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas.produk}
											</td>
											<td className="pt-5  border-[#D9D9D9] border-b-2 pb-2 cursor-pointer">
												{datas.jumlah}
											</td>
											<td
												className="pt-5 pr-3 border-[#D9D9D9] border-b-2 pb-2 cursor-pointer"
												onClick={(e) =>
													setModal({
														name: datas.nama,
														code: datas.kode,
														produk: datas.produk,
														biaya: datas.biaya,
														id: datas.id_pengguna,
													})
												}
											>
												<div
													// onClick={(e) => deleteUser(datas.id)}
													className="p-1 border-2 border-[red] text-[red] rounded text-center hover:scale-95 duration-200"
												>
													Verfikasi
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>

					<div className="footer flex justify-between mt-5 pb-5 p-1 items-center">
						{/* <h1 className="font-semibold">
							Showing {selected} data
						</h1> */}
						<h1 className="font-semibold">Total Data: {userDatas.count}</h1>
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
		</div>
	);
}
