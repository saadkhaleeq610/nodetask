import { createServer } from "http";
const PORT = process.env.PORT || 3000;

const users = [
    { id: 1, name: "John do" },
    { id: 2, name: "John d" },
    { id: 3, name: "John " },
    { id: 4, name: "Joh" }
];

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
};

const getUsersHandler = (req, res) => {
    res.end(JSON.stringify(users));
};

const getUserbyIdHandler = (req, res) => {
    const id = req.url.split('/')[3];
    const user = users.find((user) => user.id === parseInt(id));

    if (user) {
        res.end(JSON.stringify(user));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'User not found' }));
    }
};

const createUserHandler = (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const newUser = JSON.parse(body);
        newUser.id = users.length + 1; // Assign a new ID
        users.push(newUser);
        res.statusCode = 201;
        res.end(JSON.stringify(newUser));
    });
};

const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not found' }));
};

const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if (req.url === '/api/users' && req.method === 'GET') {
                getUsersHandler(req, res);
            } else if (
                req.url.match(/\/api\/users\/([0-9]+)/) &&
                req.method === 'GET'
            ) {
                getUserbyIdHandler(req, res);
            } else if (req.url === '/api/users' && req.method === 'POST') {
                createUserHandler(req, res);
            } else {
                notFoundHandler(req, res);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});