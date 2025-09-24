// Seleciona o formulário
const foodForm = document.getElementById('foodRegistrationForm');

// Evento de envio do formulário
foodForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita o reload da página

    const foodData = {
        name: document.getElementById('foodName').value,
        type: document.getElementById('foodType').value,
        quantity: document.getElementById('quantity').value,
        expiryDate: document.getElementById('expiryDate').value,
        description: document.getElementById('description').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
    };

    console.log('Alimento cadastrado:', foodData);

    // Aqui você pode enviar para um backend via fetch/AJAX
    alert('Alimento cadastrado com sucesso!');

    // Limpar formulário
    foodForm.reset();
});

// Botão de geolocalização
const getLocationBtn = document.getElementById('getLocationBtn');
const locationStatus = document.getElementById('locationStatus');

getLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        locationStatus.textContent = 'Localizando...';
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            locationStatus.textContent = `Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`;
        }, (err) => {
            locationStatus.textContent = 'Não foi possível obter localização';
        });
    } else {
        locationStatus.textContent = 'Geolocalização não suportada';
    }
});