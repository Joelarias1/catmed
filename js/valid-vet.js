// valid-vet.js
document.addEventListener('DOMContentLoaded', function() {
    // Validaciones específicas para veterinarios
    const validations = {
        email: function(value) {
            const emailRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9._-]*[a-zA-Z0-9]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/
            return {
                isValid: emailRegex.test(value),
                message: 'Por favor, ingresa un correo electrónico válido'
            };
        },

        password: function(value) {
            let failedChecks = [];
            
            const checkPassword = (type) => {
                switch(type) {
                    case 'length':
                        if (value.length < 8) {
                            failedChecks.push('- Al menos 8 caracteres');
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
                        if (!/[@$!%*?&]/.test(value)) {
                            failedChecks.push('- Al menos un símbolo (@$!%*?&)');
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
            const licenseRegex = /^[A-Z0-9]{6,10}$/;
            return {
                isValid: licenseRegex.test(value),
                message: 'Número de licencia no válido'
            };
        },

        experiencia: function(value) {
            const years = parseInt(value);
            return {
                isValid: !isNaN(years) && years >= 0 && years <= 50,
                message: 'Ingresa un número válido de años de experiencia (0-50)'
            };
        }
    };

    // Campos a validar
    const fieldsToValidate = ['email', 'password', 'confirm_password', 'licencia', 'experiencia'];

    // Inicialización del formulario
    function initializeVetForm() {
        const form = document.getElementById('vet-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            fieldsToValidate.forEach(field => {
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