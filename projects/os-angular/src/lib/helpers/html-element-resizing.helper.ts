export class HtmlElementResizing {

    private readonly element: HTMLElement;
    private readonly resizers: NodeListOf<Element>;

    private readonly minimumSize = 20;
    private originalWidth = 20;
    private originalHeight = 20;
    private originalX = 20;
    private originalY = 20;
    private originalMouseX = 20;
    private originalMouseY = 20;

    constructor (element: HTMLElement) {
        this.element = element;
        this.resizers = element.querySelectorAll('div.os-resizer');

        this.initResizers();
    }

    public destroy (): void {
    }

    private initResizers (): void {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.resizers.length; i++) {
            const currentResizer = this.resizers[i];

            const resize = (e: MouseEvent) => {
                if (currentResizer.classList.contains('bottom-right')) {
                    const width = this.originalWidth + (e.pageX - this.originalMouseX);
                    const height = this.originalHeight + (e.pageY - this.originalMouseY);
                    if (width > this.minimumSize) {
                        this.element.style.width = width + 'px';
                    }
                    if (height > this.minimumSize) {
                        this.element.style.height = height + 'px';
                    }
                } else if (currentResizer.classList.contains('bottom-left')) {
                    const height = this.originalHeight + (e.pageY - this.originalMouseY);
                    const width = this.originalWidth - (e.pageX - this.originalMouseX);
                    if (height > this.minimumSize) {
                        this.element.style.height = height + 'px';
                    }
                    if (width > this.minimumSize) {
                        this.element.style.width = width + 'px';
                        this.element.style.left = this.originalX + (e.pageX - this.originalMouseX) + 'px';
                    }
                } else if (currentResizer.classList.contains('top-right')) {
                    const width = this.originalWidth + (e.pageX - this.originalMouseX);
                    const height = this.originalHeight - (e.pageY - this.originalMouseY);
                    if (width > this.minimumSize) {
                        this.element.style.width = width + 'px';
                    }
                    if (height > this.minimumSize) {
                        this.element.style.height = height + 'px';
                        this.element.style.top = this.originalY + (e.pageY - this.originalMouseY) + 'px';
                    }
                } else {
                    const width = this.originalWidth - (e.pageX - this.originalMouseX);
                    const height = this.originalHeight - (e.pageY - this.originalMouseY);
                    if (width > this.minimumSize) {
                        this.element.style.width = width + 'px';
                        this.element.style.left = this.originalX + (e.pageX - this.originalMouseX) + 'px';
                    }
                    if (height > this.minimumSize) {
                        this.element.style.height = height + 'px';
                        this.element.style.top = this.originalY + (e.pageY - this.originalMouseY) + 'px';
                    }
                }
            };

            const stopResize = () => {
                window.removeEventListener('mousemove', resize);
            };

            currentResizer.addEventListener('mousedown', (e: MouseEvent) => {
                e.preventDefault();
                this.originalWidth = parseFloat(getComputedStyle(this.element, null).getPropertyValue('width').replace('px', ''));
                this.originalHeight = parseFloat(getComputedStyle(this.element, null).getPropertyValue('height').replace('px', ''));
                this.originalX = this.element.getBoundingClientRect().left;
                this.originalY = this.element.getBoundingClientRect().top;
                this.originalMouseX = e.pageX;
                this.originalMouseY = e.pageY;
                window.addEventListener('mousemove', resize);
                window.addEventListener('mouseup', stopResize);
            });
        }
    }

}
