import React from "react";
import Link from "next/link";

const Appointments = ({ appointments }) => {
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
	return (
		<div className="overflow-x-auto mt-3 mb-32">
			{appointments && appointments.length !== 0 ? (
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
							<th scope="col" className="px-6 py-3">
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
										{appointment.status === "RESERVED" ? (
											<ActiveStatus />
										) : (
											<InactiveStatus />
										)}{" "}
										{appointment.status.toLowerCase()}
									</div>
								</td>
								<td className="px-6 py-4">
									<Link
										href={`/user/appointments/${appointment.id}`}
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
									>
										{appointment.status === "RESERVED"
											? "Edit Appointment"
											: "Details"}
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className="text-center mt-4 mb-8 text-lg text-gray-900 dark:text-white">
					You don't have any apointments yet!
				</p>
			)}
		</div>
	);
};

export default Appointments;
