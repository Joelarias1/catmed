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
        LICENSE: {
            MIN_LENGTH: 6,
            MAX_LENGTH: 15
        },
        EXPERIENCE: {
            MIN_YEARS: 0,
            MAX_YEARS: 50
        },
        PHONE: {
            PATTERN: /^\+?56\s?9\s?\d{4}\s?\d{4}$/
        },
        SPECIALTIES: {
            MIN_SELECTED: 1,
            MAX_SELECTED: 5
        }
    };

    // Validaciones específicas para veterinarios
    const validations = {
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

        licencia: function(value) {
            const sanitizedLicense = value.trim().toUpperCase();
            
            if (!sanitizedLicense) {
                return {
                    isValid: false,
                    message: 'El número de licencia es obligatorio'
                };
            }

            const licenseRegex = new RegExp(`^[A-Z0-9]{${CONFIG.LICENSE.MIN_LENGTH},${CONFIG.LICENSE.MAX_LENGTH}}$`);
            
            if (!licenseRegex.test(sanitizedLicense)) {
                return {
                    isValid: false,
                    message: `El número de licencia debe tener entre ${CONFIG.LICENSE.MIN_LENGTH} y ${CONFIG.LICENSE.MAX_LENGTH} caracteres alfanuméricos`
                };
            }

            return {
                isValid: true,
                message: ''
            };
        },

        experiencia: function(value) {
            if (!value) {
                return {
                    isValid: false,
                    message: 'Los años de experiencia son obligatorios'
                };
            }

            const years = parseInt(value);
            if (isNaN(years)) {
                return {
                    isValid: false,
                    message: 'Ingresa un número válido de años'
                };
            }

            if (years < CONFIG.EXPERIENCE.MIN_YEARS || years > CONFIG.EXPERIENCE.MAX_YEARS) {
                return {
                    isValid: false,
                    message: `Los años de experiencia deben estar entre ${CONFIG.EXPERIENCE.MIN_YEARS} y ${CONFIG.EXPERIENCE.MAX_YEARS}`
                };
            }

            return {
                isValid: true,
                message: ''
            };
        },

        especialidades: function(select) {
            const selectedOptions = Array.from(select.selectedOptions).length;
            
            if (selectedOptions < CONFIG.SPECIALTIES.MIN_SELECTED) {
                return {
                    isValid: false,
                    message: 'Selecciona al menos una especialidad'
                };
            }

            if (selectedOptions > CONFIG.SPECIALTIES.MAX_SELECTED) {
                return {
                    isValid: false,
                    message: `No puedes seleccionar más de ${CONFIG.SPECIALTIES.MAX_SELECTED} especialidades`
                };
            }

            return {
                isValid: true,
                message: ''
            };
        },

        descripcion: function(value) {
            const trimmedValue = value.trim();
            if (!trimmedValue) {
                return {
                    isValid: false,
                    message: 'La descripción es obligatoria'
                };
            }
            if (trimmedValue.length < 50) {
                return {
                    isValid: false,
                    message: 'La descripción debe tener al menos 50 caracteres'
                };
            }
            if (trimmedValue.length > 500) {
                return {
                    isValid: false,
                    message: 'La descripción no puede superar los 500 caracteres'
                };
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
    function initializeVetForm() {
        const form = document.getElementById('vet-form');
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

            // Validación especial para select múltiple de especialidades
            if (field.name === 'especialidades') {
                field.addEventListener('change', function() {
                    const result = validations.especialidades(this);
                    if (result.isValid) {
                        auxui.showSuccess(this);
                    } else {
                        auxui.showError(this, result.message);
                    }
                });
            }
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
                console.log('Formulario de veterinario válido, enviando datos...');
                // Aquí iría la lógica para enviar el formulario
            }
        });
    }

    // Función auxiliar para validar un campo
    async function validateField(field, form) {
        const validation = validations[field.name];
        if (!validation) return { isValid: true, message: '' };

        let value = field.type === 'checkbox' ? field.checked : field.value;
        
        if (field.name === 'especialidades') {
            return validation(field);
        }
        
        return validation(value, form);
    }

    // Exportar función de inicialización
    window.initializeVetForm = initializeVetForm;
});