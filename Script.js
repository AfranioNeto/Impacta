// Carrossel de Notícias
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const track = document.getElementById('carouselTrack');
const totalSlides = slides.length;
let autoPlayTimer;

function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function startAutoplay() {
    autoPlayTimer = setInterval(nextSlide, 5000);
}

function stopAutoplay() {
    clearInterval(autoPlayTimer);
}

// Eventos do Carrossel
const carouselContainer = document.querySelector('.carousel-card');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
}

// Inicia Autoplay
startAutoplay();

// Modais e Conteúdo Dinâmico
function showContent(type) {
    const modalBody = document.getElementById('modal-body');
    let content = '';

    switch(type) {
        case 'quem-somos':
            content = `
                <h2 style="color: var(--primary-violet); margin-bottom: 12px;">Quem Somos</h2>
                <p style="margin-bottom: 10px; color: var(--text-muted);">A Impacta Tech é referência em inovação tecnológica com foco em inteligência e transformação social.</p>
                <p style="margin-bottom: 10px; color: var(--text-muted);">Nossa missão é impactar positivamente pessoas, processos, organizações e comunidades através do uso da tecnologia e inteligência.</p>
                <p style="color: var(--text-muted);">Desenvolvemos softwares, ecossistemas de análise de dados e soluções sob medida para conectar comunidades e organizações.</p>
            `;
            break;
        case 'clientes':
            content = `
                <h2 style="color: var(--primary-violet); margin-bottom: 12px;">Nossos Produtos</h2>
                <p style="margin-bottom: 14px; color: var(--text-muted);">Orgulho de fazer parceria com grandes marcas e iniciativas sociais:</p>
                <ul style="list-style: none; display: grid; gap: 8px;">
                    <li style="padding: 8px; background: #f5f5f7; border-radius: 6px;"><i class="fas fa-building" style="color:var(--primary-cyan)"></i> Governo & Setor Público</li>
                    <li style="padding: 8px; background: #f5f5f7; border-radius: 6px;"><i class="fa-solid fa-sliders" style="color:var(--primary-cyan)"></i> <a href="https://metodovasco.com.br" style="text-decoration: none; color: inherit;">Método VASCO</a>Método V.A.S.C.O.</a></li>
                    <li style="padding: 8px; background: #f5f5f7; border-radius: 6px;"><i class="fa-solid fa-dog" style="color:var(--primary-cyan)"></i> E-MeuPet</li>
                </ul>
            `;
            break;
        case 'painel-jatai':
            content = `
                <h2 style="color: var(--primary-violet); margin-bottom: 12px;">Painel Jataí</h2>
                <p style="color: var(--text-muted); margin-bottom: 12px;">Central de inteligência de dados e estatísticas do município de Jataí/GO.</p>
                <div style="background: #f0fdfe; border-left: 4px solid var(--primary-cyan); padding: 12px; font-size: 0.9rem;">
                    Acesso restrito a usuários cadastrados na rede municipal.
                </div>
            `;
            break;
        case 'contato':
            content = `
                <h2 style="color: var(--primary-violet); margin-bottom: 12px;">Fale Conosco</h2>
                <p style="color: var(--text-muted); margin-bottom: 14px;">Estamos de portas abertas para novas oportunidades e soluções.</p>
                <p style="margin-bottom: 6px;"><strong>E-mail:</strong> contato@impactatech.com</p>
                <p style="margin-bottom: 6px;"><strong>Telefone:</strong> (11) 1234-5678</p>
                <p><strong>Localização:</strong> Jataí - GO, Brasil</p>
            `;
            break;
    }

    modalBody.innerHTML = content;
    document.getElementById('dynamic-modal').classList.add('active');
}

function openModalNews(title, desc) {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h2 style="color: var(--primary-violet); margin-bottom: 12px;">${title}</h2>
        <p style="color: var(--text-muted); line-height: 1.6;">${desc}</p>
    `;
    document.getElementById('dynamic-modal').classList.add('active');
}

function openPoll(pollName) {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h3 style="color: var(--primary-violet); margin-bottom: 12px;">Enquete</h3>
        <p style="margin-bottom: 16px;">${pollName}</p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
            <button class="btn-primary" onclick="submitPollAnswer()">Excelente</button>
            <button class="btn-primary" style="background: var(--primary-violet);" onclick="submitPollAnswer()">Bom</button>
            <button class="btn-secondary" onclick="submitPollAnswer()">Pode melhorar</button>
        </div>
    `;
    document.getElementById('dynamic-modal').classList.add('active');
}

function submitPollAnswer() {
    closeModal();
    alertToast('Obrigado por votar! Sua opinião foi registrada.');
}

function openCadastroModal() {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h2 style="color: var(--primary-violet); margin-bottom: 16px;">Criar Nova Conta</h2>
        <form onsubmit="handleCadastro(event)">
            <div class="input-group">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Nome completo" required>
            </div>
            <div class="input-group">
                <i class="fas fa-envelope"></i>
                <input type="email" placeholder="E-mail" required>
            </div>
            <div class="input-group">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Senha" required>
            </div>
            <button type="submit" class="btn-primary" style="margin-top: 10px;">Cadastrar</button>
        </form>
    `;
    document.getElementById('dynamic-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('dynamic-modal').classList.remove('active');
}

// Fechar modal ao clicar fora
document.getElementById('dynamic-modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Formulários
function handleLogin(e) {
    e.preventDefault();
    alertToast('Login efetuado com sucesso!');
}

function handleCadastro(e) {
    e.preventDefault();
    closeModal();
    alertToast('Cadastro realizado com sucesso!');
}

// Toast System
function alertToast(msg) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    toastText.innerText = msg;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}
