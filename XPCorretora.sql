DROP SCHEMA IF EXISTS XPCorretora;
CREATE SCHEMA IF NOT EXISTS XPCorretora;

CREATE TABLE XPCorretora.Usuarios (
  CodCliente INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  Email VARCHAR(50) NOT NULL,
  Senha VARCHAR(50) NOT NULL
);

CREATE TABLE XPCorretora.AtivosCorretora (
  CodAtivo INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  QtdeAtivo INTEGER NOT NULL,
  Valor FLOAT NOT NULL
);

CREATE TABLE XPCorretora.AtivosUsuarios(
    CodAtivo INT NOT NULL,
    CodCliente INT NOT NULL,
    QtdeAtivo INTEGER NOT NULL,
    Valor FLOAT NOT NULL,
    PRIMARY KEY (CodAtivo, CodCliente),
    FOREIGN KEY(CodAtivo) references AtivosCorretora(CodAtivo),
    FOREIGN KEY(CodCliente) references Usuarios(CodCliente)
);

CREATE TABLE XPCorretora.Contas(
	id INTEGER PRIMARY kEY AUTO_INCREMENT NOT NULL,
	CodCliente INT NOT NULL,
	FOREIGN KEY(CodCliente) references Usuarios(CodCliente),
    Valor DECIMAL(18, 2) NOT NULL
);

INSERT INTO XPCorretora.Usuarios (Email, Senha)
VALUES
('aline@gmail.com', '123@123'),
('marcia@gmail.com', 'lala@123'),
('vanessa@gmail.com', '123321'),
('juliane@gmail.com', 'juju@123');

INSERT INTO XPCorretora.AtivosCorretora(QtdeAtivo, Valor)
VALUES
(10, 25.70),
(25, 101.80),
(6, 17.20),
(15, 2.70);

INSERT INTO XPCorretora.AtivosUsuarios (CodAtivo, CodCliente, QtdeAtivo, Valor)
VALUES
(1, 1, 10, 25.70),
(2, 1, 8, 101.80),
(3, 2, 7, 17.20),
(1, 4, 2, 25.70);

INSERT INTO XPCorretora.Contas (CodCliente, Valor) 
VALUES
(1, 1277.77),
(2, 5754.75),
(3, 480.00),
(4, 750.00);
