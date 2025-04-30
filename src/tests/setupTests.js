// tests/setupTests.js
import { server } from '../mocks/server.jsx';

beforeAll(() => {
    console.log('🚀 Mock server is listening!');
    server.listen(); // Начинаем прослушивать запросы
});

afterEach(() => {
    server.resetHandlers(); // Сбрасываем обработчики между тестами
});

afterAll(() => {
    server.close(); // Закрываем сервер после завершения всех тестов
});
