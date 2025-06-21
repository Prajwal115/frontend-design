document.addEventListener("DOMContentLoaded", function() {
    const loaderWrapper = document.getElementById("loader-wrapper");
    const progressBar = document.getElementById("progress-bar");
    const content = document.getElementById("content");

    // Set the duration for the progress bar fill (2.5 seconds, adjust as desired)
    const progressBarDuration = 3500; // milliseconds
    const fadeOutLoaderDuration = 500; // milliseconds
    const fadeInContentDuration = 1000; // milliseconds

    // Start filling the progress bar
    progressBar.style.transitionDuration = `${progressBarDuration / 1000}s`;
    progressBar.style.width = "100%";

    // Once the progress bar fills, hide the loader and show the content
    setTimeout(() => {
        loaderWrapper.classList.add("hidden"); // Start fading out the loader

        // After the loader has faded out, make the content visible and allow scrolling
        setTimeout(() => {
            content.classList.add("visible"); // Start fading in the content
            document.body.style.overflow = "auto"; // Re-enable body scrolling
        }, fadeOutLoaderDuration); // Wait for loader to fully fade out
    }, progressBarDuration); // Wait for progress bar to complete
});