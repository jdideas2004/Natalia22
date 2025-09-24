// Sound Permission and Background Music Control
let soundEnabled = false;
let audio = null;
let isPlaying = false;

function enableSound() {
    soundEnabled = true;
    document.getElementById('sound-modal').style.display = 'none';
    document.getElementById('music-control').style.display = 'block';
    
    // Get audio element and play "23" by Morat on loop
    audio = document.getElementById('background-music');
    
    // Try to play the music
    audio.play().then(() => {
        isPlaying = true;
        updateMusicButton();
    }).catch(e => {
        console.log('Audio play failed:', e);
        // If it fails, show an alert to user
        alert('Could not play music. Please check your browser settings or try clicking the music button.');
    });
}

function disableSound() {
    soundEnabled = false;
    document.getElementById('sound-modal').style.display = 'none';
    document.getElementById('music-control').style.display = 'none';
    
    // Stop any playing audio
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        isPlaying = false;
    }
}

// Toggle background music
function toggleBackgroundMusic() {
    if (!soundEnabled) return;
    
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play().then(() => {
            isPlaying = true;
        }).catch(e => {
            console.log('Audio play failed:', e);
        });
    }
    updateMusicButton();
}

// Update music button appearance
function updateMusicButton() {
    const button = document.getElementById('music-toggle');
    const icon = button.querySelector('i');
    
    if (isPlaying) {
        icon.className = 'fas fa-pause';
        button.title = 'Pause music';
    } else {
        icon.className = 'fas fa-play';
        button.title = 'Play music';
    }
}

// Multi-page Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetPage = item.getAttribute('data-page');
            
            // Remove active class from all nav items and pages
            navItems.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked nav item and corresponding page
            item.classList.add('active');
            document.getElementById(targetPage).classList.add('active');
        });
    });
    
    // Music control button event listener
    document.getElementById('music-toggle').addEventListener('click', toggleBackgroundMusic);
});

// Confetti Animation
class Confetti {
    constructor() {
        this.canvas = document.getElementById('confetti-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        
        this.resizeCanvas();
        this.bindEvents();
        this.createInitialConfetti();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                this.createConfettiBurst(card.offsetLeft + card.offsetWidth / 2, card.offsetTop + card.offsetHeight / 2);
            });
        });
        
        document.querySelector('.message-btn').addEventListener('click', () => {
            this.createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2);
        });
    }
    
    createInitialConfetti() {
        for (let i = 0; i < 50; i++) {
            this.particles.push(this.createParticle());
        }
        this.animate();
    }
    
    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 4 + 2,
            color: this.getRandomColor(),
            life: 1,
            decay: Math.random() * 0.02 + 0.005
        };
    }
    
    createConfettiBurst(x, y) {
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8 - 2,
                size: Math.random() * 6 + 3,
                color: this.getRandomColor(),
                life: 1,
                decay: Math.random() * 0.03 + 0.01
            });
        }
    }
    
    getRandomColor() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateParticles() {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1;
            particle.life -= particle.decay;
            
            return particle.life > 0 && particle.y < this.canvas.height + 50;
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
            this.ctx.restore();
        });
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// Interactive Message System
const messages = [
    "😚Eres La Luz de mi Vida😚",
    "🤍Tu sonrisa es la cosa mas hermosa que he visto🤍",
    "💖Tu corazon es el mas divino que he visto💖",
    "😚Te quiero mucho mi vida hermosa😚",
    "🤍Que este año te llene de felicidad🤍",
    "💖Y que cada año que pase sea mejor que el anterior💖",
    "😚Porque tu Paula Natalia Curtidor te mereces todo lo mejor😚",
    "🤍Jamas se te olvide cuanto te quiero🤍", 
    "💖Que hoy tengas un dia increible💖",
    "😚Que Dios siempre te cuide, y te guie en todo lo que hagas😚",
    "🤍Que nunca te falte nada🤍",
    "😚Que siempre tengas lo que necesitas😚",
    "🤍Que siempre tengas lo que quieres🤍",
    "💖Y que si Dios permite, que podamos estar juntos para siempre💖",
    "😚🤍💖Y porfavor, no se olide que te quiero mucho mi boba hermosa😚🤍💖",
];

let messageIndex = 0;

function revealMessage() {
    const messageElement = document.getElementById('dynamic-message');
    const button = document.querySelector('.message-btn');
    
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        messageElement.textContent = messages[messageIndex];
        messageIndex = (messageIndex + 1) % messages.length;
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    }, 200);
}

// Surprise Box
document.addEventListener('DOMContentLoaded', function() {
    const surpriseBox = document.querySelector('.surprise-box');
    const surpriseMessage = document.getElementById('surprise-message');
    
    if (surpriseBox) {
        surpriseBox.addEventListener('click', function() {
            const lid = this.querySelector('.box-lid');
            lid.classList.add('open');
            
            setTimeout(() => {
                surpriseMessage.style.display = 'block';
            }, 500);
        });
    }
});

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    new Confetti();
    
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
