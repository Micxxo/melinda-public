// TINGGAL LOGIC LOGIN
'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Logologin from '../../public/Logo-Login.jpeg';
import Image from 'next/image';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import axios from 'axios';
import Link from 'next/link';
// import cookiecutter from 'cookie-cutter';
import Cookies from 'universal-cookie';
import { addAbortSignal } from 'stream';
import { useRouter } from 'next/navigation';

export default function LoginComponent() {
	const [showPass, setShowPass] = useState(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [auth, cekAuth] = useState('');

	const router = useRouter();

	const ShowPass = () => {
		setShowPass(!showPass);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const login = async (e: any) => {
		try {
			e.preventDefault();
			const res = await axios.post('https://fadhli.pythonanywhere.com/login/', {
				email,
				password,
			});
			if (res.status == 200) {
				cekAuth('berhasil');
				const cookkie = new Cookies();
				cookkie.set('jwt', res.data.jwt, {
					path: '/',
				});

				router.push('/dashboard');
			}
		} catch (errors) {
			cekAuth('gagal');
		}
	};

	return (
		<div className="bg-[#94D60A] h-screen flex justify-center items-center z-10">
			<div className="absolute z-30 h-screen w-56 bg-[#94D60A] left-0 hidden lg:block"></div>
			<div className="absolute z-30 w-screen h-14 bg-[#94D60A] top-0 block lg:hidden"></div>

			<div
				className={`${
					auth == 'gagal' ? '' : 'hidden'
				} absolute top-10 bg-[#E5083C] text-sm text-white p-2 rounded flex items-center gap-2 `}
			>
				<p>Username atau Password salah !</p>
			</div>

			<div
				className={`${
					auth == 'berhasil' ? '' : 'hidden'
				} absolute top-10 bg-[#F8FFE9] text-sm text-[#94D60A] p-2 rounded flex items-center gap-2 `}
			>
				<p>Login Berhasil !</p>
			</div>
			<p
				className={` hidden text-sm text-red-500 absolute top-10 z-20 border-red-500 border-2 p-1 rounded-md`}
			>
				Something went wrong
			</p>
			<div className="card bg-white md:w-auto w-80 md:h-auto h-[300px] mx-auto flex items-center shadow-lg rounded-md">
				{/* LOGIN INPUT */}
				<div className="login-form pt-0 px-6 w-[300px]">
					<h1 className="font-semibold text-[#94D60A] text-xl">LOGIN</h1>
					<p className="text-xs text-[#828282] font-semibold">
						Masukan email dan kata sandi
					</p>
					<form
						onSubmit={(e) => {
							login(e);
						}}
						action=""
						className="mt-6 "
					>
						<div className="user relative">
							<label htmlFor="email">
								<MdOutlineAlternateEmail className="text-[#00000059] font-semibold absolute z-10 right-2 top-2 cursor-pointer" />
							</label>
							<input
								type="email"
								className="peer rounded-2xl p-1 pl-3 border border-[#00000033] relative w-full placeholder-transparent bg-transparent z-10 text-sm"
								placeholder="Email"
								// {...register('email', { required: true })}
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
							<label className=" text-sm text-black font-semibold absolute left-3 -top-3 peer-placeholder-shown:top-[3px] peer-placeholder-shown:text-[#00000059] bg-white peer-placeholder-shown:bg-transparent z-10 peer-placeholder-shown:z-0 peer-placeholder-shown:text-sm duration-100">
								user@gmail.com
							</label>
						</div>
						{/* LOGIN INPUT END */}

						{/* PASSWORD INPUT */}
						<div className="pass relative mt-4">
							<label htmlFor="password" onClick={ShowPass} className="z-20">
								{showPass ? (
									<AiFillEyeInvisible className="text-[#00000059] font-semibold absolute z-10 right-2 top-2 cursor-pointer" />
								) : (
									<AiFillEye className="text-[#00000059] font-semibold absolute z-10 right-2 top-2 cursor-pointer" />
								)}
							</label>
							<input
								type={showPass ? 'text' : 'password'}
								className="peer rounded-2xl p-1 pl-3 border border-[#00000033] relative w-full placeholder-transparent bg-transparent z-10 text-sm"
								placeholder="password"
								// {...register('password', { required: true })}
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
							<label className=" text-sm text-black font-semibold absolute left-3 -top-3 peer-placeholder-shown:top-[3px] peer-placeholder-shown:text-[#00000059] bg-white peer-placeholder-shown:bg-transparent z-10 peer-placeholder-shown:z-0 peer-placeholder-shown:text-sm duration-100">
								Password
							</label>
						</div>
						<div className="wrapper flex justify-between mt-2">
							<div className="ingatSaya flex items-center">
								<input type="checkbox" name="ingatSaya" placeholder="." />
								<label
									htmlFor="ingatSaya"
									className="pl-1 text-xs text-[#00000059] font-semibold"
								>
									Ingat Saya
								</label>
							</div>
							<p className=" text-xs text-[#00000059] font-semibold cursor-pointer hover:translate-x-1 duration-200">
								Lupa kata sandi?
							</p>
						</div>
						<button
							type="submit"
							className="btn w-full rounded-lg mt-10 p-1 text-center text-white bg-[#94D60A]"
						>
							Masuk
						</button>
					</form>
				</div>
				<div className="logo">
					<Image
						src={Logologin}
						alt="yoi"
						className="bg-fuchsia-200 w-[400px] hidden md:block"
					/>
				</div>
				{/* PASSWORD INPUT END*/}
			</div>
		</div>
	);
}
