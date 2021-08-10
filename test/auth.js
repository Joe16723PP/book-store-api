const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../dist/app").default;
chai.use(chaiHttp);
chai.should();

describe("Authentication", () => {
  before((done) => {
    // Do something here before test
    done();
  });

  describe("sign-in", () => {
    it("it should have error status 404 user not found", (done) => {
      chai
        .request(app)
        .post("/sign-in")
        .set("content-type", "application/json")
        .send({ username: "test", password: "test" })
        .end((err, res) => {
          res.should.have.status(404);
          // res.body.should.have.property("message").eql("");
          done();
        });
    });
    it("it should have error status 400 invalid input", (done) => {
      chai
        .request(app)
        .post("/sign-in")
        .set("content-type", "application/json")
        .send({ username: "", password: "" })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("sign-up", () => {
    it("it should have error status 400 invalid input", (done) => {
      chai
        .request(app)
        .post("/sign-up")
        .set("content-type", "application/json")
        .send({
          username: "",
          password: "",
          name: "",
          surname: "",
          date_of_birth: "",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("should throw an error if duplicate user", () => {
      chai
        .request(app)
        .post("/sign-up")
        .set("content-type", "application/json")
        .send({
          username: "tester01",
          password: "tester01",
          name: "tester",
          surname: "unit_test",
          date_of_birth: "01/01/2001",
        })
        .end((err, res) => {
          // console.log(res);
          res.should.have.status(401);
        });
    });
  });

  after((done) => {
    // Do something here after test
    done();
  });
});
