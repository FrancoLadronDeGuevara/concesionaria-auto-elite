// Car Data
const cars = [
    {
        id: 1,
        brand: 'Toyota',
        model: 'Corolla Cross 2025',
        year: 2025,
        price: 32000000,
        type: 'SUV',
        image: 'https://tse1.mm.bing.net/th?q=Toyota+Corolla+Cross+2025+exterior&pid=Api',
        featured: true
    },
    {
        id: 2,
        brand: 'Ford',
        model: 'Ranger Raptor',
        year: 2025,
        price: 65000000,
        type: 'Pickup',
        image: 'https://tse1.mm.bing.net/th?q=Ford+Ranger+Raptor+2025+exterior&pid=Api',
        featured: true
    },
    {
        id: 3,
        brand: 'Peugeot',
        model: '208 Style',
        year: 2025,
        price: 24500000,
        type: 'Sedan', // Actually hatchback but simplified for categories
        image: 'https://tse1.mm.bing.net/th?q=Peugeot+208+Style+2025+exterior&pid=Api',
        featured: true
    },
    {
        id: 4,
        brand: 'Volkswagen',
        model: 'Amarok V6',
        year: 2025,
        price: 58000000,
        type: 'Pickup',
        image: 'https://tse1.mm.bing.net/th?q=Volkswagen+Amarok+V6+2025+exterior&pid=Api',
        featured: false
    },
    {
        id: 5,
        brand: 'Chevrolet',
        model: 'Cruze Premier',
        year: 2024,
        price: 28000000,
        type: 'Sedan',
        image: 'https://tse1.mm.bing.net/th?q=Chevrolet+Cruze+Premier+2024+exterior&pid=Api',
        featured: false
    },
    {
        id: 6,
        brand: 'Jeep',
        model: 'Renegade',
        year: 2025,
        price: 35000000,
        type: 'SUV',
        image: 'https://tse1.mm.bing.net/th?q=Jeep+Renegade+2025+exterior&pid=Api',
        featured: false
    }
];

// DOM Elements
const featuredContainer = document.getElementById('featured-container');
const inventoryContainer = document.getElementById('inventory-container');
const filterBtns = document.querySelectorAll('.filter-btn');

// Format Price to ARS
const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price);
};

// Create Car Card HTML
const createCarCard = (car) => {
    return `
        <div class="car-card" onclick="window.location.href='product.html?id=${car.id}'" style="cursor: pointer;">
            <img src="${car.image}" alt="${car.brand} ${car.model}" class="car-image">
            <div class="car-details">
                <span class="car-brand">${car.brand}</span>
                <h3 class="car-model">${car.model}</h3>
                <p class="car-price">${formatPrice(car.price)}</p>
                <div class="car-features">
                    <span><i class="fas fa-calendar"></i> ${car.year}</span>
                    <span><i class="fas fa-car"></i> ${car.type}</span>
                    <span><i class="fas fa-gas-pump"></i> Nafta</span>
                </div>
            </div>
        </div>
    `;
};

// Product Details Logic
const productContainer = document.getElementById('product-container');

const renderProductDetails = () => {
    if (!productContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const carId = parseInt(urlParams.get('id'));
    const car = cars.find(c => c.id === carId);

    if (!car) {
        productContainer.innerHTML = '<div class="error-message" style="text-align: center; padding: 2rem;"><h2>Vehículo no encontrado</h2><a href="index.html" class="btn btn-primary" style="margin-top: 1rem;">Volver al inicio</a></div>';
        return;
    }

    // WhatsApp Message
    const message = `Hola, estoy interesado en el ${car.brand} ${car.model} (${car.year}) que vi en AutoElite.`;
    const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(message)}`;

    productContainer.innerHTML = `
        <div class="product-grid">
            <div class="product-image-container">
                <img src="${car.image}" alt="${car.brand} ${car.model}">
            </div>
            <div class="product-info">
                <span class="product-brand">${car.brand}</span>
                <h1>${car.model}</h1>
                <p class="product-price">${formatPrice(car.price)}</p>
                
                <div class="product-specs">
                    <h3>Especificaciones</h3>
                    <div class="specs-list">
                        <div class="spec-item"><i class="fas fa-calendar"></i> Año: ${car.year}</div>
                        <div class="spec-item"><i class="fas fa-car"></i> Tipo: ${car.type}</div>
                        <div class="spec-item"><i class="fas fa-gas-pump"></i> Combustible: Nafta</div>
                        <div class="spec-item"><i class="fas fa-tachometer-alt"></i> Km: 0km</div>
                        <div class="spec-item"><i class="fas fa-cogs"></i> Transmisión: Automática</div>
                        <div class="spec-item"><i class="fas fa-door-open"></i> Puertas: 4/5</div>
                    </div>
                </div>

                <div class="product-description">
                    <p>Este ${car.brand} ${car.model} del año ${car.year} es la combinación perfecta de estilo, confort y rendimiento. Equipado con la última tecnología y sistemas de seguridad avanzados, te brinda una experiencia de conducción inigualable. Ideal para la ciudad y la ruta.</p>
                </div>

                <a href="${whatsappUrl}" class="whatsapp-btn" target="_blank">
                    <i class="fab fa-whatsapp"></i> Hablar con un Representante
                </a>
            </div>
        </div>
    `;
};

// Render Functions
const renderFeatured = () => {
    const featuredCars = cars.filter(car => car.featured);
    featuredContainer.innerHTML = featuredCars.map(createCarCard).join('');
};

const renderInventory = (filter = 'all') => {
    const filteredCars = filter === 'all' 
        ? cars 
        : cars.filter(car => car.type === filter);
    
    inventoryContainer.innerHTML = filteredCars.map(createCarCard).join('');
};

// Event Listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');
        // Filter
        renderInventory(btn.dataset.filter);
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.padding = '1rem';
            navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }
    });
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    if (featuredContainer) renderFeatured();
    if (inventoryContainer) renderInventory();
    renderProductDetails();
});
