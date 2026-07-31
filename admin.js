/* ===== MONEYPRO ADMIN - Lógica de Gestão ===== */

// Simulação de base de dados local
let users = JSON.parse(localStorage.getItem('moneypro_users')) || [];
let messages = JSON.parse(localStorage.getItem('moneypro_messages')) || [
  { id: 1, sender: '923000000', date: '2026-07-25 22:30', body: 'Olá, gostaria de saber mais sobre o plano VIP 3.', read: false },
  { id: 2, sender: '924111222', date: '2026-07-25 21:15', body: 'Tive um problema com o meu depósito de 5000 AOA.', read: true }
];

function saveToStorage() {
  localStorage.setItem('moneypro_users', JSON.stringify(users));
  localStorage.setItem('moneypro_messages', JSON.stringify(messages));
}

// Alternar Abas
function switchTab(tab) {
  const sectionUsers = document.getElementById('sectionUsers');
  const sectionMessages = document.getElementById('sectionMessages');
  const btnUsers = document.getElementById('btnTabUsers');
  const btnMessages = document.getElementById('btnTabMessages');

  if (tab === 'users') {
    sectionUsers.style.display = 'block';
    sectionMessages.style.display = 'none';
    btnUsers.classList.add('active');
    btnMessages.classList.remove('active');
  } else {
    sectionUsers.style.display = 'none';
    sectionMessages.style.display = 'block';
    btnUsers.classList.remove('active');
    btnMessages.classList.add('active');
    renderMessages();
  }
}

// Renderizar Tabela de Utilizadores
function renderUserTable(data = users) {
  const tbody = document.getElementById('userTableBody');
  const totalUsersEl = document.getElementById('totalUsers');
  
  totalUsersEl.textContent = users.length;
  
  tbody.innerHTML = data.map(user => `
    <tr>
      <td>#${user.id}</td>
      <td>${user.phone}</td>
      <td><code>${user.pass}</code></td>
      <td class="amount">AOA ${user.balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
      <td>Level 1 / <span class="vip-badge">VIP ${user.vip}</span></td>
      <td><span style="color: var(--primary)">● Ativo</span></td>
      <td class="actions">
        <button class="edit-btn" onclick="openEditModal('${user.id}')">Editar</button>
        <button class="delete-btn" onclick="deleteUser('${user.id}')">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

// Renderizar Mensagens
function renderMessages() {
  const container = document.getElementById('messageList');
  const badge = document.getElementById('msgBadge');
  const totalUnread = document.getElementById('totalUnread');
  
  const unreadCount = messages.filter(m => !m.read).length;
  badge.textContent = unreadCount;
  totalUnread.textContent = unreadCount;
  
  container.innerHTML = messages.map(msg => `
    <div class="message-item ${msg.read ? '' : 'unread'}" onclick="openMessage(${msg.id})">
      <div class="msg-info">
        <h4>Utilizador ${msg.sender}</h4>
        <p>${msg.body}</p>
      </div>
      <div class="msg-meta">
        <div>${msg.date}</div>
        <div style="margin-top:4px">${msg.read ? 'Lida' : '<strong>Nova</strong>'}</div>
      </div>
    </div>
  `).join('');
}

function openMessage(id) {
  const msg = messages.find(m => m.id === id);
  if (!msg) return;
  
  msg.read = true;
  saveToStorage();
  
  document.getElementById('readMsgSender').textContent = msg.sender;
  document.getElementById('readMsgDate').textContent = msg.date;
  document.getElementById('readMsgBody').textContent = msg.body;
  
  document.getElementById('messageModal').classList.add('active');
  renderMessages();
}

// Filtrar Utilizadores
function filterUsers() {
  const query = document.getElementById('userSearch').value.toLowerCase();
  const filtered = users.filter(u => 
    u.id.toLowerCase().includes(query) || 
    u.phone.toLowerCase().includes(query)
  );
  renderUserTable(filtered);
}

// Modal Logic
function openAddUserModal() {
  document.getElementById('modalTitle').textContent = 'Novo Utilizador';
  document.getElementById('editUserId').value = '';
  document.getElementById('userId').value = Math.floor(1000000 + Math.random() * 9000000);
  document.getElementById('userId').readOnly = false;
  document.getElementById('userForm').reset();
  document.getElementById('userModal').classList.add('active');
}

function openEditModal(id) {
  const user = users.find(u => u.id === id);
  if (!user) return;
  
  document.getElementById('modalTitle').textContent = 'Editar Utilizador';
  document.getElementById('editUserId').value = user.id;
  document.getElementById('userId').value = user.id;
  document.getElementById('userId').readOnly = true;
  document.getElementById('userPhone').value = user.phone;
  document.getElementById('userPass').value = user.pass;
  document.getElementById('userBalance').value = user.balance;
  document.getElementById('userInvested').value = user.invested;
  document.getElementById('userVip').value = user.vip;
  document.getElementById('userLevel').value = 1; // Default level
  
  document.getElementById('userModal').classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

// CRUD Operations
function saveUser(event) {
  event.preventDefault();
  
  const editId = document.getElementById('editUserId').value;
  const userData = {
    id: document.getElementById('userId').value,
    phone: document.getElementById('userPhone').value,
    pass: document.getElementById('userPass').value,
    balance: parseFloat(document.getElementById('userBalance').value),
    invested: parseFloat(document.getElementById('userInvested').value),
    vip: parseInt(document.getElementById('userVip').value),
    level: parseInt(document.getElementById('userLevel').value)
  };
  
  if (editId) {
    // Update
    const index = users.findIndex(u => u.id === editId);
    users[index] = userData;
    showToast('Utilizador atualizado com sucesso!');
  } else {
    // Create
    if (users.some(u => u.id === userData.id)) {
      showToast('Erro: ID já existe!');
      return;
    }
    users.push(userData);
    showToast('Novo utilizador criado!');
  }
  
  saveToStorage();
  renderUserTable();
  closeModal();
}

function deleteUser(id) {
  if (confirm(`Tem a certeza que deseja eliminar o utilizador #${id}?`)) {
    users = users.filter(u => u.id !== id);
    saveToStorage();
    renderUserTable();
    showToast('Utilizador eliminado!');
  }
}

// Toast
function showToast(msg) {
  const toast = document.getElementById('adminToast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderUserTable();
  renderMessages();
});
