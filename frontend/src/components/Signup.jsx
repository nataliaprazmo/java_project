import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		phone: "",
	});
	const [error, setError] = useState("");
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				"http://localhost:8080/api/auth/signup",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ ...data }),
				}
			);
			if (response.status === 201) {
				setError(null);
				window.location = "/login";
			} else if (response.status === 409) {
				setError(
					"Account with given email or phone number already exists"
				);
			} else {
				console.log(response.status);
				setError("Given wrong data");
			}
		} catch (error) {
			console.log(error);
			setError("Something went wrong");
		}
	};
	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Create account
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							onSubmit={handleSubmit}
						>
							<div>
								<label
									htmlFor="firstName"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									First Name
								</label>
								<input
									type="text"
									id="firstName"
									placeholder="Name"
									name="firstName"
									onChange={handleChange}
									value={data.firstName}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="lastName"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Last Name
								</label>
								<input
									type="text"
									id="lastName"
									placeholder="Surname"
									name="lastName"
									onChange={handleChange}
									value={data.lastName}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									onChange={handleChange}
									value={data.email}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@company.com"
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
									id="password"
									placeholder="P@ssw0rd"
									name="password"
									onChange={handleChange}
									value={data.password}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="phone"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Phone Number
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									onChange={handleChange}
									value={data.phone}
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="123 456 789"
									required
								/>
							</div>
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										id="terms"
										aria-describedby="terms"
										type="checkbox"
										className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										required
									/>
								</div>
								<div className="ml-3 text-sm">
									<label
										htmlFor="terms"
										className="font-light text-gray-500 dark:text-gray-300"
									>
										I accept the Terms and Conditions
									</label>
								</div>
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
								Sign Up
							</button>
							<p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
								Already have an account?{" "}
								<Link
									to="/login"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Login here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Signup;
