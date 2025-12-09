<?php

use Slim\App;
use App\Database;

return function (App $app) {

    // Health check route
    $app->get('/', function ($request, $response) {
        $response->getBody()->write(json_encode([
            "status" => "Backend API is running!"
        ]));
        return $response->withHeader('Content-Type', 'application/json');
    });

    /**
     * GET /api/items
     * Fetch all items from DB
     */
    $app->get('/api/items', function ($request, $response) {

        $db = Database::getConnection();
        $stmt = $db->query("SELECT id, name, price, description, image_url FROM items ORDER BY id DESC");
        $items = $stmt->fetchAll();

        $response->getBody()->write(json_encode($items));
        return $response->withHeader('Content-Type', 'application/json');
    });

    /**
     * GET /api/item/{id}
     * Fetch single item
     */
    $app->get('/api/item/{id}', function ($request, $response, $args) {

        $id = (int)$args['id'];

        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT id, name, price, description FROM items WHERE id = ?");
        $stmt->execute([$id]);

        $item = $stmt->fetch();

        if (!$item) {
            $response->getBody()->write(json_encode(["error" => "Item not found"]));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode($item));
        return $response->withHeader('Content-Type', 'application/json');
    });

    /**
     * POST /api/item
     * Insert new item
     */
    $app->post('/api/item', function ($request, $response) {

        $payload = $request->getParsedBody();
        $name  = $payload["name"] ?? null;
        $price = $payload["price"] ?? null;

        if (!$name || !$price) {
            $response->getBody()->write(json_encode([
                "error" => "name and price are required"
            ]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $db = Database::getConnection();
        $stmt = $db->prepare("INSERT INTO items (name, price) VALUES (?, ?)");
        $stmt->execute([$name, $price]);

        $newId = $db->lastInsertId();

        $response->getBody()->write(json_encode([
            "message" => "Item created",
            "id" => $newId
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    });
};
