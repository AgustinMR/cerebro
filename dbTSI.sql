CREATE TABLE MUNICIPALIDADES (
  nombre varchar(30) NOT NULL,
  ubicacion text NOT NULL,
  PRIMARY KEY (nombre)
);

CREATE TABLE USUARIOS (
  email varchar(30) NOT NULL,
  nombre_municipalidad varchar(30) NOT NULL,
  nombre varchar(30) NULL,
  PRIMARY KEY (email, nombre_municipalidad),
  FOREIGN KEY (nombre_municipalidad) REFERENCES MUNICIPALIDADES (nombre)
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
  PRIMARY KEY (nombre, nombre_municipalidad),
  FOREIGN KEY (nombre_municipalidad) REFERENCES MUNICIPALIDADES (nombre)
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

CREATE TABLE EVENTOS (
  nombre varchar(30) NOT NULL,
  nombre_municipalidad varchar(30) NOT NULL,
  PRIMARY KEY (nombre, nombre_municipalidad),
  FOREIGN KEY (nombre_municipalidad) REFERENCES MUNICIPALIDADES (nombre)
);

CREATE TABLE EVENTOS_OPERADORES (
  nombre_evento varchar(30) NOT NULL,
  nombre_municipalidad_evento varchar(30) NOT NULL,
  operador_email varchar(30) NOT NULL,
  nombre_municipalidad_operador varchar(30) NOT NULL,
  PRIMARY KEY (nombre_evento, nombre_municipalidad_evento, operador_email, nombre_municipalidad_operador),
  FOREIGN KEY (nombre_evento, nombre_municipalidad_evento) REFERENCES EVENTOS (nombre, nombre_municipalidad),
  FOREIGN KEY (operador_email,nombre_municipalidad_operador) REFERENCES OPERADORES (operador_email, nombre_municipalidad)
);

CREATE TABLE TIPOS_DE_FUENTES_DE_DATOS (
  nombre varchar(30) NOT NULL,
  frecuencia_de_lectura integer NOT NULL,
  tipo varchar(30) NOT NULL,
  url_web_service varchar(300) NULL,
  nombre_municipalidad varchar(30) NOT NULL,
  PRIMARY KEY (nombre, nombre_municipalidad),
  FOREIGN KEY (nombre_municipalidad) REFERENCES MUNICIPALIDADES (nombre)
);

CREATE SEQUENCE ID_SEC;
CREATE TABLE FUENTES_DE_DATOS (
  id integer NOT NULL DEFAULT nextval('ID_SEC'),
  ubicacion text NOT NULL,
  dirIP varchar(39) NOT NULL,
  user_agent varchar(100) NULL,
  nombre_municipalidad varchar(30) NOT NULL,
  nombre_tipo_de_fuente_de_datos varchar(30) NOT NULL,
  nombre_municipalidad_tipo_de_fuente_de_datos varchar(30) NOT NULL,
  PRIMARY KEY (id, nombre_municipalidad),
  FOREIGN KEY (nombre_municipalidad_tipo_de_fuente_de_datos, nombre_tipo_de_fuente_de_datos) REFERENCES TIPOS_DE_FUENTES_DE_DATOS (nombre_municipalidad, nombre),
  FOREIGN KEY (nombre_municipalidad) REFERENCES MUNICIPALIDADES (nombre)
);
ALTER SEQUENCE ID_SEC OWNED BY FUENTES_DE_DATOS.id;

CREATE TABLE  EVENTOS_FUENTES_DE_DATOS (
  nombre_evento varchar(30) NOT NULL,
  nombre_municipalidad_evento varchar(30) NOT NULL,
  id_fuente_de_datos integer NOT NULL,
  nombre_municipalidad_fuente_de_datos varchar(30) NOT NULL,
  umbral varchar(100) NOT NULL,
  PRIMARY KEY (nombre_evento, nombre_municipalidad_evento, id_fuente_de_datos, nombre_municipalidad_fuente_de_datos),
  FOREIGN KEY (nombre_evento, nombre_municipalidad_evento) REFERENCES EVENTOS (nombre, nombre_municipalidad),
  FOREIGN KEY (id_fuente_de_datos, nombre_municipalidad_fuente_de_datos) REFERENCES FUENTES_DE_DATOS (id, nombre_municipalidad)
);

CREATE TABLE  ACCIONES (
  nombre_evento varchar(30) NOT NULL,
  nombre_municipalidad_evento varchar(30) NOT NULL,
  PRIMARY KEY (nombre_evento, nombre_municipalidad_evento),
  FOREIGN KEY (nombre_evento, nombre_municipalidad_evento) REFERENCES EVENTOS (nombre, nombre_municipalidad)
);

CREATE TABLE  INVOCAR_WS (
  nombre_evento varchar(30) NOT NULL,
  nombre_municipalidad_evento varchar(30) NOT NULL,
  url_web_service varchar(300) NOT NULL,
  parametros text NULL,
  metodo varchar(10) NOT NULL,
  PRIMARY KEY (nombre_evento, nombre_municipalidad_evento),
  FOREIGN KEY (nombre_evento, nombre_municipalidad_evento) REFERENCES ACCIONES (nombre_evento, nombre_municipalidad_evento)
);

CREATE TABLE  ENVIO_MAIL (
  nombre_evento varchar(30) NOT NULL,
  nombre_municipalidad_evento varchar(30) NOT NULL,
  destinos varchar(200) NOT NULL,
  mensaje text NOT NULL,
  PRIMARY KEY (nombre_evento, nombre_municipalidad_evento),
  FOREIGN KEY (nombre_evento, nombre_municipalidad_evento) REFERENCES ACCIONES (nombre_evento, nombre_municipalidad_evento)
);
