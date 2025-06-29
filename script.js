document.addEventListener('DOMContentLoaded', () => {
    // Create a new instance of the Sakura library
    const sakura = new Sakura('.sakura-container', {
        numberOfPetals: 50 // You can customize options here
    });

    // Start the animation
    sakura.start();

    // You can also stop the animation later if you want
    // setTimeout(() => {
    //     sakura.stop();
    // }, 10000);
}); 
