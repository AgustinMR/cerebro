CREATE TABLE MUNICIPALIDADES (
  nombre varchar(30) NOT NULL,
  ubicacion varchar(5000) NOT NULL,
  PRIMARY KEY (nombre)
);

CREATE TABLE USUARIOS (
  email varchar(50) NOT NULL,
  nombre_municipalidad varchar(30) NOT NULL,
  nombre varchar(30) NULL,
  password varchar(30) NULL,
  tipo integer NOT NULL,
  enabled bit NOT NULL DEFAULT 0,
  PRIMARY KEY (email, nombre_municipalidad),
  FOREIGN KEY (nombre_municipalidad) REFERENCES MUNICIPALIDADES (nombre)
);

CREATE TABLE PRIVILEGIOS  (
  nombre varchar(30) NOT NULL,
  nombre_municipalidad varchar(30) NOT NULL,
  PRIMARY KEY (nombre, nombre_municipalidad),
  FOREIGN KEY (nombre_municipalidad) REFERENCES MUNICIPALIDADES (nombre)
);

CREATE TABLE PRIVILEGIOS_USUARIOS  (
  nombre_privilegio varchar(30) NOT NULL,
  nombre_municipalidad_privilegio varchar(30) NOT NULL,
  usuario_email varchar(50) NOT NULL,
  nombre_municipalidad_usuario varchar(30) NOT NULL,
  PRIMARY KEY (nombre_privilegio, nombre_municipalidad_privilegio, usuario_email, nombre_municipalidad_usuario),
  FOREIGN KEY (nombre_privilegio, nombre_municipalidad_privilegio) REFERENCES PRIVILEGIOS (nombre, nombre_municipalidad),
  FOREIGN KEY (usuario_email, nombre_municipalidad_usuario) REFERENCES USUARIOS (email, nombre_municipalidad)
);

CREATE TABLE AGRUPACIONES (
  nombre varchar(30) NOT NULL,
  nombre_municipalidad varchar(30) NOT NULL,
  PRIMARY KEY (nombre, nombre_municipalidad),
  FOREIGN KEY (nombre_municipalidad) REFERENCES MUNICIPALIDADES (nombre)
);

CREATE TABLE AGRUPACIONES_USUARIOS (
  nombre_agrupacion varchar(30) NOT NULL,
  nombre_municipalidad_agrupacion varchar(30) NOT NULL,
  usuario_email varchar(50) NOT NULL,
  nombre_municipalidad_usuario varchar(30) NOT NULL,
  admin bit NOT NULL,
  PRIMARY KEY (nombre_agrupacion, nombre_municipalidad_agrupacion, usuario_email, nombre_municipalidad_usuario),
  FOREIGN KEY (nombre_agrupacion, nombre_municipalidad_agrupacion) REFERENCES AGRUPACIONES (nombre, nombre_municipalidad),
  FOREIGN KEY (usuario_email, nombre_municipalidad_usuario) REFERENCES USUARIOS (email, nombre_municipalidad)
);
