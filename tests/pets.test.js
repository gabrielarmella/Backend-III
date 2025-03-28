import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8081");

describe('Testing Adoptme', () => {
    let idUser = null;
    const petMock = {
        name:"Firulais",
        specie:"dog",
        birthDate:"2021-01-01"
    }
    describe('Test pets', () => {
        it('Post /api/pets crear una mascota', async () => {

            const {statusCode, ok, _body} = await request.post('/api/pets').send(petMock);
            expect(statusCode).to.be.equal(201);
            expect(ok).to.be.equal(true);
            expect(_body).to.have.property('status','success');
            expect(_body.payload).to.have.property('adopted',false);
            idUser = _body.payload._id;

        })

        it('Post /api/pets/withimage crear una mascota con imagen', async () => {
            const {statusCode,ok,_body} = await request.post('/api/pets/withimage')
            .field('name',petMock.name)
            .field('specie',petMock.specie)
            .field('birthDate',petMock.birthDate)
            .attach('image','tests/assets/dog.jpg');
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.equal(true);
            expect(_body).to.have.property('status','success');
        })

        it('Post /api/pets rear una mascota sin el campo  nombre, el módulo debe responder con un status 400.', async () => {
            const petMock = {
                specie:"dog",
                birthDate:"2021-01-01"
            }
            const {statusCode, ok, _body} = await request.post('/api/pets').send(petMock);
            expect(statusCode).to.be.equal(400);
        })

        it('método GET, la respuesta debe tener los campos status y payload. Además, payload debe ser de tipo arreglo', async ()=>{
            const {statusCode, ok, _body} = await request.get('/api/pets');
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.equal(true);
            expect(_body).to.have.property('status','success');
            expect(_body).to.have.property('payload');
            expect(Array.isArray(_body.payload)).to.be.true;            
        })

        it('PATCH debe poder actualizar correctamente a una mascota determinada (esto se puede testear comparando el valor previo con el nuevo valor de la base de datos).',async ()=>{
            if(!idUser) throw new Error('No se ha creado una mascota');
            const updatePet = {
                name:"pepe"
            };
            const {statusCode, ok, _body} = await request.patch(`/api/pets/${idUser}`).send(updatePet);
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.equal(true);
            expect(_body).to.have.property('status','success');
            const {statusCode:statusCodeGet, ok:okGet, _body:_bodyGet} = await request.get(`/api/pets/${idUser}`);
            expect(statusCodeGet).to.be.equal(200);
            expect(okGet).to.be.equal(true);
            expect(_bodyGet.payload).to.be.property("name","pepe");
        })

        it('DELETE debe poder eliminar correctamente a una mascota determinada', async () => {
            if(!idUser) throw new Error('No se ha creado una mascota');
            const {statusCode, ok, _body} = await request.delete(`/api/pets/${idUser}`);
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.equal(true);
            expect(_body).to.have.property('status','success');
            const {statusCode:statusCodeGet, ok:okGet, _body:_bodyGet} = await request.get(`/api/pets/${idUser}`);
            expect(statusCodeGet).to.be.equal(404);
            expect(okGet).to.be.equal(false);
        })
    })
})