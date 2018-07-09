const utils = require("./utils");
const expect = require("expect");

it("should add two numbers", () => {
  const res = utils.add(20, 10);
  expect(res)
    .toBe(30)
    .toBeA("number");
});

it("should square two numbers", () => {
  const res = utils.square(12);
  expect(res)
    .toBe(144)
    .toBeA("number");
});

it("includes firstName and lastName with proper values", () => {
  const res = utils.setName({}, "Saurabh Thakur");
  expect(res)
    .toInclude({
      firstName: "Saurabh",
      lastName: "Thakur"
    })
    .toBeA("object");
});

it("should async add two numbers", done => {
  utils.asyncAdd(10, 20, sum => {
    expect(sum)
      .toBe(30)
      .toBeA("number");
    done();
  });
});

it("should async square a number", done => {
  utils.asyncSquare(12, square => {
    expect(square)
      .toBe(144)
      .toBeA("number");
    done();
  });
});
