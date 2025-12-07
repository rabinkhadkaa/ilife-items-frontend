<?php

namespace App;

use PDO;

class Database
{
    private static $instance = null;

    public static function getConnection()
    {
        if (self::$instance === null) {
            $host = $_ENV['DB_HOST'];
            $db   = $_ENV['DB_DATABASE'];
            $user = $_ENV['DB_USERNAME'];
            $pass = $_ENV['DB_PASSWORD'];
            $port = $_ENV['DB_PORT'] ?? 3306;

            $dsn = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";

            self::$instance = new PDO($dsn, $user, $pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);
        }

        return self::$instance;
    }
}


