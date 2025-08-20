function togglePasswordVisibility() {
    const pwd = document.getElementById('password');
    const icon = document.getElementById('eye-icon');
    if (pwd.type === 'password') {
    pwd.type = 'text';
    icon.textContent = 'visibility_off';
    } else {
    pwd.type = 'password';
    icon.textContent = 'visibility';
    }
}
function handleGoogleOauth() {
    // This would trigger your OAuth 2.0 Google login flow
    window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile";
}