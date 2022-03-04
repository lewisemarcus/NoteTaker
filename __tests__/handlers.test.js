const handlers = require('../handlers')
const supertest = require('supertest')
const path = require('path')
const { request } = require('http')
const app = require('../app')

describe('GET *', () => {
    describe('Test the root path.', () => {
        test(`The 'home' handler from 'handlers.js' should be called.`, () => {
            const req = {}, res = { sendFile: jest.fn() }
            const mock = jest.spyOn(handlers, 'home').mockImplementation(() => {})
            handlers.home(req, res)
            expect(mock).toHaveBeenCalled()
            mock.mockRestore()
        })
    })
})

describe('POST /api/notes', () => {
    describe('Given a user enters a new note.', () => {
        test('It should respond with a successful POST method.', async () => {
            const response = await supertest(app).post('/api/notes').send({
                text: 'test text',
                title: 'test title'
            })
            expect(response.req.method).toBe('POST')
        })
        test('It should save the entered note to the db.json file and respond with a success note containing the note added and id of length 32.', async () => {
            const response = await supertest(app).post('/api/notes').send({
                text: 'test text',
                title: 'test title'
            })
            textJson = JSON.parse(response.text)
            expect(textJson.status).toBe('success')
            expect(textJson.body.title).toBe('test title')
            expect(textJson.body.text).toBe('test text')
            expect(textJson.body.id).toEqual(expect.any(String))
            expect(textJson.body.id.length).toEqual(32)
        })
        test('It should respond with a status code 201 and contain a report the status and note.', async () => {
            const response = await supertest(app).post('/api/notes').send({
                text: 'test text',
                title: 'test title'
            })
            expect(response.statusCode).toBe(201)
        })
        test('It should specify json in the content type header', async () => {
            const response = await supertest(app).post('/api/notes').send({
                text: 'test text',
                title: 'test title'
            })
            expect(response.type).toBe(`application/json`)
         })
    })
})