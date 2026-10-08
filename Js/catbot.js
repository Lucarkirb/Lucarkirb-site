const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const catbotMessage = document.getElementById('catbot-message');
const userMessage = document.getElementById('user-message');
const dotmatrixDisplay = document.getElementById('matrix-display-container');
const body = document.body;

const meows = ['meow', 'mrrp', 'purr', 'yowl', 'mew', 'mewl', 'miaow', 'mrrrow'];

let animationState = "off";

function getRequiredItemCount(container, itemSize = 2, gapSize = 2) {
    // Get exact inner content dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    const unitSize = itemSize + gapSize; // 4px

    // Calculate whole columns and rows
    const cols = Math.floor((width + gapSize) / unitSize);
    const rows = Math.floor((height + gapSize) / unitSize);

    return Math.max(0, cols * rows);
}

function generateDisplay() {
    dotmatrixDisplay.innerHTML = ''; // Clear existing dots

    const requiredItemCount = getRequiredItemCount(dotmatrixDisplay, 2, 1);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < requiredItemCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        fragment.appendChild(dot);
    }

    dotmatrixDisplay.appendChild(fragment);
}


async function sendMessage() {
    
    const userText = userInput.value.trim();
    if (userText === '') return;
    userInput.disabled = true;
    userInput.placeholder = 'Thinking...';
    animationState = "shimmer";
    const newUserMessage = userMessage.cloneNode(true);
    newUserMessage.classList.remove('hidden');
    newUserMessage.innerHTML = `${userText}`;
    // add the new user message to the chat box
    chatBox.appendChild(newUserMessage);

    // clear the input field
    userInput.value = '';

    // show the thinking animation
    const newCatbotMessage = catbotMessage.cloneNode(true);
    newCatbotMessage.classList.remove('hidden');
    chatBox.appendChild(newCatbotMessage);

    const aRandomAmountOfMeows = Math.floor(Math.random() * 10) + 1;
    let responseString = '';
    for (let i = 0; i < aRandomAmountOfMeows; i++) {
        const randomMeow = meows[Math.floor(Math.random() * meows.length)];
        responseString += randomMeow + ' ';
    }
    responseString = responseString.trim() + ".";
    // think for a random amount of time between 1 and 3 seconds
    const thinkTime = Math.floor(Math.random() * 2000) + 1000;
    // use those braille characters for a rotating loading thingy
    const brailleChars = ['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈'];
    const animationCount = 100;

    for (let i = 0; i < animationCount; i++) {
        char = brailleChars[i % brailleChars.length];
        newCatbotMessage.innerHTML = char + ' Pondering on that one...';
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    newCatbotMessage.innerHTML =  "<p class='fade-in-ltr'>" + responseString + "</p>";
    userInput.disabled = false;
    userInput.placeholder = 'Ask me anything. I know about a million things!';
    userInput.focus();
    animationState = "run";

}

async function matrixAnimationStates(delay = 20) {
    while (true) {
        const dots = dotmatrixDisplay.querySelectorAll('.dot');
        const totalDots = dots.length;
        if (totalDots === 0) {
            await new Promise(resolve => setTimeout(resolve, 100));
            continue;
        }

        if (animationState === "shimmer") {
            // Randomly select a batch of dots to turn on each tick for a dynamic shimmer
            const batchSize = 10
            for (let i = 0; i < batchSize; i++) {
                const randomIndex = Math.floor(Math.random() * totalDots);
                const dot = dots[randomIndex];
                dot.classList.add('dot-on');
                const fadeDelay = Math.floor(Math.random() * 200) + 100;
                setTimeout(() => dot.classList.remove('dot-on'), fadeDelay);
            }
            await new Promise(resolve => setTimeout(resolve, delay));
        } else if (animationState === "run") {
            // for (let i = 0; i < totalDots; i++) {
            //     if (animationState !== "run") break;
            //     const dot = dots[i];
            //     dot.classList.add('dot-on');
            //     setTimeout(() => dot.classList.remove('dot-on'), 100);
            //     await new Promise(resolve => setTimeout(resolve, delay));
            // }

            const itemSize = 2;
            const gapSize = 1;
            const unitSize = itemSize + gapSize; // 3px
            const cols = Math.floor((dotmatrixDisplay.clientWidth + gapSize) / unitSize);
            const rows = Math.floor((dotmatrixDisplay.clientHeight + gapSize) / unitSize);

            for (let col = 0; col < cols; col++) {
                if (animationState !== "run") break;
                for (let row = 0; row < rows; row++) {
                    if (animationState !== "run") break;
                    const index = row * cols + col;
                    if (dots[index]) {
                        dots[index].classList.add('dot-on');
                        setTimeout(() => dots[index].classList.remove('dot-on'), Math.floor(Math.random() * 300) + 100); // Random fade out delay
                    }
                }
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            
        } else if (animationState === "off") {
            dots.forEach(dot => dot.classList.remove('dot-on'));
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}
sendButton.addEventListener('click', sendMessage);

// Generate dots on load (run immediately since script is in body)
generateDisplay();
matrixAnimationStates(10);
animationState = "run";
