const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");

process.env.JWT_SECRET = "testsecret";

const accessToken = jwt.sign({ username: "testuser" }, process.env.JWT_SECRET);

describe("User Routes with token", () => {
  it("GET /users returns 200 with token", async () => {
    const res = await request(app)
      .get("/users")
      .set("Cookie", [`accessToken=${accessToken}`]);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /users creates a user", async () => {
    const res = await request(app)
      .post("/users")
      .set("Cookie", [`accessToken=${accessToken}`])
      .send({ name: "Alice" });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Alice");
  });

  it("PUT /users/:id updates a user", async () => {
    const postRes = await request(app)
      .post("/users")
      .set("Cookie", [`accessToken=${accessToken}`])
      .send({ name: "Bob" });

    const id = postRes.body.id;

    const res = await request(app)
      .put(`/users/${id}`)
      .set("Cookie", [`accessToken=${accessToken}`])
      .send({ name: "Bobby" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Bobby");
  });

  it("DELETE /users/:id removes a user", async () => {
    const postRes = await request(app)
      .post("/users")
      .set("Cookie", [`accessToken=${accessToken}`])
      .send({ name: "Charlie" });

    const id = postRes.body.id;

    const res = await request(app)
      .delete(`/users/${id}`)
      .set("Cookie", [`accessToken=${accessToken}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Charlie");
  });
});
