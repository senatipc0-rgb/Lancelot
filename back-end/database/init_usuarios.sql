-- Script para crear usuario de prueba
-- Ejecutar en MySQL después de init.sql

-- La contraseña es: admin123
-- Password hash generado con bcrypt: $2a$10$rBV2JzNv7iQJxCYJdYk4 OeQWQBW8mN5GQBW8mN5GQBW8mN5GQBW (simulado)

-- Para usar, primero crear el usuario y luego actualizar el hash:
-- INSERT INTO usuarios (username, email, password_hash, rol) VALUES ('admin', 'admin@edu.com', '', 'admin');

-- Luego actualizar con el hash correcto (desde MySQL Workbench o consola):
-- UPDATE usuarios SET password_hash = '$2a$10$rBV2JzNv7iQJxCYJdYk4OeQWQBW8mN5GQBW8mN5GQBW8mN5GQBW8mN5G' WHERE username = 'admin';