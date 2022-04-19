const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

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

async function getAllLaunches () {
  return await launchesDatabase.find({},
    {
      '__id': 0,
      '__v': 0,
    });
}

async function saveLaunch (launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if(!planet){
    throw new Error('Planet not found');
  }

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
