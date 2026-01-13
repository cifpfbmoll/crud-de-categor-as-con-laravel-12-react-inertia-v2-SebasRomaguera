import { useState, useEffect, FormEventHandler } from 'react';
import { Category } from '@/types';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

/**
 * Props para el componente CategoryModal.
 */
interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (category: Category) => void;
    mode: 'create' | 'edit';
    category?: Category | null;
}

/**
 * Estado del formulario para crear/editar categorías.
 */
interface FormData {
    name: string;
    description: string;
    color: string;
    active: boolean;
}

/**
 * Errores de validación del formulario.
 */
interface FormErrors {
    name?: string;
    description?: string;
    color?: string;
    active?: string;
}

/**
 * Modal reutilizable para crear y editar categorías.
 * Maneja validación del lado del cliente y peticiones al backend.
 */
export default function CategoryModal({ 
    isOpen, 
    onClose, 
    onSuccess, 
    mode, 
    category 
}: CategoryModalProps) {
    // Estado inicial del formulario
    const initialFormData: FormData = {
        name: '',
        description: '',
        color: '#3B82F6',
        active: true,
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [processing, setProcessing] = useState(false);

    // Cargar datos de la categoría cuando se edita
    useEffect(() => {
        if (mode === 'edit' && category) {
            setFormData({
                name: category.name,
                description: category.description || '',
                color: category.color || '#3B82F6',
                active: category.active,
            });
        } else {
            setFormData(initialFormData);
        }
        setErrors({});
    }, [mode, category, isOpen]);

    /**
     * Valida el formulario antes de enviar.
     * Retorna true si es válido.
     */
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
        }

        if (formData.color && !/^#[0-9A-Fa-f]{6}$/.test(formData.color)) {
            newErrors.color = 'El color debe ser un código hex válido (ej: #FF5733)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Maneja el envío del formulario.
     * Realiza la petición al backend según el modo (crear/editar).
     */
    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            console.log('Validación fallida');
            return;
        }

        setProcessing(true);

        try {
            const url = mode === 'create' 
                ? '/categories' 
                : `/categories/${category?.id}`;
            
            const method = mode === 'create' ? 'POST' : 'PUT';

            const payload = {
                name: formData.name,
                description: formData.description || null,
                color: formData.color || null,
                active: formData.active,
            };

            console.log('Enviando solicitud:', method, url, payload);

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>(
                        'meta[name="csrf-token"]'
                    )?.content || '',
                },
                body: JSON.stringify(payload),
            });

            console.log('Respuesta recibida:', response.status);

            const data = await response.json();
            console.log('Datos:', data);

            if (response.ok) {
                onSuccess(data.category);
                onClose();
                setFormData(initialFormData);
            } else {
                // Manejar errores de validación del servidor
                if (data.errors) {
                    setErrors(data.errors);
                    console.error('Errores de validación:', data.errors);
                }
                if (data.message) {
                    alert('Error: ' + data.message);
                }
            }
        } catch (error) {
            console.error('Error al guardar la categoría:', error);
            alert('Error de conexión. Verifica que el servidor esté corriendo.');
        } finally {
            setProcessing(false);
        }
    };

    /**
     * Actualiza un campo del formulario.
     */
    const handleChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Limpiar error del campo al modificarlo
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {mode === 'create' ? 'Crear Nueva Categoría' : 'Editar Categoría'}
                </h2>

                {/* Campo: Nombre */}
                <div className="mb-4">
                    <InputLabel htmlFor="name" value="Nombre *" />
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Nombre de la categoría"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Campo: Descripción */}
                <div className="mb-4">
                    <InputLabel htmlFor="description" value="Descripción" />
                    <textarea
                        id="description"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Descripción de la categoría (opcional)"
                        rows={3}
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                {/* Campo: Color */}
                <div className="mb-4">
                    <InputLabel htmlFor="color" value="Color" />
                    <div className="flex items-center space-x-3 mt-1">
                        <input
                            id="color"
                            type="color"
                            className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                            value={formData.color}
                            onChange={(e) => handleChange('color', e.target.value)}
                        />
                        <TextInput
                            type="text"
                            className="flex-1"
                            value={formData.color}
                            onChange={(e) => handleChange('color', e.target.value)}
                            placeholder="#3B82F6"
                            maxLength={7}
                        />
                    </div>
                    <InputError message={errors.color} className="mt-2" />
                </div>

                {/* Campo: Estado Activo/Inactivo */}
                <div className="mb-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                            checked={formData.active}
                            onChange={(e) => handleChange('active', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            Categoría activa
                        </span>
                    </label>
                    <InputError message={errors.active} className="mt-2" />
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end space-x-3">
                    <SecondaryButton type="button" onClick={onClose}>
                        Cancelar
                    </SecondaryButton>
                    <PrimaryButton type="submit" disabled={processing}>
                        {processing 
                            ? 'Guardando...' 
                            : (mode === 'create' ? 'Crear Categoría' : 'Guardar Cambios')
                        }
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
