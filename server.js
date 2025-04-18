import app from './src/app.js'
import http from 'http'
import * as dotenv from 'dotenv'; // necessário para leitura do arquivo de variáveis

// definição de porta condicional do proxy ou na 3000
const port = process.env.PORT || 3004; 

// retorno no terminal com o link
app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
  })

// executar node server.js
// executar npm run dev
