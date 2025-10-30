
// Dados iniciais dos Clientes
let clientData = [
    { id: 'pet1', petName: 'Max', serviceDate: '2025-11-05', tutorName: 'Ana Silva', phone: '11987654321', address: 'Rua das Flores, 100', petAge: '2 anos', petSize: 'Médio' },
    { id: 'pet2', petName: 'Miau', serviceDate: '2025-11-06', tutorName: 'Marcos Ferreira', phone: '21998876655', address: 'Av. Principal, 50', petAge: '5 anos', petSize: 'Pequeno' },
    { id: 'pet3', petName: 'Lulu', serviceDate: '2025-11-08', tutorName: 'Carla Dias', phone: '31912345678', address: 'Travessa do Sol, 20', petAge: '1 ano', petSize: 'Grande' }
];

// Dados dos Produtos 
const productsData = [
    { id: 1, name: 'Ração Premium para Cães', price: 129.90, image: 'assets/racao-premium.jpg' },
    { id: 2, name: 'Arranhador Luxo para Gatos', price: 85.00, image: 'assets/arranhador.jpg' },
    { id: 3, name: 'Bolinha Anti-stress (Kit c/ 3)', price: 19.99, image: 'assets/bolinhas.webp' },
    { id: 4, name: 'Shampoo Hipoalergênico', price: 45.50, image: 'assets/shampoo.webp' },
    { id: 5, name: 'Coleira de Couro Ajustável', price: 59.90, image: 'assets/coleira.jpg' },
    { id: 6, name: 'Caminha Ortopédica G', price: 199.90, image: 'assets/caminha.webp' }
];


function formatPhoneNumber(rawPhone) {
    const digits = rawPhone.replace(/\D/g, ''); 
    if (digits.length === 11) {
        return `(${digits.substring(0, 2)}) ${digits.substring(2, 7)}-${digits.substring(7)}`;
    } else if (digits.length === 10) {
        return `(${digits.substring(0, 2)}) ${digits.substring(2, 6)}-${digits.substring(6)}`;
    }
    return rawPhone; 
}

/**
 * Carrega a lista de clientes do LocalStorage. Se vazia, usa os dados iniciais.
 * @returns {Array} A lista de clientes.
 */
function loadClients() {
    const storedClients = localStorage.getItem('petshopClients');
    if (storedClients) {
        return JSON.parse(storedClients); 
    } else {
        localStorage.setItem('petshopClients', JSON.stringify(clientData));
        return clientData;
    }
}

/**
 * Salva a lista de clientes no LocalStorage.
 * @param {Array} clients
 */
function saveClients(clients) {
    localStorage.setItem('petshopClients', JSON.stringify(clients));
}

const form = document.querySelector('#client-form form');
if (form) {
    clientData = loadClients(); 
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newClient = {
            id: 'pet' + Date.now(), 
            petName: document.getElementById('pet-name').value,
            petAge: document.getElementById('pet-age').value + ' anos',
            petSize: document.getElementById('pet-size').value,
            tutorName: document.getElementById('tutor-name').value,
            phone: document.getElementById('phone').value, 
            address: document.getElementById('address').value, 
            serviceDate: document.getElementById('service-date').value
        };

        // Adiciona e salva a lista atualizada
        clientData.push(newClient);
        saveClients(clientData);
        
        console.log(`✅ Cliente ${newClient.petName} cadastrado com sucesso e salvo!`);
        form.reset();
        window.location.href = './clients.html';
    });
}


const modal = document.getElementById("clientModal");
const modalDetails = document.getElementById("modal-details");
const clientListSection = document.getElementById('client-list');

if (clientListSection) {
    clientData = loadClients(); 

    function renderClients() {
        const cardsGrid = document.querySelector('.cards-grid');
        if (!cardsGrid) return;
        
        cardsGrid.innerHTML = ''; 

        clientData.forEach(client => {
            const card = document.createElement('div');
            card.className = 'client-card';
            card.setAttribute('onclick', `openModal('${client.id}')`);
            
            const dateParts = client.serviceDate.split('-');
            const displayDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : client.serviceDate;

            card.innerHTML = `
                <span class="pet-name">${client.petName}</span>
                <span class="service-date">${displayDate}</span>
            `;
            cardsGrid.appendChild(card);
        });
    }
    
    window.openModal = function(clientId) {
        const data = clientData.find(c => c.id === clientId); 
        if (!data) return;

        const formattedPhone = formatPhoneNumber(data.phone);
        
        const dateParts = data.serviceDate.split('-');
        const displayDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : data.serviceDate;
        
        modalDetails.innerHTML = `
            <p><strong>Nome do Pet:</strong> ${data.petName}</p>
            <p><strong>Idade do Pet:</strong> ${data.petAge}</p>
            <p><strong>Porte do Pet:</strong> ${data.petSize}</p>
            <hr>
            <p><strong>Data de Atendimento:</strong> ${displayDate}</p>
            <p><strong>Nome do Tutor:</strong> ${data.tutorName}</p>
            <p><strong>Telefone:</strong> ${formattedPhone}</p>
            <p><strong>Endereço:</strong> ${data.address}</p>
        `;

        modal.style.display = "block";
    }

    window.closeModal = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            window.closeModal();
        }
    };
    
    document.addEventListener('DOMContentLoaded', renderClients);
}



const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');

function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartList) {
        cartList.innerHTML = '';
        let total = 0;

        if (cartItems.length === 0) {
            cartList.innerHTML = '<li class="empty-cart">Seu carrinho está vazio.</li>';
        } else {
            cartItems.forEach((item, index) => {
                const li = document.createElement('li');
                li.className = 'cart-item';
                total += item.price;
                
                // HTML do item no carrinho com botão de remover
                li.innerHTML = `
                    <span>${item.name}</span>
                    <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                    <!-- Botão de exclusão chamando removeFromCart com o índice -->
                    <button class="remove-item" onclick="removeFromCart(${index})">Remover</button>
                `;
                cartList.appendChild(li);
            });
        }

        if(cartTotal) {
            cartTotal.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
        }
    }
    
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartItems.length;
    }
}

window.addToCart = function(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    cart.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cart)); 

    console.log(`🎉 Produto "${product.name}" adicionado ao carrinho!`);
    
    renderCart();
}

function renderProducts() {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return; 

    productsData.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-id', product.id);
        
        const formattedPrice = product.price.toFixed(2).replace('.', ',');

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$ ${formattedPrice}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        `;
        productsContainer.appendChild(card);
    });
}

if (document.getElementById('e-commerce')) {
    document.addEventListener('DOMContentLoaded', () => {
        renderProducts();
        renderCart();
    });
}

if (clientListSection) {
    document.addEventListener('DOMContentLoaded', () => {
        clientData = loadClients(); 
        renderClients();
    });
}
