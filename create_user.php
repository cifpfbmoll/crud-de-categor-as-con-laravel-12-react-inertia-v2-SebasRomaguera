<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

// Eliminar usuario si existe
User::where('email', 'demo@demo.com')->delete();

// Crear nuevo usuario
$user = User::create([
    'name' => 'Usuario Demo',
    'email' => 'demo@demo.com',
    'email_verified_at' => now(),
    'password' => Hash::make('12345678'),
]);

echo "✓ Usuario creado exitosamente\n";
echo "Email: demo@demo.com\n";
echo "Password: 12345678\n";
