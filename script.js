document.addEventListener("DOMContentLoaded", () => {
  const parts = document.querySelectorAll('.jojo-part');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navbar = document.getElementById('navbar');

  // Her bölümün ana renk kodunu JS tarafında haritalandırıyoruz
  const themeColors = {
    'part-1': '#d4af37', // Altın
    'part-2': '#ff6b35', // Turuncu
    'part-3': '#8a2be2', // Mor
    'part-4': '#ff007f', // Neon Pembe
    'part-5': '#ffd700', // Saf Altın
    'part-6': '#00fa9a', // Yeşil
    'part-7': '#c2b280', // Kum
    'part-8': '#a2d2ff', // Pastel Mavi
    'part-9': '#00ff87'  // Zümrüt Neon
  };

  // Ekrana %20'si giren bölümü aktif sayar (daha keskin geçişler için threshold güncellendi)
  const observerOptions = {
    root: null,
    rootMargin: '-10% 0px -40% 0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.id;
        
        // Navbar'a CSS değişkeni olarak o bölümün rengini ata
        navbar.style.setProperty('--nav-color', themeColors[activeId]);

        // Aktif Nav Linkini Güncelle
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
            
            // Mobilde aktif olan linkin ekranda ortalanması için otomatik kaydırma
            if(window.innerWidth < 960) {
              const navWrapper = document.querySelector('.nav-links-wrapper');
              const linkRect = link.getBoundingClientRect();
              const wrapperRect = navWrapper.getBoundingClientRect();
              
              if (linkRect.left < wrapperRect.left || linkRect.right > wrapperRect.right) {
                link.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
              }
            }
          }
        });
      }
    });
  }, observerOptions);

  parts.forEach(part => observer.observe(part));
});