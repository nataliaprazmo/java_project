import React, { useState } from "react";
import UserNavbar from "./UserNavbar";
import Footer from "../Footer";
import Filter from "./Filter";
import Appointments from "./Appointments";

const UserPage = () => {
	const [appointments, setAppointments] = useState(null);
	const token = localStorage.getItem("token");
	const getUserAppointments = async () => {
		const response = await fetch(
			"http://localhost:8080/api/user/appointments",
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
		}
	};
	const getAppointmentsByStatus = async (status) => {
		const response = await fetch(
			`http://localhost:8080/api/user/appointments?status=${status}`,
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
		}
	};
	return (
		<div className="pt-32" onLoad={getUserAppointments}>
			<UserNavbar />
			<div className="px-4">
				<Filter
					getUserAppointments={getUserAppointments}
					getAppointmentsByStatus={getAppointmentsByStatus}
				/>
				<Appointments appointments={appointments} />
			</div>
			<Footer />
		</div>
	);
};

export default UserPage;
