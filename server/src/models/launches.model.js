const launches=new Map();

const launch = {
	flightNumber: 100,
	mission: "test",
	rocket: "test",
	launchDate: new Date("December 28, 2030"),
	destination: "kepler-442 b",
	customer: [
		"ZTM",
		"NASA",
	],
	upcoming: true,
	success: true,
};

launches.set(launch.flightNumber,launch)

module.exports={
	launches,
}
