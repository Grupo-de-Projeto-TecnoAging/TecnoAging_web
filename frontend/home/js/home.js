const token = localStorage.getItem('token'); 

if (token) {
    fetch('http://localhost:3000/home', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Envia o token no cabeçalho
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
        console.log('Dados do usuário:', data); // Exibe a resposta do servidor
    })
    .catch(error => {
        console.error('Erro:', error); // Exibe o erro se ocorrer
        window.location.href = './autenticacao/autenticacao.html'; // Redireciona para login
    });
} else {
    console.log('Token não encontrado. Redirecionando para login...');
    window.location.href = './autenticacao/autenticacao.html'; 
}

const testList = document.getElementById('testList');

async function carregarTestes() {
    try {
        const token = localStorage.getItem('token'); // Recupera o token do localStorage

        if (!token) {
            console.error('Token não encontrado. Redirecionando para login...');
            window.location.href = './autenticacao/autenticacao.html';
            return;
        }

        const response = await fetch('http://localhost:3000/testes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Envia o token na requisição
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar testes: ${response.status}`);
        }

        const testes = await response.json();

        testList.innerHTML = '';

        testes.forEach(teste => {
            const li = document.createElement('li');
            li.classList.add("test-item");
            li.innerHTML = `
                <h3>${teste.cpfPessoa}  |  ${teste.tipo}</h3>
                <button onclick="mostrarDetalhes('${teste.id}')">Detalhes</button>
            `;
            testList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao carregar testes:', error);
        testList.innerHTML = '<li>Erro ao carregar testes</li>';
    }
}

async function mostrarDetalhes(id) {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token não encontrado. Redirecionando para login...');
            window.location.href = './autenticacao/autenticacao.html';
            return;
        }

        const response = await fetch(`http://localhost:3000/testes/details/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar detalhes do teste');
        }

        const detalhes = await response.json();
        alert(`Detalhes do teste: ${JSON.stringify(detalhes, null, 2)}`);
    } catch (error) {
        console.error('Erro ao carregar detalhes do teste:', error);
    }
}


carregarTestes();
