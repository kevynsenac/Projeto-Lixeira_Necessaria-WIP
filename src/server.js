require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 8081;

const publicPath = path.join(__dirname, "..", "public");

app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "lixeira_necessaria_secret_2026",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 dia
  }),
);

// ====================== ROTAS DE AUTENTICAÇÃO ======================

// Cadastro
app.post("/api/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const [existente] = await db.execute(
      "SELECT id FROM usuarios WHERE email = ?",
      [email],
    );

    if (existente.length > 0) {
      return res
        .status(400)
        .json({ status: "erro", mensagem: "Este email já está cadastrado" });
    }

    const [result] = await db.execute(
      `
            INSERT INTO usuarios (nome, email, senha) 
            VALUES (?, ?, ?)
        `,
      [nome, email, senha],
    );

    req.session.usuario = {
      id: result.insertId,
      nome: nome,
    };

    res.json({
      status: "sucesso",
      mensagem: "Cadastro realizado com sucesso!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "erro", mensagem: "Erro ao criar usuário" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [usuarios] = await db.execute(
      "SELECT id, nome, email FROM usuarios WHERE email = ? AND senha = ?",
      [email, senha],
    );

    if (usuarios.length === 0) {
      return res
        .status(401)
        .json({ status: "erro", mensagem: "Email ou senha incorretos" });
    }

    const usuario = usuarios[0];
    req.session.usuario = usuario;

    res.json({
      status: "sucesso",
      usuario: { id: usuario.id, nome: usuario.nome },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "erro", mensagem: "Erro interno" });
  }
});

// Verificar se está logado
app.get("/api/auth", (req, res) => {
  if (req.session.usuario) {
    res.json({ logado: true, usuario: req.session.usuario });
  } else {
    res.json({ logado: false });
  }
});

// Logout
app.get("/api/logout", (req, res) => {
  req.session.destroy();
  res.json({ status: "sucesso" });
});

// ====================== ROTAS DE PERFIL ======================

app.get("/api/perfil", async (req, res) => {
  if (!req.session.usuario) return res.status(401).json({ status: "erro" });

  try {
    const [usuario] = await db.execute(
      "SELECT id, nome, email FROM usuarios WHERE id = ?",
      [req.session.usuario.id],
    );
    const [meusPedidos] = await db.execute(
      `
            SELECT * FROM pedidos 
            WHERE usuario_id = ? 
            ORDER BY criado_em DESC
        `,
      [req.session.usuario.id],
    );

    res.json({
      usuario: usuario[0],
      pedidos: meusPedidos,
    });
  } catch (error) {
    res.status(500).json({ status: "erro" });
  }
});

// Atualizar email
app.put("/api/perfil/email", async (req, res) => {
  if (!req.session.usuario) return res.status(401).json({ status: "erro" });
  const { email } = req.body;

  try {
    await db.execute("UPDATE usuarios SET email = ? WHERE id = ?", [
      email,
      req.session.usuario.id,
    ]);
    req.session.usuario.email = email;
    res.json({ status: "sucesso" });
  } catch (error) {
    res.status(500).json({ status: "erro" });
  }
});

// Atualizar senha
app.put("/api/perfil/senha", async (req, res) => {
  if (!req.session.usuario) return res.status(401).json({ status: "erro" });
  const { senha } = req.body;

  try {
    await db.execute("UPDATE usuarios SET senha = ? WHERE id = ?", [
      senha,
      req.session.usuario.id,
    ]);
    res.json({ status: "sucesso" });
  } catch (error) {
    res.status(500).json({ status: "erro" });
  }
});

// ====================== ROTAS DE PEDIDOS ======================

app.get("/api/pedidos", async (req, res) => {
  try {
    const [pedidos] = await db.execute(`
            SELECT p.*, u.nome as autor 
            FROM pedidos p
            JOIN usuarios u ON p.usuario_id = u.id
            ORDER BY p.criado_em DESC
        `);
    res.json(pedidos);
  } catch (error) {
    res
      .status(500)
      .json({ status: "erro", mensagem: "Erro ao buscar pedidos" });
  }
});

app.post("/api/pedidos", async (req, res) => {
  if (!req.session.usuario) {
    return res
      .status(401)
      .json({ status: "erro", mensagem: "Faça login para criar um pedido" });
  }

  try {
    const { localizacao, descricao, imagem = null } = req.body;
    const usuario_id = req.session.usuario.id;

    const [result] = await db.execute(
      `
            INSERT INTO pedidos (usuario_id, localizacao, descricao, imagem)
            VALUES (?, ?, ?, ?)
        `,
      [usuario_id, localizacao, descricao, imagem],
    );

    res.json({ status: "sucesso", id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "erro", mensagem: "Erro ao criar pedido" });
  }
});

// Excluir pedido (do perfil)
app.delete("/api/pedidos/:id", async (req, res) => {
  if (!req.session.usuario) return res.status(401).json({ status: "erro" });

  try {
    await db.execute("DELETE FROM pedidos WHERE id = ? AND usuario_id = ?", [
      req.params.id,
      req.session.usuario.id,
    ]);
    res.json({ status: "sucesso" });
  } catch (error) {
    res.status(500).json({ status: "erro" });
  }
});

// Atualizar pedido (Editar)
app.put("/api/pedidos/:id", async (req, res) => {
    if (!req.session.usuario) return res.status(401).json({ status: "erro" });

    try {
        const { localizacao, descricao } = req.body;
        const pedidoId = req.params.id;

        await db.execute(`
            UPDATE pedidos 
            SET localizacao = ?, descricao = ? 
            WHERE id = ? AND usuario_id = ?
        `, [localizacao, descricao, pedidoId, req.session.usuario.id]);

        res.json({ status: "sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "erro" });
    }
});

// ====================== ROTAS DAS PÁGINAS ======================

app.get("/", (req, res) => {
  if (req.session.usuario) {
    res.sendFile(path.join(publicPath, "home.html"));
  } else {
    res.redirect("/login.html");
  }
});

app.get("/login.html", (req, res) => {
  if (req.session.usuario) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(publicPath, "login.html"));
  }
});

app.get("/cadastro.html", (req, res) => {
  if (req.session.usuario) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(publicPath, "cadastro.html"));
  }
});

app.get("/perfil.html", (req, res) => {
  if (req.session.usuario) {
    res.sendFile(path.join(publicPath, "perfil.html"));
  } else {
    res.redirect("/login.html");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
