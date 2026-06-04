CREATE DATABASE lixeira
DEFAULT CHARACTER SET = 'utf8mb4';

CREATE TABLE usuarios (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(150) NOT NULL,
email VARCHAR(191) UNIQUE NOT NULL,
senha VARCHAR(255) NOT NULL
);

CREATE TABLE pedidos (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
usuario_id INT NOT NULL,
localizacao VARCHAR(255) NOT NULL,
descricao TEXT NOT NULL,
imagem VARCHAR(255),
upvotes INTEGER DEFAULT 0,
criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE

);

INSERT INTO usuarios (nome, email, senha)
VALUES ('João Silva', 'joao.silva@email.com', 'senha123');

INSERT INTO pedidos (usuario_id, localizacao, descricao, upvotes, imagem)
VALUES
(
1,
'Rua Inajá, 187',
'Grande acúmulo de lixo orgânico há mais de uma semana. Está começando a atrair animais.',
52,
'[https://s2.glbimg.com/KJMQETYnFI3sAo4oVeKosIHI1Qk=/620x465/s.glbimg.com/jo/g1/f/original/2013/12/05/vaquinha_tratada.jpg](https://s2.glbimg.com/KJMQETYnFI3sAo4oVeKosIHI1Qk=/620x465/s.glbimg.com/jo/g1/f/original/2013/12/05/vaquinha_tratada.jpg)'
),
(
1,
'Praça do Sol, próximo ao coreto',
'Lixeira pública completamente transbordando. O mau cheiro está insuportável.',
41,
'[https://ogimg.infoglobo.com.br/in/8709332-78f-b79/FT1086A/lixeiras-lotadas.jpg](https://ogimg.infoglobo.com.br/in/8709332-78f-b79/FT1086A/lixeiras-lotadas.jpg)'
),
(
1,
'Rua Fradique Coutinho, 980',
'Móveis velhos e colchão largados na calçada desde o fim de semana passado.',
27,
'[https://conteudo.imguol.com.br/c/entretenimento/b7/2015/08/07/moveis-e-objetos-achados-no-lixo-1438968420138_615x300.jpg](https://conteudo.imguol.com.br/c/entretenimento/b7/2015/08/07/moveis-e-objetos-achados-no-lixo-1438968420138_615x300.jpg)'
),
(
1,
'Av. Pompeia, 450',
'Resíduos de obra espalhados na rua. Isso é um perigo para as crianças que passam por aqui.',
35,
'[https://www.estadao.com.br/resizer/v2/HMZPLHZNLVJHZK3A6ATZUBCFBI.jpg?quality=80&auth=64f3bb2608c7a8976209175d3fc9401b1ade75852075f0cbde0099b11c8776c6&width=1200](https://www.estadao.com.br/resizer/v2/HMZPLHZNLVJHZK3A6ATZUBCFBI.jpg?quality=80&auth=64f3bb2608c7a8976209175d3fc9401b1ade75852075f0cbde0099b11c8776c6&width=1200)'
),
(
1,
'Rua dos Pinheiros, 312',
'Sacos de lixo rasgados por cães. Resíduos espalhados por toda a calçada.',
19,
'[https://media.istockphoto.com/id/1356990699/pt/foto/torn-rubbish-bags.jpg?s=612x612&w=0&k=20&c=DNLfaMqEFk73PJigTNLxQ6-4VMZsQevDOmaTLbd7Jec=](https://media.istockphoto.com/id/1356990699/pt/foto/torn-rubbish-bags.jpg?s=612x612&w=0&k=20&c=DNLfaMqEFk73PJigTNLxQ6-4VMZsQevDOmaTLbd7Jec=)'
),
(
1,
'Praça da Vila, em frente ao bar',
'Muito entulho acumulado. Parece que alguém jogou material de reforma e abandonou.',
44,
'[https://i0.statig.com.br/bancodeimagens/ce/bo/28/cebo28pl90fu09k9wavxztmm9.jpg](https://i0.statig.com.br/bancodeimagens/ce/bo/28/cebo28pl90fu09k9wavxztmm9.jpg)'
),
(
1,
'Rua Girassol, 142',
'Lixo domiciliar acumulado há dias. Os moradores estão reclamando do mau cheiro.',
23,
'[https://s1.static.brasilescola.uol.com.br/be/conteudo/images/lixo-domiciliar-54ad599dcba9f.jpg](https://s1.static.brasilescola.uol.com.br/be/conteudo/images/lixo-domiciliar-54ad599dcba9f.jpg)'
),
(
1,
'Rua dos Três Irmãos, 89',
'Caixas de papelão molhadas e sacos abertos na esquina. Precisa de atenção urgente.',
31,
'[https://www.montanhascapixabas.com.br/wp-content/uploads/2019/05/Centenas_de_caixas_de_papelao_vazias_amanhecem_na_rua_em_Marechal_Floriano.jpeg](https://www.montanhascapixabas.com.br/wp-content/uploads/2019/05/Centenas_de_caixas_de_papelao_vazias_amanhecem_na_rua_em_Marechal_Floriano.jpeg)'
),
(
1,
'Av. Heitor Peixoto, 765',
'Lixeira comunitária destruída e lixo espalhado ao redor. Já notifiquei antes.',
18,
'[https://lucasdorioverde.mt.gov.br/arquivos/noticias/9018/p/pref_lrv.jpeg](https://lucasdorioverde.mt.gov.br/arquivos/noticias/9018/p/pref_lrv.jpeg)'
),
(
1,
'Rua Harmonia, 556',
'Restos de comida e embalagens jogadas na rua após o festival de ontem.',
29,
'[https://ogimg.infoglobo.com.br/in/7546874-2dc-c84/FT1086A/2013021004346.jpg](https://ogimg.infoglobo.com.br/in/7546874-2dc-c84/FT1086A/2013021004346.jpg)'
);
