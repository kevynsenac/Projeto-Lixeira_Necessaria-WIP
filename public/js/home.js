let pedidos = [
  {
    id: 1,
    local: "Rua Inajá, 187",
    descricao:
      "Grande acúmulo de lixo orgânico há mais de uma semana. Está começando a atrair animais.",
    upvotes: 52,
    imagem:
      "https://s2.glbimg.com/KJMQETYnFI3sAo4oVeKosIHI1Qk=/620x465/s.glbimg.com/jo/g1/f/original/2013/12/05/vaquinha_tratada.jpg",
    data: "há 3 horas",
  },
  {
    id: 2,
    local: "Praça do Sol, próximo ao coreto",
    descricao:
      "Lixeira pública completamente transbordando. O mau cheiro está insuportável.",
    upvotes: 41,
    imagem:
      "https://ogimg.infoglobo.com.br/in/8709332-78f-b79/FT1086A/lixeiras-lotadas.jpg",
    data: "há 6 horas",
  },
  {
    id: 3,
    local: "Rua Fradique Coutinho, 980",
    descricao:
      "Móveis velhos e colchão largados na calçada desde o fim de semana passado.",
    upvotes: 27,
    imagem:
      "https://conteudo.imguol.com.br/c/entretenimento/b7/2015/08/07/moveis-e-objetos-achados-no-lixo-1438968420138_615x300.jpg",
    data: "há 1 dia",
  },
  {
    id: 4,
    local: "Av. Pompeia, 450",
    descricao:
      "Resíduos de obra espalhados na rua. Isso é um perigo para as crianças que passam por aqui.",
    upvotes: 35,
    imagem:
      "https://www.estadao.com.br/resizer/v2/HMZPLHZNLVJHZK3A6ATZUBCFBI.jpg?quality=80&auth=64f3bb2608c7a8976209175d3fc9401b1ade75852075f0cbde0099b11c8776c6&width=1200",
    data: "há 2 dias",
  },
  {
    id: 5,
    local: "Rua dos Pinheiros, 312",
    descricao:
      "Sacos de lixo rasgados por cães. Resíduos espalhados por toda a calçada.",
    upvotes: 19,
    imagem:
      "https://media.istockphoto.com/id/1356990699/pt/foto/torn-rubbish-bags.jpg?s=612x612&w=0&k=20&c=DNLfaMqEFk73PJigTNLxQ6-4VMZsQevDOmaTLbd7Jec=",
    data: "há 4 horas",
  },
  {
    id: 6,
    local: "Praça da Vila, em frente ao bar",
    descricao:
      "Muito entulho acumulado. Parece que alguém jogou material de reforma e abandonou.",
    upvotes: 44,
    imagem:
      "https://i0.statig.com.br/bancodeimagens/ce/bo/28/cebo28pl90fu09k9wavxztmm9.jpg",
    data: "há 11 horas",
  },
  {
    id: 7,
    local: "Rua Girassol, 142",
    descricao:
      "Lixo domiciliar acumulado há dias. Os moradores estão reclamando do mau cheiro.",
    upvotes: 23,
    imagem:
      "https://s1.static.brasilescola.uol.com.br/be/conteudo/images/lixo-domiciliar-54ad599dcba9f.jpg",
    data: "há 1 dia",
  },
  {
    id: 8,
    local: "Rua dos Três Irmãos, 89",
    descricao:
      "Caixas de papelão molhadas e sacos abertos na esquina. Precisa de atenção urgente.",
    upvotes: 31,
    imagem:
      "https://www.montanhascapixabas.com.br/wp-content/uploads/2019/05/Centenas_de_caixas_de_papelao_vazias_amanhecem_na_rua_em_Marechal_Floriano.jpeg",
    data: "há 7 horas",
  },
  {
    id: 9,
    local: "Av. Heitor Peixoto, 765",
    descricao:
      "Lixeira comunitária destruída e lixo espalhado ao redor. Já notifiquei antes.",
    upvotes: 18,
    imagem:
      "https://lucasdorioverde.mt.gov.br/arquivos/noticias/9018/p/pref_lrv.jpeg",
    data: "há 2 dias",
  },
  {
    id: 10,
    local: "Rua Harmonia, 556",
    descricao:
      "Restos de comida e embalagens jogadas na rua após o festival de ontem.",
    upvotes: 29,
    imagem:
      "https://ogimg.infoglobo.com.br/in/7546874-2dc-c84/FT1086A/2013021004346.jpg",
    data: "há 5 horas",
  },
];

function criarCard(pedido) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
        <div class="card-image">
            ${pedido.imagem ? `<img src="${pedido.imagem}" alt="Problema">` : `<div style="height:100%; display:flex; align-items:center; justify-content:center; background:#1f6b44; color:#86efac; font-size:0.9rem; text-align:center; padding:20px;">Foto pendente<br><small>Clique em editar se quiser adicionar</small></div>`}
        </div>
        <div class="card-content">
            <div class="local">
                <i class="fas fa-map-marker-alt"></i>
                <strong>${pedido.local}</strong>
            </div>
            <p class="descricao">${pedido.descricao}</p>
            <small style="color: #86efac;">${pedido.data}</small>
        </div>
        <div class="card-footer">
            <button class="upvote" data-id="${pedido.id}">
                <i class="fas fa-arrow-up"></i>
                <span class="upvote-count">${pedido.upvotes}</span>
            </button>
            <span style="color: #86efac; font-size: 0.95rem;">
                <i class="fas fa-comment-dots"></i> ${Math.floor(Math.random() * 12) + 3}
            </span>
        </div>
    `;
  return card;
}

function renderizarMural() {
  const mural = document.getElementById("mural");
  mural.innerHTML = "";
  pedidos.forEach((pedido) => {
    mural.appendChild(criarCard(pedido));
  });

  document.querySelectorAll(".upvote").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      const pedido = pedidos.find((p) => p.id === id);
      if (!pedido) return;

      if (this.classList.contains("upvoted")) {
        pedido.upvotes--;
        this.classList.remove("upvoted");
      } else {
        pedido.upvotes++;
        this.classList.add("upvoted");
      }
      this.querySelector(".upvote-count").textContent = pedido.upvotes;
    });
  });
}

const modal = document.getElementById("modalCriar");
const btnCriar = document.getElementById("btnCriar");
const closeModal = document.querySelector(".close-modal");
const btnCancelar = document.querySelector(".btn-cancelar");

btnCriar.addEventListener("click", () => (modal.style.display = "flex"));
closeModal.addEventListener("click", () => (modal.style.display = "none"));
btnCancelar.addEventListener("click", () => (modal.style.display = "none"));

document.getElementById("uploadArea").addEventListener("click", () => {
  document.getElementById("fotoInput").click();
});

document.getElementById("fotoInput").addEventListener("change", function (e) {
  const preview = document.getElementById("previewFotos");
  preview.innerHTML = "";
  Array.from(e.target.files)
    .slice(0, 3)
    .forEach((file) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      preview.appendChild(img);
    });
});

document.getElementById("formPedido").addEventListener("submit", function (e) {
  e.preventDefault();
  const local = document.getElementById("localizacao").value.trim();
  const descricao = document.getElementById("descricao").value.trim();

  if (!local || !descricao) return;

  const novoPedido = {
    id: Date.now(),
    local: local,
    descricao: descricao,
    upvotes: 1,
    imagem: "",
    data: "agora mesmo",
  };

  pedidos.unshift(novoPedido);
  renderizarMural();

  modal.style.display = "none";
  mostrarToast("Pedido enviado com sucesso! Ele aparecerá no mural em breve.");

  this.reset();
  document.getElementById("previewFotos").innerHTML = "";
});

function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");
  document.getElementById("toastMessage").textContent = mensagem;
  toast.style.display = "flex";
  setTimeout(() => (toast.style.display = "none"), 4200);
}

renderizarMural();
