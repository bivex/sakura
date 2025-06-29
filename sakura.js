class Sakura {
    constructor(selector, options = {}) {
        this.container = document.querySelector(selector);
        if (!this.container) {
            console.error('Sakura container not found for selector:', selector);
            return;
        }

        this.options = {
            numberOfPetals: options.numberOfPetals || 40,
            petalColors: options.petalColors || ['#ffc0cb', '#ffb6c1', '#fba3b3', '#f8a8bb'],
            animationNames: options.animationNames || ['fall', 'fall-sway-1', 'fall-sway-2', 'fall-sway-3'],
            minSize: options.minSize || 8,
            maxSize: options.maxSize || 15,
            minDuration: options.minDuration || 7,
            maxDuration: options.maxDuration || 12,
            minDelay: options.minDelay || 0,
            maxDelay: options.maxDelay || 5,
        };
        
        this.active = false;
        this.petals = [];
    }

    createPetal() {
        if (!this.active || this.petals.length >= this.options.numberOfPetals) {
            return;
        }

        const petal = document.createElement('div');
        petal.classList.add('sakura-petal');
        
        const size = Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize;
        const startX = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * (this.options.maxDuration - this.options.minDuration) + this.options.minDuration;
        const animationDelay = Math.random() * (this.options.maxDelay - this.options.minDelay) + this.options.minDelay;
        const randomAnimation = this.options.animationNames[Math.floor(Math.random() * this.options.animationNames.length)];
        const randomColor = this.options.petalColors[Math.floor(Math.random() * this.options.petalColors.length)];

        petal.style.width = `${size}px`;
        petal.style.height = `${size / 2}px`;
        petal.style.left = `${startX}px`;
        petal.style.top = `-${size * 2}px`;
        petal.style.background = `linear-gradient(to bottom right, ${randomColor}, #ffffff)`;
        petal.style.animationName = randomAnimation;
        petal.style.animationDuration = `${animationDuration}s`;
        petal.style.animationDelay = `${animationDelay}s`;
        petal.style.opacity = Math.random() * 0.5 + 0.4;

        this.container.appendChild(petal);
        this.petals.push(petal);

        petal.addEventListener('animationend', () => {
            this.removePetal(petal);
            // Only create a new petal if the animation is still active
            if(this.active) {
                this.createPetal();
            }
        }, { once: true }); // Ensure listener is called only once
    }
    
    removePetal(petal) {
        petal.remove();
        this.petals = this.petals.filter(p => p !== petal);
    }

    start() {
        if (this.active) {
            return;
        }
        this.active = true;
        // Initial burst of petals
        for (let i = 0; i < this.options.numberOfPetals; i++) {
            this.createPetal();
        }
    }

    stop() {
        this.active = false;
        // Let existing petals finish their animation.
        // New petals will not be created.
        // For an abrupt stop, we could do this:
        // this.petals.forEach(p => p.remove());
        // this.petals = [];
    }
} 
