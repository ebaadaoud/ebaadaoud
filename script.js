const products = [
    {
        id: '1',
        name: { en: 'Organic Rose Lipstick', ar: 'أحمر شفاه وردي عضوي' },
        description: { en: 'Handcrafted with natural rose petals and shea butter.', ar: 'مصنوع يدوياً من بتلات الورد الطبيعية وزبدة الشيا.' },
        price: 25,
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062dc?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: '2',
        name: { en: 'Lavender Facial Mist', ar: 'رذاذ الوجه باللافندر' },
        description: { en: 'Refreshing mist with calming lavender essential oil.', ar: 'رذاذ منعش مع زيت اللافندر الأساسي المهدئ.' },
        price: 18,
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: '3',
        name: { en: 'Honey & Oat Scrub', ar: 'مقشر العسل والشوفان' },
        description: { en: 'Gentle exfoliation for glowing skin.', ar: 'تقشير لطيف لبشرة متوهجة.' },
        price: 22,
        image: 'https://images.unsplash.com/photo-1556228720-1987594a8a63?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: '4',
        name: { en: 'Charcoal Face Mask', ar: 'قناع الفحم للوجه' },
        description: { en: 'Detoxifying mask to remove impurities.', ar: 'قناع لإزالة السموم والشوائب.' },
        price: 30,
        image: 'https://images.unsplash.com/photo-1596755094514-bf21a50c8c10?auto=format&fit=crop&q=80&w=800',
    },
];

const translations = {
    en: {
        nav: {
            home: 'Home',
            products: 'Products',
            about: 'About',
            contact: 'Contact',
            cart: 'Cart',
        },
        hero: {
            title: 'Natural Beauty, Handcrafted with Love',
            subtitle: 'Discover our collection of organic, handmade makeup products.',
            cta: 'Shop Now',
        },
        products: {
            title: 'Our Collection',
            addToCart: 'Add to Cart',
            price: 'Price',
        },
        footer: {
            rights: 'All rights reserved.',
        },
        theme: {
            dark: 'Dark Mode',
            light: 'Light Mode',
        },
        lang: 'العربية'
    },
    ar: {
        nav: {
            home: 'الرئيسية',
            products: 'المنتجات',
            about: 'من نحن',
            contact: 'تواصل معنا',
            cart: 'السلة',
        },
        hero: {
            title: 'جمال طبيعي، صنع بحب',
            subtitle: 'اكتشفي مجموعتنا من المكياج العضوي المصنوع يدوياً.',
            cta: 'تسوقي الآن',
        },
        products: {
            title: 'مجموعتنا',
            addToCart: 'أضف إلى السلة',
            price: 'السعر',
        },
        footer: {
            rights: 'جميع الحقوق محفوظة.',
        },
        theme: {
            dark: 'الوضع الليلي',
            light: 'الوضع النهاري',
        },
        lang: 'English'
    }
};

// State
let currentLang = localStorage.getItem('lang') || 'en';
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    applyLanguage(currentLang);
    renderProducts();
    setupEventListeners();
});

function setupEventListeners() {
    const themeBtn = document.getElementById('theme-toggle');
    const langBtn = document.getElementById('lang-toggle');

    themeBtn.addEventListener('click', toggleTheme);
    langBtn.addEventListener('click', toggleLanguage);
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateText(); // Update generic text if needed
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', currentLang);
    applyLanguage(currentLang);
}

function applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    updateText();
    renderProducts(); // Re-render products to update their text
}

function updateText() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = key.split('.').reduce((obj, k) => obj && obj[k], translations[currentLang]);
        if (value) el.textContent = value;
    });

    // Update buttons
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.textContent = translations[currentLang].lang;
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name[currentLang]}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name[currentLang]}</h3>
                <p class="product-desc">${product.description[currentLang]}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price}</span>
                    <button class="add-to-cart">${translations[currentLang].products.addToCart}</button>
                </div>
            </div>
        </article>
    `).join('');
}