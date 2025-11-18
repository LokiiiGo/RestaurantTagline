
        // Progress bar functionality
        function updateProgressBar() {
            const form = document.getElementById('surveyForm');
            const requiredFields = form.querySelectorAll('input[required], textarea[required]');
            const filledFields = Array.from(requiredFields).filter(field => {
                if (field.type === 'radio') {
                    return form.querySelector(`input[name="${field.name}"]:checked`);
                }
                return field.value.trim() !== '';
            });
            
            const progress = (filledFields.length / requiredFields.length) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
        }

        // Form validation
        function validateForm() {
            const form = document.getElementById('surveyForm');
            const requiredRadioGroups = ['qualidade_comida', 'cardapio', 'atendimento', 'tempo_espera', 'prestativos', 'ambiente', 'recomendacao'];
            const requiredTextFields = ['prato_favorito'];
            let isValid = true;

            // Hide all error messages first
            document.querySelectorAll('.error-message').forEach(error => {
                error.style.display = 'none';
            });

            // Validate radio groups
            requiredRadioGroups.forEach(groupName => {
                const checkedRadio = form.querySelector(`input[name="${groupName}"]:checked`);
                if (!checkedRadio) {
                    document.getElementById(`error-${groupName}`).style.display = 'block';
                    isValid = false;
                }
            });

            // Validate text fields
            requiredTextFields.forEach(fieldName => {
                const field = form.querySelector(`input[name="${fieldName}"]`);
                if (!field.value.trim()) {
                    document.getElementById(`error-${fieldName}`).style.display = 'block';
                    isValid = false;
                }
            });

            return isValid;
        }

        // Form submission
        document.getElementById('surveyForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simulate form submission
                const submitBtn = document.querySelector('.submit-btn');
                
                submitBtn.innerHTML = '⏳ Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    document.getElementById('successMessage').style.display = 'block';
                    document.getElementById('surveyForm').style.display = 'none';
                    
                    // Scroll to success message
                    document.getElementById('successMessage').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }, 2000);
            } else {
                // Scroll to first error
                const firstError = document.querySelector('.error-message[style*="block"]');
                if (firstError) {
                    firstError.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });

        // Add event listeners for progress tracking
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('surveyForm');
            
            // Update progress on radio button changes
            form.addEventListener('change', updateProgressBar);
            
            // Update progress on text input changes
            form.addEventListener('input', updateProgressBar);
            
            // Initial progress calculation
            updateProgressBar();
        });

        // Add smooth animations for radio options
        document.querySelectorAll('.radio-option').forEach(option => {
            option.addEventListener('click', function() {
                const radio = this.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    updateProgressBar();
                    
                    // Add visual feedback
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                }
            });
        });
