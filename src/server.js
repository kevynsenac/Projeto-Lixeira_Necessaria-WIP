// ====================== SERVER.JS - WIP ======================

require("dotenv").config();
const path = require("path");
const express = require("express");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 8081;

// Configuração do diretório público
const publicPath = path.join(__dirname, "..", "public");

// ====================== MIDDLEWARES ======================
app.use(express.static(publicPath));     // Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.json());                 // Parsear JSON no body das requisições

// ====================== ROTAS ======================

/**
 * GET /api/partidas
 * Retorna todas as partidas ordenadas por data
 */
app.get("/api/partidas", async (req, res) => {
    try {
        const [partidas] = await db.execute(`
            SELECT * FROM partida 
            ORDER BY data ASC, id ASC
        `);

        res.json(partidas);
    } catch (error) {
        console.error("Erro ao buscar partidas:", error);
        res.status(500).json({
            status: "erro",
            mensagem: "Erro ao buscar partidas",
            erro: error.message
        });
    }
});

/**
 * POST /api/partidas
 * Cadastra um novo jogo
 */
app.post('/api/partidas', async (req, res) => {
    try {
        const { 
            data, 
            time1, 
            time2, 
            saibaMais1 = '', 
            image1 = '', 
            saibaMais2 = '', 
            image2 = '',
            score1,
            score2
        } = req.body;

        // Converte placar para número ou NULL
        const score1Final = (score1 !== undefined && score1 !== '' && !isNaN(score1)) 
            ? parseInt(score1) 
            : null;

        const score2Final = (score2 !== undefined && score2 !== '' && !isNaN(score2)) 
            ? parseInt(score2) 
            : null;

        const [result] = await db.execute(`
            INSERT INTO partida 
                (data, time1, time2, saibaMais1, image1, saibaMais2, image2, score1, score2)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            data, 
            time1, 
            time2, 
            saibaMais1, 
            image1, 
            saibaMais2, 
            image2, 
            score1Final, 
            score2Final
        ]);

        res.json({ 
            status: "sucesso", 
            mensagem: "Jogo cadastrado com sucesso!",
            id: result.insertId 
        });
    } catch (error) {
        console.error("Erro ao cadastrar jogo:", error);
        res.status(500).json({ 
            status: "erro", 
            mensagem: "Erro ao cadastrar jogo",
            erro: error.message 
        });
    }
});

/**
 * DELETE /api/partidas/:id
 * Exclui um jogo pelo ID
 */
app.delete('/api/partidas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        await db.execute('DELETE FROM partida WHERE id = ?', [id]);

        res.json({ 
            status: "sucesso", 
            mensagem: "Jogo excluído com sucesso!" 
        });
    } catch (error) {
        console.error("Erro ao excluir jogo:", error);
        res.status(500).json({ 
            status: "erro", 
            mensagem: "Erro ao excluir jogo" 
        });
    }
});

/**
 * GET /
 * Serve a página principal
 */
app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

// ====================== INICIALIZAÇÃO DO SERVIDOR ======================
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});