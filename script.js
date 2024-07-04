document.addEventListener('DOMContentLoaded', function() {
    var products = [
        {
            title: 'Дезодоратор для холодилька',
            description: 'Минералы запахом',
            price: 'Договорная',
            condition: 'Новый',
            images: ['image/kuhnya/e742bee3-a84c-4dc1-9e69-0875ad7e09dc.png'],
            category: 'household',
            url: 'https://osconordo.github.io/osconshop'
        },
        {
            title: 'Перчатки боксёрские',
            description: 'Venom перчатка чёрный, новый.',
            price: '900 сом',
            condition: 'Новый',
            images: ['image/venom.jpg', 'image/photo_2_2024-07-03_16-58-24.jpg', 'image/photo_5_2024-07-03_16-58-24.jpg'],
            category: 'sports',
            url: 'https://osconordo.github.io/osconshop/image/venom.jpg'
        },
        {
            title: 'BerClean Натуральная жидкость для стирки',
            description: 'С растительными экстратами',
            price: 'Договорная',
            condition: 'Новый',
            images: ['image/kuhnya/2fe7e657-2f67-47f2-94d1-4bf15d4120ca.png'],
            category: 'cleaning',
            url: 'https://osconordo.github.io/osconshop'
        },
        {
            title: 'Скакалка',
            description: 'С утяжелителем, мягкая ручка, новый .',
            price: '450 сом',
            condition: 'Новый',
            images: ['image/scacalka.jpg'],
            category: 'sports',
            url: 'https://osconordo.github.io/osconshop/image/scacalka.jpg'
        },
        {
            title: 'Game stick late 4k',
            description: '2200 игр, новый.',
            price: '1800 сом',
            condition: 'Новый',
            images: ['image/photo_4_2024-07-03_16-58-24.jpg'],
            category: 'household',
            url: 'https://osconordo.github.io/osconshop/image/photo_4_2024-07-03_16-58-24.jpg'
        },
        {
            title: 'Футболка',
            description: 'Белый, новый',
            price: '600 сом',
            images: ['image/photo_2024-07-03_16-58-36.jpg'],
            category: 'clothing',
            url: 'https://osconordo.github.io/osconshop/image/photo_2024-07-03_16-58-36.jpg'
        },
        {
            title: 'ILIFE Салветки для мытья посуды',
            description: 'Из древесного волокна',
            price: 'Договорная',
            condition: 'Новый',
            images: ['image/kuhnya/cc16567c-b383-4294-a117-24a43d8681ac.png'],
            category: 'cleaning',
            url: 'https://osconordo.github.io/osconshop'
        },
        {
            title: 'Энзимное моющее средство',
            description: 'Энзимное моющее средство',
            price: 'Договорная',
            condition: 'Новый',
            images: ['image/kuhnya/c14dca3e-aa18-4b34-bd61-82174399a584.png'],
            category: 'cleaning',
            url: 'https://osconordo.github.io/osconshop'
        },
        {
            title: 'Салфетки для уборки кухни',
            description: 'Сильная очищающая способность, удаляет масляные пятно ',
            price: 'Договорная',
            condition: 'Новый',
            images: ['image/kuhnya/bd9ed663-de7f-4b81-8e2a-d217924873a9.png'],
            category: 'cleaning',
            url: 'https://osconordo.github.io/osconshop'
        },
        {
            title: 'Растительное микромолекулярное средство для стирки',
            description: 'Подходит для ручной/машинной стирки, подходит для одежды',
            price: 'Договорная',
            condition: 'Новый',
            images: ['image/kuhnya/6333f24c-ceb9-4c2a-8d43-031644b7d7e6.png'],
            category: 'cleaning',
            url: 'https://osconordo.github.io/osconshop'
        }
    ];

    function loadProducts(products) {
        var container = document.getElementById('product-container');
        container.innerHTML = '';
        products.forEach(function(product) {
            var productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.images[0]}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">${product.price}</p>
                    <button class="view-button" data-title="${product.title}">Посмотреть</button>
                </div>
            `;
            container.appendChild(productCard);
        });

        var viewButtons = document.querySelectorAll('.view-button');
        viewButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var title = this.getAttribute('data-title');
                var product = products.find(function(p) { return p.title === title; });
                if (product) {
                    openModal(product);
                }
            });
        });

        var productImages = document.querySelectorAll('.product-image img');
        productImages.forEach(function(img) {
            img.addEventListener('click', function() {
                var title = img.closest('.product-card').querySelector('.product-title').innerText;
                var product = products.find(function(p) { return p.title === title; });
                if (product) {
                    openFullscreen(product.images, 0);
                }
            });
        });
    }

    function openModal(product) {
        var modal = document.getElementById('product-modal');
        document.getElementById('modal-title').innerText = product.title;
        document.getElementById('modal-description').innerText = product.description;
        document.getElementById('modal-price').innerText = product.price;

        var imagesContainer = document.querySelector('.modal-images');
        imagesContainer.innerHTML = '';
        product.images.forEach(function(image, index) {
            var img = document.createElement('img');
            img.src = image;
            img.alt = product.title;
            img.addEventListener('click', function() {
                openFullscreen(product.images, index);
            });
            imagesContainer.appendChild(img);
        });

        var message = `Я хотел бы купить этот товар: ${product.title} (${product.url})\nURL изображения: ${product.images[0]}`;
        var whatsappNumber = '9960778826267';
        var telegramUsername = 'HackerDarkWhile';

        document.getElementById('whatsapp-button').onclick = function() {
            var whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        };

        document.getElementById('telegram-button').onclick = function() {
            var telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`;
            window.open(telegramUrl, '_blank');
        };

        modal.style.display = 'block';
    }

    function openFullscreen(images, index) {
        var fullscreenModal = document.getElementById('fullscreen-modal');
        var fullscreenImage = document.getElementById('fullscreen-image');
        var currentIndex = index;

        function updateImage() {
            fullscreenImage.src = images[currentIndex];
        }

        document.getElementById('prev-button').onclick = function() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
        };

        document.getElementById('next-button').onclick = function() {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        };

        fullscreenImage.onclick = function() {
            fullscreenImage.classList.toggle('zoomed');
        };

        updateImage();
        fullscreenModal.style.display = 'block';
    }

    var closeButton = document.querySelectorAll('.close-button');
    closeButton.forEach(function(button) {
        button.onclick = function() {
            var modal = button.closest('.modal');
            modal.style.display = 'none';
        };
    });

    window.onclick = function(event) {
        var modal = document.getElementById('product-modal');
        var fullscreenModal = document.getElementById('fullscreen-modal');
        if (event.target == modal) {
            modal.style.display = 'none';
        } else if (event.target == fullscreenModal) {
            fullscreenModal.style.display = 'none';
        }
    };

    loadProducts(products);

    function filterProducts(category) {
        if (category === 'all') {
            loadProducts(products);
        } else {
            var filteredProducts = products.filter(function(product) {
                return product.category === category;
            });
            loadProducts(filteredProducts);
        }
    }

    var categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });

    function showSuggestions(query) {
        var suggestions = document.getElementById('suggestions');
        var filteredProducts = products.filter(function(product) {
            return product.title.toLowerCase().includes(query.toLowerCase());
        });

        suggestions.innerHTML = '';
        if (filteredProducts.length > 0) {
            filteredProducts.forEach(function(product) {
                var suggestionItem = document.createElement('div');
                suggestionItem.className = 'suggestion-item';
                suggestionItem.innerText = product.title;
                suggestionItem.addEventListener('click', function() {
                    document.getElementById('search-input').value = product.title;
                    suggestions.innerHTML = '';
                    loadProducts([product]);
                });
                suggestions.appendChild(suggestionItem);
            });
            suggestions.style.display = 'block';
        } else {
            suggestions.style.display = 'none';
        }
    }

    document.getElementById('search-button').addEventListener('click', function() {
        var query = document.getElementById('search-input').value.toLowerCase();
        var filteredProducts = products.filter(function(product) {
            return product.title.toLowerCase().includes(query);
        });
        loadProducts(filteredProducts);
    });

    document.getElementById('search-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('search-button').click();
        }
    });

    document.getElementById('search-input').addEventListener('input', function() {
        var query = this.value.toLowerCase();
        if (query.length > 0) {
            showSuggestions(query);
        } else {
            document.getElementById('suggestions').style.display = 'none';
        }
    });

    document.addEventListener('click', function(event) {
        var suggestions = document.getElementById('suggestions');
        if (!event.target.closest('.search-bar')) {
            suggestions.style.display = 'none';
        }
    });
});
