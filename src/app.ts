import express from 'express';

// Create a new express application instance
const app: express.Application = express();

const port: number = 3000;


app.get('/', (_req, _res) => {
    _res.send("TypeScript With Express");
});




app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});


