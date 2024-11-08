// Usuario de prueba
const TEST_USER = {
    email: "test@catmed.com",
    password: "password123"
};

function showToast(message, type = 'danger') {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '11';
    
    const toastHTML = `
        <div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    toastContainer.innerHTML = toastHTML;
    document.body.appendChild(toastContainer);
    
    const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'));
    toast.show();
    
    // Remover el contenedor después de que se oculte el toast
    toastContainer.addEventListener('hidden.bs.toast', function () {
        document.body.removeChild(toastContainer);
    });
}

function initializeLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Validación básica
        if (!email || !password) {
            showToast('Por favor, complete todos los campos');
            return;
        }
        
        // Comprobar credenciales de prueba
        if (email === TEST_USER.email) {
            if (password === TEST_USER.password) {
                // Simular un pequeño retraso para dar feedback visual
                const submitButton = loginForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Iniciando sesión...';
                
                // Mostrar toast de éxito
                showToast('¡Inicio de sesión exitoso!', 'success');
                
                setTimeout(() => {
                    // Guardar estado de login en sessionStorage
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('userEmail', email);
                    
                    // Redireccionar a la página de búsqueda de veterinarios
                    window.location.href = 'buscarveterinarios.html';
                }, 1500);
            } else {
                showToast('Contraseña incorrecta');
            }
        } else {
            showToast('Usuario no encontrado. Para pruebas use: test@catmed.com');
        }
    });
}