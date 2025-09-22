-- Crear base de datos (si no existe)
CREATE DATABASE IF NOT EXISTS peluqueria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE peluqueria;

-- Tabla de usuarios (para el login admin)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuario administrador por defecto
-- email: admin@peluqueria.com
-- pass: 123456
INSERT INTO users (email, password_hash)
VALUES (
  'admin@peluqueria.com',
  '$2y$10$wVQ3iMw0yUe7aHH5Dg2O4O1uUk6M.jgXzVcpYxkKkN39vU4pIfG9W'
);

-- Tabla de turnos
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  client_name VARCHAR(255),
  client_phone VARCHAR(50),
  client_email VARCHAR(255),
  manage_token VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de disponibilidades semanales
CREATE TABLE IF NOT EXISTS weekly_availability (
  id INT AUTO_INCREMENT PRIMARY KEY,
  weekday TINYINT NOT NULL, -- 0=Domingo, 1=Lunes...
  start_time TIME NOT NULL,
  end_time TIME NOT NULL
);

-- Tabla de bloqueos puntuales
CREATE TABLE IF NOT EXISTS exceptions_blocks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  reason VARCHAR(255)
);
