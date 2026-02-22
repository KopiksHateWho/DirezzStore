document.addEventListener('DOMContentLoaded', () => {
  let currentOrder = {
    game: '',
    gameName: '',
    package: '',
    price: 0,
    quantity: 1
  };

  let allOrders = [];
  let selectedPayment = '';
  // Used for receipt modal sharing
  let currentReceipt = null;

  const games = [
    { id: 'ml', name: 'Mobile Legends', image: 'mobile-legend.jpg', status: '💎 Top Up Instan' },
    { id: 'ff', name: 'Free Fire', image: 'free-fire.jpg', status: '🔥 Top Up Instan' },
    { id: 'pubg', name: 'PUBG Mobile', image: 'pubg-mobile.jpg', status: '🔫 Top Up Instan' },
    { id: 'roblox', name: 'Roblox', image: 'roblox.jpg', status: '🎮 Top Up Instan' },
    { id: 'genshin', name: 'Genshin Impact', image: 'genshin-impact.jpg', status: '✨ Top Up Instan' },
    { id: 'telegram', name: 'Telegram Stars', image: 'telegram-stars.jpg', status: '⭐ Top Up Instan' },
    { id: 'redfinger', name: 'Redfinger Voucher', image: 'redfinger-voucher.jpg', status: '🎟️ Top Up Instan' },
    { id: 'ewallet', name: 'Top Up E-Wallet', image: 'e-wallet.svg', status: 'Top Up Instan' }
  ];

  const prices = {
    ml: [
      { package: '👑 Weekly Diamond Pass', category: '👑 WEEKLY DIAMOND PASS', price: 28777 },
      { package: '💎 5', category: '🟢 DIAMOND KECIL (RAMAI)', price: 1800 },
      { package: '💎 12', category: '🟢 DIAMOND KECIL (RAMAI)', price: 3800 },
      { package: '💎 14', category: '🟢 DIAMOND KECIL (RAMAI)', price: 4300 },
      { package: '💎 19', category: '🟢 DIAMOND KECIL (RAMAI)', price: 5800 },
      { package: '💎 28', category: '🟢 DIAMOND KECIL (RAMAI)', price: 8200 },
      { package: '💎 36', category: '🟢 DIAMOND KECIL (RAMAI)', price: 10200 },
      { package: '💎 45', category: '🟢 DIAMOND KECIL (RAMAI)', price: 13300 },
      { package: '💎 50', category: '🟢 DIAMOND KECIL (RAMAI)', price: 14000 },
      { package: '💎 59', category: '🟢 DIAMOND KECIL (RAMAI)', price: 16200 },
      { package: '💎 67', category: '🟢 DIAMOND KECIL (RAMAI)', price: 18300 },
      { package: '💎 70', category: '🟢 DIAMOND KECIL (RAMAI)', price: 19200 },
      { package: '💎 85', category: '🟢 DIAMOND KECIL (RAMAI)', price: 22700 },
      { package: '💎 100', category: '🟡 DIAMOND MENENGAH', price: 27200 },
      { package: '💎 112', category: '🟡 DIAMOND MENENGAH', price: 30700 },
      { package: '💎 140', category: '🟡 DIAMOND MENENGAH', price: 37900 },
      { package: '💎 145', category: '🟡 DIAMOND MENENGAH', price: 40700 },
      { package: '💎 170', category: '🟡 DIAMOND MENENGAH', price: 45200 },
      { package: '💎 185', category: '🟡 DIAMOND MENENGAH', price: 49500 },
      { package: '💎 222', category: '🟡 DIAMOND MENENGAH', price: 58700 },
      { package: '💎 240', category: '🟡 DIAMOND MENENGAH', price: 63300 },
      { package: '💎 257', category: '🟡 DIAMOND MENENGAH', price: 68200 },
      { package: '💎 284', category: '🟡 DIAMOND MENENGAH', price: 74900 },
      { package: '💎 296', category: '🟡 DIAMOND MENENGAH', price: 77700 },
      { package: '💎 344', category: '🔥 DIAMOND BESAR', price: 91000 },
      { package: '💎 355', category: '🔥 DIAMOND BESAR', price: 93500 },
      { package: '💎 408', category: '🔥 DIAMOND BESAR', price: 107000 },
      { package: '💎 429', category: '🔥 DIAMOND BESAR', price: 113000 },
      { package: '💎 460', category: '🔥 DIAMOND BESAR', price: 121500 },
      { package: '💎 514', category: '🔥 DIAMOND BESAR', price: 135500 },
      { package: '💎 568', category: '🔥 DIAMOND BESAR', price: 146500 },
      { package: '💎 600', category: '🔥 DIAMOND BESAR', price: 155000 },
      { package: '💎 706', category: '🔥 DIAMOND BESAR', price: 182000 },
      { package: '💎 875', category: '👑 DIAMOND JUMBO (UNTUNG GEDE)', price: 222000 },
      { package: '💎 963', category: '👑 DIAMOND JUMBO (UNTUNG GEDE)', price: 247000 },
      { package: '💎 1.050', category: '👑 DIAMOND JUMBO (UNTUNG GEDE)', price: 269000 },
      { package: '💎 1.136', category: '👑 DIAMOND JUMBO (UNTUNG GEDE)', price: 291000 },
      { package: '💎 1.159', category: '👑 DIAMOND JUMBO (UNTUNG GEDE)', price: 298000 },
      { package: '💎 1.220', category: '👑 DIAMOND JUMBO (UNTUNG GEDE)', price: 307000 },
      { package: '💎 1.412', category: '👑 DIAMOND JUMBO (UNTUNG GEDE)', price: 357000 },
      { package: '💎 1.704', category: '👑 DIAMOND JUMBO (UNTUNG GEDE)', price: 438000 },
      { package: '💎 1.750', category: '👑 DIAMOND JUMBO (UNTUNG GEDE)', price: 445000 },
      { package: '💎 2.010', category: '🔥👑 DIAMOND SULTAN BESAR', price: 479000 },
      { package: '💎 2.195', category: '🔥👑 DIAMOND SULTAN BESAR', price: 527000 },
      { package: '💎 2.380', category: '🔥👑 DIAMOND SULTAN BESAR', price: 579000 },
      { package: '💎 2.901', category: '🔥👑 DIAMOND SULTAN BESAR', price: 705000 },
      { package: '💎 3.688', category: '🔥👑 DIAMOND SULTAN BESAR', price: 899000 },
      { package: '💎 4.394', category: '🔥👑 DIAMOND SULTAN BESAR', price: 1049000 },
      { package: '💎 5.532', category: '🔥👑 DIAMOND SULTAN BESAR', price: 1329000 },
      { package: '💎 7.720', category: '🔥👑 DIAMOND SULTAN BESAR', price: 1852000 },
      { package: '💎 9.288', category: '🔥👑 DIAMOND SULTAN BESAR', price: 2220000 },
      { package: '💎 10.050', category: '🔥👑 DIAMOND SULTAN BESAR', price: 2378000 },
      { package: '💎 12.976', category: '🔥👑 DIAMOND SULTAN BESAR', price: 3108000 },
      { package: '💎 16.080', category: '🔥👑 DIAMOND SULTAN BESAR', price: 3828000 },
      { package: '💎 27.864', category: '🔥👑 DIAMOND SULTAN BESAR', price: 6655000 }
    ],
    ff: [
      { package: '🚀 Member Mingguan', category: '👑 MEMBERSHIP TURBO', price: 27555 },
      { package: '🚀 Member Bulanan', category: '👑 MEMBERSHIP TURBO', price: 80565 },
      { package: '💎 75 ⭐', category: '⭐ NOMINAL FAVORIT (PALING LARIS)', price: 10000 },
      { package: '💎 80', category: '⭐ NOMINAL FAVORIT (PALING LARIS)', price: 0, habis: true },
      { package: '💎 150 ⭐', category: '⭐ NOMINAL FAVORIT (PALING LARIS)', price: 20000 },
      { package: '💎 130', category: '⭐ NOMINAL FAVORIT (PALING LARIS)', price: 20000 },
      { package: '💎 210 ⭐', category: '⭐ NOMINAL FAVORIT (PALING LARIS)', price: 30000 },
      { package: '💎 190', category: '⭐ NOMINAL FAVORIT (PALING LARIS)', price: 30000 },
      { package: '💎 400 ⭐', category: '⭐ NOMINAL FAVORIT (PALING LARIS)', price: 0, habis: true },
      { package: '💎 375', category: '⭐ NOMINAL FAVORIT (PALING LARIS)', price: 50000 },
      { package: '💎 770 ⭐', category: '⭐ NOMINAL FAVORIT (PALING LARIS)', price: 100000 },
      { package: '💎 740', category: '⭐ NOMINAL FAVORIT (PALING LARIS)', price: 100000 },
      { package: '💎 5', category: '🔹 PAKET KECIL', price: 1490 },
      { package: '💎 10', category: '🔹 PAKET KECIL', price: 1990 },
      { package: '💎 15', category: '🔹 PAKET KECIL', price: 2490 },
      { package: '💎 20', category: '🔹 PAKET KECIL', price: 3490 },
      { package: '💎 25', category: '🔹 PAKET KECIL', price: 4490 },
      { package: '💎 30', category: '🔹 PAKET KECIL', price: 4990 },
      { package: '💎 40', category: '🔹 PAKET KECIL', price: 6490 },
      { package: '💎 50', category: '🔹 PAKET KECIL', price: 7490 },
      { package: '💎 60', category: '🔹 PAKET KECIL', price: 8990 },
      { package: '💎 75 ⭐', category: '🔹 PAKET KECIL', price: 9990 },
      { package: '💎 80', category: '🔹 PAKET KECIL', price: 10990 },
      { package: '💎 90', category: '🔹 PAKET KECIL', price: 12490 },
      { package: '💎 95', category: '🔹 PAKET KECIL', price: 12990 },
      { package: '💎 100', category: '🔹 PAKET KECIL', price: 13990 },
      { package: '💎 120', category: '🔹 PAKET KECIL', price: 14990 },
      { package: '💎 130', category: '🔷 PAKET MENENGAH', price: 16990 },
      { package: '💎 145', category: '🔷 PAKET MENENGAH', price: 18990 },
      { package: '💎 150 ⭐', category: '🔷 PAKET MENENGAH', price: 19490 },
      { package: '💎 160', category: '🔷 PAKET MENENGAH', price: 21990 },
      { package: '💎 170', category: '🔷 PAKET MENENGAH', price: 22990 },
      { package: '💎 180', category: '🔷 PAKET MENENGAH', price: 24990 },
      { package: '💎 190', category: '🔷 PAKET MENENGAH', price: 25990 },
      { package: '💎 210 ⭐', category: '🔷 PAKET MENENGAH', price: 27990 },
      { package: '💎 250', category: '🔷 PAKET MENENGAH', price: 33990 },
      { package: '💎 260', category: '🔷 PAKET MENENGAH', price: 34990 },
      { package: '💎 280', category: '🔷 PAKET MENENGAH', price: 36990 },
      { package: '💎 300', category: '🔶 MENENGAH – BESAR', price: 40000 },
      { package: '💎 350', category: '🔶 MENENGAH – BESAR', price: 46000 },
      { package: '💎 375', category: '🔶 MENENGAH – BESAR', price: 48000 },
      { package: '💎 400 ⭐', category: '🔶 MENENGAH – BESAR', price: 52000 },
      { package: '💎 405', category: '🔶 MENENGAH – BESAR', price: 52500 },
      { package: '💎 420', category: '🔶 MENENGAH – BESAR', price: 53000 },
      { package: '💎 425', category: '🔶 MENENGAH – BESAR', price: 54990 },
      { package: '💎 475', category: '🔶 MENENGAH – BESAR', price: 59000 },
      { package: '💎 500 ⭐', category: '🔶 MENENGAH – BESAR', price: 62000 },
      { package: '💎 520', category: '🔶 MENENGAH – BESAR', price: 66000 },
      { package: '💎 545', category: '🔶 MENENGAH – BESAR', price: 69500 },
      { package: '💎 565', category: '🔶 MENENGAH – BESAR', price: 72000 },
      { package: '💎 600', category: '🔶 MENENGAH – BESAR', price: 77000 },
      { package: '💎 645', category: '🔶 MENENGAH – BESAR', price: 82000 },
      { package: '💎 655', category: '🔶 MENENGAH – BESAR', price: 84000 },
      { package: '💎 700', category: '🔶 MENENGAH – BESAR', price: 90000 },
      { package: '💎 725', category: '🔶 MENENGAH – BESAR', price: 93000 },
      { package: '💎 770 ⭐', category: '🔶 MENENGAH – BESAR', price: 100000 },
      { package: '💎 800', category: '🔶 MENENGAH – BESAR', price: 105000 },
      { package: '💎 860', category: '🔶 MENENGAH – BESAR', price: 112000 },
      { package: '💎 925', category: '🔶 MENENGAH – BESAR', price: 121000 },
      { package: '💎 1000', category: '🔶 MENENGAH – BESAR', price: 130000 },
      { package: '💎 1200', category: '👑 PAKET JUMBO', price: 150000 },
      { package: '💎 1300', category: '👑 PAKET JUMBO', price: 162999 },
      { package: '💎 1440 ⭐', category: '👑 PAKET JUMBO', price: 180000 },
      { package: '💎 1490', category: '👑 PAKET JUMBO', price: 186000 },
      { package: '💎 1580', category: '👑 PAKET JUMBO', price: 198000 },
      { package: '💎 1800', category: '👑 PAKET JUMBO', price: 226000 },
      { package: '💎 2000 ⭐', category: '👑 PAKET JUMBO', price: 252000 },
      { package: '💎 2100', category: '👑 PAKET JUMBO', price: 265000 },
      { package: '💎 2200', category: '👑 PAKET JUMBO', price: 278000 },
      { package: '💎 2280', category: '👑 PAKET JUMBO', price: 290000 },
      { package: '💎 2350', category: '👑 PAKET JUMBO', price: 300000 },
      { package: '💎 2400', category: '👑 PAKET JUMBO', price: 310000 },
      { package: '💎 2575', category: '👑 PAKET JUMBO', price: 335000 },
      { package: '💎 2720', category: '👑 PAKET JUMBO', price: 355000 },
      { package: '💎 3000', category: '👑 PAKET JUMBO', price: 390000 },
      { package: '💎 3310', category: '🔥👑 SUPER JUMBO', price: 430000 },
      { package: '💎 3640', category: '🔥👑 SUPER JUMBO', price: 470000 },
      { package: '💎 3800', category: '🔥👑 SUPER JUMBO', price: 495000 },
      { package: '💎 4000 ⭐', category: '🔥👑 SUPER JUMBO', price: 520998 },
      { package: '💎 4340', category: '🔥👑 SUPER JUMBO', price: 565000 },
      { package: '💎 4720', category: '🔥👑 SUPER JUMBO', price: 615000 },
      { package: '💎 5500', category: '🔥👑 SUPER JUMBO', price: 720000 },
      { package: '💎 6000', category: '🔥👑 SUPER JUMBO', price: 790000 },
      { package: '💎 6480', category: '🔥👑 SUPER JUMBO', price: 850000 },
      { package: '💎 6900', category: '🔥👑 SUPER JUMBO', price: 910000 },
      { package: '💎 7290', category: '🔥👑 SUPER JUMBO', price: 960000 },
      { package: '💎 8010', category: '🔥👑 SUPER JUMBO', price: 1050000 },
      { package: '💎 9290', category: '🔥👑 SUPER JUMBO', price: 1200000 },
      { package: '💎 9800', category: '🔥👑 SUPER JUMBO', price: 1260000 },
      { package: '💎 14850', category: '🔥👑 SUPER JUMBO', price: 1850000 },
      { package: '💎 36500', category: '🔥👑 SUPER JUMBO', price: 4750000 },
      { package: '💎 37050', category: '🔥👑 SUPER JUMBO', price: 4820000 },
      { package: '💎 73100', category: '🔥👑 SUPER JUMBO', price: 9000000 }
    ],
    pubg: [
      { package: '60 UC', category: '🟤 PAKET BRONZE', price: 16200 },
      { package: '120 UC', category: '🟤 PAKET BRONZE', price: 32400 },
      { package: '180 UC', category: '🟤 PAKET BRONZE', price: 47600 },
      { package: '240 UC', category: '🟤 PAKET BRONZE', price: 63800 },
      { package: '325 UC (300+25)', category: '⚪ PAKET SILVER', price: 79500 },
      { package: '385 UC (360+25)', category: '⚪ PAKET SILVER', price: 94600 },
      { package: '445 UC (420+25)', category: '⚪ PAKET SILVER', price: 111800 },
      { package: '505 UC (480+25)', category: '⚪ PAKET SILVER', price: 126900 },
      { package: '565 UC (540+25)', category: '🟡 PAKET GOLD', price: 142200 },
      { package: '660 UC (600+60)', category: '🟡 PAKET GOLD', price: 158700 },
      { package: '720 UC', category: '🟡 PAKET GOLD', price: 174900 },
      { package: '780 UC', category: '🟡 PAKET GOLD', price: 189500 },
      { package: '840 UC', category: '🔷 PAKET PLATINUM', price: 204000 },
      { package: '900 UC', category: '🔷 PAKET PLATINUM', price: 219000 },
      { package: '985 UC', category: '🔷 PAKET PLATINUM', price: 244000 },
      { package: '1105 UC', category: '🔷 PAKET PLATINUM', price: 274500 },
      { package: '1320 UC', category: '💎 PAKET DIAMOND', price: 313500 },
      { package: '1500 UC', category: '💎 PAKET DIAMOND', price: 364000 },
      { package: '1800 UC', category: '💎 PAKET DIAMOND', price: 394000 },
      { package: '2125 UC', category: '💎 PAKET DIAMOND', price: 467000 },
      { package: '2460 UC', category: '👑 PAKET CROWN', price: 547000 },
      { package: '2785 UC', category: '👑 PAKET CROWN', price: 623000 },
      { package: '3120 UC', category: '👑 PAKET CROWN', price: 705500 },
      { package: '3850 UC', category: '👑 PAKET CROWN', price: 782000 },
      { package: '4030 UC', category: '🏆 PAKET CONQUEROR', price: 828000 },
      { package: '4510 UC', category: '🏆 PAKET CONQUEROR', price: 935000 },
      { package: '5650 UC', category: '🏆 PAKET CONQUEROR', price: 1171000 },
      { package: '8100 UC', category: '🏆 PAKET CONQUEROR', price: 1564000 },
      { package: 'Elite Pass PUBG Mobile', category: '🎟️ ELITE PASS', price: 184000 },
      { package: 'Elite Pass Plus PUBG Mobile', category: '🎟️ ELITE PASS', price: 465000 },
      { package: '60 UC Voucher', category: '🎫 VOUCHER REDEEM', price: 16000 },
      { package: '325 UC Voucher', category: '🎫 VOUCHER REDEEM', price: 79000 },
      { package: '660 UC Voucher', category: '🎫 VOUCHER REDEEM', price: 158000 },
      { package: '1800 UC Voucher', category: '🎫 VOUCHER REDEEM', price: 394000 },
      { package: '3850 UC Voucher', category: '🎫 VOUCHER REDEEM', price: 782000 }
    ],
    roblox: [
      { package: '400 Robux', category: '🎮 PAKET STANDAR', price: 25000 },
      { package: '800 Robux', category: '🎮 PAKET STANDAR', price: 45000 },
      { package: '1700 Robux', category: '🌟 PAKET PREMIUM', price: 85000 },
      { package: '4500 Robux', category: '🎮 PAKET JUMBO', price: 200000 }
    ],
    genshin: [
      { package: '60 Primogem', category: '✨ PAKET KECIL', price: 10000 },
      { package: '300 Primogem', category: '✨ PAKET MENENGAH', price: 45000 },
      { package: '980 Primogem', category: '✨ PAKET BESAR', price: 120000 },
      { package: '1980 Primogem', category: '✨ PAKET JUMBO', price: 240000 }
    ],
    telegram: [
      { package: '1 Star', category: '⭐ PAKET KECIL', price: 5000 },
      { package: '10 Stars', category: '⭐ PAKET MENENGAH', price: 45000 },
      { package: '25 Stars', category: '⭐ PAKET BESAR', price: 100000 },
      { package: '100 Stars', category: '⭐ PAKET JUMBO', price: 350000 }
    ],
    redfinger: [
      { package: '30 Hari', category: '🎟️ PAKET AKSES', price: 35000 },
      { package: '90 Hari', category: '🎟️ PAKET AKSES', price: 90000 },
      { package: '180 Hari', category: '🎟️ PAKET AKSES', price: 165000 },
      { package: '365 Hari', category: '🎟️ PAKET AKSES', price: 300000 }
    ]
  };

  const dataHandler = {
    onDataChanged(data) {
      allOrders = data || [];
    }
  };

  async function initSDK() {
    if (window.dataSdk) {
      await window.dataSdk.init(dataHandler);
    }
    renderGames();
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function scrollToGames() {
    const gamesElement = document.getElementById('games');
    if (gamesElement) {
        gamesElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function renderGames() {
    const grid = document.getElementById('gamesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    games.forEach(game => {
      const card = document.createElement('div');
      card.className = 'game-card';

      if (game.id === 'redfinger') {
        card.addEventListener('click', () => window.open('https://direzstore.my.id/redfinger', '_blank'));
      } else if (game.id === 'genshin') {
        card.addEventListener('click', () => window.open('https://direzstore.my.id/genshin-impact', '_blank'));
      } else if (game.id === 'telegram') {
        card.addEventListener('click', () => window.open('https://direzstore.my.id/telestars', '_blank'));
      } else if (game.id === 'roblox') {
        card.addEventListener('click', () => window.open('https://direz-store-robloxrobux.my.canva.site', '_blank'));
      } else if (game.id === 'ewallet') {
        card.addEventListener('click', () => window.open('https://direzstorebydiorezz.my.canva.site/e-wallet', '_blank'));
      } else {
        card.addEventListener('click', () => showPrices(game.id, game.name));
      }

      card.innerHTML = `
        <div class="game-icon">
          <img src="assets/Picture/${game.image}" alt="${game.name}" loading="lazy" onerror="this.src='assets/Picture/default-game.jpg'">
        </div>
        <div class="game-name">${game.name}</div>
        <div class="game-status">${game.status}</div>
      `;
      grid.appendChild(card);
    });
  }

  function searchGames() {
    const input = document.getElementById('searchInput');
    const dropdown = document.getElementById('searchDropdown');
    const inputValue = input.value.toLowerCase().trim();

    if (inputValue.length === 0) {
      dropdown.classList.remove('active');
      return;
    }

    const filtered = games.filter(game =>
      game.name.toLowerCase().includes(inputValue) ||
      game.id.toLowerCase().includes(inputValue)
    );

    if (filtered.length === 0) {
      dropdown.classList.remove('active');
      return;
    }

    dropdown.innerHTML = '';
    filtered.forEach(game => {
      const item = document.createElement('div');
      item.className = 'search-item';
      item.innerHTML = `<span class="search-item-icon"><img src="assets/Picture/${game.image}" alt="${game.name}" loading="lazy" onerror="this.src='assets/Picture/default-game.jpg'"></span>${game.name}`;
      item.addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        dropdown.classList.remove('active');
        if (game.id === 'redfinger') {
          window.open('https://direzstore.my.id/redfinger', '_blank');
        } else if (game.id === 'genshin') {
          window.open('https://direzstore.my.id/genshin-impact', '_blank');
        } else if (game.id === 'telegram') {
          window.open('https://direzstore.my.id/telestars', '_blank');
        } else if (game.id === 'roblox') {
          window.open('https://direz-store-robloxrobux.my.canva.site', '_blank');
        } else if (game.id === 'ewallet') {
          window.open('https://direzstorebydiorezz.my.canva.site/e-wallet', '_blank');
        } else {
          showPrices(game.id, game.name);
        }
      });
      dropdown.appendChild(item);
    });

    dropdown.classList.add('active');
  }

  function showPrices(gameId, gameName) {
    currentOrder.game = gameId;
    currentOrder.gameName = gameName;

    const serverIdGroup = document.getElementById('serverIdGroup');
    if (gameId === 'ml') {
      serverIdGroup.style.display = 'block';
    } else {
      serverIdGroup.style.display = 'none';
      document.getElementById('serverId').value = '';
    }

    const priceTitle = document.getElementById('priceTitle');
    const priceGrid = document.getElementById('priceGrid');

    priceTitle.textContent = `Pilih Paket ${gameName}`;
    priceGrid.innerHTML = '';

    const grouped = {};
    prices[gameId].forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    Object.entries(grouped).forEach(([category, items]) => {
      const categoryHeader = document.createElement('div');
      categoryHeader.style.cssText = `
        grid-column: 1 / -1;
        font-size: 1.1rem;
        font-weight: 900;
        color: #ffed4e;
        background: rgba(212, 175, 133, 0.1);
        padding: 0.8rem 1.2rem;
        border-radius: 10px;
        border-left: 4px solid #d4af85;
        margin-top: 1rem;
        font-family: 'Cairo', sans-serif;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 0.8rem;
      `;
      categoryHeader.textContent = category;
      priceGrid.appendChild(categoryHeader);

      items.forEach((item) => {
        const box = document.createElement('div');
        box.className = 'price-item';

        let priceContent;
        if (item.habis) {
          priceContent = `
            <div class="price-habis">HABIS</div>
          `;
        } else {
          priceContent = `
            <div class="price-amount">${item.package}</div>
            <div class="price-rupiah">Rp${item.price.toLocaleString('id-ID')}</div>
          `;
        }

        box.innerHTML = priceContent;
        if (!item.habis) {
          box.addEventListener('click', (e) => selectPrice(item, e));
        } else {
          box.style.cursor = 'not-allowed';
          box.style.opacity = '0.6';
        }
        priceGrid.appendChild(box);
      });
    });

    const priceSection = document.getElementById('priceSection');
    priceSection.classList.add('active');

    setTimeout(() => {
      priceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  function selectPrice(item, event) {
    document.querySelectorAll('.price-item:not([style*="opacity"])').forEach(el => el.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    currentOrder.package = item.package;
    currentOrder.price = item.price;
    currentOrder.quantity = 1;

    document.getElementById('summaryGame').textContent = currentOrder.gameName;
    document.getElementById('summaryPackage').textContent = item.package;
    document.getElementById('summaryTotal').textContent = `Rp${item.price.toLocaleString('id-ID')}`;
    document.getElementById('qtyDisplay').textContent = '1';

    const formSection = document.getElementById('formSection');
    formSection.classList.add('active');

    setTimeout(() => {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  function increaseQty() {
    if (currentOrder.quantity < 10) {
      currentOrder.quantity++;
      updateTotal();
    }
  }

  function decreaseQty() {
    if (currentOrder.quantity > 1) {
      currentOrder.quantity--;
      updateTotal();
    }
  }

  function updateTotal() {
    const total = currentOrder.price * currentOrder.quantity;
    document.getElementById('qtyDisplay').textContent = currentOrder.quantity;
    document.getElementById('summaryTotal').textContent = `Rp${total.toLocaleString('id-ID')}`;
  }

  function selectPayment(method, btn) {
    document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('selected'));
    btn.classList.add('selected');
    selectedPayment = method;
    document.getElementById('paymentMethod').value = method;
  }

  function cancelOrder() {
    document.getElementById('formSection').classList.remove('active');
    document.getElementById('priceSection').classList.remove('active');
    document.querySelectorAll('.price-item').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('selected'));
    document.getElementById('gameId').value = '';
    document.getElementById('serverId').value = '';
    document.getElementById('nickname').value = '';
    document.getElementById('whatsapp').value = '';
    document.getElementById('email').value = '';
    selectedPayment = '';
  }

  function generateOrderNumber() {
    return `DRZ-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }

  function generateRedeemCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'RDMN-';
    for (let i = 0; i < 12; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  async function submitOrder(e) {
    e.preventDefault();

    if (!selectedPayment) {
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'background: rgba(239, 68, 68, 0.2); color: #fca5a5; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; text-align: center; font-weight: 700; border: 1.5px solid rgba(239, 68, 68, 0.3);';
      errorDiv.textContent = '⚠️ Pilih metode pembayaran terlebih dahulu!';
      document.getElementById('formSection').insertBefore(errorDiv, document.getElementById('formSection').firstChild);
      setTimeout(() => errorDiv.remove(), 3000);
      return;
    }

    const gameId = document.getElementById('gameId').value;
    const serverId = document.getElementById('serverId').value;
    const nickname = document.getElementById('nickname').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const email = document.getElementById('email').value;

    const orderNum = generateOrderNumber();
    const redeemCode = generateRedeemCode();
    const total = currentOrder.price * currentOrder.quantity;

    const orderData = {
      order_number: orderNum,
      game: currentOrder.gameName,
      package: currentOrder.package,
      price: `Rp${total.toLocaleString('id-ID')}`,
      game_id: gameId,
      server_id: serverId,
      nickname: nickname,
      whatsapp: whatsapp,
      email: email,
      payment_method: selectedPayment,
      redeem_code: redeemCode,
      status: 'pending',
      order_date: new Date().toISOString()
    };

    if (window.dataSdk) {
      const result = await window.dataSdk.create(orderData);
      if (result.isOk) {
        showReceipt(orderNum, currentOrder.gameName, currentOrder.package, nickname, total, selectedPayment, gameId, serverId, email, redeemCode);
        cancelOrder();
      }
    } else {
        // Fallback for when SDK is missing (for local testing)
        showReceipt(orderNum, currentOrder.gameName, currentOrder.package, nickname, total, selectedPayment, gameId, serverId, email, redeemCode);
        cancelOrder();
    }
  }

  function showReceipt(orderNum, game, pkg, nickname, total, payment, gameId, serverId, email, redeemCode) {
    document.getElementById('modalOrderNum').textContent = orderNum;
    document.getElementById('modalGame').textContent = game;
    document.getElementById('modalPackage').textContent = pkg;
    document.getElementById('modalGameId').textContent = gameId;
    document.getElementById('modalNickname').textContent = nickname;
    document.getElementById('modalPayment').textContent = payment.toUpperCase();
    document.getElementById('modalTotal').textContent = `Rp${total.toLocaleString('id-ID')}`;
    document.getElementById('modalRedeemCode').textContent = redeemCode;

    currentReceipt = { orderNum, game, pkg, nickname, total, payment, whatsapp: document.getElementById('whatsapp').value, email: email, gameId, serverId, redeemCode, quantity: currentOrder.quantity, price: currentOrder.price };
    document.getElementById('receiptModal').classList.add('show');
  }

  function closeReceipt() {
    document.getElementById('receiptModal').classList.remove('show');
  }

  function sendToWhatsApp() {
    const r = currentReceipt;
    if (!r) return;
    const adminPhone = '6285646335331';
    const dateStr = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    const msg = `╔═════════════════════════════════╗
║  ✅ PESANAN SUKSES - DIREZ STORE ✅  ║
║      Ramadan Mubarak 1447 H          ║
║        100% Amanah & Terpercaya      ║
╚═══════════════════════════════════════╝

📦 NOMOR PESANAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${r.orderNum}

👤 DATA PELANGGAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nama Pemain     : ${r.nickname}
📱 WhatsApp     : ${r.whatsapp}
📧 Email        : ${r.email}

🎮 DETAIL PEMBELIAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Game           : ${r.game}
Paket          : ${r.pkg}
Jumlah         : ${r.quantity}x
Harga Satuan   : Rp${r.price.toLocaleString('id-ID')}
🆔 ID Game     : ${r.gameId}
${r.serverId ? `🏰 ID Server   : ${r.serverId}\n` : ''}
💳 METODE PEMBAYARAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${r.payment.toUpperCase()}

💰 TOTAL BAYAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Rp${r.total.toLocaleString('id-ID')}

🎁 KODE REDEEM ANDA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${r.redeemCode}

Nilai Kode Redeem : Rp${r.total.toLocaleString('id-ID')}
✨ Gunakan untuk pembelian berikutnya! ✨

📅 TANGGAL & WAKTU
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${dateStr}

════════════════════════════════════════
✅ PESANAN DITERIMA & DIPROSES SEGERA ✅
════════════════════════════════════════

📞 HUBUNGI ADMIN
💬 Chat: https://wa.me/${adminPhone}
🌐 Website: https://direzstorebydiorezz.my.canva.site

Terimakasih telah berbelanja di DiRez Store!
Semoga bermanfaat & barokah di bulan Ramadan ✨

دعاء وصيام وقيام مقبول بإذن الله
والسلام عليكم ورحمة الله وبركاته`;

    window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function sendToEmail() {
    const r = currentReceipt;
    if (!r) return;
    const adminEmail = 'direzstudio@gmail.com';
    const dateStr = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    const emailBody = `════════════════════════════════════════════════════════════
✅ STRUK PESANAN DIREZ STORE - 100% AMANAH ║
══════════════════════════════════════════════════════════════════

NOMOR PESANAN: ${r.orderNum}
Tanggal & Waktu: ${dateStr}

DATA PELANGGAN
──────────────────────────────────────────────────────────
Nama Pemain    : ${r.nickname}
WhatsApp       : ${r.whatsapp}
Email          : ${r.email}

DETAIL PEMBELIAN
──────────────────────────────────────────────────────────
Game           : ${r.game}
Paket          : ${r.pkg}
Jumlah         : ${r.quantity}x
Harga Satuan   : Rp${r.price.toLocaleString('id-ID')}
ID Game        : ${r.gameId}
${r.serverId ? `ID Server      : ${r.serverId}\n` : ''}
METODE PEMBAYARAN
──────────────────────────────────────────────────────────
${r.payment.toUpperCase()}

RINCIAN BIAYA
──────────────────────────────────────────────────────────
Subtotal       : Rp${r.price.toLocaleString('id-ID')} x ${r.quantity}
─────────────────────────────────────────────────────────
TOTAL BAYAR    : Rp${r.total.toLocaleString('id-ID')}
═════════════════════════════════════════════════════════

🎁 KODE REDEEM ANDA
═════════════════════════════════════════════════════════
${r.redeemCode}

Nilai Kode Redeem: Rp${r.total.toLocaleString('id-ID')}
✨ Gunakan untuk pembelian berikutnya! ✨

════════════════════════════════════════════════════════════
✅ PESANAN DITERIMA & DIPROSES SEGERA ✅
════════════════════════════════════════════════════════════

Terimakasih telah mempercayai DiRez Store!
Pesanan Anda akan diproses dalam waktu segera.

Semoga bermanfaat dan barokah! ✨

DiRez Store
100% Amanah • Terpercaya • Berkah
https://direzstorebydiorezz.my.canva.site
WhatsApp Admin: https://wa.me/6285646335331

دعاء وصيام وقيام مقبول بإذن الله
والسلام عليكم ورحمة الله وبركاته`;

    const subject = `📦 Struk Pesanan DiRez Store - ${r.orderNum}`;
    const mailtoLink = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  }

  function contactAdmin() {
    const adminPhone = '6285646335331';
    window.open(`https://wa.me/${adminPhone}`, '_blank');
  }

  function openHistory(e) {
    if (e) e.preventDefault();
    document.getElementById('historyPhoneInput').value = '';
    document.getElementById('historyFormSection').style.display = 'block';
    document.getElementById('historyList').style.display = 'none';
    document.getElementById('historyModal').classList.add('show');
  }

  function searchHistory() {
    const searchPhone = document.getElementById('historyPhoneInput').value.trim();
    const list = document.getElementById('historyList');

    if (!searchPhone) {
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'background: rgba(239, 68, 68, 0.2); color: #fca5a5; padding: 1rem; border-radius: 8px; text-align: center; font-weight: 700; border: 1.5px solid rgba(239, 68, 68, 0.3); margin-bottom: 1rem;';
      errorDiv.textContent = '⚠️ Masukkan nomor WhatsApp terlebih dahulu!';
      list.innerHTML = '';
      list.appendChild(errorDiv);
      list.style.display = 'block';
      return;
    }

    const filteredOrders = allOrders.filter(order => order.whatsapp === searchPhone);
    list.innerHTML = '';

    if (filteredOrders.length === 0) {
      const notFoundDiv = document.createElement('div');
      notFoundDiv.style.cssText = `
        background: linear-gradient(135deg, #1a5f47 0%, #0d3b2a 100%);
        border: 3px solid #d4af85;
        border-radius: 16px;
        padding: 3rem 2rem;
        text-align: center;
        box-shadow: 0 8px 25px rgba(212, 175, 133, 0.15);
      `;
      notFoundDiv.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1.5rem;">❌</div>
        <div style="font-size: 1.8rem; font-weight: 900; background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-family: 'Playfair Display', 'Abril Fatface', 'Cairo', sans-serif; margin-bottom: 1rem;">Pesanan Tidak Ditemukan</div>
        <div style="color: #d4af85; font-size: 1rem; font-weight: 700; margin-bottom: 1.5rem;">Nomor WhatsApp: <span style="color: #f5deb3;">${searchPhone}</span></div>
      `;
      list.appendChild(notFoundDiv);
    } else {
      filteredOrders.forEach((order, index) => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `
          <div class="history-order-num">
            <span>📦</span>${order.order_number}
          </div>
          <div class="history-details">
            <div><strong>🎮 Game:</strong> ${order.game} - ${order.package}</div>
            <div><strong>💰 Total:</strong> ${order.price}</div>
            <div><strong>🎁 Kode Redeem:</strong> ${order.redeem_code}</div>
            <div><strong>👤 Nama:</strong> ${order.nickname}</div>
            <div><strong>💳 Metode:</strong> ${order.payment_method.toUpperCase()}</div>
          </div>
        `;
        list.appendChild(item);
      });
    }

    document.getElementById('historyFormSection').style.display = 'none';
    document.getElementById('historyList').style.display = 'block';
  }

  function resetHistory() {
    document.getElementById('historyPhoneInput').value = '';
    document.getElementById('historyFormSection').style.display = 'block';
    document.getElementById('historyList').style.display = 'none';
  }

  function closeHistory() {
    document.getElementById('historyModal').classList.remove('show');
  }

  // --- Attach Event Listeners ---

  // Header Logo
  const logo = document.querySelector('.logo');
  if (logo) logo.addEventListener('click', scrollToTop);

  // History Nav Link
  const historyLink = document.getElementById('nav-history');
  if (historyLink) historyLink.addEventListener('click', openHistory);

  // Search Input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.addEventListener('keyup', searchGames);

  // Event Buttons
  const btnScrollGames = document.getElementById('btn-scroll-games');
  if (btnScrollGames) btnScrollGames.addEventListener('click', scrollToGames);

  const btnWebEvent = document.getElementById('btn-web-event');
  if (btnWebEvent) btnWebEvent.addEventListener('click', () => window.open('https://direzstore.my.id/event', '_blank'));

  // Quantity Buttons
  const btnQtyDec = document.getElementById('btn-qty-dec');
  if (btnQtyDec) btnQtyDec.addEventListener('click', decreaseQty);

  const btnQtyInc = document.getElementById('btn-qty-inc');
  if (btnQtyInc) btnQtyInc.addEventListener('click', increaseQty);

  // Payment Options
  // Note: These are static in the original HTML but might be better dynamic or we loop.
  // In the original, they are static HTML.
  const paymentOptions = document.querySelectorAll('.payment-option');
  paymentOptions.forEach(btn => {
    // We need to know which method it corresponds to.
    // The original passed 'gopay', 'dana', etc.
    // I should add data-method attribute in HTML or infer from text.
    // Best is to add data-method in HTML. I will assume I add it.
    btn.addEventListener('click', (e) => {
        // If data-method is missing, we can try to guess or just rely on the button having an attribute.
        // I will add data-method to the HTML buttons.
        const method = btn.getAttribute('data-method');
        if (method) selectPayment(method, btn);
    });
  });

  // Form Submit
  const form = document.querySelector('form');
  if (form) form.addEventListener('submit', submitOrder);

  // Cancel Button
  const btnCancel = document.getElementById('btn-cancel-order');
  if (btnCancel) btnCancel.addEventListener('click', cancelOrder);

  // Footer Contact
  const btnContactAdmin = document.getElementById('btn-contact-admin');
  if (btnContactAdmin) btnContactAdmin.addEventListener('click', contactAdmin);

  // Receipt Modal Actions
  const btnReceiptWa = document.getElementById('btn-receipt-wa');
  if (btnReceiptWa) btnReceiptWa.addEventListener('click', sendToWhatsApp);

  const btnReceiptEmail = document.getElementById('btn-receipt-email');
  if (btnReceiptEmail) btnReceiptEmail.addEventListener('click', sendToEmail);

  const btnReceiptClose = document.getElementById('btn-receipt-close');
  if (btnReceiptClose) btnReceiptClose.addEventListener('click', closeReceipt);

  // History Modal Actions
  const btnHistorySearch = document.getElementById('btn-history-search');
  if (btnHistorySearch) btnHistorySearch.addEventListener('click', searchHistory);

  const btnHistoryReset = document.getElementById('btn-history-reset');
  if (btnHistoryReset) btnHistoryReset.addEventListener('click', resetHistory);

  const btnHistoryClose = document.getElementById('btn-history-close');
  if (btnHistoryClose) btnHistoryClose.addEventListener('click', closeHistory);

  // Initialize
  initSDK();
});
