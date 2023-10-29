const knex = require('knex');
const knexFile = require('../knexfile.js');
const banco = knex(knexFile);

function validateRequiredFields(fields) {
    return fields.every((field) => field !== undefined && field !== null);
}

function sendSuccessResponse(res, data) {
    return res.json({ status: "success", data });
}

function sendErrorResponse(res, statusCode, message) {
    return res.status(statusCode).json({ status: "error", message });
}

exports.list = async (req, res) => {
    try {
        const users = await banco('users').select();
        // Formatando datas ou outras manipulações necessárias
        sendSuccessResponse(res, users);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao listar usuários.");
    }
};

exports.create = async (req, res) => {
    const { username, email } = req.body;

    if (!validateRequiredFields([username, email])) {
        return sendErrorResponse(res, 400, "Campos obrigatórios não preenchidos.");
    }

    try {
        await banco('users').insert({ username, email });
        sendSuccessResponse(res, "Usuário criado com sucesso!");
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao criar usuário.");
    }
};

exports.get = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await banco('users').where('id', id).first();
        if (user) {
            // Formatando datas ou outras manipulações necessárias
            sendSuccessResponse(res, user);
        } else {
            sendErrorResponse(res, 404, "Usuário não encontrado.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao obter usuário.");
    }
};

exports.update = async (req, res) => {
    const user_id = req.params.userId; // Altere o nome da variável para corresponder ao nome da coluna no banco de dados
    const { username, email } = req.body;

    // Adicione um log para verificar os parâmetros recebidos
    console.log(`user_id: ${user_id}, Username: ${username}, Email: ${email}`);

    if (!validateRequiredFields([username, email])) {
        return sendErrorResponse(res, 400, "Campos obrigatórios não preenchidos.");
    }

    try {
        // Adicione um log para verificar a operação de atualização
        console.log('Tentando atualizar o usuário no banco de dados.');

        const updated = await banco('users').where('user_id', user_id).update({ username, email }); // Altere para 'user_id'

        // Adicione um log para verificar o número de registros atualizados
        console.log(`Registros atualizados: ${updated}`);

        if (updated) {
            sendSuccessResponse(res, "Usuário atualizado com sucesso.");
        } else {
            sendErrorResponse(res, 404, "Usuário não encontrado.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao atualizar usuário.");
    }
};

exports.delete = async (req, res) => {
    const user_id = req.params.userId; // Altere o nome da variável para corresponder ao nome da coluna no banco de dados
    try {
        const deleted = await banco('users').where('user_id', user_id).del(); // Altere para 'user_id'
        if (deleted) {
            sendSuccessResponse(res, "Usuário excluído com sucesso.");
        } else {
            sendErrorResponse(res, 404, "Usuário não encontrado.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao deletar usuário.");
    }
};
