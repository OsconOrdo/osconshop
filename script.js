document.addEventListener('DOMContentLoaded', function() {
    var products = [
        {
            title: 'Перчатки боксёрские',
            description: 'Venom перчатка чёрный, новый.',
            price: '900 сом',
            condition: 'Новый',
            images: ['image/venom.jpg', 'image/photo_2_2024-07-03_16-58-24.jpg', 'image/photo_5_2024-07-03_16-58-24.jpg'],
            url: 'https://osconordo.github.io/osconshop/image/venom.jpg'
        },
        {
            title: 'Скакалка',
            description: 'С утяжелителем, мягкая ручка, новый .',
            price: '450 сом',
            condition: 'Новый',
            images: ['image/scacalka.jpg'],
            url: 'https://osconordo.github.io/osconshop/image/scacalka.jpg'
        },
        {
            title: 'Game stick late 4k',
            description: '2200 игр, новый.',
            price: '1800 сом',
            condition: 'Новый',
            images: ['image/photo_4_2024-07-03_16-58-24.jpg'],
            url: 'https://osconordo.github.io/osconshop/image/photo_4_2024-07-03_16-58-24.jpg'
        },
        {
            title: 'Футболка',
            description: 'Белый, новый',
            price: '600 сом',
            
            images: ['image/photo_2024-07-03_16-58-36.jpg'],
            url: 'https://osconordo.github.io/osconshop/image/photo_2024-07-03_16-58-36.jpg'
        },
        // Добавьте больше товаров в этом массиве
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
