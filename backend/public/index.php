<?php
require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;
use Slim\Factory\AppFactory;

$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->safeLoad();

$app = AppFactory::create();

// 1: Routing middleware FIRST
$app->addRoutingMiddleware();

// 2: CORS middleware NEXT (with OPTIONS in headers)
$app->add(function ($request, $handler) {
    $response = $handler->handle($request);

    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->withHeader('Access-Control-Allow-Credentials', 'true');
});

// 3: Catch ALL OPTIONS for CORS preflight
$app->options('/{routes:.+}', function ($request, $response) {
    return $response;
});

// Load DB + Routes
(require __DIR__ . '/../src/database.php')();
(require __DIR__ . '/../src/routes.php')($app);

$app->run();
