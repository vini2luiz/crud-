import app from "./app";


function main() {
    app.listen(3001, 'localhost', () => {
        console.log('Servidor rodando na porta 3001')
    })
}

main()