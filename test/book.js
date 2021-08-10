const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../dist/app").default;
chai.use(chaiHttp);
chai.should();
const { expect } = chai;

describe("Book routes", () => {
  before((done) => {
    // Do something here before test
    done();
  });

  describe("get book", () => {
    it("should success with the status 200", (done) => {
      chai
        .request(app)
        .get("/books/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("books");
          done();
        });
    });
    it("should error if invalid book id that not provided by mongo", (done) => {
      chai
        .request(app)
        // for real id = 610a0791c27f87319cf9a786
        .get("/books/dsq4214")
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("should success with status 200 if valid book id", (done) => {
      chai
        .request(app)
        // for real id = 610a0791c27f87319cf9a786
        .get("/books/610a0791c27f87319cf9a786")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("_id");
          res.body.should.have.property("book_name");
          done();
        });
    });

    it("get external book, should success with the status 200 and array result", (done) => {
      chai
        .request(app)
        .get("/books/ext")
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  after((done) => {
    // Do something here before test
    done();
  });
});
