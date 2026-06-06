# Lixeira Necessária! (WIP)

Uma plataforma cidadã para conectar moradores e governo na luta por bairros mais limpos e organizados.

---

## Sobre o Projeto

**Lixeira Necessária!** é uma aplicação web full-stack desenvolvida para facilitar o registro e o acompanhamento de problemas relacionados a lixo e limpeza urbana.

O objetivo é dar voz aos cidadãos, permitindo que eles reportem problemas de forma simples e que a prefeitura tenha visibilidade real das demandas da população.

### Funcionalidades Atuais

- ✅ Cadastro e Login de usuários (com sessão)
- ✅ Mural público de pedidos com upvote
- ✅ Criação de novos pedidos (com localização, descrição e imagem via URL ou upload)
- ✅ Perfil do usuário com visualização dos próprios pedidos
- ✅ Edição e exclusão de pedidos próprios
- ✅ Design moderno com tema sustentável (verde)
- ✅ Interface responsiva e intuitiva
- ✅ Integração completa com banco de dados MySQL

---

## Como Executar o Projeto

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/)
- MySQL (local ou hospedado)
- Git (opcional)

### 2. Configuração Inicial

```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>
cd Projeto-Lixeira_Necessaria-WIP

# Instale as dependências
npm install
```

### 3. Configuração do Banco de Dados

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=8081
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=lixeira
```

2. Execute o script SQL disponível em `templates/query.md` para criar o banco e as tabelas.

### 4. Executar o Projeto

```bash
# Inicie o servidor em modo desenvolvimento
npm run dev
```

Acesse no navegador: [http://localhost:8081](http://localhost:8081)

---

## Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Node.js + Express
- **Banco de Dados:** MySQL
- **Autenticação:** Express Session
- **Estilo:** Tema sustentável com tons de verde

---

## Próximos Passos (Futuro)

- Upload real de imagens (salvar arquivos no servidor)
- Sistema de notificações
- Filtros avançados no mural (bairro, status, urgência)
- Mapa interativo com geolocalização
- Painel administrativo para a prefeitura
- Responsividade aprimorada para mobile

---

**Desenvolvido com ❤️ para fins didáticos.**
