import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;

describe("Api tests", () => {
  it("get request", async () => {
    const response = await spec()
      .get("https://demoqa.com/BookStore/v1/Books")
      .inspect();
    expect(response.statusCode).to.eql(200);
    expect(response.body.books[1].title).to.eql(
      "Learning JavaScript Design Patterns"
    );
    expect(response.body.books[4].author).to.eql("Kyle Simpson");
  });
});
