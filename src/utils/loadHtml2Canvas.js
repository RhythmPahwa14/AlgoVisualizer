// Dynamic loader for html2canvas
export const loadHtml2Canvas = async () => {
    if (window.html2canvas) {
        return window.html2canvas;
    }

    try {
        // Try to load html2canvas from CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.async = true;

        return new Promise((resolve, reject) => {
            script.onload = () => {
                if (window.html2canvas) {
                    resolve(window.html2canvas);
                } else {
                    reject(new Error('html2canvas failed to load'));
                }
            };
            script.onerror = () => reject(new Error('Failed to load html2canvas script'));
            document.head.appendChild(script);
        });
    } catch (error) {
        console.warn('Could not load html2canvas:', error);
        return null;
    }
};

export default loadHtml2Canvas;
