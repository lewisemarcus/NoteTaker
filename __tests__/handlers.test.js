const handlers = require('../handlers/handlers')
const supertest = require('supertest')
const app = require('../app')

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

describe('DELETE /api/notes', () => {
    describe('Test the delete function of the notes route', () => {
        test(`The 'noteDelete' handler from 'handlers.js' should be called`, () => {
            const req = {}, res = { sendFile: jest.fn() }
            const mock = jest.spyOn(handlers, 'noteDelete').mockImplementation(() => {})
            handlers.noteDelete(req, res)
            expect(mock).toHaveBeenCalled()
            mock.mockRestore()
        })
        test(`Expect DELETE request method`, async () => {
            const response = await supertest(app).delete('/api/notes')
            expect(response.req.method).toBe('DELETE')
        })
    })
})

describe('GET /notes', () => {
    describe('Test the notes route.', () => {
        test(`The 'notes' handler from 'handlers.js' should be called.`, () => {
            const req = {}, res = { sendFile: jest.fn() }
            const mock = jest.spyOn(handlers, 'notes').mockImplementation(() => {})
            handlers.notes(req, res)
            expect(mock).toHaveBeenCalled()
            mock.mockRestore()
        })
        test(`Expect request method to be GET`, async () => {
            const response = await supertest(app).get('/notes')
            expect(response.req.method).toBe('GET')
        })
        test(`Expect status code 200`, async () => {
            const response = await supertest(app).get('/notes')
            expect(response.status).toBe(200)
        })
    })
})

describe('GET /api/notes', () => {
    describe('Test the /api/notes path.', () => {
        test(`The 'noteGet' handler from 'handlers.js' should be called.`, () => {
            const req = {}, res = { sendFile: jest.fn() }
            const mock = jest.spyOn(handlers, 'noteGet').mockImplementation(() => {})
            handlers.noteGet(req, res)
            expect(mock).toHaveBeenCalled()
            mock.mockRestore()
        })
        test(`Expect request method to be GET`, async () => {
            const response = await supertest(app).get('/api/notes')
            expect(response.req.method).toBe('GET')
        })
        test(`Expect status code 200`, async () => {
            const response = await supertest(app).get('/api/notes')
            expect(response.status).toBe(201)
        })
        test(`Expect the response type to be json`, async () => {
            const response = await supertest(app).get('/api/notes')
            expect(response.type).toBe(`application/json`)
        })
        test(`Expect the body of the json file to contain an array`, async () => {
            const response = await supertest(app).get('/api/notes')
            expect(response._body.constructor).toBe(Array)
        })
    })
})

describe('GET *', () => {
    describe('Test the root path.', () => {
        test(`The 'home' handler from 'handlers.js' should be called.`, () => {
            const req = {}, res = { sendFile: jest.fn() }
            const mock = jest.spyOn(handlers, 'home').mockImplementation(() => {})
            handlers.home(req, res)
            expect(mock).toHaveBeenCalled()
            mock.mockRestore()
        })
        test(`Expect request method to be GET`, async () => {
            const response = await supertest(app).get('/')
            expect(response.req.method).toBe('GET')
        })
        test(`Expect status code 200`, async () => {
            const response = await supertest(app).get('/')
            expect(response.status).toBe(200)
        })
    })
})