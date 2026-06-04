let usuarioAtual = null;
let meusPedidos = [];
let pedidoEditandoId = null;

// ==================== CARREGAR DADOS ====================
async function carregarPerfil() {
    try {
        const res = await fetch("/api/perfil");
        const data = await res.json();

        if (data.status === "erro") return window.location.href = "/login.html";

        usuarioAtual = data.usuario;
        meusPedidos = data.pedidos;

        document.getElementById("nomeDisplay").textContent = usuarioAtual.nome;
        document.getElementById("emailDisplay").textContent = usuarioAtual.email;
        document.getElementById("countPedidos").textContent = meusPedidos.length;

        renderizarMeusPedidos();
    } catch (error) {
        console.error(error);
    }
}

function renderizarMeusPedidos() {
    const container = document.getElementById("listaPedidos");
    container.innerHTML = "";

    if (meusPedidos.length === 0) {
        container.innerHTML = `<p style="color:#86efac; text-align:center; padding:3rem;">Você ainda não tem pedidos cadastrados.</p>`;
        return;
    }

    meusPedidos.forEach(pedido => {
        const card = document.createElement("div");
        card.className = "card-pedido";
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:start;">
                <div style="flex:1;">
                    <strong>${pedido.localizacao}</strong>
                    <p style="margin:10px 0; color:#d1fae5;">${pedido.descricao}</p>
                    <small style="color:#86efac;">${new Date(pedido.criado_em).toLocaleDateString('pt-BR')}</small>
                </div>
                <div>
                    <button class="btn-editar" data-id="${pedido.id}">Editar</button>
                    <button class="btn-excluir" data-id="${pedido.id}">Excluir</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Eventos
    document.querySelectorAll(".btn-editar").forEach(btn => {
        btn.addEventListener("click", () => editarPedido(btn.dataset.id));
    });

    document.querySelectorAll(".btn-excluir").forEach(btn => {
        btn.addEventListener("click", () => excluirPedido(btn.dataset.id));
    });
}

// ==================== EDITAR PEDIDO ====================
function editarPedido(id) {
    const pedido = meusPedidos.find(p => p.id == id);
    if (!pedido) return;

    pedidoEditandoId = id;
    document.getElementById("editLocalizacao").value = pedido.localizacao;
    document.getElementById("editDescricao").value = pedido.descricao;
    document.getElementById("editImagem").value = pedido.imagem || "";

    document.getElementById("modalEditar").style.display = "flex";
}

document.getElementById("confirmarEditar").addEventListener("click", async () => {
    const localizacao = document.getElementById("editLocalizacao").value.trim();
    const descricao = document.getElementById("editDescricao").value.trim();
    const imagem = document.getElementById("editImagem").value.trim();

    if (!localizacao || !descricao) return alert("Localização e descrição são obrigatórios");

    try {
        const res = await fetch(`/api/pedidos/${pedidoEditandoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ localizacao, descricao, imagem })
        });

        if ((await res.json()).status === "sucesso") {
            mostrarToast("Pedido atualizado com sucesso!");
            fecharModal("modalEditar");
            carregarPerfil();
        }
    } catch (e) {
        alert("Erro ao atualizar pedido");
    }
});

// ==================== EXCLUIR PEDIDO ====================
async function excluirPedido(id) {
    if (!confirm("Deseja realmente excluir este pedido?")) return;

    try {
        const res = await fetch(`/api/pedidos/${id}`, { method: "DELETE" });
        if ((await res.json()).status === "sucesso") {
            meusPedidos = meusPedidos.filter(p => p.id != id);
            document.getElementById("countPedidos").textContent = meusPedidos.length;
            renderizarMeusPedidos();
            mostrarToast("Pedido excluído com sucesso!");
        }
    } catch (e) {
        alert("Erro ao excluir pedido");
    }
}

// ==================== MODAIS ====================
function fecharModal(id) {
    document.getElementById(id).style.display = "none";
}

// Alterar Email / Senha
document.getElementById("btnAlterarEmail").addEventListener("click", () => document.getElementById("modalEmail").style.display = "flex");
document.getElementById("btnAlterarSenha").addEventListener("click", () => document.getElementById("modalSenha").style.display = "flex");

// Toast
function mostrarToast(mensagem) {
    const toast = document.createElement("div");
    toast.style.cssText = `position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:#4ade80;color:#052e16;padding:16px 28px;border-radius:9999px;box-shadow:0 10px 25px rgba(0,0,0,0.3);z-index:2000;font-weight:600;`;
    toast.textContent = mensagem;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Inicialização
carregarPerfil();