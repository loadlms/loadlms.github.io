// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Navegação móvel
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle do menu mobile
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navegação suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito de digitação no terminal (executa apenas uma vez)
    const terminalSequence = [
        { type: 'command', text: 'whoami', delay: 50 },
        { type: 'output', text: 'Leonardo Lima - Full-Stack Developer', delay: 20 },
        { type: 'command', text: 'cat skills.txt', delay: 50 },
        { type: 'output', text: 'JavaScript, TypeScript, Python, Java, C#', delay: 20 },
        { type: 'command', text: 'ls projects/', delay: 50 },
        { type: 'output', text: 'oficina/ igor-portfolio/ golliath-burgers/', delay: 20 },
        { type: 'command', text: 'git status', delay: 50 },
        { type: 'output', text: 'On branch main - Your branch is up to date', delay: 20 }, 
        { type: 'command', text: 'npm start', delay: 50 },
        { type: 'output', text: 'Server running on localhost:3000', delay: 20 }
    ];

    let sequenceIndex = 0;
    const terminalBody = document.querySelector('.terminal-body');
    const typingElement = document.querySelector('.typing-animation');

    function typeText(element, text, speed = 50) {
        return new Promise((resolve) => {
            let i = 0;
            element.textContent = '';
            
            function typeChar() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeChar, speed);
                } else {
                    resolve();
                }
            }
            
            typeChar();
        });
    }

    async function executeTerminalSequence() {
        // Remove o cursor inicial
        typingElement.textContent = '';
        
        for (let i = 0; i < terminalSequence.length; i++) {
            const item = terminalSequence[i];
            
            if (item.type === 'command') {
                // Cria nova linha de comando
                const commandLine = document.createElement('div');
                commandLine.className = 'terminal-line';
                commandLine.innerHTML = `
                    <span class="prompt">$</span>
                    <span class="command"></span>
                `;
                
                // Remove a linha de digitação atual se existir
                const typingElement = document.querySelector('.typing-animation');
                if (typingElement && typingElement.parentElement) {
                    terminalBody.removeChild(typingElement.parentElement);
                }
                
                terminalBody.appendChild(commandLine);
                
                // Digita o comando
                const commandSpan = commandLine.querySelector('.command');
                await typeText(commandSpan, item.text, 80);
                
                // Aguarda um pouco após digitar o comando
                await new Promise(resolve => setTimeout(resolve, item.delay));
                
            } else if (item.type === 'output') {
                // Cria linha de output
                const outputLine = document.createElement('div');
                outputLine.className = 'terminal-line';
                outputLine.innerHTML = `<span class="output"></span>`;
                
                terminalBody.appendChild(outputLine);
                
                // Digita o output
                const outputSpan = outputLine.querySelector('.output');
                await typeText(outputSpan, item.text, 30);
                
                // Aguarda um pouco após o output
                await new Promise(resolve => setTimeout(resolve, item.delay));
            }
        }
        
        // Adiciona a linha final com cursor piscando
        const finalLine = document.createElement('div');
        finalLine.className = 'terminal-line';
        finalLine.innerHTML = `
            <span class="prompt">$</span>
            <span class="command typing-animation">_</span>
        `;
        terminalBody.appendChild(finalLine);
    }

    // Inicia a animação após 2 segundos
    setTimeout(executeTerminalSequence, 2000);

    // Animação de contadores
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                }
            };
            
            updateCounter();
        });
    }

    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Anima contadores quando a seção about entra em vista
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
                
                // Anima Skill Tree quando entra em vista
                if (entry.target.classList.contains('skills')) {
                    initSkillTree();
                }
                
                // Anima projetos quando entram em vista
                if (entry.target.classList.contains('projects')) {
                    const projectCards = entry.target.querySelectorAll('.project-card');
                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = 'slideInUp 0.6s ease forwards';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observa todas as seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Efeito de parallax no hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.particles, .grid-overlay');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Efeito de glitch aleatório no logo
    const logo = document.querySelector('.logo-text');
    
    function randomGlitch() {
        logo.style.animation = 'none';
        setTimeout(() => {
            logo.style.animation = 'glitch-logo 0.3s ease';
        }, 10);
        
        setTimeout(() => {
            logo.style.animation = 'none';
        }, 300);
    }

    // Aplica glitch aleatório no logo
    setInterval(randomGlitch, Math.random() * 10000 + 5000);

    // Efeito de hover nos cards de projeto
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });

    // Skill Tree será inicializada quando a seção entrar em vista

    // Partículas flutuantes dinâmicas
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.7;
            box-shadow: 0 0 10px var(--primary-color);
        `;
        
        // Posição inicial aleatória
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        // Animação da partícula
        const duration = Math.random() * 3000 + 2000;
        const drift = (Math.random() - 0.5) * 100;
        
        particle.animate([
            {
                transform: `translateY(0px) translateX(0px)`,
                opacity: 0.7
            },
            {
                transform: `translateY(-${window.innerHeight + 100}px) translateX(${drift}px)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => {
            particle.remove();
        };
    }

    // Cria partículas periodicamente
    setInterval(createFloatingParticle, 500);

    // Efeito de cursor personalizado
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    // Atualiza posição do cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Efeito de hover no cursor
    const hoverElements = document.querySelectorAll('a, button, .skill-sector, .project-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.backgroundColor = 'var(--primary-color)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.backgroundColor = 'transparent';
        });
    });

    // Adiciona animações CSS dinâmicas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes glitch-logo {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
        }
        
        .animate {
            animation: slideInUp 0.8s ease forwards;
        }
        
        @media (max-width: 768px) {
            .custom-cursor {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Efeito de loading inicial
    window.addEventListener('load', () => {
        const loader = document.createElement('div');
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-dark);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.5s ease;
        `;
        
        loader.innerHTML = `
            <div style="
                font-family: var(--font-primary);
                font-size: 2rem;
                color: var(--primary-color);
                text-shadow: 0 0 20px var(--primary-color);
                animation: pulse 1s infinite;
            ">
                LOADING...
            </div>
        `;
        
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    });

    console.log(`
    ╔══════════════════════════════════════╗
    ║        LEONARDO LIMA PORTFOLIO       ║
    ║                                      ║
    ║  🚀 Full-Stack Developer             ║
    ║  💻 Ciência da Computação            ║
    ║  🎯 Focado em inovação               ║
    ║                                      ║
    ║                                      ║
    ║  Contato: lleoanardo@gmail.com       ║
    ╚══════════════════════════════════════╝
    `);
});

// Adiciona animação de pulse para elementos importantes
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(pulseStyle);

// ============ SKILL TREE FUNCTIONALITY ============

// Skill Tree com Galhos
let skillTreeInitialized = false;

function initSkillTree() {
    if (skillTreeInitialized) return;
    skillTreeInitialized = true;

    // Configurar rotações dos setores
    const sectors = document.querySelectorAll('.skill-sector');
    sectors.forEach((sector, index) => {
        const rotation = index * 60; // 360° / 6 setores = 60°
        sector.style.setProperty('--rotation', `${rotation}deg`);
    });

    // Configurar os galhos para cada setor
    const skillBranches = document.querySelectorAll('.skill-branches');
    skillBranches.forEach((branchContainer, sectorIndex) => {
        const branches = branchContainer.querySelectorAll('.skill-node');
        
        branches.forEach((branch, branchIndex) => {
            // Calcular ângulo base do setor (cada setor tem 60°)
            const sectorAngle = sectorIndex * 60;
            
            // Distribuir galhos dentro do setor com muito mais espalhamento
            const branchSpread = 70; // Total de 70° de espalhamento
            const angleStep = branchSpread / (branches.length - 1 || 1);
            const branchAngle = sectorAngle - (branchSpread / 2) + (branchIndex * angleStep);
            
            // Variar o comprimento dos galhos com valores muito maiores
            const branchLength = 30 + (branchIndex % 4) * 60; // 150px, 200px, 250px, 300px
            
            // Aplicar as variáveis CSS
            branch.style.setProperty('--branch-angle', `${branchAngle}deg`);
            branch.style.setProperty('--branch-length', `${branchLength}px`);
            
            // Aplicar as mesmas variáveis para a linha do galho
            const branchLine = branch.previousElementSibling;
            if (branchLine && branchLine.classList.contains('branch-line')) {
                branchLine.style.setProperty('--branch-angle', `${branchAngle}deg`);
                branchLine.style.setProperty('--branch-length', `${branchLength}px`);
            }
        });
    });

    // Adicionar eventos de click para toggle dos galhos
    sectors.forEach(sector => {
        sector.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Click detectado no setor:', sector.dataset.sector);
            
            // Fechar todos os outros setores
            sectors.forEach(otherSector => {
                if (otherSector !== sector) {
                    otherSector.classList.remove('active');
                }
            });
            
            // Toggle do setor atual
            sector.classList.toggle('active');
            
            // Debug: verificar se os galhos existem
            const branches = sector.querySelector('.skill-branches');
            const branchLines = sector.querySelectorAll('.branch-line');
            const skillNodes = sector.querySelectorAll('.skill-node');
            
            console.log('Galhos encontrados:', branches);
            console.log('Linhas dos galhos:', branchLines.length);
            console.log('Nós de habilidade:', skillNodes.length);
            
            // Forçar exibição dos galhos via JavaScript
            if (sector.classList.contains('active')) {
                branchLines.forEach(line => {
                    line.style.opacity = '1';
                });
                skillNodes.forEach(node => {
                    node.style.opacity = '1';
                });
                console.log('Galhos forçados a aparecer para:', sector.dataset.sector);
            } else {
                branchLines.forEach(line => {
                    line.style.opacity = '0';
                    line.style.animation = '';
                });
                skillNodes.forEach(node => {
                    node.style.opacity = '0';
                    node.style.animation = '';
                });
            }
            
            console.log('Setor', sector.dataset.sector, 'ativado');
        });
    });

    // Animação inicial dos setores
    setTimeout(() => {
        sectors.forEach((sector, index) => {
            setTimeout(() => {
                sector.style.animation = 'fadeInScale 0.6s ease forwards';
            }, index * 100);
        });
    }, 500);
}

// Adicionar estilos CSS para as animações da Skill Tree
const skillTreeStyles = document.createElement('style');
skillTreeStyles.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-220px) rotate(calc(-1 * var(--rotation))) scale(0);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-220px) rotate(calc(-1 * var(--rotation))) scale(1);
        }
    }

    /* Forçar exibição dos galhos quando ativo */
    .skill-sector.active .skill-branches .branch-line,
    .skill-sector.active .skill-branches .skill-node {
        opacity: 1 !important;
    }



    @media (max-width: 768px) {
        .skill-tree-container {
            height: 60vh;
            min-height: 500px;
        }
        
        .skill-wheel {
            width: 300px;
            height: 300px;
        }
        
        .skill-center {
            width: 150px;
            height: 150px;
        }
        
        .main-title {
            font-size: 1.2rem;
        }
        
        .sub-title {
            font-size: 0.8rem;
        }
        
        .skill-sector {
            width: 60px;
            height: 60px;
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-120px) rotate(calc(-1 * var(--rotation)));
        }
        
        .skill-sector:hover {
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-120px) rotate(calc(-1 * var(--rotation))) scale(1.1);
        }
        
        .sector-icon {
            font-size: 1.4rem;
        }
        
        /* Ajustar galhos para mobile */
        .skill-node {
            transform: translate(-50%, -50%) rotate(var(--branch-angle)) translateY(calc(-80px - var(--branch-length))) rotate(calc(-1 * var(--branch-angle)));
        }
        
        .branch-line {
            transform: translate(-50%, -50%) rotate(var(--branch-angle)) translateY(-80px);
        }
        
        .node-label {
            font-size: 0.6rem;
            padding: 0.1rem 0.3rem;
        }
    }
`;
document.head.appendChild(skillTreeStyles);