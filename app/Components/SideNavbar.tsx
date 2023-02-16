'use client';
import logo from '../../public/Inagri-Logo.png';
import ornament from '../../public/Ornament 13.png';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';
import { HiUserGroup } from 'react-icons/hi2';
import { HiMenuAlt3 } from 'react-icons/hi';
import { GrClose } from 'react-icons/gr';
import { RiExchangeDollarLine } from 'react-icons/ri';
import { FaMoneyBillWave } from 'react-icons/fa';
import { GiOilDrum } from 'react-icons/gi';
import Link from 'next/link';
import { BsBagFill } from 'react-icons/bs';
import { usePathname } from 'next/navigation';

export default function SideNavbar() {
	const router = usePathname();
	const [active, setActive] = useState('');
	const [nav, setNav] = useState(true);

	const toggle = () => {
		setNav(!nav);
	};

	return (
		<div>
			<nav
				className={`z-10 relative ${
					router == '/' || router == '/login' ? 'hidden' : ''
				}`}
			>
				<div>
					{nav ? (
						<HiMenuAlt3
							onClick={toggle}
							className={`fixed right-5 top-8  block lg:hidden bg-slate-300 rounded-lg text-black text-xl`}
						/>
					) : (
						<GrClose
							onClick={toggle}
							className="fixed right-5 top-8 block lg:hidden bg-slate-300 rounded-lg text-black text-xl p-1"
						/>
					)}
				</div>

				<div
					className={`bg-[#94D60A] w-60 p-5 h-screen fixed  ${
						nav ? '-left-96' : 'left-0'
					} lg:left-0 top-0  duration-200`}
				>
					<Image src={logo} alt="yoi" className=" md:block" />
					<Link
						href={'/dashboard'}
						className={`dashboard flex items-center ${
							router == '/dashboard' ? 'bg-[#6EA300]' : ''
						} hover:bg-[#6EA300]
					 mt-5 text-white p-1 rounded-full`}
					>
						<AiOutlineDashboard className=" ml-3 text-md" />
						<p className="pl-3 text-sm font-semibold">Dashboard</p>
					</Link>
					<Link
						href={'/users'}
						className={`dashboard flex items-center ${
							router == '/users' ? 'bg-[#6EA300]' : ''
						}
						hover:bg-[#6EA300] mt-5 text-white p-1 rounded-full`}
					>
						<HiUserGroup className=" ml-3 text-md" />
						<p className="pl-3 text-sm font-semibold">User Management</p>
					</Link>
					<Link
						href={'/transaksi	'}
						className={`dashboard flex items-center ${
							router == '/transaksi' ? 'bg-[#6EA300]' : ''
						} hover:bg-[#6EA300] mt-5 text-white p-1 rounded-full`}
					>
						<FaMoneyBillWave className=" ml-3 text-md" />
						<p className="pl-3 text-sm font-semibold">Transaksi</p>
					</Link>
					<Link
						href={'/penyetoran'}
						className={`dashboard flex items-center ${
							router == '/penyetoran' ? 'bg-[#6EA300]' : ''
						} hover:bg-[#6EA300] mt-5 text-white p-1 rounded-full`}
					>
						<GiOilDrum className=" ml-3 text-md" />
						<p className="pl-3 text-sm font-semibold">Penyetoran</p>
					</Link>
					<Link
						href={'/penukaran'}
						className={`dashboard flex items-center ${
							router == '/penukaran' ? 'bg-[#6EA300]' : ''
						} hover:bg-[#6EA300] mt-5 text-white p-1 rounded-full`}
					>
						<RiExchangeDollarLine className=" ml-3 text-md" />
						<p className="pl-3 text-sm font-semibold">Penukaran</p>
					</Link>

					<Image
						src={ornament}
						alt="yoi"
						className=" absolute bottom-0 left-0 w-[150px] md:block"
					/>
				</div>
			</nav>
		</div>
	);
}
