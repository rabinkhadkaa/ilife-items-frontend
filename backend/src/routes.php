<?php

use Slim\App;

return function (App $app) {

    // Default check route
    $app->get('/', function ($request, $response) {
        $response->getBody()->write("Backend API is running!");
        return $response;
    });

    // GET /api/items
    $app->get('/api/items', function ($request, $response) {
        $items = [
            ["id" => 1, "name" => "Item A", "price" => 100],
            ["id" => 2, "name" => "Item B", "price" => 200]
        ];

        $response->getBody()->write(json_encode($items));
        return $response->withHeader('Content-Type', 'application/json');
    });

    // GET /api/item/{id}
    $app->get('/api/item/{id}', function ($request, $response, $args) {
        $data = [
            "id" => $args['id'],
            "name" => "Item " . $args['id'],
            "price" => 100
        ];

        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json');
    });

    // POST /api/item
    $app->post('/api/item', function ($request, $response) {
        $payload = $request->getParsedBody();

        $response->getBody()->write(json_encode([
            "message" => "Item created",
            "data" => $payload
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    });
};
