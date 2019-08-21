try{
const establishContactCallback = function(mutationsList, observer) {
    onEstablishContact();
};

const addNoteCallback = function(mutationsList, observer) {
    const cancelNode = document.getElementsByClassName("artdeco-button artdeco-button--3 artdeco-button--muted artdeco-button--secondary mr1")[0];
    const addNoteNode = document.getElementsByClassName("artdeco-button artdeco-button--secondary artdeco-button--3 mr1")[0];

    if (cancelNode != null){
        cancelNode.onclick = onEstablishContact;
    }

    if (addNoteNode != null){
        onAddNote();
    }
}

const messageNodeCallback = function(mutationsList, observer){
    const sendButton = document.getElementsByClassName("msg-form__send-button artdeco-button artdeco-button--1")[0];
    sendButton.onclick = onDirectSendClick;
}

const appoutletNodeCallback = function(mutationsList, observer){
    const bubbleNode = document.getElementById("msg-overlay");
    const authenticationNode = document.getElementsByClassName("authentication-outlet")[0];

    if (bubbleNode != null){
        bubbleObserver.observe(bubbleNode, bubbleConfig);
    }

    if (authenticationNode != null){
        authenticationObserver.observe(authenticationNode, authenticationConfig);
    }
}

const bubbleNodeCallback = function(mutationsList, observer){
    const bubbles = document.querySelectorAll('[id^="msg-overlay-conversation-bubble-"]');
    bubbles.forEach(addSendEvent);
}

const authenticationNodeCallback = function(mutationsList, observer){
    const sendButton = document.getElementsByClassName("msg-form__send-button artdeco-button artdeco-button--1")[0];

    if (sendButton != null){
        const message = document.getElementsByClassName("msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 notranslate")[0].innerText;
        const name = document.getElementsByClassName("msg-entity-lockup__entity-title truncate hoverable-link-text")[0].innerText;
        sendButton.onclick = function(e){ onSendClick(e, message, name)};
    }
}

const establishObserver = new MutationObserver(establishContactCallback);
const actionsPanelObserver = new MutationObserver(addNoteCallback);
const messageObserver = new MutationObserver(messageNodeCallback);
const appoutletObserver = new MutationObserver(appoutletNodeCallback);
const bubbleObserver = new MutationObserver(bubbleNodeCallback);
const authenticationObserver = new MutationObserver(authenticationNodeCallback);

const establishConfig = { attributes: false, childList: true, subtree: false };
const messageConfig = { attributes: true, childList: false, subtree: false };
const actionsConfig = { attributes: false, childList: true, subtree: false };
const appoutletObserverConfig = { attributes: false, childList: true, subtree: false };
const bubbleConfig = { attributes: true, childList: true, subtree: true };
const authenticationConfig = { attributes: false, childList: true, subtree: false };

var obs = new MutationObserver(function (mutations, observer) {
    onReady();
});
obs.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false });

function onReady() {
    const establishNode = document.getElementById("li-modal-container");
    const messageNode = document.getElementsByClassName("pv-s-profile-actions pv-s-profile-actions--send-in-mail ml2 artdeco-button artdeco-button--2 artdeco-button--secondary ember-view")[0];
    const appoutletNode = document.getElementsByClassName("application-outlet")[0];

    if (establishNode != null){
        establishObserver.observe(establishNode, establishConfig);
    }

    if (messageNode != null){
        messageObserver.observe(messageNode, messageConfig);
    }

    if (appoutletNode != null){
        appoutletObserver.observe(appoutletNode, appoutletObserverConfig);
    }
}

function addSendEvent(item, idx){
    const name = item.getElementsByClassName("msg-overlay-bubble-header__primary-text t-14 t-black t-bold hoverable-link-text")[0].innerText;
    const message = item.getElementsByClassName("msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 notranslate")[0].innerText;
    const sendButton = item.getElementsByClassName("msg-form__send-button artdeco-button artdeco-button--1")[0];

    sendButton.onclick = function(e){ onSendClick(e, message, name)};
}

function onEstablishContact(){
    const actionsPanel = document.getElementsByClassName("send-invite__actions")[0];
    actionsPanelObserver.observe(actionsPanel, actionsConfig);
}

function onAddNote(){
    const sendButton = document.getElementsByClassName("artdeco-button artdeco-button--3 ml1")[0];
    sendButton.onclick = onIndirectSendClick;
}

function onIndirectSendClick(e){
    const message = document.getElementById("custom-message").value;
    onSendClick(e, message, getName());
}

function onDirectSendClick(e){
    const messageText = document.getElementsByClassName("msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 notranslate")[0].innerText;
    onSendClick(e, messageText, getName());
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

}
catch(error){
    console.error(error);
}