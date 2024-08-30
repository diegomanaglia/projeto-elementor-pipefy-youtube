const axios = require('axios');

module.exports = async (req, res) => {
    const pipefyToken = process.env.PIPEFY_API_KEY;
    
    const nome = req.body["Nome"];
    const email = req.body["E-mail"];
    const telefone = req.body["Telefone"];

    const pipeId = '302990494';

    try {
        // Fazendo a requisição para a API do Pipefy
        const response = await axios.post(
            'https://api.pipefy.com/graphql',
            {
                query: `
          mutation {
            createCard(input: {
              pipe_id: ${pipeId},
              title: "${nome}",
              fields_attributes: [
                {field_id: "nome_1", field_value: "${nome}"},
                {field_id: "e_mail_1", field_value: "${email}"},
                {field_id: "telefone_1", field_value: "${telefone}"}
              ]
            }) {
              card {
                id
                title
              }
            }
          }
        `
            },
            {
                headers: {
                    Authorization: `Bearer ${pipefyToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Retorna a resposta da API do Pipefy para o cliente
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Erro ao criar o card:', error);
        res.status(500).json({ error: 'Erro ao criar o card no Pipefy' });
    };
}