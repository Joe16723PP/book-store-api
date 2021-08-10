const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../dist/app").default;
chai.use(chaiHttp);
chai.should();

describe("User routes", () => {
  it("should success with user data and status 200", (done) => {
    chai
      .request(app)
      .post("/sign-in")
      .set("content-type", "application/json")
      .send({ username: "tester01", password: "tester01" })
      .end((err, res) => {
        const { token } = res.body;
        chai
          .request(app)
          .get("/users")
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            console.log(res.body);
            res.should.have.status(200);
            res.body.should.have.property("name");
            res.body.should.have.property("surname");
            res.body.should.have.property("date_of_birth");
            res.body.should.have.property("orders");
            done();
          });
      });
  });
  it("should error if invalid bearer token", (done) => {
    const token = "sometoken";
    chai
      .request(app)
      .get("/users")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
