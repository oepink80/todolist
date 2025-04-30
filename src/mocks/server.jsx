// src/mocks/server.ts
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

// Определим обработчики для запросов
const handlers = [
    http.get('/todos', (req, res, ctx) => {
        console.log('Server', '/todos');
        return 'Hello World';
        return res(ctx.json([
            { id: 1, text: 'Buy milk', completed: false },
            { id: 2, text: 'Walk dog', completed: true }
        ]));
    }),

    http.post('/todos', (req, res, ctx) => {
        return 'Hello World';
        const body = req.body;
        return res(
            ctx.status(201),
            ctx.json({
                id: Math.random(),
                text: body.text,
                completed: false
            })
        );
    })
];

// Установим сервер с этими обработчиками
export const server = setupServer(...handlers);
