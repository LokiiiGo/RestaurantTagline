        document.getElementById('cpf').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });

        // Format RG input
        document.getElementById('rg').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1})$/, '$1-$2');
            e.target.value = value;
        });

        function validarCampos() {
            const nomecompleto = document.getElementById('nomecompleto').value.trim();
            const email = document.getElementById('email').value.trim();
            const cpf = document.getElementById('cpf').value.trim();
            const rg = document.getElementById('rg').value.trim();
            const pais = document.getElementById('pais').value.trim();

            document.querySelectorAll('.error-message').forEach(msg => msg.style.display = 'none');

            let isValid = true;

            if (!nomecompleto) {
                document.getElementById('nomeError').style.display = 'block';
                isValid = false;
            }

            if (!email) {
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }

            if (!cpf) {
                document.getElementById('cpfError').style.display = 'block';
                isValid = false;
            }

            if (!rg) {
                document.getElementById('rgError').style.display = 'block';
                isValid = false;
            }

            if (!pais) {
                document.getElementById('paisError').style.display = 'block';
                isValid = false;
            }

            if (!isValid) {
                return false;
            }

            return { nomecompleto, email, cpf, rg, pais };
        }

        function logar(event) {
            event.preventDefault();
            
            const usuario = validarCampos();
            if (!usuario) return false;

            const dadosCorretos = {
                nomecompleto: "admin",
                email: "admin@email.com",
                cpf: "123.456.789-00",
                rg: "12.345.678-9",
                pais: "Brasil"
            };

            const autenticado = Object.keys(dadosCorretos).every(chave => 
                usuario[chave].toLowerCase() === dadosCorretos[chave].toLowerCase()
            );

            if (autenticado) {
                document.getElementById('successMessage').style.display = 'block';
                setTimeout(() => {
                    alert("Boas-Vindas ao Restaurant Tagline!");
                    window.location.href = "/pagina-principal.html";
                    console.log("Boas-Vindas ao RestaurantTagline!");
                }, 1000);
            } else {
                alert("Dados incorretos! Verifique suas informações.\n\nDica: Use 'admin' para todos os campos:\n\nemail: admin@email.com \npaís: Brasil \ncpf: 12345678900 \nrg: 123456789");
            }

            return false;
        }

        // Add form submit event listener
        document.getElementById('registrationForm').addEventListener('submit', logar);