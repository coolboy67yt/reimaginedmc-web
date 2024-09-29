class MinecraftServerElement extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        this.attachShadow({ mode: 'open' });

        // Create elements
        const container = document.createElement('div');
        const serverIcon = document.createElement('img');
        const textContainer = document.createElement('div');
        const serverName = document.createElement('div');
        const playerCount = document.createElement('div');

        // Add classes to elements
        container.setAttribute('id', 'server-info');
        serverIcon.setAttribute('id', 'server-icon');
        textContainer.setAttribute('id', 'text-container');
        serverName.setAttribute('id', 'server-name');
        playerCount.setAttribute('id', 'player-count');

        // Append elements to the text container
        textContainer.appendChild(serverName);
        textContainer.appendChild(playerCount);
        
        // Append elements to the main container
        container.appendChild(serverIcon);
        container.appendChild(textContainer);
        this.shadowRoot.appendChild(container);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'Monocraft';
                src: url('Monocraft.ttf') format('truetype-collection');
                font-weight: normal;
                font-style: normal;
            }

            #server-info {
                display: inline-flex;
                align-items: center;
                background: url('assets/img/backgrounds/Dirt_background_JE2.webp');
                padding: 10px;
                border-radius: 8px;
                width: auto; /* Dynamic width */
            }
            #server-icon {
                width: 64px;
                height: 64px;
                margin-right: 10px;
            }
            #text-container {
                display: flex;
                flex-direction: column;
                text-align: left;
            }
            #server-name {
                font-family: 'Monocraft', sans-serif;
                font-size: 18px;
                color: white;
            }
            #player-count {
                font-family: 'Monocraft', sans-serif;
                font-size: 14px;
                color: white;
            }
            .online {
                outline: 4px solid lime;
            }
            .offline {
                outline: 4px solid red;
            }
        `;
        this.shadowRoot.appendChild(style);
    }

    connectedCallback() {
        const src = this.getAttribute('src');
        if (src) {
            this.checkServerStatus(src);
        }
    }

    async checkServerStatus(src) {
        const statusUrl = `https://api.mcsrvstat.us/2/${src}`;
        const faviconUrl = 'assets/img/minefort.png';  // Use the static image
    
        try {
            // Fetch server status
            const statusResponse = await fetch(statusUrl);
            const statusData = await statusResponse.json();
    
            const serverInfoElement = this.shadowRoot.getElementById('server-info');
            const nameElement = this.shadowRoot.getElementById('server-name');
            const playerCountElement = this.shadowRoot.getElementById('player-count');
            const serverIconElement = this.shadowRoot.getElementById('server-icon');
    
            if (statusData.online) {
                nameElement.textContent = statusData.hostname || src;
    
                // Display number of players online
                playerCountElement.textContent = `Players online: ${statusData.players.online}/${statusData.players.max}`;
    
                // Set title to indicate online status
                serverInfoElement.setAttribute('title', 'Online');
    
                serverIconElement.src = faviconUrl;
    
                serverInfoElement.classList.add('online');
                serverInfoElement.classList.remove('offline');
            } else {
                nameElement.textContent = src;
                
                // Set title to indicate offline status
                serverInfoElement.setAttribute('title', 'Offline');
                
                playerCountElement.textContent = 'Server is offline!';
                serverIconElement.src = '';  // Clear the icon when offline
    
                serverInfoElement.classList.add('offline');
                serverInfoElement.classList.remove('online');
            }
        } catch (error) {
            console.error('Error fetching server status:', error);
            const serverInfoElement = this.shadowRoot.getElementById('server-info');
            serverInfoElement.classList.add('offline');
        }
    }
}

customElements.define('minecraft-server', MinecraftServerElement);
