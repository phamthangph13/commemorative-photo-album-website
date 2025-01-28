document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-img');
    const startOverlay = document.getElementById('startOverlay');
    const bgMusic = document.getElementById('bgMusic');
    
    let hasStarted = false;
    
    images.forEach(img => {
        // Thêm hiệu ứng loading cho ảnh
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
        
        // Thêm hiệu ứng click
        img.addEventListener('click', function() {
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 500);
        });
    });

    // Thêm hiệu ứng confetti khi click vào video
    const video = document.querySelector('.video-item');
    video.addEventListener('click', function() {
        createConfetti();
    });

    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    // Khởi tạo slide đầu tiên
    slides[0].classList.add('active');

    function goToSlide(index) {
        // Xác định hướng chuyển slide
        const direction = index > currentSlide ? 'right' : 'left';
        
        // Remove active class and add exit animation
        slides[currentSlide].style.animation = `slideOut${direction.charAt(0).toUpperCase() + direction.slice(1)} 0.8s forwards`;
        slides[currentSlide].classList.remove('active');
        
        // Add enter animation and active class to new slide
        slides[index].style.animation = `slideIn${direction.charAt(0).toUpperCase() + direction.slice(1)} 0.8s forwards`;
        slides[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
        
        // Update dots
        updateDots();
    }

    // Navigation dots
    const dotsContainer = document.querySelector('.nav-dots');
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Previous button
    document.querySelector('.prev').addEventListener('click', () => {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    });

    // Next button
    document.querySelector('.next').addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            goToSlide(currentSlide + 1);
        }
    });

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Thêm event listener để reset animation sau khi hoàn thành
    slides.forEach(slide => {
        slide.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Xử lý bao lì xì và modal
    const wishes = {
        love1: "Anh yêu em nhiều lắm!",
        love2: "Em là điều tuyệt vời nhất đến với anh",
        love3: "Cảm ơn em đã luôn ở bên anh",
        love4: "Mong rằng tình yêu của chúng ta sẽ mãi bền lâu",
        
        newyear1: "Chúc em năm mới 2025 thật nhiều sức khỏe",
        newyear2: "Mong em sẽ luôn xinh đẹp và hạnh phúc",
        newyear3: "Chúc em đạt được mọi điều em mong ước",
        newyear4: "Năm mới, hạnh phúc mới, thành công mới"
    };

    const modal = document.getElementById('wishModal');
    const modalText = document.querySelector('.modal-text');
    const closeModal = document.querySelector('.close-modal');

    document.querySelectorAll('.envelope').forEach(envelope => {
        envelope.addEventListener('click', function() {
            if (!this.classList.contains('open')) {
                const wishType = this.dataset.message;
                const wishMessage = wishes[wishType];
                
                // Thêm hiệu ứng tiền bay ra
                createMoneyParticles(this);
                
                // Hiển thị message và các hiệu ứng khác
                this.classList.add('open');
                modalText.innerHTML = `<p>${wishMessage}</p>`;
                modal.classList.add('show');
                
                // Tạo confetti
                createConfetti();
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Xử lý mystery boxes
    document.querySelectorAll('.mystery-box').forEach(box => {
        box.addEventListener('click', function() {
            if (!this.classList.contains('opened') && !this.classList.contains('bounce')) {
                // Thêm hiệu ứng bounce
                this.classList.add('bounce');
                
                // Tạo hiệu ứng particles trong khi nhảy
                const bounceInterval = setInterval(() => {
                    createMagicParticles(this, 3); // Tạo ít particles hơn
                }, 300);
                
                // Sau 3s, dừng bounce và mở hộp
                setTimeout(() => {
                    clearInterval(bounceInterval);
                    this.classList.remove('bounce');
                    this.classList.add('opened');
                    
                    // Tạo hiệu ứng tỏa sáng
                    createGlowEffect(this);
                    
                    // Tạo nhiều particles hơn khi mở hộp
                    createMagicParticles(this, 20);
                    
                    // Hiển thị message trong modal
                    const wishType = this.dataset.message;
                    const wishMessage = wishes[wishType];
                    modalText.innerHTML = `<p>${wishMessage}</p>`;
                    modal.classList.add('show');
                    
                    // Tạo confetti
                    createSpecialConfetti();
                }, 3000);
            }
        });
    });

    // Thêm hiệu ứng lấp lánh cho mystery boxes và envelopes
    function addSparkles(element) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random vị trí
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            
            // Random độ trễ và thời gian
            const delay = Math.random() * 2;
            const duration = Math.random() * 1 + 1;
            sparkle.style.animation = `sparkleAnimation ${duration}s ${delay}s infinite`;
            
            element.appendChild(sparkle);
        }
    }

    // Thêm sparkles cho tất cả mystery boxes và envelopes
    document.querySelectorAll('.mystery-box, .envelope').forEach(element => {
        addSparkles(element);
    });

    // Thêm index cho animation delay của các box và envelope
    document.querySelectorAll('.mystery-box').forEach((box, index) => {
        box.style.setProperty('--box-index', index);
    });

    document.querySelectorAll('.envelope').forEach((envelope, index) => {
        envelope.style.setProperty('--envelope-index', index);
    });

    // Thêm trái tim nổi vào slide 1
    addFloatingHearts();

    // Xử lý click để bắt đầu
    const ribbonContainer = document.querySelector('.ribbon-container');
    
    document.addEventListener('click', function startExperience() {
        if (!hasStarted) {
            ribbonContainer.classList.add('untie');
            document.querySelector('.start-text').classList.add('hide');
            bgMusic.play();
            hasStarted = true;
            
            setTimeout(() => {
                startOverlay.classList.add('hidden');
            }, 3000);
            
            document.removeEventListener('click', startExperience);
        }
    });
});

// Hàm tạo hiệu ứng confetti
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.opacity = Math.random();
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

function createPaperPieces(box) {
    const rect = box.getBoundingClientRect();
    const pieces = 8;
    
    for (let i = 0; i < pieces; i++) {
        const piece = document.createElement('div');
        piece.className = 'paper-piece';
        
        // Random size và vị trí cho mảnh giấy
        const size = Math.random() * 20 + 10;
        piece.style.width = size + 'px';
        piece.style.height = size + 'px';
        
        // Vị trí ban đầu
        piece.style.left = (rect.left + rect.width/2) + 'px';
        piece.style.top = (rect.top + rect.height/2) + 'px';
        
        // Animation
        piece.style.animation = `paperFall ${Math.random() * 2 + 1}s ease-out forwards`;
        
        document.body.appendChild(piece);
        
        // Xóa mảnh giấy sau khi animation kết thúc
        setTimeout(() => {
            piece.remove();
        }, 3000);
    }
}

// Tạo confetti đặc biệt
function createSpecialConfetti() {
    const colors = ['#ff7aa2', '#ff4081', '#fce4ec', '#f8bbd0'];
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random màu sắc và hình dạng
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        confetti.style.background = color;
        if (shape === 'triangle') {
            confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        } else if (shape === 'square') {
            confetti.style.borderRadius = '0';
        }
        
        // Random vị trí và animation
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.opacity = Math.random();
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Thêm trái tim nổi vào slide 1
function addFloatingHearts() {
    const slide1 = document.getElementById('slide1');
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '♥';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        slide1.appendChild(heart);
    }
}

function createMoneyParticles(envelope) {
    const rect = envelope.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        const money = document.createElement('div');
        money.className = 'money-particle';
        
        // Vị trí ban đầu
        money.style.left = centerX + 'px';
        money.style.top = centerY + 'px';
        
        // Random hướng bay
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = 100 + Math.random() * 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const rotation = Math.random() * 360;
        
        money.style.setProperty('--x', `${x}px`);
        money.style.setProperty('--y', `${y}px`);
        money.style.setProperty('--r', `${rotation}deg`);
        
        document.body.appendChild(money);
        
        // Trigger animation
        requestAnimationFrame(() => {
            money.style.animation = `moneyFly 1s ease-out forwards`;
        });
        
        // Cleanup
        setTimeout(() => money.remove(), 1000);
    }
}

function createGlowEffect(box) {
    const rect = box.getBoundingClientRect();
    const glow = document.createElement('div');
    glow.className = 'glow-effect';
    glow.style.left = rect.left + 'px';
    glow.style.top = rect.top + 'px';
    document.body.appendChild(glow);
    
    setTimeout(() => glow.remove(), 1000);
}

function createMagicParticles(box, count = 20) {
    const rect = box.getBoundingClientRect();
    const colors = ['#ffd700', '#ff4081', '#ff7aa2', '#ffffff'];
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'magic-particle';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Set vị trí ban đầu
        particle.style.left = (rect.left + rect.width/2) + 'px';
        particle.style.top = (rect.top + rect.height/2) + 'px';
        
        // Random hướng bay
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = 50 + Math.random() * 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        
        document.body.appendChild(particle);
        
        requestAnimationFrame(() => {
            particle.style.animation = `magicParticleFly 1s ease-out forwards`;
        });
        
        setTimeout(() => particle.remove(), 1000);
    }
}
