document.addEventListener('DOMContentLoaded', function() {
    // Configuración centralizada
    const CONFIG = {
        PASSWORD: {
            MIN_LENGTH: 8,
            SPECIAL_CHARS: '@$!%*?&'
        },
        NAME: {
            MIN_LENGTH: 2,
            MAX_LENGTH: 50
        },
        PHONE: {
            PATTERN: /^\+?56\s?9\s?\d{4}\s?\d{4}$/
        },
        FILE: {
            MAX_SIZE: 3 * 1024 * 1024, // 3MB
            VALID_TYPES: ['image/jpeg', 'image/png'],
            INVALID_CHARS: /[<>:"/\\|?*]/
        }
    };

    // Validaciones específicas para cada campo
    const validations = {
        required: function(value, fieldName) {
            const trimmedValue = value.trim();
            return {
                isValid: trimmedValue.length > 0,
                message: `El campo ${fieldName} es obligatorio`
            };
        },

        nombre: function(value) {
            const trimmedValue = value.trim();
            if (!trimmedValue) {
                return {
                    isValid: false,
                    message: 'El nombre es obligatorio'
                };
            }
            if (trimmedValue.length < CONFIG.NAME.MIN_LENGTH) {
                return {
                    isValid: false,
                    message: `El nombre debe tener al menos ${CONFIG.NAME.MIN_LENGTH} caracteres`
                };
            }
            if (trimmedValue.length > CONFIG.NAME.MAX_LENGTH) {
                return {
                    isValid: false,
                    message: `El nombre no puede superar los ${CONFIG.NAME.MAX_LENGTH} caracteres`
                };
            }
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(trimmedValue)) {
                return {
                    isValid: false,
                    message: 'El nombre solo puede contener letras y espacios'
                };
            }
            return {
                isValid: true,
                message: ''
            };
        },

        apellidos: function(value) {
            const trimmedValue = value.trim();
            if (!trimmedValue) {
                return {
                    isValid: false,
                    message: 'Los apellidos son obligatorios'
                };
            }
            if (trimmedValue.length < CONFIG.NAME.MIN_LENGTH) {
                return {
                    isValid: false,
                    message: `Los apellidos deben tener al menos ${CONFIG.NAME.MIN_LENGTH} caracteres`
                };
            }
            if (trimmedValue.length > CONFIG.NAME.MAX_LENGTH) {
                return {
                    isValid: false,
                    message: `Los apellidos no pueden superar los ${CONFIG.NAME.MAX_LENGTH} caracteres`
                };
            }
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(trimmedValue)) {
                return {
                    isValid: false,
                    message: 'Los apellidos solo pueden contener letras y espacios'
                };
            }
            return {
                isValid: true,
                message: ''
            };
        },

        email: function(value) {
            const emailRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9._-]*[a-zA-Z0-9]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
            const sanitizedEmail = value.trim().toLowerCase();
            
            if (!sanitizedEmail) {
                return {
                    isValid: false,
                    message: 'El correo electrónico es obligatorio'
                };
            }
            
            return {
                isValid: emailRegex.test(sanitizedEmail),
                message: 'Por favor, ingresa un correo electrónico válido'
            };
        },

        telefono: function(value) {
            const trimmedValue = value.trim();
            if (!trimmedValue) {
                return {
                    isValid: false,
                    message: 'El teléfono es obligatorio'
                };
            }
            
            return {
                isValid: CONFIG.PHONE.PATTERN.test(trimmedValue),
                message: 'Ingresa un número válido en formato +56 9 XXXX XXXX'
            };
        },

        password: function(value) {
            if (!value) {
                return {
                    isValid: false,
                    message: 'La contraseña es obligatoria'
                };
            }

            let failedChecks = [];
            
            const checkPassword = (type) => {
                switch(type) {
                    case 'length':
                        if (value.length < CONFIG.PASSWORD.MIN_LENGTH) {
                            failedChecks.push(`- Al menos ${CONFIG.PASSWORD.MIN_LENGTH} caracteres`);
                        }
                        break;
                    case 'uppercase':
                        if (!/[A-Z]/.test(value)) {
                            failedChecks.push('- Al menos una mayúscula');
                        }
                        break;
                    case 'lowercase':
                        if (!/[a-z]/.test(value)) {
                            failedChecks.push('- Al menos una minúscula');
                        }
                        break;
                    case 'number':
                        if (!/\d/.test(value)) {
                            failedChecks.push('- Al menos un número');
                        }
                        break;
                    case 'special':
                        if (!new RegExp(`[${CONFIG.PASSWORD.SPECIAL_CHARS}]`).test(value)) {
                            failedChecks.push(`- Al menos un símbolo (${CONFIG.PASSWORD.SPECIAL_CHARS})`);
                        }
                        break;
                }
            };
        
            ['length', 'uppercase', 'lowercase', 'number', 'special']
                .forEach(checkPassword);
        
            return {
                isValid: failedChecks.length === 0,
                message: failedChecks.length > 0 ? 'La contraseña debe tener:\n' + failedChecks.join('\n') : ''
            };
        },

        confirm_password: function(value, form) {
            if (!value) {
                return {
                    isValid: false,
                    message: 'Debes confirmar la contraseña'
                };
            }

            const password = form.querySelector('input[name="password"]').value;
            return {
                isValid: value === password,
                message: 'Las contraseñas no coinciden'
            };
        },

        nombre_mascota: function(value) {
            const sanitizedName = value.trim();
            if (!sanitizedName) {
                return {
                    isValid: false,
                    message: 'El nombre de la mascota es obligatorio'
                };
            }
            if(sanitizedName.length < CONFIG.NAME.MIN_LENGTH) {
                return {
                    isValid: false,
                    message: `El nombre de la mascota debe tener al menos ${CONFIG.NAME.MIN_LENGTH} caracteres`
                };
            }
            return {
                isValid: true,
                message: ''
            };
        },

        edad_mascota: function(value) {
            if(!value) {
                return {
                    isValid: false,
                    message: 'Selecciona la edad de tu mascota'
                };
            }
            return {
                isValid: true,
                message: ''
            };
        },

        foto_mascota: function(input) {
            if(input.files && input.files[0]) {
                const file = input.files[0];
                
                // Validar caracteres no permitidos en el nombre
                if(CONFIG.FILE.INVALID_CHARS.test(file.name)) {
                    return {
                        isValid: false,
                        message: 'El nombre del archivo contiene caracteres no permitidos'
                    };
                }

                // Validar extensión del archivo
                if (!CONFIG.FILE.VALID_TYPES.includes(file.type)) {
                    return {
                        isValid: false,
                        message: 'Solo se permiten archivos JPG y PNG'
                    };
                }

                // Validar tamaño
                if (file.size > CONFIG.FILE.MAX_SIZE) {
                    const maxSizeMB = CONFIG.FILE.MAX_SIZE / (1024 * 1024);
                    return {
                        isValid: false,
                        message: `La imagen no debe superar los ${maxSizeMB}MB`
                    };
                }

                // Validar que sea una imagen real
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        resolve({
                            isValid: true,
                            message: ''
                        });
                    };
                    img.onerror = () => {
                        resolve({
                            isValid: false,
                            message: 'El archivo no es una imagen válida'
                        });
                    };
                    img.src = URL.createObjectURL(file);
                });
            }
            return {
                isValid: true,
                message: ''
            };
        },

        terms: function(value) {
            return {
                isValid: value === true,
                message: 'Debes aceptar los términos y condiciones'
            };
        }
    };

    // Inicialización del formulario
    function initializeUserForm() {
        const form = document.getElementById('user-form');
        if (!form) return;

        // Validación en tiempo real
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', async function() {
                if (validations[this.name]) {
                    const result = await validateField(this, form);
                    if (result.isValid) {
                        auxui.showSuccess(this);
                    } else {
                        auxui.showError(this, result.message);
                    }
                }
            });
        });

        // Validación al enviar
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validar todos los campos
            const fields = form.querySelectorAll('input, select, textarea');
            for (const field of fields) {
                if (validations[field.name]) {
                    const result = await validateField(field, form);
                    if (!result.isValid) {
                        auxui.showError(field, result.message);
                        isValid = false;
                    } else {
                        auxui.showSuccess(field);
                    }
                }
            }

            if (isValid) {
                console.log('Formulario válido, enviando datos...');
                // Aquí iría la lógica para enviar el formulario
            }
        });
    }

    // Función auxiliar para validar un campo
    async function validateField(field, form) {
        const validation = validations[field.name];
        if (!validation) return { isValid: true, message: '' };

        let value = field.type === 'checkbox' ? field.checked : field.value;
        if (field.type === 'file') {
            return await validation(field);
        }
        return validation(value, form);
    }

    // Exportar función de inicialización
    window.initializeUserForm = initializeUserForm;
});