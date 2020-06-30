const supertest = require("supertest");
const server = require("../../app");
const signUpService = require("../../services/sign_up_service");

describe("marketing department", () => {
  it("should return some text", async () => {
    const response = await supertest(server.appServer).get(
      "/api/marketing/showAll"
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("showAll is working okok");
  });
});

describe("user authentication", () => {
  // beforeEach()  // may be to clear database before testing or to enter data before testing
  // Testing the POST method
  it("tests the post new user endpoint and returns a token", async () => {
    const response = await supertest(server.appServer)
      .post("/api/signup")
      .send({
        username: "tina",
        password: "123pass",
        department: "marketing",
        role: "employee",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.message).toBe("signed up successfully");
  });

  // This is run after running the test
  afterEach(async () => {
    await signUpService.deleteByUsername("tina");
  });
});
