/* ===== MONEYPRO - Lógica de Autenticação ===== */

// Carregar utilizadores da base de dados simulada (localStorage)
function getUsers() {
  const users = localStorage.getItem('moneypro_users');
  return users ? JSON.parse(users) : [
    { id: '8849201', phone: '923000000', pass: '123456', balance: 5000.00, invested: 0.00, vip: 0 }
  ];
}

function saveUsers(users) {
  localStorage.setItem('moneypro_users', JSON.stringify(users));
}

function toggleAuth() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  }
}

function showToast(msg) {
  const toast = document.getElementById('authToast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function handleLogin(event) {
  event.preventDefault();
  const phone = document.getElementById('loginPhone').value;
  const pass = document.getElementById('loginPass').value;
  
  const users = getUsers();
  const user = users.find(u => u.phone === phone && u.pass === pass);
  
  if (user) {
    sessionStorage.setItem('moneypro_current_user', JSON.stringify(user));
    showToast('Login realizado com sucesso!');
    setTimeout(() => window.location.href = 'index.html', 1000);
  } else {
    showToast('Número ou senha incorretos!');
  }
}

function handleRegister(event) {
  event.preventDefault();
  const phone = document.getElementById('regPhone').value;
  const pass = document.getElementById('regPass').value;
  const passConfirm = document.getElementById('regPassConfirm').value;
  
  if (pass !== passConfirm) {
    showToast('As senhas não coincidem!');
    return;
  }
  
  const users = getUsers();
  if (users.some(u => u.phone === phone)) {
    showToast('Este número já está registado!');
    return;
  }
  
  const newUser = {
    id: Math.floor(1000000 + Math.random() * 9000000).toString(),
    phone: phone,
    pass: pass,
    balance: 5000.00,
    invested: 0.00,
    vip: 0
  };
  
  users.push(newUser);
  saveUsers(users);
  
  showToast('Conta criada com sucesso! Faça login.');
  toggleAuth();
}
