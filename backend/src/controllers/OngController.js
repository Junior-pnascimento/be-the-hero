const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports={

    async index(request, response){
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;

        const id = generateUniqueId();

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        return response.json({id});
    }
};

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota após "?"(Filtros, paginação)
 * http://localhost:3333/users?name=Diego
 * http://localhost:3333/users?page=2&nome=Diego
 * 
 * Route Params: Parâmetros utilizados para identificar recursos
 * http://localhost:3333/users/1
 * 
 * request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 * 
*/