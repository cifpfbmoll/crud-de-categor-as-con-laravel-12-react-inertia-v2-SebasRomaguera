<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    /**
     * Los atributos que pueden ser asignados masivamente.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'color',
        'active',
    ];

    /**
     * Los atributos que deben ser convertidos a tipos nativos.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'active' => 'boolean',
    ];

    /**
     * Relación: Una categoría tiene muchos productos.
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
