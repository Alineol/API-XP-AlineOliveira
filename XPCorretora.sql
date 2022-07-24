DROP SCHEMA IF EXISTS XPCorretora;
CREATE SCHEMA IF NOT EXISTS XPCorretora;

CREATE TABLE XPCorretora.Usuarios (
  codCliente INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  senha VARCHAR(8) NOT NULL
);

CREATE TABLE XPCorretora.AtivosCorretora (
  codAtivo INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  qtdeAtivo INTEGER NOT NULL,
  valor DECIMAL(18, 2) NOT NULL
);

CREATE TABLE XPCorretora.AtivosUsuarios(
    codAtivo INT NOT NULL,
    codCliente INT NOT NULL,
    qtdeAtivo INTEGER NOT NULL,
    valor DECIMAL(18, 2) NOT NULL,
    PRIMARY KEY (codAtivo, codCliente),
    FOREIGN KEY(codAtivo) references AtivosCorretora(codAtivo),
    FOREIGN KEY(codCliente) references Usuarios(codCliente)
);

CREATE TABLE XPCorretora.Contas(
	id INTEGER PRIMARY kEY AUTO_INCREMENT NOT NULL,
	codCliente INT NOT NULL UNIQUE,
	FOREIGN KEY(codCliente) references Usuarios(codCliente),
    valor DECIMAL(18, 2) NOT NULL
);

INSERT INTO XPCorretora.Usuarios (email, senha)
VALUES
('aline@gmail.com', '12345678'),
('marcia@gmail.com', '12345678'),
('vanessa@gmail.com', '12345678'),
('juliane@gmail.com', '12345678');

INSERT INTO XPCorretora.AtivosCorretora(qtdeAtivo, valor)
VALUES
(10, 25.70),
(25, 101.80),
(6, 17.20),
(15, 2.70),
(8, 20.00),
(50, 19.00),
(150, 200.00),
(7, 170);

INSERT INTO XPCorretora.AtivosUsuarios (codAtivo, codCliente, qtdeAtivo, valor)
VALUES
(1, 1, 10, 25.77),
(4, 1, 2, 25.70),
(8, 1, 2, 25.70),
(5, 1, 2, 25.70),
(1, 2, 8, 101.80),
(2, 3, 8, 101.80),
(3, 3, 8, 101.80),
(4, 2, 8, 101.80),
(5, 4, 8, 101.80),
(3, 4, 7, 17.20),
(2, 4, 8, 101.80);

INSERT INTO XPCorretora.Contas (codCliente, valor) 
VALUES
(1, 1277.77),
(2, 5754.75),
(3, 480.00),
(4, 750.00);
