document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Limpa mensagens de erro anteriores
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.textContent = '');

    let valid = true;

    // Verifica email
    if (!email) {
        showError(emailInput, "O email é obrigatório.");
        valid = false;
    } else if (!validateEmail(email)) {
        showError(emailInput, "Email inválido.");
        valid = false;
    }

    // Verifica senha
    if (!password) {
        showError(passwordInput, "A senha é obrigatória.");
        valid = false;
    } else if (password.length < 6) {
        showError(passwordInput, "A senha deve ter pelo menos 6 caracteres.");
        valid = false;
    }

    // Se tudo estiver correto, redireciona
    if (valid) {
        // Aqui você pode fazer a verificação real com backend ou localStorage
        // Exemplo fictício de login correto:
        if (email === "teste@exemplo.com" && password === "123456") {
            window.location.href = "home.html";
        } else {
            alert("Email ou senha incorretos.");
        }
    }
});

// Função para mostrar erro
function showError(input, message) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
}

// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}
