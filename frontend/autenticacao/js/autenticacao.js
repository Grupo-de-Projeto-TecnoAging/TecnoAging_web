document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const cpf = document.getElementById("cpf").value;
    const senha = document.getElementById("senha").value;

    try {
        const response = await fetch("http://localhost:3000/autenticacao/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cpf, senha })
        });

        if (!response.ok) {
            throw new Error("Login inválido");
        }

        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token); // Salva o token no localStorage
            window.location.href = "../home/home.html"; // Redireciona para a home
        } else {
            throw new Error("Token não encontrado na resposta");
        }

    } catch (error) {
        alert(error.message); 
    }
});
