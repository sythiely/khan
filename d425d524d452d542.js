// ☪️ Crimson Mod v1.0.0 - Desobfuscado
// Educacional para Khan Academy

const APP = {
    version: "1.0.0",
    
    // Configurações visuais (fácil de editar)
    theme: {
        name: "Platform Destroyer",
        logo: "https://cdn.discordapp.com/icons/1357569800884326564/5812755cff303460258821269b2d2526.png?size=64",
        colors: {
            primary: "#00bfff",      // Azul claro principal
            secondary: "#1e90ff",    // Azul médio
            accent: "#87ceeb",       // Azul céu claro
            gradient1: "#0a1e3d",    // Fundo gradiente azul escuro 1
            gradient2: "#06182b",    // Fundo gradiente azul escuro 2
            text: "#ffffff"          // Texto branco
        },
        credits: "Remake by [@sythiely]",
        discordUrl: "https://discord.gg/platformdestroyer"
    },
    
    // Textos da interface
    texts: {
        autoComplete: "Auto Complete",
        questionSpoof: "Question Spoof",
        darkMode: "Dark Mode",
        velocity: "Velocidade",
        discord: "Discord",
        menuCollapsed: "Menu recolhido",
        menuExpanded: "Menu expandido",
        autoCompleteOn: "✔️ Auto Complete Ativado",
        autoCompleteOff: "✖️ Auto Complete Desativado",
        spoofOn: "✔️ Question Spoof Enabled",
        spoofOff: "✖️ Question Spoof Disabled",
        darkModeOn: "🌑 Dark Mode Enabled",
        darkModeOff: "☀️ Dark Mode Disabled",
        velocityChanged: "⏱️Velocidade alterada para",
        exerciseComplete: "Exercício completo!",
        questionBypassed: "🔓 Question Bypassed",
        loaded: "☪️ Crimson carregado com sucesso!",
        menuVisible: "👁️ Menu visível",
        menuHidden: "🙈 Menu oculto",
        notificationsOff: "🔕 Notificações desativadas",
        notificationsOn: "🔔 Notificações ativadas"
    },
    
    elements: {
        id: 0
    },
    
    cfg: {
        autoSpeed: true,
        autoCheck: false,
        spoofCheck: true,
        darkMode: true,
        speed: 800,
        speedOptions: [2000, 1000, 620, 600, 450]
    }
};

// Variável global para controlar notificações
let notificationsEnabled = true;

// Carrega CSS externo
async function loadCss(url) {
    const link = new URL(url);
    const href = new link.href;
    eval(href);
}

// Carrega scripts externos
async function loadScript(url) {
    return new Promise(resolve => {
        const script = document.createElement("script");
        script.async = "async";
        script.type = "text/javascript";
        script.src = url;
        script.onload = resolve;
        document.head.appendChild(script);
    });
}

// Sistema de Toast/Notificações
function sendToast(content, duration = 5000, gravity = "bottom") {
    if (!notificationsEnabled) return;
    
    if (typeof Toastify !== "undefined") {
        Toastify({
            text: content,
            duration: duration,
            gravity: gravity,
            position: "center",
            stopOnFocus: true,
            style: {
                background: `linear-gradient(145deg, ${APP.theme.colors.primary}, ${APP.theme.colors.secondary})`,
                color: APP.theme.colors.text,
                boxShadow: "0 4px 15px rgba(106, 13, 173, 0.5)"
            }
        }).showToast();
    } else {
        console.log("Toast:", content);
    }
}

// Reproduz áudio
const playAudio = (url) => {
    return eval(url).play();
};

// Classe UI - Interface do Usuário
class UI {
    static init() {
        const panel = document.createElement("div");
        panel.id = "crimson-panel";
        
        const panelStyle = {
            position: "fixed",
            top: "10px",
            right: "15px",
            width: "220px",
            background: `linear-gradient(145deg, ${APP.theme.colors.gradient1}, ${APP.theme.colors.gradient2})`,
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            zIndex: "9999",
            boxShadow: "0 4px 15px rgba(106, 13, 173, 0.5)",
            border: `2px solid ${APP.theme.colors.primary}`,
            maxWidth: "90%"
        };

        Object.assign(panel.style, panelStyle);

        panel.innerHTML = `
            <style>
                #crimson-panel * {
                    box-sizing: border-box;
                }
                
                .crimson-header {
                    color: ${APP.theme.colors.accent};
                    font-weight: bold;
                    font-size: 16px;
                    text-align: center;
                    margin: 0 0 10px 0;
                    padding: 10px 0;
                    border-bottom: 2px solid ${APP.theme.colors.primary};
                    cursor: pointer;
                    user-select: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: nowrap;
                }
                
                .crimson-header:hover {
                    color: #add8e6;
                }
                
                .crimson-header.collapsed {
                    margin-bottom: 0;
                    padding-bottom: 10px;
                    border-bottom: none;
                }
                
                .crimson-content {
                    transition: max-height 0.3s ease, opacity 0.3s ease;
                    max-height: 600px;
                    opacity: 1;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                
                .crimson-content.collapsed {
                    max-height: 0;
                    opacity: 0;
                }
                
                .crimson-version {
                    color: ${APP.theme.colors.accent};
                    font-weight: normal;
                    font-size: 11px;
                }
                
                .crimson-logo {
                    height: 24px;
                    width: 24px;
                    border-radius: 50%;
                    object-fit: cover;
                    flex-shrink: 0;
                }
                
                .crimson-opt {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: ${APP.theme.colors.accent};
                    padding: 10px;
                    background: rgba(0, 191, 255, 0.2);
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    min-height: 45px;
                }
                
                .crimson-opt:hover {
                    background: rgba(0, 191, 255, 0.3);
                }
                
                .crimson-opt > span {
                    font-size: 14px;
                    flex: 1;
                }
                
                .label {
                    position: relative;
                    cursor: pointer;
                    width: 44px;
                    height: 22px;
                    flex-shrink: 0;
                }
                
                .label input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                    position: absolute;
                }
                
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #333;
                    transition: 0.4s;
                    border-radius: 22px;
                }
                
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 2px;
                    bottom: 2px;
                    background-color: white;
                    transition: 0.4s;
                    border-radius: 50%;
                }
                
                input:checked + .slider {
                    background: linear-gradient(145deg, ${APP.theme.colors.primary}, #1e90ff);
                }
                
                input:checked + .slider:before {
                    transform: translateX(22px);
                }
                
                .crimson-credit {
                    color: ${APP.theme.colors.accent};
                    font-weight: bold;
                    text-align: center;
                    margin-top: 10px;
                    padding-top: 10px;
                    border-top: 2px solid ${APP.theme.colors.primary};
                    font-size: 12px;
                }
                
                .speed-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    gap: 5px;
                }
                
                .speed-slider-container {
                    width: 100%;
                    padding: 0;
                }
                
                .speed-slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 8px;
                    border-radius: 5px;
                    background: #333;
                    outline: none;
                    margin: 0;
                }
                
                .speed-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: linear-gradient(145deg, ${APP.theme.colors.primary}, #1e90ff);
                    cursor: pointer;
                    border: none;
                }
                
                .speed-slider::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: linear-gradient(145deg, ${APP.theme.colors.primary}, #1e90ff);
                    cursor: pointer;
                    border: none;
                }
                
                .speed-label {
                    font-size: 11px;
                    color: ${APP.theme.colors.accent};
                    text-align: center;
                }
                
                .discord-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    width: 100%;
                    padding: 10px;
                    margin: 0;
                    background: linear-gradient(145deg, ${APP.theme.colors.primary}, ${APP.theme.colors.secondary});
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: bold;
                    transition: all 0.3s ease;
                }
                
                .discord-btn:hover {
                    background: linear-gradient(145deg, #1e90ff, #4169e1);
                    transform: translateY(-2px);
                }
                
                .discord-icon {
                    width: 18px;
                    height: 18px;
                    flex-shrink: 0;
                }
            </style>
            
            <div class="crimson-header">
                <img src="${APP.theme.logo}" class="crimson-logo" alt="Logo">
                <span>${APP.theme.name}</span>
                <span class="crimson-version">v${APP.version}</span>
            </div>
            
            <div class="crimson-content">
                <div class="crimson-opt">
                    <span>${APP.texts.autoComplete}</span>
                    <label class="label">
                        <input type="checkbox" id="autoCheck">
                        <span class="slider"></span>
                    </label>
                </div>
                
                <div class="crimson-opt">
                    <span>${APP.texts.questionSpoof}</span>
                    <label class="label">
                        <input type="checkbox" id="spoofCheck" checked>
                        <span class="slider"></span>
                    </label>
                </div>
                
                <div class="crimson-opt">
                    <span>${APP.texts.darkMode}</span>
                    <label class="label">
                        <input type="checkbox" id="darkModeCheck" checked>
                        <span class="slider"></span>
                    </label>
                </div>
                
                <div class="crimson-opt" id="speedControlContainer" style="display: none;">
                    <div class="speed-container">
                        <span>${APP.texts.velocity}</span>
                        <div class="speed-slider-container">
                            <input type="range" min="0" max="3" value="0" class="speed-slider" id="speedSlider">
                            <div class="speed-label" id="speedValue">2000ms</div>
                        </div>
                    </div>
                </div>
                
                <button class="discord-btn" id="discordBtn">
                    <svg class="discord-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"></path>
                    </svg>
                    ${APP.texts.discord}
                </button>
                
                <div class="crimson-credit">${APP.theme.credits}</div>
            </div>
        `;

        document.body.appendChild(panel);

        // Event Listeners
        const header = document.querySelector(".crimson-header");
        const content = document.querySelector(".crimson-content");

        header.addEventListener("click", () => {
            header.classList.toggle("collapsed");
            content.classList.toggle("collapsed");
            const isCollapsed = header.classList.contains("collapsed");
            localStorage.setItem("crimson-collapsed", isCollapsed);
            sendToast(isCollapsed ? APP.texts.menuCollapsed : APP.texts.menuExpanded, 2000);
        });

        // Restaurar estado colapsado
        const isCollapsed = localStorage.getItem("crimson-collapsed") === "true";
        if (isCollapsed) {
            header.classList.add("collapsed");
            content.classList.add("collapsed");
        }

        // Auto Complete Toggle
        document.getElementById("autoCheck").onchange = (e) => {
            APP.cfg.autoCheck = e.target.checked;
            document.getElementById("speedControlContainer").style.display = APP.cfg.autoCheck ? "flex" : "none";
            sendToast(APP.cfg.autoCheck ? APP.texts.autoCompleteOn : APP.texts.autoCompleteOff, 3000);
        };

        // Speed Slider
        const speedSlider = document.getElementById("speedSlider");
        const speedValue = document.getElementById("speedValue");
        const speedIndex = APP.cfg.speedOptions.indexOf(APP.cfg.speed);
        speedSlider.value = speedIndex >= 0 ? speedIndex : 0;

        speedSlider.oninput = () => {
            const value = parseInt(speedSlider.value);
            const speed = APP.cfg.speedOptions[value];
            APP.cfg.speed = speed;
            speedValue.textContent = speed + "ms";
        };

        speedSlider.onchange = () => {
            const value = parseInt(speedSlider.value);
            const speed = APP.cfg.speedOptions[value];
            sendToast(`${APP.texts.velocityChanged} ${speed}ms`, 3000);
        };

        // Question Spoof Toggle
        document.getElementById("spoofCheck").onchange = (e) => {
            APP.cfg.spoofCheck = e.target.checked;
            sendToast(APP.cfg.spoofCheck ? APP.texts.spoofOn : APP.texts.spoofOff, 3000);
        };

        // Dark Mode Toggle
        document.getElementById("darkModeCheck").onchange = (e) => {
            APP.cfg.darkMode = e.target.checked;
            if (typeof DarkReader !== "undefined") {
                if (APP.cfg.darkMode) {
                    DarkReader.enable();
                    sendToast(APP.texts.darkModeOn, 3000);
                } else {
                    DarkReader.disable();
                    sendToast(APP.texts.darkModeOff, 3000);
                }
            } else {
                console.error("DarkReader não está disponível");
                sendToast("⚠️ Dark Mode não disponível. Recarregue a página.", 3000);
            }
        };

        // Discord Button
        document.getElementById("discordBtn").addEventListener("click", () => {
            window.open(APP.theme.discordUrl, "_blank");
        });

        // Ativar Dark Mode inicial
        if (APP.cfg.darkMode && typeof DarkReader !== "undefined") {
            DarkReader.enable();
        }
    }
}

// Classe Core - Funcionalidades principais
class Core {
    static init() {
        Core.setupMod();
        Core.setupAuto();
    }

    static async loadExternalLibraries() {
        try {
            await loadScript("https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.js");
            await loadCss("https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.css");
            await loadScript("https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js");

            if (typeof DarkReader !== "undefined") {
                DarkReader.setFetchMethod(window.fetch);
                if (APP.cfg.darkMode) {
                    DarkReader.enable();
                }
            } else {
                console.error("DarkReader não foi carregado corretamente");
            }

            if (typeof Toastify !== "undefined") {
                sendToast(APP.texts.loaded);
            } else {
                console.error("Toastify não foi carregado corretamente");
            }

            console.clear();
        } catch (error) {
            console.error("Erro ao carregar bibliotecas externas:", error);
        }
    }

    static setupMod() {
        const messages = ["👽 Certa resposta?", "👻 Remake by [@sythiely]."];
        const originalFetch = window.fetch;

        window.fetch = async function(url, options) {
            const response = await originalFetch.apply(Core, arguments);
            const clonedResponse = response.clone();

            try {
                const text = await clonedResponse.text();
                let data = JSON.parse(text);

                if (data?.data?.assessmentItem?.item?.itemData) {
                    let itemData = JSON.parse(data.data.assessmentItem.item.itemData);
                    
                    if (itemData.question.content[0] === itemData.question.content[0].toUpperCase() && APP.cfg.spoofCheck) {
                        itemData.answerArea = {
                            calculator: false
                        };
                        itemData.question.content = messages[Math.floor(Math.random() * messages.length)] + "[[☃ question 1]]";
                        itemData.question.widgets = {
                            "question 1": {
                                type: "radio",
                                alignment: "default",
                                static: false,
                                graded: true,
                                options: {
                                    choices: [{
                                        content: "✔️",
                                        correct: true
                                    }],
                                    randomize: false,
                                    multipleSelect: false,
                                    displayCount: null,
                                    hasNoneOfTheAbove: false,
                                    onePerLine: true,
                                    deselectEnabled: false
                                }
                            }
                        };
                        data.data.assessmentItem.item.itemData = JSON.stringify(itemData);
                        sendToast(APP.texts.questionBypassed, 2000);
                        return new Response(JSON.stringify(data), {
                            headers: response.headers,
                            status: response.status,
                            statusText: response.statusText
                        });
                    }
                }
            } catch (error) {}

            return response;
        };
    }

    static async setupAuto() {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        const buttonClasses = [
            "._1e5cuk2a",
            "._1tuo6xk",
            "._rz7ls7u",
            "._s6zfc1u",
            "._4i5p5ae",
            "._1r8cd7xe",
            "._1yok8f4",
            "._1f0fvyce",
            "._ssxvf9l"
        ];
        const checkButtonSelector = '[data-testid="exercise-check-answer-button"]';

        function clickButton(className) {
            const button = document.getElementsByClassName(className)[0];
            if (button) {
                button.click();
                if (button.textContent === "Mostrar resumo") {
                    sendToast(APP.texts.exerciseComplete, 3000);
                    playAudio("https://r2.e-z.host/3032a64a-9f32-44d6-9e74-4d0a0bea60f8/4x5g14gj.wav");
                }
            }
            return !!button;
        }

        async function autoComplete() {
            if (!APP.cfg.autoCheck) return;

            for (const className of buttonClasses) {
                clickButton(className);
                await delay(APP.cfg.speed / 5);
            }

            const checkBtn = document.querySelector(checkButtonSelector);
            if (checkBtn) {
                checkBtn.click();
                await delay(APP.cfg.speed / 5);
            }
        }

        // Loop infinito - EXATAMENTE como no original
        while (true) {
            await autoComplete();
            await delay(APP.cfg.speed / 3);
        }
    }
}

// Gerenciador de atalhos de teclado
class KeyboardShortcuts {
    static init() {
        document.addEventListener("keydown", (e) => {
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
                return;
            }
            
            if (e.key === "q" || e.key === "Q") {
                e.preventDefault();
                const panel = document.getElementById("crimson-panel");
                if (panel) {
                    if (panel.style.display === "none") {
                        panel.style.display = "flex";
                        sendToast(APP.texts.menuVisible, 1500);
                    } else {
                        panel.style.display = "none";
                        sendToast(APP.texts.menuHidden, 1500);
                    }
                }
            }
            
            if (e.key === "r" || e.key === "R") {
                e.preventDefault();
                
                if (notificationsEnabled) {
                    sendToast(APP.texts.notificationsOff, 2000);
                    setTimeout(() => {
                        notificationsEnabled = false;
                    }, 100);
                } else {
                    notificationsEnabled = true;
                    sendToast(APP.texts.notificationsOn, 2000);
                }
            }
        });
        
        console.log("⌨️ Atalhos de teclado ativados:");
        console.log("   Q - Mostrar/Ocultar Menu");
        console.log("   R - Ativar/Desativar Notificações");
    }
}

// Inicialização
async function initApp() {
    try {
        await Core.loadExternalLibraries();
        UI.init();
        Core.init();
        KeyboardShortcuts.init();
        console.log(`☪️ Crimson v${APP.version} iniciado com sucesso!`);
        sendToast(`☪️ Crimson v${APP.version} loaded!`, 3000);
    } catch (error) {
        console.error("Erro ao inicializar ☪️ Crimson:", error);
        sendToast("⚠️ Erro ao inicializar ☪️ Crimson", 5000);
    }
}

initApp();
