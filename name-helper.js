var bodyObserver = new MutationObserver(function (mutations, observer) {
    const sendButtons_one = document.querySelectorAll('[class^="msg-form__send-button artdeco-button artdeco-button--1"]');
    const sendButtons_two = document.querySelectorAll('[class^="artdeco-button artdeco-button--3"]:not(.artdeco-button--secondary)')
    
    if(sendButtons_one != null){
        sendButtons_one.forEach(it => it.onclick = (e) => onSendButtonClick(e, it))
    }
    if (sendButtons_two != null){        
        sendButtons_two.forEach(it => it.onclick = (e) => onSendButtonClick(e, it))
    }
});

bodyObserver.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false });

function onSendButtonClick(e, item){
    if(findUpId(item, "messaging") != null){
        onMessageBoxSendClick(e)
    }
    else if (findUpId(item, "msg-overlay") != null){
        onBubbleSendClick(e, item)
    }

    else if (findUpId(item, "li-modal-container") != null){
        onIndirectSendClick(e);
    }
}

function findUpId(element, id) {
    while (element.parentNode) {
        element = element.parentNode;
        if (element.id === id)
            return element;
    }
    return null;
}

function onBubbleSendClick(e, sendButton){
    const bubbleParent = sendButton.closest('[id^="msg-overlay-conversation-bubble"]')
    
    if (bubbleParent != null){
        const bigBubble = bubbleParent.querySelector("dt")
        const smallBubble = bubbleParent.querySelector('[class="msg-overlay-bubble-header__primary-text t-14 t-black t-bold hoverable-link-text"]')
        const message = bubbleParent.querySelector('[class="msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 notranslate"]');

        if (message != null){
            if (bigBubble != null){
                onSendClick(e, message.innerText, bigBubble.innerText);
            }
            else if(smallBubble != null){
                onSendClick(e, message.innerText, smallBubble.innerText);
            }
        }
    } 
}

function onIndirectSendClick(e){
    const message = document.getElementById("custom-message").value;
    const nameText = document.getElementsByClassName("inline t-24 t-black t-normal break-words")[0].innerText;
    onSendClick(e, message, nameText);
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