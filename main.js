// Funcionalidad para el formulario de contacto con Bootstrap
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    const form = document.querySelector('.needs-validation');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Verificar validación de Bootstrap
            if (form.checkValidity()) {
                // Si el formulario es válido, mostrar mensaje de éxito
                showSuccessAlert();
                
                // Resetear el formulario después del envío con un pequeño delay
                setTimeout(() => {
                    form.reset();
                    form.classList.remove('was-validated');
                }, 500);
            } else {
                // Si hay errores, enfocar el primer campo con error
                const firstInvalidField = form.querySelector(':invalid');
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
            }
            
            // Agregar clase de validación visual
            form.classList.add('was-validated');
        });
        
        // Validación en tiempo real mientras el usuario escribe
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (form.classList.contains('was-validated')) {
                    // Solo validar si ya se intentó enviar el formulario
                    if (this.checkValidity()) {
                        this.classList.remove('is-invalid');
                        this.classList.add('is-valid');
                    } else {
                        this.classList.remove('is-valid');
                        this.classList.add('is-invalid');
                    }
                }
            });
        });
    }
});

// Función para mostrar alert de éxito con Bootstrap
function showSuccessAlert() {
    // Remover alertas anteriores si existen
    const existingAlerts = document.querySelectorAll('.custom-success-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Crear el alert de Bootstrap mejorado
    const alertHTML = `
        <div class="alert alert-success alert-dismissible fade show position-fixed custom-success-alert" 
             style="top: 20px; right: 20px; z-index: 1050; min-width: 350px; max-width: 400px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);" 
             role="alert">
            <div class="d-flex align-items-center">
                <i class="bi bi-check-circle-fill text-success fs-4 me-3"></i>
                <div>
                    <strong>¡Mensaje enviado!</strong>
                    <div class="mt-1 text-muted small">Tu mensaje ha sido enviado correctamente. Te contactaremos pronto.</div>
                </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
    `;
    
    // Agregar el alert al body
    document.body.insertAdjacentHTML('beforeend', alertHTML);
    
    // Auto-remover el alert después de 6 segundos
    setTimeout(() => {
        const alert = document.querySelector('.custom-success-alert');
        if (alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 6000);
}