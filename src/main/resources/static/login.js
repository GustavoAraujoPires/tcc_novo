document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // limpa erros anteriores
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    if (!email || !password) {
        if (!email) showError(document.getElementById('email'), "O email é obrigatório.");
        if (!password) showError(document.getElementById('password'), "A senha é obrigatória.");
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            window.location.href = "home.html";
        } else {
            alert(result.message || "Email ou senha incorretos.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
});

function showError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.style.color = 'red';
    errorElement.textContent = message;
    input.parentNode.insertBefore(errorElement, input.nextSibling);
}
