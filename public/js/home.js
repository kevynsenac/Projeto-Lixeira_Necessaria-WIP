let pedidos = [];
let usuarioLogado = null;
let votosSession = JSON.parse(sessionStorage.getItem('votosPedidos')) || {};

// ==================== CARREGAR DADOS ====================
async function carregarUsuario() {
    try {
        const response = await fetch("/api/auth");
        const data = await response.json();

        if (data.logado) {
            usuarioLogado = data.usuario;
            document.getElementById("usernameDisplay").textContent = usuarioLogado.nome;
        } else {
            window.location.href = "/login.html";
        }
    } catch (error) {
        console.error(error);
        window.location.href = "/login.html";
    }
}

async function carregarPedidos() {
    try {
        const response = await fetch("/api/pedidos");
        const data = await response.json();

        pedidos = data.map(pedido => ({
            ...pedido,
            imagem: pedido.imagem ? pedido.imagem.replace(/\[.*?\]\((.*?)\)/, "$1") : "",
            upvotes: pedido.upvotes || 0
        }));

        renderizarMural();
    } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
    }
}

function criarCard(pedido) {
    const card = document.createElement("div");
    card.className = "card";

    const jaVotou = votosSession[pedido.id] === true;
    const imagemHTML = pedido.imagem
        ? `<img src="${pedido.imagem}" alt="Problema">`
        : `<div class="no-image">📸 Foto pendente</div>`;

    card.innerHTML = `
        <div class="card-image">
            ${imagemHTML}
        </div>
        <div class="card-content">
            <div class="local">
                <i class="fas fa-map-marker-alt"></i>
                <strong>${pedido.localizacao}</strong>
            </div>
            <p class="descricao">${pedido.descricao}</p>
            <small style="color: #86efac;">
                Por ${pedido.autor} • ${new Date(pedido.criado_em).toLocaleDateString("pt-BR")}
            </small>
        </div>
        <div class="card-footer">
            <button class="upvote ${jaVotou ? 'upvoted' : ''}" data-id="${pedido.id}">
                <i class="fas fa-arrow-up"></i>
                <span class="upvote-count">${pedido.upvotes}</span>
            </button>
            <span style="color: #86efac;">
                <i class="fas fa-comment-dots"></i> 4
            </span>
        </div>
    `;
    return card;
}

function renderizarMural() {
    const mural = document.getElementById("mural");
    mural.innerHTML = "";
    pedidos.forEach(p => mural.appendChild(criarCard(p)));

    // Adiciona eventos de upvote
    document.querySelectorAll('.upvote').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const pedido = pedidos.find(p => p.id === id);
            if (!pedido) return;

            if (this.classList.contains('upvoted')) {
                // Remove voto
                pedido.upvotes--;
                this.classList.remove('upvoted');
                delete votosSession[id];
            } else {
                // Adiciona voto
                pedido.upvotes++;
                this.classList.add('upvoted');
                votosSession[id] = true;
            }

            // Atualiza contagem visual
            this.querySelector('.upvote-count').textContent = pedido.upvotes;

            // Salva no sessionStorage
            sessionStorage.setItem('votosPedidos', JSON.stringify(votosSession));
        });
    });
}

// ==================== EVENTOS DO HEADER ====================
document.getElementById("btnPerfil").addEventListener("click", () => {
    window.location.href = "/perfil.html";
});

document.getElementById("btnLogout").addEventListener("click", async () => {
    if (confirm("Deseja realmente sair?")) {
        await fetch("/api/logout");
        window.location.href = "/login.html";
    }
});

// ==================== MODAL ====================
const modal = document.getElementById("modalCriar");
const btnCriar = document.getElementById("btnCriar");
const closeModal = document.querySelector(".close-modal");
const btnCancelar = document.querySelector(".btn-cancelar");

btnCriar.addEventListener("click", () => modal.style.display = "flex");
closeModal.addEventListener("click", () => modal.style.display = "none");
btnCancelar.addEventListener("click", () => modal.style.display = "none");

document.getElementById("uploadArea").addEventListener("click", () => 
    document.getElementById("fotoInput").click()
);

document.getElementById("fotoInput").addEventListener("change", function(e) {
    const preview = document.getElementById("previewFotos");
    preview.innerHTML = "";
    Array.from(e.target.files).slice(0,3).forEach(file => {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        preview.appendChild(img);
    });
});

document.getElementById("formPedido").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const localizacao = document.getElementById("localizacao").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const imagemUrl = document.getElementById("imagemUrl").value.trim();

    if (!localizacao || !descricao) return;

    try {
        const response = await fetch("/api/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                localizacao, 
                descricao,
                imagem: imagemUrl || null   // Envia o link se preenchido
            })
        });

        const result = await response.json();

        if (result.status === "sucesso") {
            mostrarToast("Pedido enviado com sucesso!");
            modal.style.display = "none";
            this.reset();
            document.getElementById("previewFotos").innerHTML = "";
            carregarPedidos();
        }
    } catch (error) {
        console.error(error);
        mostrarToast("Erro ao enviar pedido");
    }
});

function mostrarToast(mensagem) {
    const toast = document.getElementById("toast");
    document.getElementById("toastMessage").textContent = mensagem;
    toast.style.display = "flex";
    setTimeout(() => toast.style.display = "none", 4200);
}

// Inicialização
carregarUsuario();
carregarPedidos();