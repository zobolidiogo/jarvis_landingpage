"use strict";

document.addEventListener("DOMContentLoaded", () => {
    setupYear();
    setupHeader();
    setupMobileMenu();
    setupSmoothScroll();
    setupFAQ();
    setupScrollReveal();
    setupHeroDemo();
    setupActiveNavigation();
    setupIdentityStudio();

    // COMPARTILHAMENTO DO PROJETO
    setupProjectShare();
});

/* =========================================================
   CONFIGURAÇÕES GERAIS
========================================================= */

function setupYear() {
    const element = document.getElementById("current-year");

    if (element) {
        element.textContent = String(new Date().getFullYear());
    }
}

function setupHeader() {
    const header = document.getElementById("site-header");

    if (!header) return;

    const updateHeader = () => {
        header.classList.toggle("scrolled", window.scrollY > 16);
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });
}

function setupMobileMenu() {
    const button = document.getElementById("mobile-menu-button");
    const navigation = document.getElementById("main-navigation");

    if (!button || !navigation) return;

    function closeMenu() {
        navigation.classList.remove("open");
        document.body.classList.remove("menu-open");
        button.setAttribute("aria-expanded", "false");
    }

    button.addEventListener("click", () => {
        const open = navigation.classList.toggle("open");

        document.body.classList.toggle("menu-open", open);
        button.setAttribute("aria-expanded", String(open));
    });

    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1100) {
            closeMenu();
        }
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            let target;

            try {
                target = document.querySelector(href);
            } catch {
                return;
            }

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            if (history.replaceState) {
                history.replaceState(null, "", href);
            }
        });
    });
}




/* =========================================================
   FAQ
========================================================= */

function setupFAQ() {
    const items = document.querySelectorAll(".faq-item");

    items.forEach(item => {
        const button = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!button || !answer) return;

        button.addEventListener("click", () => {
            const wasOpen = item.classList.contains("open");

            items.forEach(other => {
                other.classList.remove("open");

                const otherButton = other.querySelector(".faq-question");
                const otherAnswer = other.querySelector(".faq-answer");

                if (otherButton) {
                    otherButton.setAttribute("aria-expanded", "false");
                }

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            });

            if (!wasOpen) {
                item.classList.add("open");
                button.setAttribute("aria-expanded", "true");
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            }
        });
    });
}

/* =========================================================
   ANIMAÇÕES
========================================================= */

function setupScrollReveal() {
    const selectors = [
        ".pillar",
        ".feature-card",
        ".identity-studio",
        ".integration-node",
        ".experience-steps article",
        ".free-card",
        ".comparison-row",
        ".roadmap-card",
        ".faq-item"
    ];

    const elements = document.querySelectorAll(selectors.join(","));

    if (!elements.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }

    elements.forEach(element => {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    elements.forEach((element, index) => {
        element.style.transitionDelay = `${(index % 4) * 55}ms`;
        observer.observe(element);
    });
}

/* =========================================================
   DEMONSTRAÇÃO DA IA
========================================================= */

function setupHeroDemo() {
    const text = document.getElementById("ara-demo-text");

    if (!text) return;

    const messages = [
        "Claro. Já estou organizando isso para você.",
        "Sua reunião está no contexto e o lembrete foi preparado.",
        "Também analisei a rota para ajudar você a sair no horário certo.",
        "Tudo organizado. Você pode continuar seu dia."
    ];

    let index = 0;

    window.setInterval(() => {
        index = (index + 1) % messages.length;
        typeText(text, messages[index]);
    }, 5800);
}

function typeText(element, message) {
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
        element.textContent = message;
        return;
    }

    element.textContent = "";

    let index = 0;

    const timer = window.setInterval(() => {
        element.textContent += message.charAt(index);
        index++;

        if (index >= message.length) {
            window.clearInterval(timer);
        }
    }, 18);
}

/* =========================================================
   NAVEGAÇÃO ATIVA
========================================================= */

function setupActiveNavigation() {
    if (!("IntersectionObserver" in window)) return;

    const navigation = document.getElementById("main-navigation");

    if (!navigation) return;

    const links = Array.from(
        navigation.querySelectorAll('a[href^="#"]')
    );

    const sections = links
        .map(link => {
            const href = link.getAttribute("href");

            if (!href) return null;

            try {
                return document.querySelector(href);
            } catch {
                return null;
            }
        })
        .filter(Boolean);

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const current = `#${entry.target.id}`;

                links.forEach(link => {
                    const active =
                        link.getAttribute("href") === current;

                    link.classList.toggle("active", active);

                    if (active) {
                        link.setAttribute("aria-current", "page");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            });
        },
        {
            rootMargin: "-30% 0px -60% 0px",
            threshold: 0
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });
}

/* =========================================================
   PERSONALIZAÇÃO DA A.R.A.
========================================================= */

function setupIdentityStudio() {
    const studio = document.querySelector(".identity-studio");

    if (!studio) return;

    const body = document.body;
    const root = document.documentElement;

    const nameInput = document.getElementById("custom-ai-name");
    const nameCounter = document.getElementById("name-counter");

    const personalityLabel =
        document.getElementById("preview-personality");

    const personalizedMessage =
        document.getElementById("personalized-message");

    const personalityResponse =
        document.getElementById("personality-response");

    const resetButton =
        document.getElementById("reset-identity");

    const customColor =
        document.getElementById("custom-color");

    const customColorValue =
        document.getElementById("custom-color-value");

    /* =====================================================
       COMPARTILHAMENTO
    ===================================================== */

    const shareButton =
        document.getElementById("share-ara-button");

    const copyButton =
        document.getElementById("copy-ara-button");

    const shareFeedback =
        document.getElementById("share-feedback");

    const floatingShareCTA =
        document.getElementById("floating-share-cta");

    const floatingShareButton =
        document.getElementById("floating-share-button");

    const floatingCopyButton =
        document.getElementById("floating-copy-button");

    const floatingShareClose =
        document.getElementById("floating-share-close");

    const floatingShareFeedback =
        document.getElementById("floating-share-feedback");

    let floatingShareDismissed = false;
    let identityBooting = true;

    /* =====================================================
       ESTADO
    ===================================================== */

    const state = {
        name: "A.R.A.",
        icon: "A",
        theme: "mint",
        appearance: "dark",
        personality: "objetiva",
        customColor: null
    };

    /* =====================================================
       TEMAS
    ===================================================== */

    const themes = {
        mint: {
            accent: "#12E7B1",
            bright: "#48F5C9",
            soft: "#91FFE2"
        },

        blue: {
            accent: "#4D9FFF",
            bright: "#72C7FF",
            soft: "#A8DCFF"
        },

        purple: {
            accent: "#9B72FF",
            bright: "#C09CFF",
            soft: "#D4C1FF"
        },

        pink: {
            accent: "#FF6FCF",
            bright: "#FF9EE2",
            soft: "#FFC2EC"
        },

        orange: {
            accent: "#FF9D42",
            bright: "#FFC267",
            soft: "#FFD8A8"
        }
    };

    /* =====================================================
       PERSONALIDADES
    ===================================================== */

    const personalities = {
        objetiva: {
            label: "Objetiva",
            welcome:
                "Olá. Estou pronta. O que vamos resolver hoje?",
            response:
                "Claro. Vou priorizar seus compromissos e organizar seu dia de forma objetiva."
        },

        amigavel: {
            label: "Amigável",
            welcome:
                "Oi! Que bom ter você por aqui. O que vamos fazer hoje?",
            response:
                "Pode deixar comigo! Vou organizar seu dia de um jeito leve e destacar primeiro o que realmente importa."
        },

        tecnica: {
            label: "Técnica",
            welcome:
                "Sistema pronto. Qual problema ou tarefa você deseja analisar?",
            response:
                "Entendido. Vou classificar seus compromissos por prioridade, dependência e janela de execução."
        },

        criativa: {
            label: "Criativa",
            welcome:
                "Pronta para transformar suas ideias. Por onde começamos?",
            response:
                "Vamos transformar seu dia em uma sequência inteligente: primeiro o essencial e depois abrimos espaço para criar."
        }
    };

    /* =====================================================
       UTILITÁRIOS
    ===================================================== */

    function clamp(value, min, max) {
        return Math.min(
            Math.max(value, min),
            max
        );
    }

    function hexToRgb(hex) {
        const clean = String(hex || "")
            .replace("#", "")
            .trim();

        if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
            return null;
        }

        return {
            r: parseInt(clean.substring(0, 2), 16),
            g: parseInt(clean.substring(2, 4), 16),
            b: parseInt(clean.substring(4, 6), 16)
        };
    }

    function rgbToHex(r, g, b) {
        const toHex = value =>
            clamp(
                Math.round(value),
                0,
                255
            )
                .toString(16)
                .padStart(2, "0");

        return (
            "#" +
            toHex(r) +
            toHex(g) +
            toHex(b)
        ).toUpperCase();
    }

    function lightenHex(hex, amount) {
        const rgb = hexToRgb(hex);

        if (!rgb) return hex;

        return rgbToHex(
            rgb.r + (255 - rgb.r) * amount,
            rgb.g + (255 - rgb.g) * amount,
            rgb.b + (255 - rgb.b) * amount
        );
    }

    function normalizeName(name) {
        return String(name || "")
            .trim()
            .slice(0, 18);
    }

    function isValidIcon(icon) {
        return [
            "A",
            "✦",
            "◉",
            "∞",
            "◆"
        ].includes(icon);
    }

    /* =====================================================
       COR GLOBAL
    ===================================================== */

    function applyAccentColor(
        accent,
        bright = null,
        soft = null
    ) {
        const rgb = hexToRgb(accent);

        if (!rgb) return;

        const actualBright =
            bright ||
            lightenHex(accent, 0.25);

        const actualSoft =
            soft ||
            lightenHex(accent, 0.52);

        const rgbString =
            `${rgb.r}, ${rgb.g}, ${rgb.b}`;

        [
            ["--accent", accent],
            ["--accent-bright", actualBright],
            ["--accent-soft", actualSoft],
            ["--accent-rgb", rgbString],
            ["--green", accent],
            ["--green-bright", actualBright],
            ["--green-light", actualSoft]
        ].forEach(([property, value]) => {
            body.style.setProperty(property, value);
            root.style.setProperty(property, value);
        });

        updateBrowserThemeColor();
    }

    function updateBrowserThemeColor() {
        const meta = document.querySelector(
            'meta[name="theme-color"]'
        );

        if (!meta) return;

        if (state.appearance === "light") {
            meta.setAttribute(
                "content",
                "#F5F8F7"
            );

            return;
        }

        const accent = getComputedStyle(body)
            .getPropertyValue("--accent")
            .trim();

        meta.setAttribute(
            "content",
            accent || "#041019"
        );
    }

    /* =====================================================
       NOME
    ===================================================== */

    function updateAllNames(name) {
        const cleanName =
            normalizeName(name);

        const finalName =
            cleanName || "A.R.A.";

        state.name = finalName;

        document
            .querySelectorAll(
                ".js-ai-name, .dynamic-ai-name"
            )
            .forEach(element => {
                element.textContent =
                    finalName;
            });

        [
            "preview-ai-name",
            "message-ai-name",
            "input-ai-name"
        ].forEach(id => {
            const element =
                document.getElementById(id);

            if (element) {
                element.textContent =
                    finalName;
            }
        });
    }

    /* =====================================================
       ÍCONE
    ===================================================== */

    function updateAllIcons(icon) {
        const finalIcon =
            isValidIcon(icon)
                ? icon
                : "A";

        state.icon = finalIcon;

        document
            .querySelectorAll(
                ".js-ai-icon"
            )
            .forEach(element => {
                element.textContent =
                    finalIcon;
            });

        [
            "custom-ai-avatar",
            "mini-ai-avatar",
            "mini-ai-avatar-secondary"
        ].forEach(id => {
            const element =
                document.getElementById(id);

            if (element) {
                element.textContent =
                    finalIcon;
            }
        });
    }

    /* =====================================================
       TEMA
    ===================================================== */

    function setTheme(
        themeName,
        options = {}
    ) {
        const theme =
            themes[themeName];

        if (!theme) return;

        state.theme =
            themeName;

        state.customColor =
            null;

        body.dataset.theme =
            themeName;

        applyAccentColor(
            theme.accent,
            theme.bright,
            theme.soft
        );

        document
            .querySelectorAll(
                ".color-option"
            )
            .forEach(option => {
                option.classList.toggle(
                    "active",
                    option.dataset.theme ===
                        themeName
                );
            });

        if (customColor) {
            customColor.value =
                theme.accent;
        }

        if (customColorValue) {
            customColorValue.textContent =
                theme.accent;
        }

        if (options.save !== false) {
            saveIdentity();
        }
    }

    /* =====================================================
       COR PERSONALIZADA
    ===================================================== */

    function setCustomColor(
        hex,
        options = {}
    ) {
        if (
            !/^#[0-9A-Fa-f]{6}$/.test(
                String(hex || "")
            )
        ) {
            return;
        }

        const normalized =
            String(hex).toUpperCase();

        state.customColor =
            normalized;

        document
            .querySelectorAll(
                ".color-option"
            )
            .forEach(option => {
                option.classList.remove(
                    "active"
                );
            });

        applyAccentColor(normalized);

        if (customColor) {
            customColor.value =
                normalized;
        }

        if (customColorValue) {
            customColorValue.textContent =
                normalized;
        }

        if (options.save !== false) {
            saveIdentity();
        }
    }

    /* =====================================================
       APARÊNCIA
    ===================================================== */

    function setAppearance(
        appearance,
        options = {}
    ) {
        const allowed = [
            "dark",
            "midnight",
            "light"
        ];

        if (!allowed.includes(appearance)) {
            return;
        }

        state.appearance =
            appearance;

        body.dataset.appearance =
            appearance;

        document
            .querySelectorAll(
                ".appearance-option"
            )
            .forEach(option => {
                option.classList.toggle(
                    "active",
                    option.dataset.appearance ===
                        appearance
                );
            });

        updateBrowserThemeColor();

        if (options.save !== false) {
            saveIdentity();
        }
    }

    /* =====================================================
       PERSONALIDADE
    ===================================================== */

    function setPersonality(
        personality,
        options = {}
    ) {
        const data =
            personalities[personality];

        if (!data) return;

        state.personality =
            personality;

        document
            .querySelectorAll(
                ".personality-option"
            )
            .forEach(option => {
                option.classList.toggle(
                    "active",
                    option.dataset.personality ===
                        personality
                );
            });

        if (personalityLabel) {
            personalityLabel.textContent =
                data.label;
        }

        if (personalizedMessage) {
            animateTextChange(
                personalizedMessage,
                data.welcome
            );
        }

        if (personalityResponse) {
            animateTextChange(
                personalityResponse,
                data.response
            );
        }

        if (options.save !== false) {
            saveIdentity();
        }
    }

    /* =====================================================
       CTA FLUTUANTE
    ===================================================== */

    function showFloatingShareCTA() {
        if (
            !floatingShareCTA ||
            floatingShareDismissed ||
            identityBooting
        ) {
            return;
        }

        floatingShareCTA.classList.add(
            "visible"
        );

        floatingShareCTA.setAttribute(
            "aria-hidden",
            "false"
        );

        floatingShareCTA.classList.remove(
            "attention"
        );

        void floatingShareCTA.offsetWidth;

        floatingShareCTA.classList.add(
            "attention"
        );
    }

    function hideFloatingShareCTA() {
        if (!floatingShareCTA) return;

        floatingShareCTA.classList.remove(
            "visible"
        );

        floatingShareCTA.setAttribute(
            "aria-hidden",
            "true"
        );
    }

    function markPersonalizationChanged() {
        showFloatingShareCTA();
    }

    /* =====================================================
       LOCAL STORAGE
    ===================================================== */

    function saveIdentity() {
    /*
     * Intencionalmente vazio.
     *
     * A personalização da demonstração
     * não deve sobreviver ao reload.
     */
}

    function applyIdentity(
        identity,
        options = {}
    ) {
        const {
            save = false,
            updateInput = true
        } = options;

        const name =
            normalizeName(identity?.name) ||
            "A.R.A.";

        const icon =
            isValidIcon(identity?.icon)
                ? identity.icon
                : "A";

        const theme =
            themes[identity?.theme]
                ? identity.theme
                : "mint";

        const appearance =
            [
                "dark",
                "midnight",
                "light"
            ].includes(identity?.appearance)
                ? identity.appearance
                : "dark";

        const personality =
            personalities[
                identity?.personality
            ]
                ? identity.personality
                : "objetiva";

        updateAllNames(name);
        updateAllIcons(icon);

        if (
            identity?.customColor &&
            /^#[0-9A-Fa-f]{6}$/.test(
                identity.customColor
            )
        ) {
            setCustomColor(
                identity.customColor,
                {
                    save: false
                }
            );
        } else {
            setTheme(
                theme,
                {
                    save: false
                }
            );
        }

        setAppearance(
            appearance,
            {
                save: false
            }
        );

        setPersonality(
            personality,
            {
                save: false
            }
        );

        document
            .querySelectorAll(
                ".name-preset"
            )
            .forEach(option => {
                option.classList.toggle(
                    "active",
                    option.dataset.name ===
                        name
                );
            });

        document
            .querySelectorAll(
                ".icon-option"
            )
            .forEach(option => {
                option.classList.toggle(
                    "active",
                    option.dataset.icon ===
                        icon
                );
            });

        if (updateInput && nameInput) {
            const presets = [
                "A.R.A.",
                "Luna",
                "Nova",
                "Íris"
            ];

            nameInput.value =
                presets.includes(name)
                    ? ""
                    : name;

            if (nameCounter) {
                nameCounter.textContent =
                    `${nameInput.value.length}/18`;
            }
        }

        if (save) {
            saveIdentity();
        }
    }

    function loadIdentity() {
        let saved = null;

        try {
            const raw =
                localStorage.getItem(
                    "ara_landing_identity"
                );

            if (raw) {
                saved =
                    JSON.parse(raw);
            }
        } catch (error) {
            console.warn(
                "Não foi possível carregar a personalização.",
                error
            );
        }

        applyIdentity(
            saved || state,
            {
                save: false,
                updateInput: true
            }
        );
    }

    /* =====================================================
       LINK COMPARTILHÁVEL
    ===================================================== */

    function generateShareURL() {
        const url =
            new URL(
                window.location.href
            );

        [
            "ara_name",
            "ara_icon",
            "ara_theme",
            "ara_color",
            "ara_appearance",
            "ara_personality"
        ].forEach(param => {
            url.searchParams.delete(param);
        });

        url.hash = "";

        url.searchParams.set(
            "ara_name",
            state.name
        );

        url.searchParams.set(
            "ara_icon",
            state.icon
        );

        url.searchParams.set(
            "ara_appearance",
            state.appearance
        );

        url.searchParams.set(
            "ara_personality",
            state.personality
        );

        if (
            state.customColor &&
            /^#[0-9A-Fa-f]{6}$/.test(
                state.customColor
            )
        ) {
            url.searchParams.set(
                "ara_color",
                state.customColor
            );
        } else {
            url.searchParams.set(
                "ara_theme",
                state.theme
            );
        }

        return url.toString();
    }

    /* =====================================================
       COPIAR
    ===================================================== */

    async function copyText(text) {
        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {
            await navigator.clipboard.writeText(
                text
            );

            return;
        }

        const textarea =
            document.createElement(
                "textarea"
            );

        textarea.value =
            text;

        textarea.setAttribute(
            "readonly",
            ""
        );

        textarea.style.position =
            "fixed";

        textarea.style.opacity =
            "0";

        textarea.style.pointerEvents =
            "none";

        document.body.appendChild(
            textarea
        );

        textarea.select();

        const success =
            document.execCommand(
                "copy"
            );

        textarea.remove();

        if (!success) {
            throw new Error(
                "Não foi possível copiar o link."
            );
        }
    }

    function showShareFeedback(message) {
        [
            shareFeedback,
            floatingShareFeedback
        ]
            .filter(Boolean)
            .forEach(element => {
                element.textContent =
                    message;

                element.classList.add(
                    "visible"
                );
            });

        window.setTimeout(
            () => {
                [
                    shareFeedback,
                    floatingShareFeedback
                ]
                    .filter(Boolean)
                    .forEach(element => {
                        element.classList.remove(
                            "visible"
                        );

                        element.textContent =
                            "";
                    });
            },
            3000
        );
    }

    async function copyShareURL() {
        const url =
            generateShareURL();

        try {
            await copyText(url);

            showShareFeedback(
                "Link copiado. Sua versão está pronta para ser compartilhada."
            );

            return true;
        } catch (error) {
            console.warn(
                "Falha ao copiar o link.",
                error
            );

            showShareFeedback(
                "Não foi possível copiar automaticamente. Tente novamente."
            );

            return false;
        }
    }

    /* =====================================================
       COMPARTILHAR
    ===================================================== */

    async function shareARA() {
        const url =
            generateShareURL();

        const title =
            `${state.name} — minha versão da A.R.A.`;

        const text =
            `Eu personalizei minha própria versão da A.R.A.: ${state.name}. Veja como ficou.`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url
                });

                showShareFeedback(
                    "Compartilhamento aberto."
                );

                return;
            } catch (error) {
                if (
                    error &&
                    error.name === "AbortError"
                ) {
                    return;
                }
            }
        }

        await copyShareURL();
    }

    /* =====================================================
       RECEBER PERSONALIZAÇÃO PELO LINK
    ===================================================== */

    function loadSharedIdentity() {
        const params =
            new URLSearchParams(
                window.location.search
            );

        const sharedParams = [
            "ara_name",
            "ara_icon",
            "ara_theme",
            "ara_color",
            "ara_appearance",
            "ara_personality"
        ];

        const hasSharedState =
            sharedParams.some(param =>
                params.has(param)
            );

        if (!hasSharedState) {
            return false;
        }

        const urlIcon =
            params.get("ara_icon");

        const urlTheme =
            params.get("ara_theme");

        const urlAppearance =
            params.get(
                "ara_appearance"
            );

        const urlPersonality =
            params.get(
                "ara_personality"
            );

        const urlColor =
            params.get("ara_color");

        const sharedIdentity = {
            name:
                normalizeName(
                    params.get(
                        "ara_name"
                    )
                ) || "A.R.A.",

            icon:
                isValidIcon(urlIcon)
                    ? urlIcon
                    : "A",

            theme:
                themes[urlTheme]
                    ? urlTheme
                    : "mint",

            appearance:
                [
                    "dark",
                    "midnight",
                    "light"
                ].includes(urlAppearance)
                    ? urlAppearance
                    : "dark",

            personality:
                personalities[
                    urlPersonality
                ]
                    ? urlPersonality
                    : "objetiva",

            customColor:
                /^#[0-9A-Fa-f]{6}$/.test(
                    urlColor || ""
                )
                    ? urlColor.toUpperCase()
                    : null
        };

        applyIdentity(
            sharedIdentity,
            {
                save: true,
                updateInput: true
            }
        );

        return true;
    }

    /* =====================================================
       CLIQUES DA PERSONALIZAÇÃO
    ===================================================== */

    studio.addEventListener(
        "click",
        event => {
            const nameButton =
                event.target.closest(
                    ".name-preset"
                );

            if (nameButton) {
                const selectedName =
                    nameButton.dataset.name ||
                    "A.R.A.";

                document
                    .querySelectorAll(
                        ".name-preset"
                    )
                    .forEach(item => {
                        item.classList.remove(
                            "active"
                        );
                    });

                nameButton.classList.add(
                    "active"
                );

                if (nameInput) {
                    nameInput.value = "";
                }

                if (nameCounter) {
                    nameCounter.textContent =
                        "0/18";
                }

                updateAllNames(
                    selectedName
                );

                saveIdentity();
                markPersonalizationChanged();

                return;
            }

            const colorButton =
                event.target.closest(
                    ".color-option"
                );

            if (colorButton) {
                setTheme(
                    colorButton.dataset.theme
                );

                markPersonalizationChanged();

                return;
            }

            const appearanceButton =
                event.target.closest(
                    ".appearance-option"
                );

            if (appearanceButton) {
                setAppearance(
                    appearanceButton
                        .dataset
                        .appearance
                );

                markPersonalizationChanged();

                return;
            }

            const personalityButton =
                event.target.closest(
                    ".personality-option"
                );

            if (personalityButton) {
                setPersonality(
                    personalityButton
                        .dataset
                        .personality
                );

                markPersonalizationChanged();

                return;
            }

            const iconButton =
                event.target.closest(
                    ".icon-option"
                );

            if (iconButton) {
                const icon =
                    iconButton.dataset.icon ||
                    "A";

                document
                    .querySelectorAll(
                        ".icon-option"
                    )
                    .forEach(item => {
                        item.classList.remove(
                            "active"
                        );
                    });

                iconButton.classList.add(
                    "active"
                );

                updateAllIcons(icon);

                saveIdentity();
                markPersonalizationChanged();
            }
        }
    );

    /* =====================================================
       NOME PERSONALIZADO
    ===================================================== */

    if (nameInput) {
        nameInput.addEventListener(
            "input",
            event => {
                const value =
                    event.target.value
                        .slice(0, 18);

                event.target.value =
                    value;

                if (nameCounter) {
                    nameCounter.textContent =
                        `${value.length}/18`;
                }

                document
                    .querySelectorAll(
                        ".name-preset"
                    )
                    .forEach(item => {
                        item.classList.remove(
                            "active"
                        );
                    });

                updateAllNames(value);
                saveIdentity();

                if (value.trim()) {
                    markPersonalizationChanged();
                }
            }
        );
    }

    /* =====================================================
       COLOR PICKER
    ===================================================== */

    if (customColor) {
        customColor.addEventListener(
            "input",
            event => {
                setCustomColor(
                    event.target.value
                );

                markPersonalizationChanged();
            }
        );

        customColor.addEventListener(
            "change",
            event => {
                setCustomColor(
                    event.target.value
                );

                markPersonalizationChanged();
            }
        );
    }

    /* =====================================================
       RESET
    ===================================================== */

    if (resetButton) {
        resetButton.addEventListener(
            "click",
            () => {
                floatingShareDismissed =
                    false;

                [
                    "--accent",
                    "--accent-bright",
                    "--accent-soft",
                    "--accent-rgb",
                    "--green",
                    "--green-bright",
                    "--green-light"
                ].forEach(property => {
                    body.style.removeProperty(
                        property
                    );

                    root.style.removeProperty(
                        property
                    );
                });

                applyIdentity(
                    {
                        name: "A.R.A.",
                        icon: "A",
                        theme: "mint",
                        appearance: "dark",
                        personality: "objetiva",
                        customColor: null
                    },
                    {
                        save: false,
                        updateInput: true
                    }
                );

                try {
                    localStorage.removeItem(
                        "ara_landing_identity"
                    );
                } catch {
                    /* Ignora */
                }

                saveIdentity();
                hideFloatingShareCTA();
            }
        );
    }

    /* =====================================================
       BOTÕES DE COMPARTILHAMENTO
    ===================================================== */

    if (shareButton) {
        shareButton.addEventListener(
            "click",
            shareARA
        );
    }

    if (copyButton) {
        copyButton.addEventListener(
            "click",
            copyShareURL
        );
    }

    if (floatingShareButton) {
        floatingShareButton.addEventListener(
            "click",
            shareARA
        );
    }

    if (floatingCopyButton) {
        floatingCopyButton.addEventListener(
            "click",
            copyShareURL
        );
    }

    if (floatingShareClose) {
        floatingShareClose.addEventListener(
            "click",
            () => {
                floatingShareDismissed =
                    true;

                hideFloatingShareCTA();
            }
        );
    }

    /* =====================================================
       INICIALIZAÇÃO
    ===================================================== */

    /*
 * A landing sempre começa com
 * a identidade oficial da A.R.A.
 *
 * A personalização existe apenas
 * durante a sessão atual da página.
 */

applyIdentity(
    {
        name: "A.R.A.",
        icon: "A",
        theme: "mint",
        appearance: "dark",
        personality: "objetiva",
        customColor: null
    },
    {
        save: false,
        updateInput: true
    }
);

identityBooting = false;

    console.log(
        "A.R.A. Identity Studio carregado."
    );
}



/* =========================================================
   COMPARTILHAR PROJETO A.R.A.
========================================================= */

function setupProjectShare() {
    const buttons = [
        document.getElementById("project-share-button"),
        document.getElementById("hero-share-button")
    ].filter(Boolean);

    if (!buttons.length) return;

    async function shareProject() {
        const shareData = {
            title: "A.R.A. — O próximo passo é o futuro",
            text:
                "Conheça a A.R.A., uma nova experiência de assistente pessoal que combina contexto, organização, personalização e ação.",
            url:
                window.location.origin +
                window.location.pathname
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch (error) {
                if (error?.name === "AbortError") {
                    return;
                }
            }
        }

        try {
            await navigator.clipboard.writeText(
                shareData.url
            );

            showProjectShareSuccess(
                "Link copiado!"
            );
        } catch {
            showProjectShareSuccess(
                "Copie o endereço da página para compartilhar."
            );
        }
    }

    buttons.forEach(button => {
        button.addEventListener(
            "click",
            shareProject
        );
    });
}

function showProjectShareSuccess(message) {
    let toast =
        document.getElementById(
            "project-share-toast"
        );

    if (!toast) {
        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "project-share-toast";

        toast.className =
            "project-share-toast";

        document.body.appendChild(
            toast
        );
    }

    toast.textContent =
        message;

    toast.classList.add(
        "visible"
    );

    clearTimeout(
        window.__araShareToast
    );

    window.__araShareToast =
        setTimeout(() => {
            toast.classList.remove(
                "visible"
            );
        }, 2500);
}

/* =========================================================
   ANIMAÇÃO DE TROCA DE TEXTO
========================================================= */

function animateTextChange(
    element,
    text
) {
    if (!element) return;

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (
        reducedMotion ||
        typeof element.animate !==
        "function"
    ) {
        element.textContent = text;
        return;
    }

    const animation =
        element.animate(
            [
                {
                    opacity: 1,
                    transform:
                        "translateY(0)"
                },
                {
                    opacity: 0,
                    transform:
                        "translateY(5px)"
                }
            ],
            {
                duration: 120,
                fill: "forwards",
                easing: "ease"
            }
        );

    animation.finished
        .then(() => {
            element.textContent = text;

            element.animate(
                [
                    {
                        opacity: 0,
                        transform:
                            "translateY(-5px)"
                    },
                    {
                        opacity: 1,
                        transform:
                            "translateY(0)"
                    }
                ],
                {
                    duration: 220,
                    fill: "forwards",
                    easing: "ease"
                }
            );
        })
        .catch(() => {
            element.textContent = text;
        });       
}


/* =========================================================
   COMPARTILHAMENTO DO PROJETO A.R.A.
========================================================= */

function setupProjectShare() {

    const headerButton =
        document.getElementById(
            "project-share-button"
        );

    const sectionButton =
        document.getElementById(
            "section-share-button"
        );

    const copyButton =
        document.getElementById(
            "section-copy-button"
        );

    const feedback =
        document.getElementById(
            "project-share-feedback"
        );


    /*
     * Remove parâmetros e hash.
     * Assim compartilhamos a landing principal,
     * não a personalização da pessoa.
     */

    const projectURL = (() => {

        try {

            const url =
                new URL(
                    window.location.href
                );

            url.search = "";
            url.hash = "";

            return url.toString();

        } catch {

            return window.location.href;

        }

    })();


    const shareData = {

        title:
            "A.R.A. — O próximo passo é o futuro",

        text:
            "Conheça a A.R.A., uma experiência de assistente pessoal criada para combinar contexto, personalização, organização e ação.",

        url:
            projectURL

    };


    /* =====================================================
       FEEDBACK VISUAL
    ===================================================== */

    function showFeedback(message) {

        console.log(
            "[A.R.A. Share]",
            message
        );


        if (!feedback) {
            return;
        }


        feedback.textContent =
            message;


        feedback.classList.add(
            "visible"
        );


        clearTimeout(
            window.__araProjectShareTimer
        );


        window.__araProjectShareTimer =
            setTimeout(
                () => {

                    feedback.classList.remove(
                        "visible"
                    );

                    feedback.textContent =
                        "";

                },
                3000
            );

    }


    /* =====================================================
       COPIAR TEXTO
    ===================================================== */

    async function copyText(text) {

        /*
         * Método moderno
         */

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(
                text
            );

            return true;

        }


        /*
         * Fallback para localhost,
         * preview e alguns navegadores.
         */

        const textarea =
            document.createElement(
                "textarea"
            );


        textarea.value =
            text;


        textarea.setAttribute(
            "readonly",
            ""
        );


        textarea.style.position =
            "fixed";

        textarea.style.left =
            "-9999px";

        textarea.style.top =
            "-9999px";

        textarea.style.opacity =
            "0";


        document.body.appendChild(
            textarea
        );


        textarea.focus();
        textarea.select();


        let success = false;


        try {

            success =
                document.execCommand(
                    "copy"
                );

        } catch {

            success = false;

        }


        textarea.remove();


        if (!success) {

            throw new Error(
                "Falha ao copiar"
            );

        }


        return true;

    }


    /* =====================================================
       COPIAR LINK
    ===================================================== */

    async function copyProjectLink() {

        try {

            await copyText(
                projectURL
            );


            showFeedback(
                "✓ Link da A.R.A. copiado!"
            );


        } catch (error) {

            console.error(
                "[A.R.A.] Erro ao copiar:",
                error
            );


            /*
             * Último fallback:
             * abre uma caixa com o link.
             */

            window.prompt(
                "Copie o link da A.R.A.:",
                projectURL
            );

        }

    }


    /* =====================================================
       COMPARTILHAR
    ===================================================== */

    async function shareProject() {

        /*
         * Celulares e navegadores
         * com Web Share API.
         */

        if (
            typeof navigator.share ===
            "function"
        ) {

            try {

                await navigator.share(
                    shareData
                );


                showFeedback(
                    "Obrigado por compartilhar a A.R.A.!"
                );


                return;

            } catch (error) {

                /*
                 * Usuário apenas fechou
                 * a janela de compartilhamento.
                 */

                if (
                    error &&
                    error.name ===
                    "AbortError"
                ) {

                    return;

                }


                console.warn(
                    "[A.R.A.] Web Share indisponível:",
                    error
                );

            }

        }


        /*
         * Desktop:
         * copia o link automaticamente.
         */

        await copyProjectLink();

    }


    /* =====================================================
       EVENTOS
    ===================================================== */

    if (headerButton) {

        headerButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                shareProject();

            }
        );

    }


    if (sectionButton) {

        sectionButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                shareProject();

            }
        );

    }


    if (copyButton) {

        copyButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                copyProjectLink();

            }
        );

    }


    /*
     * Ajuda a identificar rapidamente
     * se os IDs estão corretos.
     */

    console.log(
        "[A.R.A.] Compartilhamento carregado",
        {
            headerButton:
                Boolean(headerButton),

            sectionButton:
                Boolean(sectionButton),

            copyButton:
                Boolean(copyButton),

            url:
                projectURL
        }
    );

}