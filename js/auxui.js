// auxui.js
const auxui = {
    showError: function(input, message) {
        const formGroup = input.closest('.col-md-6, .col-12');
        this.removeValidation(input);
        
        input.classList.add('is-invalid');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    },

    showSuccess: function(input) {
        this.removeValidation(input);
        input.classList.add('is-valid');
    },

    removeValidation: function(input) {
        const formGroup = input.closest('.col-md-6, .col-12');
        input.classList.remove('is-invalid', 'is-valid');
        
        const feedback = formGroup.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.remove();
        }
    }
};

// Exportar el objeto auxui 
window.auxui = auxui;