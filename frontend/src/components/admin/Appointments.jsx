"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Footer from "../Footer";
import AdminNavbar from "./AdminNavbar";

const Appointments = () => {
	const router = useRouter();
	const [appointments, setAppointments] = useState(null);
	const ActiveStatus = () => {
		return (
			<div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
		);
	};
	const InactiveStatus = () => {
		return <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>;
	};
	const formatDate = (date) => {
		const formatDate = new Intl.DateTimeFormat("pl-PL", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		});
		let toFormatDate = new Date(date);
		return formatDate.format(toFormatDate);
	};
	const [error, setError] = useState(null);
	const updateStatus = async (id) => {
		const token = localStorage.getItem("token");
		const response = await fetch(
			"http://localhost:8080/api/admin/appointment/" +
				id +
				"/updateStatus",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			}
		);
		if (response.status === 200) {
			setError(null);
			router.push("/admin");
		} else if (response.status === 409) {
			setError("Appointment status cannot be updated");
		}
	};
	const getAppointments = async () => {
		const token = localStorage.getItem("token");
		const response = await fetch(
			"http://localhost:8080/api/admin/appointments",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			}
		);
		if (response.status === 200) {
			const res = await response.json();
			setAppointments(res);
			console.log(res);
		}
	};
	return (
		<div onLoad={getAppointments} className="overflow-x-auto mt-3 mb-32">
			<AdminNavbar />
			<div className="px-4">
				{appointments && appointments.length !== 0 ? (
					<table className="mt-32 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Pet Name
								</th>
								<th scope="col" className="px-6 py-3">
									Date
								</th>
								<th scope="col" className="px-6 py-3">
									Status
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
							{appointments.map((appointment, id) => (
								<tr
									key={id}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
								>
									<th
										scope="row"
										className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white"
									>
										{appointment.petName}
									</th>
									<td className="px-6 py-4">
										{formatDate(appointment.date)}
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center">
											{appointment.status &&
											appointment.status ===
												"RESERVED" ? (
												<ActiveStatus />
											) : (
												<InactiveStatus />
											)}{" "}
											{appointment.status &&
												appointment.status.toLowerCase()}
										</div>
									</td>
									<td className="px-6 py-4 flex justify-center">
										{appointment.status &&
										appointment.status === "RESERVED" ? (
											<button
												type="button"
												onClick={() =>
													updateStatus(appointment.id)
												}
												className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
											>
												Complete
											</button>
										) : (
											"---"
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p className="mt-28 text-center mb-8 text-lg text-gray-900 dark:text-white">
						No user made any apointment yet.
					</p>
				)}
				{error && (
					<div
						className="font-semibold p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
						role="alert"
					>
						{error}
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default Appointments;
