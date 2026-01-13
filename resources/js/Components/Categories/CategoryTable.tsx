import { Category } from '@/types';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

/**
 * Props para el componente CategoryTable.
 */
interface CategoryTableProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (id: number) => void;
}

/**
 * Componente para mostrar la tabla de categorías.
 * Renderiza cada categoría con sus acciones de editar y eliminar.
 */
export default function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) {
    /**
     * Formatea la fecha en formato local.
     */
    const formatDate = (dateString: string): string => {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(new Date(dateString));
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Descripción
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Color
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Creada
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {categories.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                No hay categorías registradas. ¡Crea la primera!
                            </td>
                        </tr>
                    ) : (
                        categories.map((category) => (
                            <tr key={category.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {category.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {category.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                    {category.description || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {category.color ? (
                                        <div className="flex items-center space-x-2">
                                            <div
                                                className="w-6 h-6 rounded border border-gray-300"
                                                style={{ backgroundColor: category.color }}
                                            />
                                            <span className="text-xs text-gray-600">
                                                {category.color}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-gray-400">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            category.active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {category.active ? 'Activa' : 'Inactiva'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(category.created_at)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                    <SecondaryButton onClick={() => onEdit(category)}>
                                        Editar
                                    </SecondaryButton>
                                    <DangerButton onClick={() => onDelete(category.id)}>
                                        Eliminar
                                    </DangerButton>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
