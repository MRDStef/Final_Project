<?php

namespace MiniBanking\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use MiniBanking\Models\Account;

class AuthController
{
    private function jsonResponse(Response $response, $data, int $status = 200): Response
    {
        $response->getBody()->write(json_encode($data));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }
    
    private function errorResponse(Response $response, string $message, int $status): Response
    {
        return $this->jsonResponse($response, ['error' => $message], $status);
    }
    
    public function login(Request $request, Response $response, array $args): Response
    {
        $data = $request->getParsedBody();
        
        $ownerName = $data['owner_name'] ?? '';
        $password = $data['password'] ?? '';
        
        if (empty($ownerName)) {
            return $this->errorResponse($response, 'Owner name is required', 400);
        }
        
        if (empty($password)) {
            return $this->errorResponse($response, 'Password is required', 400);
        }
        
        $account = Account::authenticate($ownerName, $password);
        
        if (!$account) {
            return $this->errorResponse($response, 'Invalid credentials', 401);
        }
        
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION['user_id'] = $account['id'];
        $_SESSION['user_name'] = $account['owner_name'];
        $_SESSION['currency'] = $account['currency'];
        
        return $this->jsonResponse($response, [
            'message' => 'Login successful',
            'user' => $account
        ]);
    }
    
    public function logout(Request $request, Response $response, array $args): Response
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        session_destroy();
        
        return $this->jsonResponse($response, [
            'message' => 'Logout successful'
        ]);
    }
    
    public function getCurrentUser(Request $request, Response $response, array $args): Response
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        if (!isset($_SESSION['user_id'])) {
            return $this->errorResponse($response, 'Not authenticated', 401);
        }
        
        $account = Account::findById($_SESSION['user_id']);
        
        if (!$account) {
            return $this->errorResponse($response, 'User not found', 404);
        }
        
        return $this->jsonResponse($response, $account);
    }
    
    public function checkAuth(Request $request, Response $response, array $args): Response
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        $isAuthenticated = isset($_SESSION['user_id']);
        
        return $this->jsonResponse($response, [
            'authenticated' => $isAuthenticated,
            'user_id' => $_SESSION['user_id'] ?? null
        ]);
    }
}