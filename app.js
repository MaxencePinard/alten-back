const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('<h1>Home page</h1>')
    } else if (req.url === '/about') {
        res.end('<h1>About page</h1>')
    } else {
        res.end('page not found')
    }
})

server.listen(5000, 'localhost', () => {
    console.log('Server is listening at localhost on port 5000')
})
