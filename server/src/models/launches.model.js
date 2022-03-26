const launches = new Map();

let latestFlightNumber = 100;

const launch = {
	flightNumber: 100,
	mission: "test",
	rocket: "test",
	launchDate: new Date("December 28, 2030"),
	target: "kepler-442 b",
	customer: [
		"ZTM",
		"NASA",
	],
	upcoming: true,
	success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches () {
	return Array.from(launches.values());
}

function addNewLaunch (launch) {
	latestFlightNumber++;
	launches.set(
		 latestFlightNumber,
		 Object.assign(launch, {
			 success: true,
			 upcoming: true,
			 customers: [
				 "lashatatu",
				 "Tbilisi",
			 ],
			 flightNumber: latestFlightNumber,
		 }),
	);
}

module.exports = {
	getAllLaunches,
	addNewLaunch,
};
