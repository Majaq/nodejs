import { expect } from "chai";
import 'dotenv/config'
import pkg from "pactum";
const { spec } = pkg;
import { baseUrl, userID} from "../helpers/data.js"

describe("Api tests", () => {
  it("get request", async () => {
    const response = await spec()
      .get(`${baseUrl}/BookStore/v1/Books`)
      .inspect();
    const r = JSON.stringify(response.body);
    console.log(process.env.SECRET_PASSWORD)
    expect(response.statusCode).to.eql(200);
    expect(response.body.books[1].title).to.eql(
      "Learning JavaScript Design Patterns"
    );
    expect(response.body.books[4].author).to.eql("Kyle Simpson");
    expect(r).to.include("Learning JavaScript Design Patterns");
  });

  it.skip("Create a use", async () => {
    const response = await spec()
      .post(`${baseUrl}/Account/v1/User`)
      .withBody({
        userName: "testnode321?",
        password: process.env.SECRET_PASSWORD,
      })
      .inspect();
        expect(response.statusCode).to.eql(201);
        //95a0efc5-ce61-42a7-b990-6f8fd23efc0c
  });
});
