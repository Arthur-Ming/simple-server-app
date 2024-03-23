const http = require('http');
const fs = require('node:fs')

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject('some error')
            else resolve(data)
        })
    })
}

const server = http.createServer(
    async (request, response) => {
        switch (request.url) {
            case '/students': {
                response.write('students');
                break;
            }
            case '/users': {
                response.write('users');
                break;
            }
            case '/home': {
                const homePage = await readFile('pages/home.html')
                response.write(homePage);
                break;
            }
            case '/about': {

                try {
                    const data = await readFile('pages/about.html');
                    response.write(data);
                } catch (err) {
                    console.log(err);
                    response.write('404');
                }
                break;
            }
            default:
                response.write('All');

        }

        response.end();
    }
);


server.listen(3000);
