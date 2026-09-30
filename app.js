/* Quentin Petty — site logic */
(function () {
  'use strict';

  var portfolioItems = [
    {
      name: 'Group B',
      ar: '1600 / 1224',
      images: ['assets/portfolio/groupb-01.jpg', 'assets/portfolio/groupb-02.jpg', 'assets/portfolio/shai002-07.jpg', 'assets/portfolio/shai002-08.jpg', 'assets/portfolio/shai002-09.jpg', 'assets/portfolio/groupb-03.jpg', 'assets/portfolio/groupb-04.jpg', 'assets/portfolio/groupb-05.jpg']
    },
    {
      name: 'Shai 002 Reflect',
      ar: '1600 / 1236',
      images: ['assets/portfolio/shai002-01.jpg', 'assets/portfolio/shai002-02.jpg', 'assets/portfolio/shai002-03.jpg', 'assets/portfolio/shai002-04.jpg', 'assets/portfolio/shai002-05.jpg', 'assets/portfolio/shai002-06.jpg']
    },
    {
      name: 'Star Child',
      ar: '1035 / 1600',
      images: ['assets/portfolio/starchild-01.jpg', 'assets/portfolio/starchild-02.jpg', 'assets/portfolio/starchild-03.jpg', 'assets/portfolio/starchild-04.jpg', 'assets/portfolio/starchild-05.jpg', 'assets/portfolio/starchild-06.jpg', 'assets/portfolio/starchild-07.jpg', 'assets/portfolio/starchild-08.jpg', 'assets/portfolio/starchild-09.jpg']
    }
  ];

  var shopItems = [
    { name: 'Full Grain Zip Boot', images: ['assets/works/full-grain-zip-boot.png', 'assets/works/full-grain-zip-boot-02.png'] },
    { name: 'Pleated Staple Flats', img: 'assets/works/pleated-staple-flats.png' },
    { name: 'Pinked Paten Leather HandBag', img: 'assets/works/pinked-patent-handbag.jpg' },
    { name: 'Bolo Bag', img: 'assets/works/bolo-bag.jpg' },
    { name: 'Smocked Silk Weave Self Frame Bag', img: 'assets/works/image7.jpg' },
    { name: 'Western Belt', img: 'assets/works/low-waisted-belt.jpg' },
    { name: 'Low Waisted Belt', img: 'assets/works/western-belt.jpg' },
    { name: 'Dumpling Bag', img: 'assets/works/dumpling-bag.jpg' },
    { name: '1950s Chanute Newspaper Bag', img: 'assets/works/chanute-newspaper-bag.jpg' },
    { name: 'Derbs', img: 'assets/works/image15.jpg' },
    { name: 'Burnished Gat Derbs', img: 'assets/works/burnished-gat-derbs.jpg' },
    { name: 'Buffalo Nickel Bag', img: 'assets/works/buffalo-nickel-bag.jpg' },
    { name: 'Caroline Court Shoe', img: 'assets/works/caroline-court-shoe.jpg' },
    { name: 'Japanese Selvage Denim Dart Pouch', img: 'assets/works/denim-dart-pouch.jpg' },
    { name: 'Draped Leather Box Clutch', img: 'assets/works/draped-box-clutch.jpg' },
    { name: 'Cracked Paint Leather Tote', img: 'assets/works/cracked-paint-tote.jpg' },
    { name: 'Lunar Boot', img: 'assets/works/image8.jpg' }
  ];

  var EMAIL = 'quentinpetty04@gmail.com';

  var el = {
    cover: document.getElementById('cover'),
    page: document.getElementById('page'),
    gridView: document.getElementById('grid-view'),
    grid: document.getElementById('grid'),
    pageTitle: document.getElementById('page-title'),
    pageSub: document.getElementById('page-sub'),
    tabPortfolio: document.getElementById('tab-portfolio'),
    tabWorks: document.getElementById('tab-works'),
    detailView: document.getElementById('detail-view'),
    detailImages: document.getElementById('detail-images'),
    detailKicker: document.getElementById('detail-kicker'),
    detailName: document.getElementById('detail-name'),
    inquireBtn: document.getElementById('inquire-btn'),
    backBtn: document.getElementById('back-btn'),
    fxNeg: document.getElementById('fx-neg'),
    fxWash: document.getElementById('fx-wash'),
    fxBlink: document.getElementById('fx-blink')
  };

  var state = { view: 'cover', detailIndex: null, phase: 'idle' };
  var timers = [];
  var viewer = document.getElementById('image-viewer');
  var viewerImage = document.getElementById('viewer-image');
  var viewerCounter = document.getElementById('viewer-counter');
  var viewerGallery = { images: [], index: 0, name: '' };

  function showViewerImage(index) {
    viewerGallery.index = (index + viewerGallery.images.length) % viewerGallery.images.length;
    viewerImage.src = viewerGallery.images[viewerGallery.index];
    viewerImage.alt = viewerGallery.name + ' - ' + (viewerGallery.index + 1) + ' of ' + viewerGallery.images.length;
    viewerCounter.textContent = (viewerGallery.index + 1) + ' / ' + viewerGallery.images.length;
  }

  function openViewer(images, index, name) {
    viewerGallery = { images: images, index: index, name: name };
    showViewerImage(index);
    viewer.showModal();
    document.documentElement.classList.add('viewer-open');
  }

  function after(ms, fn) { timers.push(setTimeout(fn, ms)); }
  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
    el.fxNeg.hidden = true;
    el.fxWash.hidden = true;
    el.fxBlink.hidden = true;
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function listFor(view) { return view === 'works' ? shopItems : portfolioItems; }

  /* replay a CSS animation by re-inserting the node */
  function replay(node) {
    node.hidden = true;
    // force reflow so the animation restarts
    void node.offsetWidth;
    node.hidden = false;
  }

  function renderGrid(view) {
    var list = listFor(view);
    var frag = document.createDocumentFragment();
    list.forEach(function (item, i) {
      var card = document.createElement('button');
      card.className = 'card';
      card.setAttribute('aria-label', item.name);
      card.addEventListener('click', function () { openDetail(view, i); });

      var img = document.createElement('img');
      img.className = 'card-img';
      img.src = item.img || item.images[0];
      img.alt = item.name;
      img.loading = i < 6 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.style.aspectRatio = item.ar || '4 / 5';
      card.appendChild(img);

      var row = document.createElement('div');
      row.className = 'card-row';
      var name = document.createElement('div');
      name.className = 'card-name';
      name.textContent = item.name;
      var num = document.createElement('div');
      num.className = 'card-num';
      num.textContent = pad(i + 1);
      row.appendChild(name);
      row.appendChild(num);
      card.appendChild(row);

      frag.appendChild(card);
    });
    el.grid.replaceChildren(frag);
  }

  function renderDetail(view, index) {
    var list = listFor(view);
    var item = list[index];
    if (!item) return;

    el.detailView.classList.toggle('detail--portfolio', view === 'portfolio');
    el.backBtn.textContent = '← BACK TO ' + (view === 'works' ? 'WORKS' : 'PORTFOLIO');
    el.detailKicker.textContent = pad(index + 1);
    el.detailName.textContent = item.name;

    // Inquire only ever appears on the Works tab, never on Portfolio.
    if (view === 'works') {
      el.inquireBtn.hidden = false;
      el.inquireBtn.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Inquiry — ' + item.name);
    } else {
      el.inquireBtn.hidden = true;
    }

    var srcs = item.images || (item.img ? [item.img] : []);
    var frag = document.createDocumentFragment();
    srcs.forEach(function (src, i) {
      var img = document.createElement('img');
      img.src = src;
      img.alt = item.name + ' — ' + (i + 1) + ' of ' + srcs.length;
      img.loading = i < (view === 'portfolio' ? 3 : 2) ? 'eager' : 'lazy';
      img.decoding = 'async';
      if (view === 'portfolio') {
        var link = document.createElement('button');
        link.type = 'button';
        link.className = 'detail-image-link';
        link.style.aspectRatio = item.ar || '4 / 5';
        link.setAttribute('aria-label', 'Enlarge ' + item.name + ' image ' + (i + 1));
        link.addEventListener('click', function () { openViewer(srcs, i, item.name); });
        link.appendChild(img);
        frag.appendChild(link);
      } else {
        img.style.aspectRatio = '4 / 5';
        frag.appendChild(img);
      }
    });
    el.detailImages.replaceChildren(frag);
  }

  function applyState() {
    if (viewer.open) viewer.close();
    var onCover = state.view === 'cover';
    el.cover.hidden = !onCover;
    el.page.hidden = onCover;
    if (onCover) return;

    var isWorks = state.view === 'works';
    el.pageTitle.textContent = isWorks ? 'WORKS' : 'PORTFOLIO';
    el.pageSub.textContent = isWorks ? 'ACCESSORIES — PURSES / BELTS / BAGS' : 'FOOTWEAR & FASHION PROTOTYPES';
    el.tabPortfolio.classList.toggle('active', !isWorks);
    el.tabWorks.classList.toggle('active', isWorks);

    var showDetail = state.detailIndex != null;
    el.gridView.hidden = showDetail;
    el.detailView.hidden = !showDetail;

    if (showDetail) {
      renderDetail(state.view, state.detailIndex);
    } else {
      renderGrid(state.view);
    }
  }

  function setHash(h) {
    if (('#' + h) !== location.hash) {
      suppressHashHandler = true;
      location.hash = h;
    }
  }

  /* ---- navigation actions ---- */

  function enterFromCover(view) {
    if (state.phase !== 'idle') return;
    state.phase = 'neg';
    replay(el.fxNeg);
    after(680, function () {
      el.fxNeg.hidden = true;
      state.view = view;
      state.detailIndex = null;
      applyState();
      setHash('/' + view);
      window.scrollTo(0, 0);
      state.phase = 'wash';
      replay(el.fxWash);
      after(1000, function () {
        el.fxWash.hidden = true;
        state.phase = 'idle';
      });
    });
  }

  function switchTab(view) {
    if (state.view === view) {
      if (state.detailIndex != null) {
        state.detailIndex = null;
        applyState();
        setHash('/' + view);
      }
      return;
    }
    clearTimers();
    state.view = view;
    state.detailIndex = null;
    state.phase = 'blink';
    applyState();
    setHash('/' + view);
    window.scrollTo(0, 0);
    replay(el.fxBlink);
    after(340, function () {
      el.fxBlink.hidden = true;
      state.phase = 'idle';
    });
  }

  function openDetail(view, i) {
    state.detailIndex = i;
    applyState();
    setHash('/' + view + '/' + (i + 1));
    window.scrollTo(0, 0);
  }

  function goCover() {
    clearTimers();
    state.view = 'cover';
    state.detailIndex = null;
    state.phase = 'idle';
    applyState();
    setHash('/');
  }

  function closeDetail() {
    state.detailIndex = null;
    applyState();
    setHash('/' + state.view);
    window.scrollTo(0, 0);
  }

  /* ---- hash routing (deep links + back button) ---- */

  var suppressHashHandler = false;

  function routeFromHash() {
    var h = location.hash.replace(/^#\/?/, '');
    var parts = h.split('/').filter(Boolean);
    var view = parts[0] === 'works' ? 'works' : parts[0] === 'portfolio' ? 'portfolio' : 'cover';
    var idx = null;
    if (view !== 'cover' && parts[1]) {
      var n = parseInt(parts[1], 10);
      if (n >= 1 && n <= listFor(view).length) idx = n - 1;
    }
    clearTimers();
    state.view = view;
    state.detailIndex = idx;
    state.phase = 'idle';
    applyState();
  }

  window.addEventListener('hashchange', function () {
    if (suppressHashHandler) { suppressHashHandler = false; return; }
    routeFromHash();
  });

  /* ---- wire up ---- */

  document.querySelectorAll('[data-enter]').forEach(function (btn) {
    btn.addEventListener('click', function () { enterFromCover(btn.dataset.enter); });
  });
  document.querySelectorAll('[data-tab]').forEach(function (btn) {
    btn.addEventListener('click', function () { switchTab(btn.dataset.tab); });
  });
  document.querySelector('[data-go="cover"]').addEventListener('click', goCover);
  el.backBtn.addEventListener('click', closeDetail);
  document.getElementById('viewer-close').addEventListener('click', function () { viewer.close(); });
  document.getElementById('viewer-prev').addEventListener('click', function () { showViewerImage(viewerGallery.index - 1); });
  document.getElementById('viewer-next').addEventListener('click', function () { showViewerImage(viewerGallery.index + 1); });
  viewer.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showViewerImage(viewerGallery.index + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  viewer.addEventListener('click', function (event) {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener('close', function () {
    document.documentElement.classList.remove('viewer-open');
  });

  routeFromHash();
})();
