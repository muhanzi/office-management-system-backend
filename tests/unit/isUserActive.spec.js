const checkUser = require("../../controllers/marketing_controller");

describe("isUserActive()", () => {
  it("isUserActive should return true", () => {
    expect(checkUser.isUserActive()).toBeTruthy();
  });
  it("isUserActive should return true", () => {
    expect(checkUser.isUserActive()).toEqual(true);
  });
});
