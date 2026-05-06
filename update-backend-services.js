const fs = require('fs');
const path = require('path');

const root = process.cwd();
const write = (rel, content) => {
  const fullPath = path.join(root, rel);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
};

write('src/services/authService.js', `const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
const authTokenKey = 'authToken';

const getAuthHeaders = (hasBody = false) => {
  const headers = {};
  if (hasBody) headers['Content-Type'] = 'application/json';

  const token = localStorage.getItem(authTokenKey);
  if (token) headers['Authorization'] = 'Bearer ' + token;

  return headers;
};

const handleResponse = async (response) => {
  let data = null;
  try {
    data = await response.json();
  } catch {}

  if (!response.ok) {
    return {
      success: false,
      message: (data && (data.message || data.error)) || response.statusText,
      ...data,
    };
  }

  return data || { success: true };
};

const request = async (path, options = {}) => {
  const response = await fetch(\`\${API_BASE_URL}\${path}\`, options);
  return handleResponse(response);
};

export const login = async (email, password) => {
  const result = await request('/auth/login', {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify({ email, password }),
  });

  if (result.success && result.token) {
    localStorage.setItem(authTokenKey, result.token);
  }

  return result;
};

export const register = async (userData) => {
  const result = await request('/auth/register', {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(userData),
  });

  if (result.success && result.token) {
    localStorage.setItem(authTokenKey, result.token);
  }

  return result;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem(authTokenKey);
  if (!token) return null;

  const result = await request('/auth/me', {
    headers: getAuthHeaders(),
  });

  if (!result.success || !result.user) {
    localStorage.removeItem(authTokenKey);
    return null;
  }

  return result.user;
};

export const logout = () => {
  localStorage.removeItem(authTokenKey);
};
`);

write('src/services/transactionService.js', `const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const handleResponse = async (response) => {
  let data = null;
  try {
    data = await response.json();
  } catch {}

  if (!response.ok) {
    return {
      success: false,
      message: (data && (data.message || data.error)) || response.statusText,
      ...data,
    };
  }

  return data || { success: true };
};

const request = async (path, options = {}) => {
  const response = await fetch(\`\${API_BASE_URL}\${path}\`, options);
  return handleResponse(response);
};

export const createTransaction = async (...args) => {
  return request('/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
};
`);


// ✅ FIX package.json
const pkgPath = path.join(root, 'package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.scripts = pkg.scripts || {};
  pkg.scripts.server = 'node server.js';
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

// ✅ FIX .gitignore safely
const gitignorePath = path.join(root, '.gitignore');
let gitignore = '';

if (fs.existsSync(gitignorePath)) {
  gitignore = fs.readFileSync(gitignorePath, 'utf8');
}

if (!gitignore.includes('.env')) {
  gitignore += '\n.env\n';
  fs.writeFileSync(gitignorePath, gitignore);
}

console.log('✅ All errors fixed and files created');