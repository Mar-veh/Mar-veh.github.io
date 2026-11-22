// Small enhancements: mobile menu, light/dark toggle, map lightbox, footer year.
(function () {
  var root = document.documentElement;

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('site-nav');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      }
    });
  }

  // Light / dark toggle. The page always loads in the light theme.
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
    });
  }

  // Lightbox for the hero map and the map gallery
  var box = document.getElementById('lightbox');
  if (box && typeof box.showModal === 'function') {
    var img = box.querySelector('img');
    var cap = box.querySelector('figcaption');
    document.querySelectorAll('.gallery .tile, .zoomable').forEach(function (tile) {
      tile.addEventListener('click', function (e) {
        e.preventDefault();
        var thumb = tile.querySelector('img');
        img.src = tile.getAttribute('href');
        img.alt = thumb ? thumb.alt : '';
        cap.textContent = tile.getAttribute('data-caption') || '';
        box.showModal();
      });
    });
    box.querySelector('.lightbox-close').addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
