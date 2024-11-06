import { expect } from "chai";
import "dotenv/config";
import pkg from "pactum";
const { spec } = pkg;
import { baseUrl, userID, user, password } from "../helpers/data.js";

let token_response;
describe("Api tests", () => {
  it("get request", async () => {
    const response = await spec()
      .get(`${baseUrl}/BookStore/v1/Books`)
      .inspect();
    const r = JSON.stringify(response.body);
    console.log(process.env.SECRET_PASSWORD);
    expect(response.statusCode).to.eql(200);
    expect(response.body.books[1].title).to.eql(
      "Learning JavaScript Design Patterns"
    );
    expect(response.body.books[4].author).to.eql("Kyle Simpson");
    expect(r).to.include("Learning JavaScript Design Patterns");
  });

  it.skip("Create a user", async () => {
    const response = await spec()
      .post(`${baseUrl}/Account/v1/User`)
      .withBody({
        userName: user,
        password: password,
      })
      .inspect();
    expect(response.statusCode).to.eql(201);
  });

  it.only("Generate token", async () => {
    const response = await spec()
      .post(`${baseUrl}/Account/v1/GenerateToken`)
      .withBody({
        userName: user,
        password: password,
      })
      .inspect();
    token_response = response.body.token;
    expect(response.statusCode).to.eql(200);
    expect(response.body.result).to.eql("User authorized successfully.");
  });

  it.only("Check token", async () => {
    console.log("another it block " + token_response);
  });

  it.skip("Add a book", async () => {
    const response = await spec()
      .post(`${baseUrl}/BookStore/v1/Books`)
      .withBearerToken(token_response)
      .inspect()
      .withBody({
        "userId": userID,
       "collectionOfIsbns": [
        {
            "isbn": "9781449325862",
        }],
      });
    expect(response.statusCode).to.eql(201);
  });

  it.skip("Check a book", async () => {
    const response = await spec()
      .get(`${baseUrl}/Account/v1/User/${userID}`)
      .withBearerToken(token_response)
      .inspect()
    expect(response.statusCode).to.eql(200);
  });

  it.skip("Delete all book", async () => {
    const response = await spec()
      .delete(`${baseUrl}/Account/v1/User/${userID}`)
      .withBearerToken(token_response)
      .inspect()
    expect(response.statusCode).to.eql(204)
    expect(response.body.books).to.eql([])
  });
});
