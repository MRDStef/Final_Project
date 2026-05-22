DROP DATABASE IF EXISTS banking;
CREATE DATABASE IF NOT EXISTS banking;
USE banking;

CREATE TABLE IF NOT EXISTS accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner_name VARCHAR(100) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'EUR',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    type ENUM('deposit', 'withdrawal') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);



-- Inserisci un account principale
INSERT INTO accounts (owner_name, currency, created_at) VALUES 
('Mario Rossi', 'EUR', NOW());

-- (Opzionale) Altri account per test
INSERT INTO accounts (owner_name, currency, created_at) VALUES 
('Luigi Verdi', 'EUR', NOW()),
('Anna Bianchi', 'USD', NOW());




-- Movimenti per l'account ID 1 (Mario Rossi)

-- Depositi iniziali
INSERT INTO transactions (account_id, type, amount, description, created_at) VALUES 
(1, 'deposit', 1000.00, 'Stipendio Gennaio', '2024-01-15 10:30:00'),
(1, 'deposit', 1000.00, 'Stipendio Febbraio', '2024-02-15 10:30:00'),
(1, 'deposit', 1050.00, 'Stipendio Marzo', '2024-03-15 10:30:00'),
(1, 'deposit', 1050.00, 'Stipendio Aprile', '2024-04-15 10:30:00'),
(1, 'deposit', 1100.00, 'Stipendio Maggio', '2024-05-15 10:30:00'),
(1, 'deposit', 1100.00, 'Stipendio Giugno', '2024-06-15 10:30:00'),
(1, 'deposit', 1150.00, 'Stipendio Luglio', '2024-07-15 10:30:00'),
(1, 'deposit', 1150.00, 'Stipendio Agosto', '2024-08-15 10:30:00'),
(1, 'deposit', 1200.00, 'Stipendio Settembre', '2024-09-15 10:30:00'),
(1, 'deposit', 1200.00, 'Stipendio Ottobre', '2024-10-15 10:30:00'),
(1, 'deposit', 1250.00, 'Stipendio Novembre', '2024-11-15 10:30:00'),
(1, 'deposit', 1250.00, 'Stipendio Dicembre', '2024-12-15 10:30:00');

-- Prelievi/Spese
INSERT INTO transactions (account_id, type, amount, description, created_at) VALUES 
(1, 'withdrawal', 800.00, 'Affitto Gennaio', '2024-01-20 09:00:00'),
(1, 'withdrawal', 200.00, 'Spesa alimentare Gennaio', '2024-01-25 18:30:00'),
(1, 'withdrawal', 50.00, 'Bolletta luce Gennaio', '2024-01-28 14:15:00'),
(1, 'withdrawal', 800.00, 'Affitto Febbraio', '2024-02-20 09:00:00'),
(1, 'withdrawal', 180.00, 'Spesa alimentare Febbraio', '2024-02-25 18:30:00'),
(1, 'withdrawal', 55.00, 'Bolletta luce Febbraio', '2024-02-28 14:15:00'),
(1, 'withdrawal', 800.00, 'Affitto Marzo', '2024-03-20 09:00:00'),
(1, 'withdrawal', 220.00, 'Spesa alimentare Marzo', '2024-03-25 18:30:00'),
(1, 'withdrawal', 50.00, 'Bolletta luce Marzo', '2024-03-28 14:15:00'),
(1, 'withdrawal', 800.00, 'Affitto Aprile', '2024-04-20 09:00:00'),
(1, 'withdrawal', 350.00, 'Vestiti', '2024-04-22 16:00:00'),
(1, 'withdrawal', 190.00, 'Spesa alimentare Aprile', '2024-04-25 18:30:00'),
(1, 'withdrawal', 800.00, 'Affitto Maggio', '2024-05-20 09:00:00'),
(1, 'withdrawal', 210.00, 'Spesa alimentare Maggio', '2024-05-25 18:30:00'),
(1, 'withdrawal', 60.00, 'Bollette Maggio', '2024-05-28 14:15:00'),
(1, 'withdrawal', 800.00, 'Affitto Giugno', '2024-06-20 09:00:00'),
(1, 'withdrawal', 500.00, 'Vacanze', '2024-06-25 11:00:00'),
(1, 'withdrawal', 200.00, 'Spesa alimentare Giugno', '2024-06-28 18:30:00'),
(1, 'withdrawal', 800.00, 'Affitto Luglio', '2024-07-20 09:00:00'),
(1, 'withdrawal', 230.00, 'Spesa alimentare Luglio', '2024-07-25 18:30:00');

-- Movimenti recenti (2025-2026)
INSERT INTO transactions (account_id, type, amount, description, created_at) VALUES 
(1, 'deposit', 1300.00, 'Stipendio Gennaio 2025', '2025-01-15 10:30:00'),
(1, 'withdrawal', 850.00, 'Affitto Gennaio 2025', '2025-01-20 09:00:00'),
(1, 'deposit', 1300.00, 'Stipendio Febbraio 2025', '2025-02-15 10:30:00'),
(1, 'withdrawal', 850.00, 'Affitto Febbraio 2025', '2025-02-20 09:00:00'),
(1, 'deposit', 1350.00, 'Stipendio Marzo 2025', '2025-03-15 10:30:00'),
(1, 'withdrawal', 200.00, 'Ristorante', '2025-03-18 20:00:00'),
(1, 'deposit', 500.00, 'Bonus', '2025-12-20 09:00:00'),
(1, 'deposit', 1400.00, 'Stipendio Gennaio 2026', '2026-01-15 10:30:00'),
(1, 'deposit', 150.00, 'Rimborso spese', '2026-02-10 14:00:00'),
(1, 'withdrawal', 900.00, 'Affitto Febbraio 2026', '2026-02-20 09:00:00');
