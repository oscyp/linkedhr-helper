const establishNode = document.getElementById("li-modal-container");
const messageNode = document.getElementsByClassName("pv-s-profile-actions pv-s-profile-actions--send-in-mail ml2 artdeco-button artdeco-button--2 artdeco-button--secondary ember-view")[0];

const establishConfig = { attributes: false, childList: true, subtree: false };
const messageConfig = { attributes: true, childList: false, subtree: false };
const actionsConfig = { attributes: false, childList: true, subtree: false };

const establishContactCallback = function(mutationsList, observer) {
    onEstablishContact();
};

const addNoteCallback = function(mutationsList, observer) {
    const cancelNode = document.getElementsByClassName("artdeco-button artdeco-button--3 artdeco-button--muted artdeco-button--secondary mr1")[0];
    const addNoteNode = document.getElementsByClassName("artdeco-button artdeco-button--secondary artdeco-button--3 mr1")[0];

    if (cancelNode !== undefined){
        cancelNode.onclick = onEstablishContact;
    }

    if (addNoteNode !== undefined){
        onAddNote();
    }
}

const messagenNodeCallback = function(mutationsList, observer){
    const sendNode = document.getElementsByClassName("msg-form__send-button artdeco-button artdeco-button--1")[0];
    sendNode.onclick = onDirectSendClick;
}

const establishObserver = new MutationObserver(establishContactCallback);
const actionsPanelObserver = new MutationObserver(addNoteCallback);
const messageObserver = new MutationObserver(messagenNodeCallback)

establishObserver.observe(establishNode, establishConfig);
messageObserver.observe(messageNode, messageConfig);

function onEstablishContact(){
    const actionsPanel = document.getElementsByClassName("send-invite__actions")[0];
    actionsPanelObserver.observe(actionsPanel, actionsConfig);
}

function onAddNote(){
    const sendInvitationNode = document.getElementsByClassName("artdeco-button artdeco-button--3 ml1")[0];
    sendInvitationNode.onclick = onIndirectSendClick;
}

function onIndirectSendClick(e){
    const message = document.getElementById("custom-message").value;
    onSendClick(e, message);
}

function onDirectSendClick(e){
    const messageText = document.getElementsByClassName("msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 notranslate")[0].innerText;
    onSendClick(e, messageText);
}

function onSendClick(e, message) {
    if (message !== ""){
        var result = checkFirstLineNaming(message);

        if (result === false){
            if(!confirm("You probably entered a wrong name ;)\n\n OK for nevermind, Cancel for a chance to make a correction.")){
                e.preventDefault();
                e.stopPropagation();
                return false;    
            }
        }
    }
}

function checkFirstLineNaming(message){
    const [ name, surname ] = getName();

    if (message.includes(name) || message.includes(surname)){
        return true;
    }

    return false;
}

function getName() {
    const nameAndSurnameText = document.getElementsByClassName("inline t-24 t-black t-normal break-words")[0].innerText;

    const name = nameAndSurnameText.split(' ')[0];
    const surname = nameAndSurnameText.split(' ')[1];

    return [name, surname];
}
