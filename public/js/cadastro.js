document
  .getElementById("formCadastro")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!nome || !email || !senha) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const result = await response.json();

      if (result.status === "sucesso") {
        alert("Cadastro realizado com sucesso! Você será redirecionado.");
        window.location.href = "/";
      } else {
        alert(result.mensagem || "Erro ao realizar cadastro");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor");
    }
  });
