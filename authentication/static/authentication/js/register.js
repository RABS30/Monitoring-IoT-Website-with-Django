// Utility: simple password strength estimator
function pwStrengthScore(pw) {
    let score = 0;
    if (!pw) return 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    if (pw.length >= 12) score += 1;
    return score; // 0..5
}

const pwBar = document.getElementById('pwBar');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const form = document.getElementById('registerForm');
const formError = document.getElementById('formError');

passwordInput.addEventListener('input', () => {
    const s = pwStrengthScore(passwordInput.value);
    const percent = Math.round((s / 5) * 100);
    pwBar.style.width = percent + '%';
    // color by strength
    if (s <= 1) pwBar.style.background = '#ff6b6b';
    else if (s <= 3) pwBar.style.background = '#ffb74d';
    else pwBar.style.background = '#66bb6a';
    // clear previous errors live
    formError.style.display = 'none';
});

// Toggle password visibility for fields with .toggle-btn
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const input = document.getElementById(targetId);
    const icon = btn.querySelector('.material-icons');
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = 'visibility_off';
        btn.setAttribute('aria-pressed', 'true');
    } else {
        input.type = 'password';
        icon.textContent = 'visibility';
        btn.setAttribute('aria-pressed', 'false');
    }
    });
});

// Basic client-side validation and submit handler (placeholder)
form.addEventListener('submit', (e) => {
    formError.style.display = 'none';
    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const pw = passwordInput.value;
    const cpw = confirmInput.value;
    const agree = document.getElementById('agree').checked;

    if (!name || !email || !pw || !cpw) {
    e.preventDefault();
    showError('Silakan isi semua field yang diperlukan.');
    return;
    }
    if (pw.length < 8) {
    e.preventDefault();
    showError('Password minimal 8 karakter.');
    return;
    }
    if (pw !== cpw) {
    e.preventDefault();
    showError('Password dan konfirmasi tidak sama.');
    return;
    }
    if (!agree) {
    e.preventDefault();
    showError('Anda harus menyetujui Syarat & Ketentuan.');
    return;
}
// Form akan tersubmit normal ke backend jika semua validasi lolos
});
function showError(msg) {
    formError.textContent = msg;
    formError.style.display = 'block';
}

// Google OAuth handler (placeholder)
function handleGoogleOauth() {
    // Replace YOUR_CLIENT_ID and YOUR_REDIRECT_URI with real values on backend integration
    const clientId = 'YOUR_CLIENT_ID';
    const redirect = encodeURIComponent('YOUR_REDIRECT_URI');
    const scope = encodeURIComponent('email profile');
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirect}&response_type=code&scope=${scope}`;
    // For demo one could open URL; real apps should start OAuth from server side
    window.location.href = url;
}

// "Masuk" link behaviour placeholder (navigate to login page)
document.getElementById('toLogin').addEventListener('click', (e) => {
    e.preventDefault();
    // navigate to login page in real app, e.g. window.location.href = '/login.html'
    alert('Navigasi ke halaman login (ganti dengan window.location.href ke halaman login Anda).');
});