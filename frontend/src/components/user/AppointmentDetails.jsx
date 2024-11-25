"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import UserNavbar from "./UserNavbar";
import Footer from "../Footer";
import DeleteAppointment from "./DeleteAppointment";
import Link from "next/link";

const AppointmentDetails = () => {
	const { id } = useParams();
	const router = useRouter();
	const [data, setData] = useState({ petName: "", details: "", date: "" });
	const [calendar, setCalendar] = useState("");
	const [time, setTime] = useState("");
	const [reason, setReason] = useState("Regular Check-Up");
	const [age, setAge] = useState(1);
	const [error, setError] = useState(null);
	const [details, setDetails] = useState("");
	const [status, setStatus] = useState("COMPLETED");
	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const newDetail = `Pet age: ${age}, Reason: ${reason}.`;
		var dateTimeString = `${calendar}T${time}`;
		const sendData = {
			...data,
			details: newDetail + details,
			date: new Date(dateTimeString),
		};
		try {
			const response = await fetch(
				"http://localhost:8080/api/user/appointments/" + id,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					body: JSON.stringify({ ...sendData }),
				}
			);
			if (response.status === 200) {
				setError(null);
				router.push("/user");
			} else if (response.status === 409) {
				setError("Appointment can't be set on this date");
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const getTime = (d) => {
		const date = new Date(d);
		return date.toLocaleTimeString("pl-PL", {
			hour: "2-digit",
			minute: "2-digit",
		});
	};
	const getAppointment = async () => {
		const token = localStorage.getItem("token");
		const response = await fetch(
			"http://localhost:8080/api/user/appointments/" + id,
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
			var dat = res.date;
			var d = new Date(dat);
			setCalendar(d.toISOString().split("T")[0]);
			setTime(getTime(res.date));
			const petAgeMatch = res.details.match(/Pet age: (\d+),/);
			const reasonMatch = res.details.match(/Reason: (.+)\./);
			const petAge = petAgeMatch ? petAgeMatch[1] : "";
			setAge(petAge);
			const detailsReason = reasonMatch ? reasonMatch[1] : "";
			setReason(detailsReason);
			setStatus(res.status);
			setData({
				petName: res.petName,
				details: res.details
					.replace(`Pet age: ${petAge},`, "")
					.replace(`Reason: ${detailsReason}.`, "")
					.trim(),
				date: res.date,
			});
		}
	};
	const [open, setOpen] = useState(false);
	const onDeleteClick = () => {
		setOpen(true);
	};
	const handleDeleteAppointment = async () => {
		setOpen(false);
		const token = localStorage.getItem("token");
		const response = await fetch(
			"http://localhost:8080/api/user/appointments/" + id,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			}
		);
		if (response.status === 200) {
			setError(null);
			router.push("/user");
		} else setError("Something went wrong");
	};
	return (
		<div onLoad={getAppointment}>
			<UserNavbar />
			<div className="max-w-2xl px-4 py-8 mx-auto lg:py-16 mt-20">
				<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
					{status === "RESERVED"
						? "Edit Appointment"
						: "Appointment Details"}
				</h2>
				{status !== "RESERVED" ? (
					<div>
						<p>
							Pet name: <b>{data.petName}</b>
						</p>
						<p>
							Pet age: <b>{age}</b>
						</p>
						<p>
							Appointment reason: <b>{reason}</b>
						</p>
						<p>
							Date: <b>{calendar}</b>
						</p>
						<p>
							Time: <b>{time}</b>
						</p>
						<br></br>
						<p>{details}</p>
						<br></br>
						<Link
							className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							href="/user"
						>
							Back
						</Link>
					</div>
				) : (
					<form onSubmit={handleSubmit}>
						<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
							<div className="sm:col-span-2">
								<label
									htmlFor="petName"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Pet Name
								</label>
								<input
									type="text"
									name="petName"
									id="petName"
									value={data.petName}
									onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Type your pet name"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="reason"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Reason
								</label>
								<select
									id="reason"
									value={reason}
									onChange={(e) => {
										e.preventDefault();
										setReason(e.target.value);
									}}
									required
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								>
									<option value="Regular Check-Up">
										Regular Check-Up
									</option>
									<option value="Vaccination">
										Vaccination
									</option>
									<option value="Dental Check-Up">
										Dental Check-Up
									</option>
									<option value="Health Concerns">
										Health Concerns
									</option>
								</select>
							</div>
							<div>
								<label
									htmlFor="petAge"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Pet Age
								</label>
								<input
									type="number"
									name="petAge"
									id="petAge"
									value={age}
									onChange={(e) => {
										e.preventDefault();
										setAge(e.target.value);
									}}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									max={100}
									min={1}
									required
								/>
							</div>
							<div>
								<input
									type="date"
									name="date_calendar"
									id="date_calendar"
									value={calendar}
									onChange={(e) => {
										e.preventDefault();
										setCalendar(e.target.value);
									}}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Select date"
									required
								/>
							</div>
							<div>
								<input
									type="time"
									name="time"
									id="time"
									value={time}
									onChange={(e) => {
										e.preventDefault();
										setTime(e.target.value);
									}}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Select Time"
									required
								/>
							</div>
							<div className="sm:col-span-2 mb-6">
								<label
									htmlFor="details"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Details (optional)
								</label>
								<textarea
									id="details"
									rows="8"
									className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="Additional details to help us better understand"
									value={details}
									onChange={(e) => setDetails(e.target.value)}
								></textarea>
							</div>
						</div>
						{error && (
							<div
								className="font-semibold p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
								role="alert"
							>
								{error}
							</div>
						)}
						<div className="flex items-center content-center gap-4">
							<button
								type="submit"
								className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
							>
								Update
							</button>
							<button
								type="button"
								onClick={onDeleteClick}
								className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
							>
								<svg
									className="w-5 h-5 mr-1.5 -ml-1.5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
										clipRule="evenodd"
									></path>
								</svg>
								Delete
							</button>
						</div>
					</form>
				)}
				{open && (
					<DeleteAppointment
						setError={setError}
						setOpen={setOpen}
						id={id}
						handleDelete={handleDeleteAppointment}
					/>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default AppointmentDetails;
