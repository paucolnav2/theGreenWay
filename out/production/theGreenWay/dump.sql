CREATE DATABASE theGreenWay;
USE theGreenWay;

CREATE TABLE usuarios (
    id INT PRIMARY KEY,
    Nombre VARCHAR(255) DEFAULT NULL
);

CREATE TABLE logs (
    lat FLOAT,
    lon FLOAT,
    timer TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idUsuario INT,
    CONSTRAINT fk FOREIGN KEY (idUsuario) REFERENCES usuarios(id),
    PRIMARY KEY (idUsuario, timer)
);