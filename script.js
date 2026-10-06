document.addEventListener('DOMContentLoaded', () => {
  // 1. Efeito no Header ao rolar a página
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Rolagem suave (smooth scroll) nos links internos
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 3. Filtros da Galeria de Fotos
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // 4. Modal / Lightbox para abrir imagem ampliada
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImg');
  const captionText = document.getElementById('modalCaption');
  const closeModal = document.querySelector('.modal-close');

  const galleryBoxes = document.querySelectorAll('.gallery-img-box');
  galleryBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const img = box.querySelector('img');
      const cardTitle = box.closest('.gallery-card').querySelector('h4').innerText;
      
      modal.style.display = 'block';
      modalImg.src = img.src;
      captionText.innerText = cardTitle;
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});