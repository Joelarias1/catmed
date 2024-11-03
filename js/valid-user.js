// valid-user.js
document.addEventListener('DOMContentLoaded', function() {
    // Validaciones específicas para usuarios
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
 
        nombre_mascota: function(value) {
            if(value.length < 2) {
                return {
                    isValid: false,
                    message: 'El nombre de la mascota debe tener al menos 2 caracteres'
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
                const validTypes = ['image/jpeg', 'image/png'];
                const maxSize = 3 * 1024 * 1024; // 3MB
 
                if (!validTypes.includes(file.type)) {
                    return {
                        isValid: false,
                        message: 'Solo se permiten archivos JPG y PNG'
                    };
                }
 
                if (file.size > maxSize) {
                    return {
                        isValid: false,
                        message: 'La imagen no debe superar los 3MB'
                    };
                }
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
 
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
 
            // Validar campos requeridos
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
 
            // Validar foto si se ha subido
            const fotoInput = form.querySelector('input[name="foto_mascota"]');
            if (fotoInput && fotoInput.files.length > 0) {
                const result = validations.foto_mascota(fotoInput);
                if (!result.isValid) {
                    auxui.showError(fotoInput, result.message);
                    isValid = false;
                } else {
                    auxui.showSuccess(fotoInput);
                }
            }
 
            if (isValid) {
                console.log('Formulario de usuario válido, enviando datos...');
                // Aquí puedes agregar el código para enviar el formulario
            }
        });
    }
 
    // Exportar función de inicialización
    window.initializeUserForm = initializeUserForm;
 });