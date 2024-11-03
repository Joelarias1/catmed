// valid-user.js
document.addEventListener('DOMContentLoaded', function() {
    // Constantes de configuración
    const CONFIG = {
        PASSWORD: {
            MIN_LENGTH: 8,
            SPECIAL_CHARS: '@$!%*?&'
        },
        NAME: {
            MIN_LENGTH: 2
        },
        FILE: {
            MAX_SIZE: 3 * 1024 * 1024, // 3MB
            VALID_TYPES: ['image/jpeg', 'image/png'],
            INVALID_CHARS: /[<>:"/\\|?*]/
        }
    };

    // Validaciones específicas para usuarios
    const validations = {
        email: function(value) {
            const emailRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9._-]*[a-zA-Z0-9]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
            const sanitizedEmail = value.trim().toLowerCase();
            
            return {
                isValid: emailRegex.test(sanitizedEmail),
                message: 'Por favor, ingresa un correo electrónico válido'
            };
        },
 
        password: function(value) {
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
        
            if (failedChecks.length > 0) {
                return {
                    isValid: false,
                    message: 'La contraseña debe tener:\n' + failedChecks.join('\n')
                };
            }
        
            return {
                isValid: true,
                message: ''
            };
        },
 
        confirm_password: function(value, form) {
            const password = form.querySelector('input[name="password"]').value;
            return {
                isValid: value === password,
                message: 'Las contraseñas no coinciden'
            };
        },
 
        nombre_mascota: function(value) {
            const sanitizedName = value.trim();
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
        }
    };
 
    // Campos a validar
    const fieldsToValidate = [
        'email', 
        'password', 
        'confirm_password', 
        'nombre_mascota',
        'edad_mascota'
    ];
 
    // Inicialización del formulario
    function initializeUserForm() {
        const form = document.getElementById('user-form');
        if (!form) return;
 
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            let isValid = true;
 
            // Validar campos requeridos
            for (const field of fieldsToValidate) {
                const input = form.querySelector(`[name="${field}"]`);
                if (input) {
                    const result = validations[field](input.value, form);
                    if (!result.isValid) {
                        auxui.showError(input, result.message);
                        isValid = false;
                    } else {
                        auxui.showSuccess(input);
                    }
                }
            }
 
            // Validar foto si se ha subido
            const fotoInput = form.querySelector('input[name="foto_mascota"]');
            if (fotoInput && fotoInput.files.length > 0) {
                try {
                    const result = await validations.foto_mascota(fotoInput);
                    if (!result.isValid) {
                        auxui.showError(fotoInput, result.message);
                        isValid = false;
                    } else {
                        auxui.showSuccess(fotoInput);
                    }
                } catch (error) {
                    auxui.showError(fotoInput, 'Error al validar la imagen');
                    isValid = false;
                }
            }
 
            if (isValid) {
                console.log('Formulario de usuario válido, enviando datos...');
                // TODO: creacion en un futuro en bd ? 
            }
        });

        // Validación en tiempo real de la foto
        const fotoInput = form.querySelector('input[name="foto_mascota"]');
        if (fotoInput) {
            fotoInput.addEventListener('change', async function() {
                if (this.files.length > 0) {
                    try {
                        const result = await validations.foto_mascota(this);
                        if (!result.isValid) {
                            auxui.showError(this, result.message);
                        } else {
                            auxui.showSuccess(this);
                        }
                    } catch (error) {
                        auxui.showError(this, 'Error al validar la imagen');
                    }
                }
            });
        }
    }
 
    // Exportar función de inicialización
    window.initializeUserForm = initializeUserForm;
});