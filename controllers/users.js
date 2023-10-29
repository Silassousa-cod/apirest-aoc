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
    const id = req.params.id;
    const { username, email } = req.body;

    if (!validateRequiredFields([username, email])) {
        return sendErrorResponse(res, 400, "Campos obrigatórios não preenchidos.");
    }

    try {
        const updated = await banco('users').where('id', id).update({ username, email });
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
    const id = req.params.id;
    try {
        const deleted = await banco('users').where('id', id).del();
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
