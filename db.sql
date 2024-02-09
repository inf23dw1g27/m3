-- Criação do esquema e uso do mesmo
CREATE DATABASE IF NOT EXISTS api_tasks;
SHOW DATABASES;
USE api_tasks;


-- Criação da tabela de usuários
START TRANSACTION;
CREATE TABLE IF NOT EXISTS Users (
    UserID INT PRIMARY KEY,
    UserName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL
);

-- Criação da tabela de categorias de tarefas
CREATE TABLE IF NOT EXISTS TaskCategories (
    CategoryID INT PRIMARY KEY,
    CategoryName VARCHAR(50) NOT NULL
);

-- Criação da tabela de status de tarefas
CREATE TABLE IF NOT EXISTS TaskStatus (
    StatusID INT PRIMARY KEY,
    StatusName VARCHAR(50) NOT NULL
);

-- Criação da tabela de tarefas
CREATE TABLE IF NOT EXISTS Tasks (
    TaskID INT PRIMARY KEY,
    Title VARCHAR(100),
    Description TEXT,
    DueDate DATE,
    UserID INT,
    CategoryID INT,
    StatusID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (CategoryID) REFERENCES TaskCategories(CategoryID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (StatusID) REFERENCES TaskStatus(StatusID)  ON UPDATE CASCADE ON DELETE CASCADE
);
COMMIT;

-- Inserção de dados
START TRANSACTION;
-- Inserção de dados na tabela Users

INSERT IGNORE INTO Users (UserID, UserName, Email)
VALUES
    (1, 'John Doe', 'john.doe@example.com'),
    (2, 'Jane Smith', 'jane.smith@example.com'),
    (3, 'Robert Johnson', 'robert.johnson@example.com');


-- Inserção de dados na tabela TaskCategories
INSERT IGNORE INTO TaskCategories (CategoryID, CategoryName)
VALUES
    (1, 'Trabalho'),
    (2, 'Pessoal'),
    (3, 'Estudo');

-- Inserção de dados na tabela TaskStatus
INSERT IGNORE INTO TaskStatus (StatusID, StatusName)
VALUES
    (1, 'Em Andamento'),
    (2, 'Concluída'),
    (3, 'Atrasada');

-- Inserção de dados na tabela Tasks
INSERT IGNORE  INTO Tasks (TaskID, Title, Description, DueDate, UserID, CategoryID, StatusID)
VALUES
    (1, 'Projeto XYZ', 'Desenvolver o projeto XYZ para o cliente', '2024-02-15', 1, 1, 1),
    (2, 'Comprar mantimentos', 'Ir ao supermercado e comprar mantimentos', '2024-01-30', 2, 2, 1),
    (3, 'Estudar SQL', 'Revisar consultas SQL e práticas avançadas', '2024-02-10', 3, 3, 1),
    (4, 'Relatório Mensal', 'Preparar relatório mensal para a reunião de equipe', '2024-02-20', 1, 1, 1),
    (5, 'Exercícios Físicos', 'Realizar exercícios físicos por 30 minutos', '2024-01-31', 2, 2, 1),
    (6, 'Reunião de Projeto', 'Participar da reunião de acompanhamento do projeto ABC', '2024-02-05', 1, 1, 1),
    (7, 'Preparar Apresentação', 'Criar apresentação para a próxima reunião de equipe', '2024-02-18', 1, 2, 1),
    (8, 'Comprar Material de Escritório', 'Ir à papelaria e comprar material de escritório', '2024-02-03', 2, 2, 1),
    (9, 'Aprimorar Habilidades de Programação', 'Dedicar 1 hora para aprimorar habilidades de programação em Python', '2024-02-08', 3, 3, 1),
    (10, 'Passeio ao Ar Livre', 'Realizar um passeio ao ar livre por 1 hora', '2024-02-01', 2, 2, 1),
    (11, 'Atualizar Documentação', 'Revisar e atualizar a documentação do projeto XYZ', '2024-02-25', 1, 1, 1),
    (12, 'Comprar Presente de Aniversário', 'Escolher e comprar um presente para o aniversário de um amigo', '2024-02-12', 2, 2, 1),
    (13, 'Assistir Webinar', 'Participar do webinar sobre novas tecnologias', '2024-02-06', 3, 3, 1),
    (14, 'Planejar Viagem', 'Começar o planejamento de uma viagem de férias', '2024-02-28', 1, 1, 1),
    (15, 'Estudar Novo Framework', 'Dedicar tempo para estudar o uso de um novo framework de desenvolvimento', '2024-02-15', 1, 1, 1),
    (16, 'Revisar Contrato', 'Revisar o contrato do cliente para garantir precisão', '2024-02-14', 1, 1, 1),
    (17, 'Aula de Idiomas', 'Participar de aula online para aprimorar habilidades em um novo idioma', '2024-02-07', 2, 2, 1),
    (18, 'Organizar Arquivos', 'Organizar arquivos digitais e físicos para facilitar o acesso', '2024-02-22', 3, 3, 1),
    (19, 'Lançar Atualizações', 'Lançar atualizações de software para corrigir bugs identificados', '2024-02-17', 1, 1, 1),
    (20, 'Estudar Novas Tendências', 'Pesquisar e estudar as novas tendências na área de atuação', '2024-02-11', 2, 2, 1),
    (21, 'Preparar Proposta Comercial', 'Desenvolver proposta comercial para novo cliente em potencial', '2024-02-23', 3, 3, 1),
    (22, 'Fazer Compras Online', 'Realizar compras online para itens essenciais', '2024-02-04', 3, 1, 1),
    (23, 'Treino de Habilidades de Apresentação', 'Treinar habilidades de apresentação para futuras reuniões', '2024-02-09', 1, 1, 1),
    (24, 'Avaliação de Desempenho', 'Participar da avaliação de desempenho anual', '2024-02-19', 2, 2, 1),
    (25, 'Revisar Metas Anuais', 'Revisar e ajustar as metas anuais para alinhamento estratégico', '2024-02-26', 3, 3, 1),
    (26, 'Manutenção de Equipamentos', 'Realizar manutenção preventiva em equipamentos importantes', '2024-02-13', 2, 1, 1),
    (27, 'Participar de Curso Online', 'Participar de curso online para aprimorar habilidades técnicas', '2024-02-16', 1, 1, 1),
    (28, 'Atualizar Redes Sociais', 'Atualizar e manter as redes sociais da empresa', '2024-02-21', 2, 2, 1),
    (29, 'Fazer Exame de Rotina', 'Agendar e realizar exame de saúde de rotina', '2024-02-24', 3, 3, 1),
    (30, 'Realizar Testes de Usabilidade', 'Conduzir testes de usabilidade para melhorias no produto', '2024-02-27', 1, 1, 1);
COMMIT;

