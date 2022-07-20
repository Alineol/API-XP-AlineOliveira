DROP SCHEMA IF EXISTS XPCorretora;
CREATE SCHEMA IF NOT EXISTS XPCorretora;

CREATE TABLE XPCorretora.Usuarios (
  codCliente INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  email VARCHAR(50) NOT NULL,
  senha VARCHAR(50) NOT NULL
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
	codCliente INT NOT NULL,
	FOREIGN KEY(codCliente) references Usuarios(codCliente),
    valor DECIMAL(18, 2) NOT NULL
);

INSERT INTO XPCorretora.Usuarios (email, senha)
VALUES
('aline@gmail.com', '123@123'),
('marcia@gmail.com', 'lala@123'),
('vanessa@gmail.com', '123321'),
('juliane@gmail.com', 'juju@123');

INSERT INTO XPCorretora.AtivosCorretora(qtdeAtivo, valor)
VALUES
(10, 25.70),
(25, 101.80),
(6, 17.20),
(15, 2.70);

INSERT INTO XPCorretora.AtivosUsuarios (codAtivo, codCliente, qtdeAtivo, valor)
VALUES
(1, 1, 10, 25.77),
(2, 1, 8, 101.80),
(3, 2, 7, 17.20),
(1, 4, 2, 25.70);

INSERT INTO XPCorretora.Contas (codCliente, valor) 
VALUES
(1, 1277.77),
(2, 5754.75),
(3, 480.00),
(4, 750.00);
