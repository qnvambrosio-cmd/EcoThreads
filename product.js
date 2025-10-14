   // Mobile menu functionality
    document.addEventListener('DOMContentLoaded', function () {
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');

      mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('show');
      });

      document.addEventListener('click', function (event) {
        if (
          !mobileMenu.contains(event.target) &&
          !mobileMenuButton.contains(event.target)
        ) {
          mobileMenu.classList.remove('show');
        }
      });
    });

    // Sample Product Data
    const products = [
      { id: 1, name: "Vintage Denim Jacket", category: "outerwear", code: "#A12345", condition: "poor", price: 180, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
      { id: 2, name: "Floral Summer Dress", category: "dresses", code: "#B98765", condition: "good", price: 450, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400" },
      { id: 3, name: "Classic White T-Shirt", category: "tops", code: "#C1222", condition: "new", price: 150, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
      { id: 4, name: "Black Skinny Jeans", category: "bottoms", code: "#D35622", condition: "poor", price: 150, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" },
      { id: 5, name: "Leather Crossbody Bag", category: "accessories", code: "#E54332", condition: "good", price: 300, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
      { id: 6, name: "Striped Button-Up Shirt", category: "tops", code: "#C86754", condition: "poor", price: 250, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400" },
      { id: 7, name: "Wool Winter Coat", category: "outerwear", code: "#A43212", condition: "good", price: 800, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400" },
      { id: 8, name: "High-Waisted Shorts", category: "bottoms", code: "#D98654", condition: "fair", price: 200, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400" },
      { id: 9, name: "Bohemian Maxi Dress", category: "dresses", code: "#B24567", condition: "poor", price: 150, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400" },
      { id: 10, name: "Silk Scarf Collection", category: "accessories", code: "#A12345", condition: "new", price: 180, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400" },
      { id: 11, name: "Graphic Band Tee", category: "tops", code: "#C09865", condition: "good", price: 280, image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400" },
      { id: 12, name: "Plaid Flannel Shirt", category: "tops", code: "#C56543", condition: "poor", price: 140, image: "images/man.png" }
    ];

    let cart = [];
    let filteredProducts = [...products];

    // Initialize
    displayProducts(filteredProducts);
    updateCartCount();

    function displayProducts(productsToShow) {
      const grid = document.getElementById('productsGrid');
      grid.innerHTML = productsToShow.map(product => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
<div class="product-code">ID Code: ${product.code || "N/A"}</div>
            <span class="product-condition condition-${product.condition}">
              ${product.condition.replace('-', ' ')}
            </span>
            <div class="product-price">₱${product.price.toFixed(2)}</div>
            <div class="product-actions">
              <button class="btn-primary" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Add to Cart
              </button>
              <button class="btn-secondary" onclick="reserveItem(${product.id})">
                Reserve
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }

    function filterProducts() {
      const category = document.getElementById('categoryFilter').value;
      const condition = document.getElementById('conditionFilter').value;
      const sort = document.getElementById('sortFilter').value;

      filteredProducts = products.filter(p => {
        const categoryMatch = category === 'all' || p.category === category;
        const conditionMatch = condition === 'all' || p.condition === condition;
        return categoryMatch && conditionMatch;
      });

      if (sort === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sort === 'name') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      }

      displayProducts(filteredProducts);
    }

    function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      const existingItem = cart.find(item => item.id === productId);

      if (existingItem) {
        alert('This item is already in your cart!');
        return;
      }

      cart.push({ ...product });
      updateCartCount();
      alert(`${product.name} added to cart!`);
    }

    function removeFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
      updateCartCount();
      displayCart();
    }

    function updateCartCount() {
      document.getElementById('cartCount').textContent = cart.length;
    }

    function toggleCart() {
      const modal = document.getElementById('cartModal');
      modal.classList.toggle('show');
      if (modal.classList.contains('show')) {
        displayCart();
      }
    }

    function displayCart() {
      const cartItems = document.getElementById('cartItems');
      const cartTotal = document.getElementById('cartTotal');
      const totalPrice = document.getElementById('totalPrice');

      if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart" style="font-size: 3rem; color: #d1d5db; margin-bottom: 1rem;"></i><p>Your cart is empty</p></div>';
        cartTotal.style.display = 'none';
        return;
      }

      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
<div class="cart-item-code">ID Code: ${item.code}</div>
            <div class="cart-item-price">₱${item.price.toFixed(2)}</div>
          </div>
          <button class="remove-item" onclick="removeFromCart(${item.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `).join('');

      const total = cart.reduce((sum, item) => sum + item.price, 0);
      totalPrice.textContent = `₱${total.toFixed(2)}`;
      cartTotal.style.display = 'block';
    }

    function reserveItem(productId) {
      const product = products.find(p => p.id === productId);
      alert(`Redirecting to reservation page for: ${product.name}`);
      window.location.href = 'reservation.html?product=' + productId;
    }

    function checkout() {
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      alert('Redirecting to checkout...');
    }

    // Close cart when clicking outside
    document.getElementById('cartModal').addEventListener('click', function(e) {
      if (e.target === this) {
        toggleCart();
      }
    });
