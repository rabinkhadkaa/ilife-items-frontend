<?php

use Illuminate\Database\Capsule\Manager as Capsule;

return function () {
    $capsule = new Capsule;

    $capsule->addConnection([
        'driver'    => $_ENV['DB_DRIVER'] ?? 'mysql',
        'host'      => $_ENV['DB_HOST'] ?? '127.0.0.1',
        'database'  => $_ENV['DB_DATABASE'] ?? 'buildprocure',
        'username'  => $_ENV['DB_USERNAME'] ?? 'root',
        'password'  => $_ENV['DB_PASSWORD'] ?? '',
        'charset'   => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'prefix'    => '',
    ]);

    $capsule->setAsGlobal();
    $capsule->bootEloquent();
};
