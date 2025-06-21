// --- Typewriter Effect Initialization ---
document.addEventListener("DOMContentLoaded", function() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) {
        console.error("Typewriter: Element with ID 'typewriter' not found. Typewriter effect may not apply.");
    }
    // No dynamic CSS manipulation needed here, as 'steps' is now fixed in CSS.
    // The CSS 'width: 0' and 'animation' properties handle the effect directly.
});


// --- Slider Logic ---
document.addEventListener("DOMContentLoaded", function() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const sliderTiles = document.querySelectorAll('.slider-tile');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');

    let currentIndex = 0;
    const totalTiles = sliderTiles.length;

    // Initial console logs for setup verification
    console.log("Slider Init: Starting slider initialization.");
    console.log("Slider Init: Found sliderWrapper:", sliderWrapper);
    console.log("Slider Init: Found sliderTiles (NodeList):", sliderTiles);
    console.log("Slider Init: Number of tiles found:", totalTiles);
    
    // Log content of each tile for debugging (first 100 chars)
    sliderTiles.forEach((tile, index) => {
        console.log(`Slider Init: Tile ${index} innerHTML sample:`, tile.innerHTML.trim().substring(0, 100) + '...'); 
    });

    // Function to calculate and apply transform
    function updateSliderPosition() {
        if (totalTiles === 0 || !sliderTiles[0]) {
            console.warn("Slider Update: No tiles found or first tile is null, cannot update position.");
            return;
        }

        const firstTile = sliderTiles[0];
        const tileRect = firstTile.getBoundingClientRect(); // Get dimensions including padding and border
        const tileComputedStyle = getComputedStyle(firstTile);
        
        const tileMarginLeft = parseFloat(tileComputedStyle.marginLeft);
        const tileMarginRight = parseFloat(tileComputedStyle.marginRight);
        
        // Use getBoundingClientRect().width for the visible width of the tile
        const tileVisibleWidth = tileRect.width; 
        // Calculate the total space one tile occupies, including its margins
        const tileTotalWidth = tileVisibleWidth + tileMarginLeft + tileMarginRight;
        
        // Calculate the offset to bring the current tile into view at the left edge of its visual slot
        const offset = -currentIndex * tileTotalWidth;
        sliderWrapper.style.transform = `translateX(${offset}px)`;

        // --- Extensive Debugging Logs for Responsiveness ---
        console.group("Slider Position Update Debug");
        console.log(`Viewport Width: ${window.innerWidth}px`);
        // Check if mobile media query is likely active
        if (window.innerWidth <= 768) {
            console.log("Media Query @media (max-width: 768px) is active.");
            console.log(`Expected min-width (mobile): 90vw = ${0.9 * window.innerWidth}px`);
            console.log(`Expected margin (mobile): 5vw = ${0.05 * window.innerWidth}px`);
        } else {
            console.log("Desktop/Larger View Active.");
            console.log(`Expected min-width (desktop): 250px`);
            console.log(`Expected margin (desktop): 15px`);
        }
        console.log(`Current Index: ${currentIndex}`);
        console.log(`First Tile getBoundingClientRect().width (visible width): ${tileVisibleWidth}px`);
        console.log(`First Tile computed margin-left: ${tileMarginLeft}px`);
        console.log(`First Tile computed margin-right: ${tileMarginRight}px`);
        console.log(`Calculated tileTotalWidth (visible width + margins): ${tileTotalWidth}px`);
        console.log(`Applied transform: translateX(${offset}px)`);
        console.groupEnd();
    }

    // Function to go to a specific slide index
    function goToSlide(index) {
        let newIndex = index;

        // Clamp the index to ensure it stays within valid bounds (0 to totalTiles - 1)
        newIndex = Math.max(0, Math.min(newIndex, totalTiles - 1));
        
        if (currentIndex !== newIndex) { // Only update if index actually changes
            currentIndex = newIndex;
            updateSliderPosition();
        } else {
            console.log(`Slider: Already at index ${newIndex}. No change.`);
        }
    }

    // Event Listeners for navigation buttons
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
    } else {
        console.error("Slider: Previous button not found.");
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    } else {
        console.error("Slider: Next button not found.");
    }

    // Initialize slider position after all images/content might be loaded
    // A small timeout helps ensure initial layout is stable before measurements
    // This is especially crucial for elements whose widths depend on viewport units (vw)
    setTimeout(updateSliderPosition, 100); 

    // Recalculate position on window resize for responsiveness
    window.addEventListener('resize', updateSliderPosition);
});
