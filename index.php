<?php

use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy;
use MiniBanking\Controllers\AuthController;
use MiniBanking\Controllers\BankingController;

require __DIR__ . '/vendor/autoload.php';

// Avvia la sessione
session_start();

// Crea l'app
$app = AppFactory::create();

// CORS middleware
$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->withHeader('Access-Control-Allow-Credentials', 'true');
});

// Gestisci richieste OPTIONS (preflight)
$app->options('/{routes:.+}', function ($request, $response) {
    return $response;
});

// Middleware per parsing JSON
$app->addBodyParsingMiddleware();

// Error middleware
$app->addErrorMiddleware(true, true, true);

// ========== ROUTE DI AUTENTICAZIONE ==========
// VERIFICA CHE QUESTE ROUTE CI SIANO!
$app->post('/auth/login', [AuthController::class, 'login']);
$app->post('/auth/logout', [AuthController::class, 'logout']);
$app->get('/auth/me', [AuthController::class, 'getCurrentUser']);
$app->get('/auth/check', [AuthController::class, 'checkAuth']);

// ========== ROUTE PER IL BANKING ==========
$app->get('/accounts/me/balance', [BankingController::class, 'getBalance']);
$app->get('/accounts/me/transactions', [BankingController::class, 'getTransactions']);
$app->get('/accounts/me/transactions/{tid}', [BankingController::class, 'getTransaction']);
$app->post('/accounts/me/deposits', [BankingController::class, 'postDeposit']);
$app->post('/accounts/me/withdrawals', [BankingController::class, 'postWithdrawal']);
$app->put('/accounts/me/transactions/{tid}', [BankingController::class, 'updateTransaction']);
$app->delete('/accounts/me/transactions/{tid}', [BankingController::class, 'deleteTransaction']);
$app->get('/accounts/me/deposits', [BankingController::class, 'getDeposits']);
$app->get('/accounts/me/withdrawals', [BankingController::class, 'getWithdrawals']);
$app->get('/accounts/me/balance/convert/fiat', [BankingController::class, 'convertToFiat']);
$app->get('/accounts/me/balance/convert/crypto', [BankingController::class, 'convertToCrypto']);

// Avvia l'app
$app->run();