const { expect } = require("chai");
const sinon = require("sinon");

const bookRoutes = require("../dist/routes/book");

describe("Book routes", () => {
  describe("get book method", () => {
    it("should error if database not response", () => {});
    it("should error if get book by id but no id found", () => {});
  });
  describe("manage book method", () => {
    it("should error if invalid fields", () => {});
  });
});
