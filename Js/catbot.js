const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const catbotMessage = document.getElementById('catbot-message');
const userMessage = document.getElementById('user-message');

async function sendMessage() {
    const userText = userInput.value.trim();
    if (userText === '') return;
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
    const responseString = 'Meow '.repeat(aRandomAmountOfMeows).trim();

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

    

}


sendButton.addEventListener('click', sendMessage);
