const request = require("supertest");
const { app } = require("./server");
const expect = require("expect");

describe("Server", () => {
  it("should return hello world response", done => {
    request(app)
      .get("/")
      .expect(404)
      .expect(res => {
        expect(res.body).toInclude({
          error: "Page not found"
        });
      })
      .end(done);
  });

  it("should return your object", done => {
    request(app)
      .get("/you")
      .expect(200)
      .expect(res => {
        expect(res.body)
          .toInclude({
            firstName: "saurabh",
            age: 20
          })
          .toBeA("object");
      })
      .end(done);
  });
});
