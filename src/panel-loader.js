/**
 * Panel 1 Loading Animation Controller
 * Duration: 1.5 seconds loop
 * Fade-in transition: 600ms ease-in-out
 */

class PanelLoader {
    constructor(panelElement, options = {}) {
        this.panel = panelElement;
        this.options = {
            loaderType: options.loaderType || 'spinner',
            loadingText: options.loadingText || 'Loading magical content',
            duration: 1500,
            fadeInDuration: 600,
            ...options
        };

        this.isLoading = false;
        this.loaderElement = null;
        this.contentWrapper = null;
    }

    show() {
        if (this.isLoading) return;

        this.isLoading = true;
        this.panel.classList.add('panel-loading-state');

        this.contentWrapper = this.panel.querySelector('.panel-content-wrapper');
        if (!this.contentWrapper) {
            const children = Array.from(this.panel.children);
            this.contentWrapper = document.createElement('div');
            this.contentWrapper.className = 'panel-content-wrapper';
            children.forEach(child => this.contentWrapper.appendChild(child));
            this.panel.appendChild(this.contentWrapper);
        }

        this.contentWrapper.style.opacity = '0';

        if (this.options.loaderType === 'spinner') {
            this.loaderElement = this.createSpinnerLoader();
        } else if (this.options.loaderType === 'skeleton') {
            this.loaderElement = this.createSkeletonLoader();
        }

        this.panel.insertBefore(this.loaderElement, this.panel.firstChild);

        this.preloadImages();
    }

    createSpinnerLoader() {
        const container = document.createElement('div');
        container.className = 'panel-loader-container';

        const spinner = document.createElement('div');
        spinner.className = 'panel-loader-spinner';

        for (let i = 0; i < 3; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'panel-spinner-leaf';
            spinner.appendChild(leaf);
        }

        const text = document.createElement('div');
        text.className = 'panel-loader-text';
        text.innerHTML = `
            ${this.options.loadingText}
            <span class="panel-loader-dots">
                <span class="panel-loader-dot"></span>
                <span class="panel-loader-dot"></span>
                <span class="panel-loader-dot"></span>
            </span>
        `;

        container.appendChild(spinner);
        container.appendChild(text);

        return container;
    }

    createSkeletonLoader() {
        const container = document.createElement('div');
        container.className = 'panel-skeleton-loader';

        const avatar = document.createElement('div');
        avatar.className = 'panel-skeleton-avatar';

        const bubble = document.createElement('div');
        bubble.className = 'panel-skeleton-bubble';

        const label = document.createElement('div');
        label.className = 'panel-skeleton-label';

        container.appendChild(avatar);
        container.appendChild(bubble);
        container.appendChild(label);

        return container;
    }

    preloadImages() {
        const images = this.contentWrapper.querySelectorAll('img');
        const imagePromises = [];

        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                const promise = new Promise((resolve, reject) => {
                    img.onload = () => {
                        img.classList.add('loaded');
                        resolve();
                    };
                    img.onerror = () => {
                        img.classList.add('loaded');
                        resolve();
                    };
                });
                imagePromises.push(promise);
            }
        });

        Promise.all(imagePromises).then(() => {
            setTimeout(() => {
                this.hide();
            }, Math.max(0, this.options.duration - performance.now()));
        });
    }

    hide() {
        if (!this.isLoading) return;

        if (this.loaderElement) {
            this.loaderElement.style.opacity = '0';
            this.loaderElement.style.transition = `opacity ${this.options.fadeInDuration}ms ease-in-out`;

            setTimeout(() => {
                if (this.loaderElement && this.loaderElement.parentNode) {
                    this.loaderElement.remove();
                }
            }, this.options.fadeInDuration);
        }

        if (this.contentWrapper) {
            setTimeout(() => {
                this.contentWrapper.classList.add('loaded');
                this.contentWrapper.style.opacity = '1';
            }, 50);
        }

        setTimeout(() => {
            this.panel.classList.remove('panel-loading-state');
            this.isLoading = false;
        }, this.options.fadeInDuration);
    }

    static attachToPanel(panelSelector, options = {}) {
        const panel = document.querySelector(panelSelector);
        if (!panel) {
            console.warn(`Panel not found: ${panelSelector}`);
            return null;
        }

        const loader = new PanelLoader(panel, options);
        return loader;
    }

    static attachToMultiplePanels(panelSelectors, options = {}) {
        const loaders = [];
        panelSelectors.forEach(selector => {
            const loader = PanelLoader.attachToPanel(selector, options);
            if (loader) loaders.push(loader);
        });
        return loaders;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PanelLoader;
}

if (typeof window !== 'undefined') {
    window.PanelLoader = PanelLoader;
}
