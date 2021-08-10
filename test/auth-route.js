const { expect } = require("chai");
const sinon = require("sinon");

const authRoutes = require("../dist/routes/auth");

describe("Auth routes", () => {
  describe("sign-in unit test", () => {
    it("should throw an error if username and password are empty", () => {});
    it("should throw an error if invalid password", () => {});
  });
  describe("sign-up unit test", () => {
    it("should throw an error if invalid fields", () => {});
    it("should throw an error if duplicate user", () => {});
  });
});
