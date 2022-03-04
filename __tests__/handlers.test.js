const handlers = require('../handlers')
const path = require('path')

describe('Test the root path.', () => {
    test('It should respond with the GET method.', () => {
        const req = {}, res = { sendFile: jest.fn() }
        handlers.home(req, res)
        expect(res.sendFile.mock.calls[0][0]).toBe(path.join('C:/Users/lmarc/Desktop/Homework/NoteTaker/public/index.html'))
    })
})

// describe('Test note POST method.', () => {
//     test('It should respond with a successful post.', () => {
//         const req = {"title":"test title","text":"test text"}, res = { json: jest.fn() }
//         handlers.notePost(req, res)
//         expect(res.status.mock.calls).toBe('201')
//     })
// })