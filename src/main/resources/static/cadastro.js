// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {

    // Seleciona o formulário de cadastro
    const form = document.getElementById("form-cadastro");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // --------------------------
        // Campos do formulário
        // --------------------------
        const nome = document.getElementById("nome");
        const email = document.getElementById("email");
        const senha = document.getElementById("senha");
        const confirmar = document.getElementById("confirmar");
        const termos = document.getElementById("termos");

        // --------------------------
        // Elementos para mostrar erros
        // --------------------------
        const erroNome = document.getElementById("erro-nome");
        const erroEmail = document.getElementById("erro-email");
        const erroSenha = document.getElementById("erro-senha");
        const erroConfirmar = document.getElementById("erro-confirmar");
        const erroTermos = document.getElementById("erro-termos");

        // --------------------------
        // Resetando mensagens de erro
        // --------------------------
        erroNome.textContent = "";
        erroEmail.textContent = "";
        erroSenha.textContent = "";
        erroConfirmar.textContent = "";
        erroTermos.textContent = "";

        let temErro = false;

        // --------------------------
        // Validações dos campos
        // --------------------------
        if (!nome.value.trim()) {
            erroNome.textContent = "Digite seu nome.";
            temErro = true;
        }

        if (!email.value.trim() || !email.value.includes("@")) {
            erroEmail.textContent = "Digite um e-mail válido.";
            temErro = true;
        }

        if (!senha.value || senha.value.length < 8) {
            erroSenha.textContent = "A senha deve ter pelo menos 8 caracteres.";
            temErro = true;
        }

        if (confirmar.value !== senha.value) {
            erroConfirmar.textContent = "As senhas não coincidem.";
            temErro = true;
        }

        if (!termos.checked) {
            erroTermos.textContent = "Você deve aceitar os termos.";
            temErro = true;
        }

        // Se houver erro, interrompe o envio
        if (temErro) return;

        // --------------------------
        // Prepara os dados para enviar
        // --------------------------
        const cadastroData = {
            username: nome.value.trim(),
            email: email.value.trim(),
            password: senha.value
        };

        // --------------------------
        // Envia os dados para o backend
        // --------------------------
        try {
            const response = await fetch("http://localhost:8080/auth/cadastros", { // Rota do seu controller
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cadastroData)
            });

            // --------------------------
            // Verifica se o cadastro deu certo
            // --------------------------
            if (response.ok) {
                const msg = await response.text(); // ⬅️ pega o retorno do controller como texto
                alert(msg);
                window.location.href = "./home.html"; // Redireciona para a página Home
            } else {
                const msg = await response.text();
                alert("Erro ao cadastrar: " + msg);
            }

        } catch (error) {
            console.error("Erro ao enviar cadastro:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });

    // Atualiza o ano no rodapé automaticamente
    document.getElementById("ano").textContent = new Date().getFullYear();
});
