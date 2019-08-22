
const establishContactHandler = function(){
    const actionsPanel = document.getElementsByClassName("send-invite__actions")[0];

    if (actionsPanel != null){
        addNoteHandler();
    }
}

const addNoteHandler = function(mutationsList, observer) {
    const cancelNode = document.getElementsByClassName("artdeco-button artdeco-button--3 artdeco-button--muted artdeco-button--secondary mr1")[0];
    const addNoteNode = document.getElementsByClassName("artdeco-button artdeco-button--secondary artdeco-button--3 mr1")[0];

    if (cancelNode != null){
        cancelNode.onclick = establishContactHandler;
    }

    if (addNoteNode != null){
        const sendButton = document.getElementsByClassName("artdeco-button artdeco-button--3 ml1")[0];

        if (sendButton != null){
            sendButton.onclick = onIndirectSendClick;
        }
    }
}

const messageHandler = function(mutationsList, observer){
    const sendButton = document.getElementsByClassName("msg-form__send-button artdeco-button artdeco-button--1")[0];
    
    if (sendButton != null){
        sendButton.onclick = onDirectSendClick;
    }
}

const appoutletHandler = function(mutationsList, observer){
    const bubbles = document.querySelectorAll('[id^="msg-overlay-conversation-bubble-"]');
    const sendButton = document.getElementsByClassName("msg-form__send-button artdeco-button artdeco-button--1")[0];

    if (bubbles != null){
        bubbles.forEach(addSendEvent);
    }
    else if (sendButton != null){ //prevent overwriting
        sendButton.onclick = onMessageBoxSendClick;
    }
}

var obs = new MutationObserver(function (mutations, observer) {
    onBodyChange();
});
obs.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false });

function onBodyChange() {
    const establishNode = document.getElementById("li-modal-container");
    const messageNode = document.getElementsByClassName("pv-s-profile-actions pv-s-profile-actions--send-in-mail ml2 artdeco-button artdeco-button--2 artdeco-button--secondary ember-view")[0];
    const appoutletNode = document.getElementsByClassName("application-outlet")[0];

    if (establishNode != null){
        establishContactHandler();
    }

    if (messageNode != null){
        messageHandler();
    }

    if (appoutletNode != null){
        appoutletHandler();
    }
}

function addSendEvent(item, idx){
    const sendButton = item.getElementsByClassName("msg-form__send-button artdeco-button artdeco-button--1")[0];

    if (sendButton != null){
        sendButton.onclick = function(e){ onBubbleSendClick(e, item) };
    }
}

function onBubbleSendClick(e, item){
    const name = item.getElementsByClassName("msg-overlay-bubble-header__primary-text t-14 t-black t-bold hoverable-link-text")[0].innerText;
    const message = item.getElementsByClassName("msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 notranslate")[0].innerText;
    onSendClick(e, message, name);
}

function onIndirectSendClick(e){
    const message = document.getElementById("custom-message").value;
    onSendClick(e, message, getName());
}

function onDirectSendClick(e){
    const messageText = document.getElementsByClassName("msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 notranslate")[0].innerText;
    onSendClick(e, messageText, getName());
}

function onMessageBoxSendClick(e){
    const message = document.getElementsByClassName("msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 notranslate")[0].innerText;
    const name = document.getElementsByClassName("msg-entity-lockup__entity-title truncate hoverable-link-text")[0].innerText;  
    onSendClick(e, message, name)
}

function onSendClick(e, message, name) {
    if (message !== ""){
        var result = checkFirstLineNaming(message, name);

        if (result === false){
            if(!confirm("You probably entered a wrong name ;)\n\n OK for nevermind, Cancel for a chance to make a correction.")){
                e.preventDefault();
                e.stopPropagation();
                return false;    
            }
        }
    }
}

function checkFirstLineNaming(message, name){
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];

    if (message.includes(firstName) || message.includes(lastName)){
        return true;
    }

    return false;
}

function getName() {
    const nameText = document.getElementsByClassName("inline t-24 t-black t-normal break-words")[0].innerText;
    return nameText;
}