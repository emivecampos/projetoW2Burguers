// Dados dos hambúrgueres
const burgers = [
    {
        id: 1,
        name: "CHAVES",
        description: "Simples, humilde, mas inesquecível.",
        ingredients: "Pão + Hambúrguer + Alface, Tomate, Picles, Cebola + Queijo + Maionese",
        quote: "Foi sem querer querendo!",
        price: 18.00
    },
    {
        id: 2,
        name: "WILL",
        description: "Atitude, sabor e estilo no mesmo pão!",
        ingredients: "Pão + Hambúrguer + Alface, Tomate, Picles, Cebola + Queijo + Bacon + Molho W2",
        quote: "Direto da Filadélfia pro seu apetite!",
        price: 22.00
    },
    {
        id: 3,
        name: "TIO PHIL",
        description: "O mais completo da casa, digno de respeito.",
        ingredients: "Pão + Hambúrguer + Alface, Tomate, Picles, Cebola + Queijo + Presunto + Calabresa + Bacon + Salsicha + Ovo + Milho + Maionese + Catchup + Molho W2",
        quote: "Esse aqui vale cada mordida!",
        price: 28.00
    },
    {
        id: 4,
        name: "JULIUS",
        description: "Custo benefício aprovado pelo pai mais econômico da TV.",
        ingredients: "Pão + Hambúrguer + Alface, Tomate, Picles, Cebola + Presunto + Queijo + Calabresa + Bacon + Milho + Maionese",
        quote: "Esse lanche custa metade do que você está pensando!",
        price: 24.00
    },
    {
        id: 5,
        name: "SR. KYLE",
        description: "Excêntrico, divertido e cheio de surpresas",
        ingredients: "Pão + Hambúrguer + Alface, Tomate, Picles, Cebola + Queijo + Presunto + Salsicha + Milho + Molho W2 + Catchup",
        quote: "Você morde e começa a rir sem saber por quê!",
        price: 21.00
    },
    {
        id: 6,
        name: "SEU MADRUGA",
        description: "Simples, sofrido, mas sempre presente",
        ingredients: "Pão + Hambúrguer + Alface, Tomate, Picles, Cebola + Ovo + Presunto + Queijo + Bacon + Maionese + Catchup",
        quote: "Não existe lanche ruim... só lanche mal montado!",
        price: 20.00
    },
    {
        id: 7,
        name: "SEU BARRIGA",
        description: "Recheado, suculento e cheio de presença",
        ingredients: "Pão + Hambúrguer + Alface, Tomate, Picles, Cebola + Presunto + Queijo + Calabresa + Molho W2 + Maionese",
        quote: "Pague o aluguel ou pelo menos esse lanche!",
        price: 23.00
    }
];

// Dados dos combos
const combos = [
    {
        id: 101,
        name: "Scooby & Salsicha",
        description: "Um mistério de sabor resolvido no primeiro gole!",
        items: "Tio Phil + Seu Barriga + 1L de refrigerante",
        quote: "Um mistério de sabor resolvido no primeiro gole!",
        price: 45.00
    },
    {
        id: 102,
        name: "Will & Carlton",
        description: "É um lanche de comida de respeito!",
        items: "2 Will's + 1L de refrigerante",
        quote: "É um lanche de comida de respeito!",
        price: 38.00
    },
    {
        id: 103,
        name: "Chris & Greg",
        description: "Diretamente do Brooklyn!",
        items: "2 Julius + 1L de refrigerante",
        quote: "É coisa de gente!",
        price: 42.00
    }
];

// Carrinho de compras
let cart = [];

// Função para renderizar hambúrgueres
function renderBurgers() {
    const burgersGrid = document.querySelector('.burgers-grid');
    burgersGrid.innerHTML = '';
    
    burgers.forEach(burger => {
        const burgerCard = document.createElement('div');
        burgerCard.className = 'burger-card';
        burgerCard.innerHTML = `
            <h3>${burger.name}</h3>
            <p class="description">${burger.description}</p>
            <p class="ingredients">${burger.ingredients}</p>
            <div class="speech-bubble">${burger.quote}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                <strong style="color: #00ff00; font-size: 1.2rem;">R$ ${burger.price.toFixed(2)}</strong>
                <button class="add-to-cart" onclick="addToCart(${burger.id}, 'burger')">
                    Adicionar ao Pedido
                </button>
            </div>
        `;
        burgersGrid.appendChild(burgerCard);
    });
}

// Função para renderizar combos
function renderCombos() {
    const combosGrid = document.querySelector('.combos-grid');
    combosGrid.innerHTML = '';
    
    combos.forEach(combo => {
        const comboCard = document.createElement('div');
        comboCard.className = 'combo-card';
        comboCard.innerHTML = `
            <h3>${combo.name}</h3>
            <p class="combo-items">${combo.items}</p>
            <div class="speech-bubble">${combo.quote}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                <strong style="color: #00ffff; font-size: 1.3rem;">R$ ${combo.price.toFixed(2)}</strong>
                <button class="add-to-cart" onclick="addToCart(${combo.id}, 'combo')">
                    Adicionar ao Pedido
                </button>
            </div>
        `;
        combosGrid.appendChild(comboCard);
    });
}

// Função para adicionar item ao carrinho
function addToCart(itemId, type) {
    let item;
    if (type === 'burger') {
        item = burgers.find(b => b.id === itemId);
    } else {
        item = combos.find(c => c.id === itemId);
    }
    
    if (!item) return;
    
    // Verificar se o item já existe no carrinho
    const existingItem = cart.find(cartItem => cartItem.id === itemId && cartItem.type === type);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: itemId,
            type: type,
            name: item.name,
            price: item.price,
            quantity: 1,
            observations: ''
        });
    }
    
    updateCartDisplay();
    updateCartCount();
}

// Função para remover item do carrinho
function removeFromCart(itemId, type) {
    cart = cart.filter(item => !(item.id === itemId && item.type === type));
    updateCartDisplay();
    updateCartCount();
}

// Função para atualizar quantidade
function updateQuantity(itemId, type, change) {
    const item = cart.find(cartItem => cartItem.id === itemId && cartItem.type === type);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId, type);
        } else {
            updateCartDisplay();
            updateCartCount();
        }
    }
}

// Função para atualizar observações
function updateObservations(itemId, type, observations) {
    const item = cart.find(cartItem => cartItem.id === itemId && cartItem.type === type);
    if (item) {
        item.observations = observations;
    }
}

// Função para atualizar exibição do carrinho
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #ccc;">Seu carrinho está vazio</p>';
        updateCartTotal();
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>R$ ${item.price.toFixed(2)} cada</p>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.type}', -1)">-</button>
                <span>Qtd: ${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.type}', 1)">+</button>
                <button class="quantity-btn" onclick="removeFromCart(${item.id}, '${item.type}')" style="background: #ff0000; margin-left: 10px;">×</button>
            </div>
            <div class="observations">
                <label>Observações:</label>
                <textarea placeholder="Ex: sem cebola, molho extra..." 
                         onchange="updateObservations(${item.id}, '${item.type}', this.value)">${item.observations}</textarea>
            </div>
            <p><strong>Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}</strong></p>
        `;
        cartItems.appendChild(cartItem);
    });
    
    updateCartTotal();
}

// Função para atualizar total do carrinho
function updateCartTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingInfo = getShippingInfo();
    const total = subtotal + shippingInfo.price;
    
    document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('shipping-price').textContent = shippingInfo.price.toFixed(2);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Função para atualizar contador do carrinho
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Função para alternar carrinho
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
}

// Função para alternar opções de frete
function toggleShipping() {
    const addShipping = document.getElementById('add-shipping');
    const shippingOptions = document.getElementById('shipping-options');
    const shippingLine = document.getElementById('shipping-line');
    
    if (addShipping.checked) {
        shippingOptions.style.display = 'block';
        shippingLine.style.display = 'flex';
    } else {
        shippingOptions.style.display = 'none';
        shippingLine.style.display = 'none';
        document.getElementById('shipping-location').value = '';
        updateCartTotal();
    }
}

// Função para atualizar preço do frete
function updateShippingPrice() {
    updateCartTotal();
}

// Função para obter forma de pagamento selecionada
function getSelectedPayment() {
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    for (const radio of paymentRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return 'credito'; // padrão
}

// Função para obter informações de frete
function getShippingInfo() {
    const addShipping = document.getElementById('add-shipping');
    const shippingLocation = document.getElementById('shipping-location');
    
    if (!addShipping.checked) {
        return { hasShipping: false, price: 0, location: '' };
    }
    
    const price = parseFloat(shippingLocation.value) || 0;
    const locationText = shippingLocation.options[shippingLocation.selectedIndex].text;
    
    return {
        hasShipping: true,
        price: price,
        location: locationText.split(' - ')[0] // Pega apenas o nome do bairro
    };
}

// Função para finalizar pedido
function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingInfo = getShippingInfo();
    const total = subtotal + shippingInfo.price;
    const paymentMethod = getSelectedPayment();
    
    // Mapear formas de pagamento para texto
    const paymentText = {
        'credito': 'Cartão de Crédito',
        'debito': 'Cartão de Débito',
        'pix': 'PIX',
        'dinheiro': 'Dinheiro'
    };
    
    // Montar mensagem para WhatsApp
    let message = '🍔 *PEDIDO W2 BURGERS* 🍔\n\n';
    
    cart.forEach(item => {
        message += `*${item.name}*\n`;
        message += `Quantidade: ${item.quantity}\n`;
        message += `Preço unitário: R$ ${item.price.toFixed(2)}\n`;
        if (item.observations) {
            message += `Observações: ${item.observations}\n`;
        }
        message += `Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += `💰 *RESUMO DO PEDIDO*\n`;
    message += `Subtotal: R$ ${subtotal.toFixed(2)}\n`;
    
    if (shippingInfo.hasShipping) {
        message += `Frete (${shippingInfo.location}): R$ ${shippingInfo.price.toFixed(2)}\n`;
    } else {
        message += `Frete: Retirada no local\n`;
    }
    
    message += `*TOTAL: R$ ${total.toFixed(2)}*\n\n`;
    message += `💳 *Forma de Pagamento:* ${paymentText[paymentMethod]}\n\n`;
    message += `Obrigado por escolher a W2 BURGERS! 🎉`;
    
    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5571920391933?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    renderBurgers();
    renderCombos();
    updateCartCount();
    
    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
