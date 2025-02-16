class Sidebar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="sidebar">
                <h2 style="text-align: left;">#sidebar</h2>
                <button class="clickableTextButton" onclick="goToPage('index.html')">/index.html (home)</button>
                <button class="clickableTextButton" onclick="goToPage('about.html')">/about.html (about me)</button>
                <button class="clickableTextButton" onclick="goToPage('socials.html')">/socials.html (socials)</button>
                <button class="clickableTextButton" onclick="goToPage('comms.html')">/comms.html (comms TOS)</button>
                <button class="clickableTextButton" onclick="goToPage('prices.html')">/prices.html (comms prices)</button>
                <button class="clickableTextButton" onclick="goToPage('gallery.html')">/gallery.html (gallery)</button>
            </div>
        `;
    }
}
customElements.define('custom-sidebar', Sidebar);