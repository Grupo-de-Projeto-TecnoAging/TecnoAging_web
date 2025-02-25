const token = localStorage.getItem('token'); 

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
    window.location.href = './autenticacao/autenticacao.html'; 
}

const testList = document.getElementById('testList');

async function carregarTestes() {
    try {
        const response = await fetch('http://localhost:3000/testes');

        if(!response.ok) {
            throw new Error('Erro ao buscar testes');
        }

        const testes = await response.json();

        testList.innerHTML = '';

        testes.forEach(teste => {
            const li = document.createElement('li');
            li.classList.add("test-item");
            li.innerHTML = `
                <h3>${teste.tipo}</h3>
                <button onclick="mostrarDetalhes('${teste.id}')">Detalhes</button>
            `;
            testList.appendChild(li);
        });
} catch (error) {
    console.error('Erro ao carregar testes:', error);
    testList.innerHTML = '<li>Erro ao carregar testes</li>';e
    }
}

