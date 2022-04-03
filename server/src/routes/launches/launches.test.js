const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
	test("it should respond with 200 success", async () => {
		const response = await request(app)
		  .get("/launches")
		  .expect("Content-Type", /json/)
		  .expect(200);
	});
});

describe("Test POST /launch", () => {
	const completeLaunchData = {
		mission: "uss enterprise",
		rocket: "NCC 1701-D",
		target: "kepler-186 f",
		launchDate: "January 4, 2027",
	};
	const completeDataWithoutDate = {
		mission: "uss enterprise",
		rocket: "NCC 1701-D",
		target: "kepler-186 f",
	};

	test("it should respond with 201 created", async () => {
		const response = await request(app)
		  .post("/launches")
		  .send(completeLaunchData)
		  .expect("Content-Type", /json/)
		  .expect(201);

		const requestDate = new Date(completeLaunchData.launchDate).valueOf();
		const responseDate = new Date(response.body.launchDate).valueOf();
		expect(responseDate).toBe(requestDate);

		expect(response.body).toMatchObject(completeDataWithoutDate);
	});

	test("It should catch missing required properties", () => {
	});

	test("It should catch invalid dates", () => {
	});
});

module.exports = app;