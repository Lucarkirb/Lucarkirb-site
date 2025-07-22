class Sidebar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <button class="sidebar-toggle floating-toggle" id="sidebarToggle" onclick="toggleSidebar()">
                <span class="toggle-icon">☰</span>
            </button>
            <div class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <h2 style="text-align: left;">#sidebar</h2>
                    <button class="sidebar-close" onclick="toggleSidebar()">
                        <span class="close-icon">✕</span>
                    </button>
                </div>
                <div class="sidebar-content" id="sidebarContent">
                    <button class="clickableTextButton" onclick="goToPage('index.html')">/index.html (home)</button>
                    <button class="clickableTextButton" onclick="goToPage('about.html')">/about.html (about me)</button>
                    <button class="clickableTextButton" onclick="goToPage('socials.html')">/socials.html (socials)</button>
                    <button class="clickableTextButton" onclick="goToPage('comms.html')">/comms.html (comms TOS)</button>
                    <button class="clickableTextButton" onclick="goToPage('prices.html')">/prices.html (comms prices)</button>
                    <button class="clickableTextButton" onclick="goToPage('gallery.html')">/gallery.html (gallery)</button>
                </div>
            </div>
        `;
    }
}


customElements.define('custom-sidebar', Sidebar);