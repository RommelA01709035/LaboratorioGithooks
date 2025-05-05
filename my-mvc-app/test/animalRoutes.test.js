const request = require("supertest");
const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");
const animalRoutes = require("../routes/animalRoutes");

process.env.JWT_SECRET = "testsecret";
const accessToken = jwt.sign({ role: "admin" }, process.env.JWT_SECRET);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/zoo", animalRoutes);

describe("Zoo Animal Routes", () => {
  it("POST /zoo creates an animal", async () => {
    const res = await request(app)
      .post("/zoo")
      .set("Cookie", [`accessToken=${accessToken}`])
      .send({ name: "Leo", species: "Lion", age: 5 });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Leo");
  });

  it("GET /zoo returns all animals", async () => {
    const res = await request(app)
      .get("/zoo")
      .set("Cookie", [`accessToken=${accessToken}`]);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /zoo/species/Lion filters by species", async () => {
    const res = await request(app)
      .get("/zoo/species/Lion")
      .set("Cookie", [`accessToken=${accessToken}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body[0].species).toBe("Lion");
  });

  it("PUT /zoo/:id updates an animal", async () => {
    const post = await request(app)
      .post("/zoo")
      .set("Cookie", [`accessToken=${accessToken}`])
      .send({ name: "Ellie", species: "Elephant", age: 10 });

    const id = post.body.id;

    const res = await request(app)
      .put(`/zoo/${id}`)
      .set("Cookie", [`accessToken=${accessToken}`])
      .send({ age: 12 });

    expect(res.statusCode).toBe(200);
    expect(res.body.age).toBe(12);
  });

  it("DELETE /zoo/:id deletes an animal", async () => {
    const post = await request(app)
      .post("/zoo")
      .set("Cookie", [`accessToken=${accessToken}`])
      .send({ name: "Koko", species: "Gorilla", age: 20 });

    const id = post.body.id;

    const res = await request(app)
      .delete(`/zoo/${id}`)
      .set("Cookie", [`accessToken=${accessToken}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Koko");
  });
});
