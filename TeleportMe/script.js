const ACCESS_KEY = 'woESLLBT_ef7C8FO1QqHp5Y59LwQbckF8uxeBzhqyEo'; 

const btn = document.getElementById('teleport-btn');
const bgContainer = document.getElementById('bg-container');
const loader = document.getElementById('loader');
const locationTag = document.getElementById('location-tag');
const locationText = document.getElementById('location-text');

btn.addEventListener('click', async () => {
    // Start loading UI
    loader.classList.remove('hidden');
    bgContainer.classList.remove('visible');
    
    try {
        // Fetch from Unsplash
        const response = await fetch('https://api.unsplash.com/photos/random?query=landscape', { headers: { Authorization: 'Client-ID ' + ACCESS_KEY } });
        
        // Check if the key actually worked
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - Check your Access Key!`);
        }

        const data = await response.json();
        const imageUrl = data.urls.regular; // 'regular' is faster to load than 'full'
        const locationName = data.location.name || "A beautiful secret location";

        // Pre-load the image in browser memory
        const tempImage = new Image();
        tempImage.src = imageUrl;

        tempImage.onload = () => {
            bgContainer.style.backgroundImage = `url('${imageUrl}')`;
            locationText.innerText = locationName;
            
            // Show
            setTimeout(() => {
                bgContainer.classList.add('visible');
                document.body.classList.add('teleported');
                locationTag.classList.remove('hidden');
                locationTag.style.opacity = '1';
                btn.innerText = "Teleport Again";
                loader.classList.add('hidden');
            }, 100);
        };

    } catch (error) {
        loader.classList.add('hidden');
        console.error(error);
        alert("Wait! " + error.message);
    }
});