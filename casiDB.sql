CREATE TABLE USUARIOS (
  email varchar(30) NOT NULL,
  nombre_municipalidad varchar(30) NOT NULL,
  nombre varchar(30) NULL,
  PRIMARY KEY (email, nombre_municipalidad)
);

CREATE TABLE VISITANTES (
  visitante_email varchar(30) NOT NULL,
  nombre_municipalidad varchar(30) NOT NULL,
  PRIMARY KEY (visitante_email, nombre_municipalidad),
  FOREIGN KEY (visitante_email, nombre_municipalidad) REFERENCES USUARIOS (email, nombre_municipalidad)
);

CREATE TABLE OPERADORES (
  operador_email varchar(30) NOT NULL,
  password varchar(30) NOT NULL,
  nombre_municipalidad varchar(30) NOT NULL,
  PRIMARY KEY (operador_email, nombre_municipalidad),
  FOREIGN KEY (operador_email, nombre_municipalidad) REFERENCES USUARIOS (email, nombre_municipalidad)
);

CREATE TABLE ADMINISTRADOR (
  admin_email varchar(30) NOT NULL,
  password varchar(30) NOT NULL,
  nombre_municipalidad varchar(30) NOT NULL,
  PRIMARY KEY (admin_email, nombre_municipalidad),
  FOREIGN KEY (admin_email, nombre_municipalidad) REFERENCES USUARIOS (email, nombre_municipalidad)
);

CREATE TABLE AGRUPACIONES (
  nombre varchar(30) NOT NULL,
  nombre_municipalidad varchar(30) NOT NULL,
  PRIMARY KEY (nombre, nombre_municipalidad)
);

CREATE TABLE AGRUPACIONES_USUARIOS (
  nombre_agrupacion varchar(30) NOT NULL,
  nombre_municipalidad_agrupacion varchar(30) NOT NULL,
  usuario_email varchar(30) NOT NULL,
  nombre_municipalidad_usuario varchar(30) NOT NULL,
  admin BOOLEAN NOT NULL default FALSE,
  PRIMARY KEY (nombre_agrupacion, nombre_municipalidad_agrupacion, usuario_email, nombre_municipalidad_usuario),
  FOREIGN KEY (nombre_municipalidad_agrupacion, nombre_agrupacion) REFERENCES AGRUPACIONES (nombre_municipalidad, nombre),
  FOREIGN KEY (nombre_municipalidad_usuario, usuario_email) REFERENCES USUARIOS (nombre_municipalidad, email)
);
