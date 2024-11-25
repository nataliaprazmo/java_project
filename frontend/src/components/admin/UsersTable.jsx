"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteAdmin from "./DeleteAdmin";

const UsersTable = ({ users }) => {
	const router = useRouter();
	const AdminBadge = ({ children }) => {
		return (
			<span className="bg-green-100 text-green-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
				{children}
			</span>
		);
	};
	const UserBadge = ({ children }) => {
		return (
			<span className="bg-purple-100 text-purple-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
				{children}
			</span>
		);
	};
	const [error, setError] = useState(null);
	const [open, setOpen] = useState(false);
	const [userId, setUserId] = useState(null);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		document.cookie =
			"token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie =
			"role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		router.push("/login");
	};
	const findCurrentUserId = async() =>{
		let currentUser = null;
		const token = localStorage.getItem("token");
		const response = await fetch("http://localhost:8080/api/user/details", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});
		if (response.status === 200) {
			const res = await response.json();
			currentUser = res.id;
		}
		return currentUser;
	}
	const handleDeleteAdmin = async () => {
		setOpen(false);
		const currentUserId = await findCurrentUserId();
		const token = localStorage.getItem("token");
		const response = await fetch(
			"http://localhost:8080/api/admin/admins/delete/" + userId,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			}
		);
		console.log(response);
		if (response.status === 200) {
			if(currentUserId === userId){
				handleLogout();
			}
			setUserId(null);
			setError(null);
			router.push("/admin");
		} else {
			setError("Something went wrong");
			setId(null);
		}
	};
	return (
		<div className="overflow-x-auto mt-3 mb-32">
			{users && users.length !== 0 ? (
				<>
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Name
								</th>
								<th scope="col" className="px-6 py-3">
									Role
								</th>
								<th scope="col" className="px-6 py-3">
									Email
								</th>
								<th scope="col" className="px-6 py-3">
									Phone
								</th>
								<th
									scope="col"
									className="text-center px-6 py-3"
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user, id) => (
								<tr
									key={id}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
								>
									<th
										scope="row"
										className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white"
									>
										{user.firstName} {user.lastName}
									</th>
									<td className="px-6 py-4">
										{user.role === "ADMIN" ? (
											<AdminBadge>{user.role}</AdminBadge>
										) : (
											<UserBadge>{user.role}</UserBadge>
										)}
									</td>
									<td className="px-6 py-4">{user.email}</td>
									<td className="px-6 py-4">{user.phone}</td>
									<td className="px-6 py-4 flex justify-center items-center">
										{user.role === "ADMIN" ? (
											<button
												type="button"
												onClick={() => {
													setUserId(user.id);
													setOpen(true);
												}}
												className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
											>
												Delete
											</button>
										) : (
											"---"
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{open && userId && (
						<DeleteAdmin
							setOpen={setOpen}
							handleDelete={handleDeleteAdmin}
						/>
					)}
					{error && (
						<div
							className="font-semibold p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
							role="alert"
						>
							{error}
						</div>
					)}
				</>
			) : (
				<p className="text-center mt-4 mb-8 text-lg text-gray-900 dark:text-white">
					You don't have any apointments yet!
				</p>
			)}
		</div>
	);
};

export default UsersTable;
