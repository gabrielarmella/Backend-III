import UserDTO from "../src/dto/UserDTO.js";
import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8081");

describe("Testing Adoptme API", () => {
    describe("Users Router", () => {
        let userId = null;

        it("POST /api/users - Deberia crear un nuevo usuario", async () => {
            const userMock = {
                first_name: "John",
                last_name: "Doe",
                email: "johndoe@example.com",
                password: "password123"
            };

            const { statusCode, ok, _body } = await request.post("/api/users").send(userMock);
            expect(statusCode).to.be.equal(201);
            expect(ok).to.be.true;
            expect(_body).to.have.property("status", "success");
            expect(_body.payload).to.have.property("_id");
            userId = _body.payload._id;
        });

        it("GET /api/users - Deberia devolver todos los users", async () => {
            const { statusCode, ok, _body } = await request.get("/api/users");
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.true;
            expect(_body).to.have.property("status", "success");
            expect(_body).to.have.property("payload");
            expect(Array.isArray(_body.payload)).to.be.true;
        });

        it("GET /api/users/:uid - Deberia devolver un usuario por ID", async () => {
            if (!userId) throw new Error("User not created");
            const { statusCode, ok, _body } = await request.get(`/api/users/${userId}`);
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.true;
            expect(_body).to.have.property("status", "success");
            expect(_body.payload).to.have.property("_id", userId);
        });

        it("PUT /api/users/:uid - Deberia actualizar un usuario por ID", async () => {
            if (!userId) throw new Error("User not created");
            const updateData = { first_name: "Jane" };
            const { statusCode, ok, _body } = await request.put(`/api/users/${userId}`).send(updateData);
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.true;
            expect(_body).to.have.property("status", "success");

            const { _body: updatedUser } = await request.get(`/api/users/${userId}`);
            expect(updatedUser.payload).to.have.property("first_name", "Jane");
        });

        it("DELETE /api/users/:uid - Deberia eliminar un usuario por ID", async () => {
            if (!userId) throw new Error("User not created");
            const { statusCode, ok, _body } = await request.delete(`/api/users/${userId}`);
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.true;
            expect(_body).to.have.property("status", "success");

            const { statusCode: getStatusCode } = await request.get(`/api/users/${userId}`);
            expect(getStatusCode).to.be.equal(404);
        });
    });

    describe("Pets Router", () => {
        let petId = null;

        it("POST /api/pets - Deberia crear una nueva pet", async () => {
            const petMock = {
                name: "Buddy",
                specie: "dog",
                birthDate: "2020-01-01"
            };

            const { statusCode, ok, _body } = await request.post("/api/pets").send(petMock);
            expect(statusCode).to.be.equal(201);
            expect(ok).to.be.true;
            expect(_body).to.have.property("status", "success");
            expect(_body.payload).to.have.property("_id");
            petId = _body.payload._id;
        });

        it("GET /api/pets - Deberia devolver todos los pets", async () => {
            const { statusCode, ok, _body } = await request.get("/api/pets");
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.true;
            expect(_body).to.have.property("status", "success");
            expect(_body).to.have.property("payload");
            expect(Array.isArray(_body.payload)).to.be.true;
        });

        it("GET /api/pets/:pid - Deberia devolver una pet por su ID", async () => {
            if (!petId) throw new Error("Pet not created");
            const { statusCode, ok, _body } = await request.get(`/api/pets/${petId}`);
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.true;
            expect(_body).to.have.property("status", "success");
            expect(_body.payload).to.have.property("_id", petId);
        });

        it("PUT /api/pets/:pid - Deberia actualizar una pet por su ID", async () => {
            if (!petId) throw new Error("Pet not created");
            const updateData = { name: "Max" };
            const { statusCode, ok, _body } = await request.put(`/api/pets/${petId}`).send(updateData);
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.true;
            expect(_body).to.have.property("status", "success");

            const { _body: updatedPet } = await request.get(`/api/pets/${petId}`);
            expect(updatedPet.payload).to.have.property("name", "Max");
        });

        it("DELETE /api/pets/:pid - Deberia eliminar una pet por su ID", async () => {
            if (!petId) throw new Error("Pet not created");
            const { statusCode, ok, _body } = await request.delete(`/api/pets/${petId}`);
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.true;
            expect(_body).to.have.property("status", "success");

            const { statusCode: getStatusCode } = await request.get(`/api/pets/${petId}`);
            expect(getStatusCode).to.be.equal(404);
        });
    });
});