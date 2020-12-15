'use strict';

const { expect } = require('chai');
const supertest = require('supertest')('https://city--inspector.herokuapp.com/api');

describe('Create user', function(){
    it('Should create a user without admin role', async function(){
        const data = {
            "firstName": "Test",
            "lastName": "Test",
            "phoneNumber": "0011223344",
            "password": "test",
        }
        await supertest
            .post('/users/register')
            .send(data)
            .expect(200)
            .then( response =>{
                expect(response.text).to.equal('User created successfully!')
            })
    })
    it('Should create a user with admin role', async function(){
        const data = {
            "firstName": "TestAdmin",
            "lastName": "TestAdmin",
            "phoneNumber": "5566778899",
            "password": "admin",
            "isAdmin": true
        }
        await supertest
            .post('/users/register')
            .send(data)
            .expect(200)
            .then( response =>{
                expect(response.text).to.equal('User created successfully!')
            })
    })
    it('Should not create user because already exists', async function(){
        const data = {
            "firstName": "Test",
            "lastName": "Test",
            "phoneNumber": "0011223344",
            "password": "test",
            "isAdmin": false
        }
        await supertest
            .post('/users/register')
            .send(data)
            .expect(400)
            .then(response => {
                expect(response.text).to.equal('Phone number already in use')
            })
    })
})

describe("Log in and get users", async function(){
    it("Logs in a user with admin role", async function(){
        const data = {
            "phoneNumber": "0724581277",
            "password": "glo"
        }
        await supertest
            .post('/users/login')
            .set({'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA3MjQ1ODEyNzciLCJpZCI6NSwiaWF0IjoxNjA3MzQ2MDk4LCJleHAiOjE2MDc5NTA4OTh9.BL903qxlebRXHlX9RYoCylJLarVxLb6k4IqlVyXl83U"})
            .send(data)
            .expect(200)
            .then()
    })
    it('Should get all users ', async function(){
        await supertest
            .get('/users')
            .set({'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA3MjQ1ODEyNzciLCJpZCI6NSwiaWF0IjoxNjA3MzQ2MDk4LCJleHAiOjE2MDc5NTA4OTh9.BL903qxlebRXHlX9RYoCylJLarVxLb6k4IqlVyXl83U"})
            .expect(200)
            .then()
    })
    it("Logs in a user without admin role", async function(){
        const data = {
            "phoneNumber": "0742426326",
            "password": "gloria"
        }
        await supertest
            .post('/users/login')
            .set({'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA3NDI0MjYzMjYiLCJpZCI6MSwiaWF0IjoxNjA3MzQ2Mjk1LCJleHAiOjE2MDc5NTEwOTV9.vHrv5zgD055Qp-D9X6odk0aKPQ2Lkxtrl7khGR4_yKY"})
            .send(data)
            .expect(200)
            .then()
    })
    it('Should not get all users because user does not have admin role', async function(){
        await supertest
            .get('/users')
            .set({'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA3NDI0MjYzMjYiLCJpZCI6MSwiaWF0IjoxNjA3MzQ2Mjk1LCJleHAiOjE2MDc5NTEwOTV9.vHrv5zgD055Qp-D9X6odk0aKPQ2Lkxtrl7khGR4_yKY"})
            .expect(401)
            .then()
    })
    it('Should get an user', async function(){
        await supertest
            .get('/users/4')
            .set({'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA3NDI0MjYzMjYiLCJpZCI6MSwiaWF0IjoxNjA3MzQ2Mjk1LCJleHAiOjE2MDc5NTEwOTV9.vHrv5zgD055Qp-D9X6odk0aKPQ2Lkxtrl7khGR4_yKY"})
            .expect(200)
            .then()
    })
})

describe("Update user", async function(){
    it("Shoul update user", async function(){
        const data = {
            "phoneNumber": "0777888999",
        }
        await supertest
        .patch('/users/91')
        .set({'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA3MjQ1ODEyNzciLCJpZCI6NSwiaWF0IjoxNjA3MzQ2MDk4LCJleHAiOjE2MDc5NTA4OTh9.BL903qxlebRXHlX9RYoCylJLarVxLb6k4IqlVyXl83U"})
        .send(data)
        .expect(200)
        .then()
    })
    it("Should not update user", async function(){
        const data = {
            "phoneNumber": "0777888999",
        }
        await supertest
        .patch('/users/11o')
        .set({'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA3NDI0MjYzMjYiLCJpZCI6MSwiaWF0IjoxNjA3MzQ2Mjk1LCJleHAiOjE2MDc5NTEwOTV9.vHrv5zgD055Qp-D9X6odk0aKPQ2Lkxtrl7khGR4_yKY"})
        .send(data)
        .expect(200)
        .then()
    })
})

describe("Delete user", async function(){
    it("Delete user with admin role", async function(){
        await supertest
        .delete('/users/110')
        .set({'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA3MjQ1ODEyNzciLCJpZCI6NSwiaWF0IjoxNjA3MzQ2MDk4LCJleHAiOjE2MDc5NTA4OTh9.BL903qxlebRXHlX9RYoCylJLarVxLb6k4IqlVyXl83U"})
        .expect(200)
        .then()
    })
    it("Delete user without admin role", async function(){
        await supertest
        .delete('/users/111')
        .set({'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA3MjQ1ODEyNzciLCJpZCI6NSwiaWF0IjoxNjA3MzQ2MDk4LCJleHAiOjE2MDc5NTA4OTh9.BL903qxlebRXHlX9RYoCylJLarVxLb6k4IqlVyXl83U"})
        .expect(200)
        .then()
    })
    it("Should not delete user because token is not of user with admin role", async function(){
        await supertest
        .delete('/users/1')
        .set({'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA3NDI0MjYzMjYiLCJpZCI6MSwiaWF0IjoxNjA3MzQ2Mjk1LCJleHAiOjE2MDc5NTEwOTV9.vHrv5zgD055Qp-D9X6odk0aKPQ2Lkxtrl7khGR4_yKY"})
        .expect(401)
        .then()
    })
})