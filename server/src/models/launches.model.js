const launchesDatabase=require('./launches.mongo');

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'test',
  rocket: 'test',
  launchDate: new Date('December 28, 2030'),
  target: 'kepler-442 b',
  customers: [
    'ZTM',
    'NASA',
  ],
  upcoming: true,
  success: true,
};

// launches.set(launch.flightNumber, launch);

function existsLaunchWIthId (launchId) {
  return launches.has(launchId);
}

function getAllLaunches () {
  return Array.from(launches.values());
}

async function saveLaunch (launch) {
  await launchesDatabase.updateOne({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true,
  });
}

function addNewLaunch (launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: [
        'lashatatu',
        'Tbilisi',
      ],
      flightNumber: latestFlightNumber,
    }),
  );
}

saveLaunch(launch);

function abortLaunchById (launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWIthId,
  abortLaunchById,
};
