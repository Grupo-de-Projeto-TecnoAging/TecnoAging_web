const token = localStorage.getItem('token'); // Recupera o token do localStorage

if (token) {
    fetch('http://localhost:3000/home', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Envia o token como Bearer token
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Não autorizado');
        }
    })
    .then(data => {
        console.log(data); // Exibe a resposta do servidor
    })
    .catch(error => {
        console.error('Erro:', error); // Exibe o erro se ocorrer
        window.Location.href = './autenticacao/autenticacao.html'; // Redireciona para a página de login caso nao tenha token
    });
} else {
    console.log('Token não encontrado. Redirecionando para login...');
    window.location.href = './autenticacao/autenticacao.html'; // Redireciona para a página de login caso não tenha token
}

function logout() {
    localStorage.removeItem('token'); // Remove o token do localStorage
    window.location.href = './autenticacao/autenticacao.html'; // Redireciona para a página de login
}