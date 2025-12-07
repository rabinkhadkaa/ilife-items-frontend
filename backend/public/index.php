<?php
require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;
use Slim\Factory\AppFactory;

$env = getenv('APP_ENV') ?: 'local';

$basePath = __DIR__ . '/..';

$envFile = ".env.local";

if ($env === 'prod') {
    $envFile = ".env.prod";
} elseif ($env === 'qa') {
    $envFile = ".env.qa";
} elseif ($env === 'stage') {
    $envFile = ".env.stage";
}

$dotenv = Dotenv::createImmutable($basePath, $envFile);
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
// Load DB file normally — do NOT call it
require __DIR__ . '/../src/database.php';

// Load routes (this file returns a function)
$routes = require __DIR__ . '/../src/routes.php';
$routes($app);

$app->run();
