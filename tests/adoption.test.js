import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8081");

describe("Adoption Router Tests", () => {
  let userId, petId;

  before(async () => {
    // Crear un usuario y una mascota para las pruebas
    const userResponse = await request.post("/api/users").send({
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
      password: "password123",
    });
    userId = userResponse.body.payload._id;

    const petResponse = await request.post("/api/pets").send({
      name: "Buddy",
      specie: "dog",
      birthDate: "2020-01-01",
    });
    petId = petResponse.body.payload._id;
  });

  it("POST /api/adoptions/:uid/:pid - Debería crear una adopción", async () => {
    const response = await request.post(`/api/adoptions/${userId}/${petId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status", "success");
    expect(response.body).to.have.property("message", "Pet adopted");
  });

  it("GET /api/adoptions - Debería obtener todas las adopciones", async () => {
    const response = await request.get("/api/adoptions");
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status", "success");
    expect(Array.isArray(response.body.payload)).to.be.true;
  });
});