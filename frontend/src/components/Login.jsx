"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Login = () => {
	const router = useRouter();
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				"http://localhost:8080/api/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ ...data }),
				}
			);
			if (response.status === 200) {
				const res = await response.json();
				setError(null);
				localStorage.setItem("token", res.token);
				localStorage.setItem("role", res.role);
				document.cookie = `token=${res.token}; path=/; Secure; SameSite=None`;
				document.cookie = `role=${res.role}; path=/; Secure; SameSite=None`;
				const role = res.role.toLowerCase();
				router.push(`/${role}`);
			} else {
				console.log(response);
				setError("Given wrong data");
			}
		} catch (error) {
			console.log(error);
			setError("Something went wrong");
		}
	};
	return (
		<section className="bg-gray-50 dark:bg-gray-900 flex justify-center py-32">
			<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
				<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
						Log in to your account
					</h1>
					<form
						className="space-y-4 md:space-y-6"
						onSubmit={handleSubmit}
					>
						<div>
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Your Email
							</label>
							<input
								type="email"
								name="email"
								id="email"
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="name@company.com"
								onChange={handleChange}
								value={data.email}
								required
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								onChange={handleChange}
								value={data.password}
								placeholder="••••••••"
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								required
							/>
						</div>
						{error && (
							<div
								className="font-semibold p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
								role="alert"
							>
								{error}
							</div>
						)}
						<button
							type="submit"
							className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
						>
							Sign in
						</button>
						<p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
							Don't have an account yet?{" "}
							<Link
								href="/signup"
								className="font-medium text-primary-600 hover:underline dark:text-primary-500"
							>
								Signup
							</Link>
						</p>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
