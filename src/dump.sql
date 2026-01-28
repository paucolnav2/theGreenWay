CREATE DATABASE theGreenWay;
USE theGreenWay;

CREATE TABLE usuarios (
    id INT PRIMARY KEY,
    userName VARCHAR(255) Unique,
    password VARCHAR (255)
);

CREATE TABLE logs (
    lat FLOAT,
    lon FLOAT,
    timer TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idUsuario INT,
    CONSTRAINT fk FOREIGN KEY (idUsuario) REFERENCES usuarios(id),
    PRIMARY KEY (idUsuario, timer)
);
INSERT INTO usuarios (id, userName, password) VALUES
(1, 'Joan', 'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79'),
(2, 'Iker', '1ef62013f28e97f69579402dfd1c1b01fa5a9344987edf0ba14a8c717931a274'),
(3, 'Gerard', '3891f13300b85e89d403504b4c26abe3adf5f39420a2d111059423cb25b33b86'),
(4, 'Carles', '445c06f8335048bf3af883b047f79163c70083de3874e79ba1f7e621e0073579'),
(5, 'Sergio', '90984cc7ba5a96b3dcc55921ac4c7d7b344fcc37947a003cae10c475f4439377'),
(6, 'Xavi', 'f7c3cc7a2377dabee2d71a54e5b1ca93dae1006887d0747c0978e051a948fc15'),
(7, 'Andrés', '38d01160eba0d1b7561c2b4ef15ece5473c6e1ce007547cd2ab1ab21b0177c5f'),
(8, 'David', '6ee3169becb2fead5d1ca534cfa19b54eed7b6e5bb0f78d8a3bf66febee3728e'),
(9, 'Fernando', '361573f14cce34bb4a5e58b3fa1cf323f5b0c3df90fe99f69475b80ecdc9a006'),
(10, 'Jesús', 'd8542114d7d40f3c82fc0919efc644df30f4e827c2bd6b83b9dbec8358b2fbc4');
