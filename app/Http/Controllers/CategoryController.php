<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Muestra el listado de categorías.
     * Renderiza la página React con los datos via Inertia.
     */
    public function index(): Response
    {
        return Inertia::render('Categories/Index', [
            'categories' => Category::orderBy('name', 'asc')->get(),
        ]);
    }

    /**
     * Almacena una nueva categoría en la base de datos.
     * Valida los datos y devuelve respuesta JSON.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:100|unique:categories,name',
                'description' => 'nullable|string',
                'color' => 'nullable|string|regex:/^#[0-9A-Fa-f]{6}$/',
                'active' => 'sometimes|boolean',
            ]);

            // Asegurar que active tenga un valor por defecto
            $validated['active'] = $validated['active'] ?? true;

            $category = Category::create($validated);

            return response()->json([
                'message' => '¡Categoría creada exitosamente!',
                'category' => $category,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear la categoría: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Actualiza una categoría existente.
     * Busca por ID, valida y actualiza.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:100|unique:categories,name,' . $id,
                'description' => 'nullable|string',
                'color' => 'nullable|string|regex:/^#[0-9A-Fa-f]{6}$/',
                'active' => 'sometimes|boolean',
            ]);

            // Asegurar que active tenga un valor
            $validated['active'] = $validated['active'] ?? true;

            $category = Category::findOrFail($id);
            $category->update($validated);

            return response()->json([
                'message' => '¡Categoría actualizada exitosamente!',
                'category' => $category,
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar la categoría: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Elimina una categoría de la base de datos.
     * Verifica que no tenga productos asociados antes de eliminar.
     */
    public function destroy(int $id): \Illuminate\Http\RedirectResponse
    {
        $category = Category::findOrFail($id);
        
        // Verificar si tiene productos asociados
        if ($category->products()->count() > 0) {
            return redirect()->back()->with('error', 'No se puede eliminar la categoría porque tiene productos asociados.');
        }

        $category->delete();

        return redirect()->back()->with('success', '¡Categoría eliminada exitosamente!');
    }
}
