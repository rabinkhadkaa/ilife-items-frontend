<?php

namespace Marketplace\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class JwtMiddleware
{
    public function __invoke(Request $request, $handler): Response
    {
        $jwtSecret = getenv('JWT_SECRET');

        $token = $_COOKIE['bp_token'] ?? null;

        if (!$token) {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(["error" => "Unauthorized"]));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        try {

            $decoded = JWT::decode($token, new Key($jwtSecret, 'HS256'));

            // attach user to request
            $request = $request->withAttribute('user', $decoded->data);

            return $handler->handle($request);

        } catch (\Exception $e) {

            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(["error" => "Invalid Token"]));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');

        }
    }
}