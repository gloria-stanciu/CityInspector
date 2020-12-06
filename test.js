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
    it("Logs in a user without admin role", async function(){
        const data = {
            "phoneNumber": "0011223344",
            "password": "test"
        }
        await supertest
            .post('/users/login')
            .send(data)
            .expect(200)
            .then()
    })
    it('Should not get all users with token of user without admin role', async function(){
        await supertest
            .get('/users')
            .set('Authorization', 'Bearer yyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA3MjQ1ODEyNzciLCJpZCI6NSwiaWF0IjoxNjA2NzM1OTk5LCJleHAiOjE2MDczNDA3OTl9.v0eUFbjKibuz8R_FAQ6aA6FkgCy7zAL8jEfLIPANGtU')
            .expect(401)
            .then(response =>{
                expect(response.body.message).to.equal('invalid token')
            })
    })
    it("Logs in a user with admin role", async function(){
        const data = {
            "phoneNumber": "5566778899",
            "password": "admin"
        }
        await supertest
            .post('/users/login')
            .send(data)
            .expect(200)
            .then()
    })
})

// describe("Get users or one user", async function(){
//     it("", async function(){
//         await supertest
//         .get('/users')
//         .set({'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA3MjQ1ODEyNzciLCJpZCI6NSwiaWF0IjoxNjA2ODEyMzA3LCJleHAiOjE2MDc0MTcxMDd9.sUhQC0zS-eoRLBfzULq2YZQoh4ZbI1o_bKr-1FhJ9H8"})
//         .expect(401)
//         .then()
//         .catch(err => {
//             expect(err.message).to.eq('invalid signature')
//         })
//     })
// })