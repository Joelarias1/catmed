// valid-vet.js
document.addEventListener('DOMContentLoaded', function() {
    // Constantes de configuración
    const CONFIG = {
        PASSWORD: {
            MIN_LENGTH: 8,
            SPECIAL_CHARS: '@$!%*?&'
        },
        LICENSE: {
            MIN_LENGTH: 6,
            MAX_LENGTH: 15
        },
        EXPERIENCE: {
            MIN_YEARS: 0,
            MAX_YEARS: 50
        }
    };

    // Validaciones específicas para veterinarios
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

        licencia: function(value) {
            const sanitizedLicense = value.trim().toUpperCase();
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
            const years = parseInt(value);
            const isValid = !isNaN(years) && 
                          years >= CONFIG.EXPERIENCE.MIN_YEARS && 
                          years <= CONFIG.EXPERIENCE.MAX_YEARS;

            if (!isValid) {
                return {
                    isValid: false,
                    message: `Ingresa un número válido de años de experiencia (${CONFIG.EXPERIENCE.MIN_YEARS}-${CONFIG.EXPERIENCE.MAX_YEARS})`
                };
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
        'licencia', 
        'experiencia'
    ];

    // Inicialización del formulario
    function initializeVetForm() {
        const form = document.getElementById('vet-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Validar campos requeridos
            fieldsToValidate.forEach(field => {
                const input = form.querySelector(`[name="${field}"]`);
                if (input) {
                    // Sanitizar valor antes de validar
                    const valueToValidate = input.type === 'password' ? 
                        input.value : input.value.trim();
                    
                    const result = validations[field](valueToValidate, form);
                    if (!result.isValid) {
                        auxui.showError(input, result.message);
                        isValid = false;
                    } else {
                        auxui.showSuccess(input);
                    }
                }
            });

            if (isValid) {
                console.log('Formulario de veterinario válido, enviando datos...');
                // Aquí puedes agregar el código para enviar el formulario
            }
        });
    }

    // Exportar función de inicialización
    window.initializeVetForm = initializeVetForm;
});