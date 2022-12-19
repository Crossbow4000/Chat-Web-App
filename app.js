requestUrl  = 'https://script.google.com/macros/s/AKfycbycXnD5tk4A2eWuLaAc8uxBfqnwichNqQZ-h1HH2miLvj8sMfUsYoHywP4vnFJNnn2vnQ/exec?request='

let loggedIn = false
let hasScrolled = false

editing = false

document.getElementById('edit-button').style.display = 'none'
document.getElementById('reply-button').style.display = 'none'

root = document.querySelector(':root')

document.getElementById('username').focus()

document.getElementById('menu').style.transform = 'translateX(100%)'

sessionStorage.setItem('reply', '')

if (localStorage.getItem('username') != null) {
    document.getElementById('username').value = localStorage.getItem('username')
}
if (localStorage.getItem('password') != null) {
    document.getElementById('password').value = localStorage.getItem('password')
}


if(localStorage.getItem('color') == 'blue') {
    document.getElementById('color-blue').children[1].style.opacity = '1'
    document.getElementById('color-red').children[1].style.opacity = '0'
    document.getElementById('color-green').children[1].style.opacity = '0'
    document.getElementById('color-yellow').children[1].style.opacity = '0'
    document.getElementById('color-purple').children[1].style.opacity = '0'
    root.style.setProperty('--accent-color', 'rgb(50, 150, 255')
} else if(localStorage.getItem('color') == 'red') {
    document.getElementById('color-blue').children[1].style.opacity = '0'
    document.getElementById('color-red').children[1].style.opacity = '1'
    document.getElementById('color-green').children[1].style.opacity = '0'
    document.getElementById('color-yellow').children[1].style.opacity = '0'
    document.getElementById('color-purple').children[1].style.opacity = '0'
    root.style.setProperty('--accent-color', 'rgb(255, 50, 50')
} else if(localStorage.getItem('color') == 'green') {
    document.getElementById('color-blue').children[1].style.opacity = '0'
    document.getElementById('color-red').children[1].style.opacity = '0'
    document.getElementById('color-green').children[1].style.opacity = '1'
    document.getElementById('color-yellow').children[1].style.opacity = '0'
    document.getElementById('color-purple').children[1].style.opacity = '0'
    root.style.setProperty('--accent-color', 'rgb(50, 255, 150')
} else if(localStorage.getItem('color') =='yellow') {
    document.getElementById('color-blue').children[1].style.opacity = '0'
    document.getElementById('color-red').children[1].style.opacity = '0'
    document.getElementById('color-green').children[1].style.opacity = '0'
    document.getElementById('color-yellow').children[1].style.opacity = '1'
    document.getElementById('color-purple').children[1].style.opacity = '0'
    root.style.setProperty('--accent-color', 'rgb(230, 230, 50')
} else if(localStorage.getItem('color') == 'purple') {
    document.getElementById('color-blue').children[1].style.opacity = '0'
    document.getElementById('color-red').children[1].style.opacity = '0'
    document.getElementById('color-green').children[1].style.opacity = '0'
    document.getElementById('color-yellow').children[1].style.opacity = '0'
    document.getElementById('color-purple').children[1].style.opacity = '1'
    root.style.setProperty('--accent-color', 'rgb(230, 50, 230')
} else {
    localStorage.setItem('color', 'blue')
    document.getElementById('color-blue').children[1].style.opacity = '1'
    document.getElementById('color-red').children[1].style.opacity = '0'
    document.getElementById('color-green').children[1].style.opacity = '0'
    document.getElementById('color-yellow').children[1].style.opacity = '0'
    document.getElementById('color-purple').children[1].style.opacity = '0'
    root.style.setProperty('--accent-color', 'rgb(50, 150, 255')
}

document.getElementById('color-blue').addEventListener('click', () => {
    localStorage.setItem('color', 'blue')
    document.getElementById('color-blue').children[1].style.opacity = '1'
    document.getElementById('color-red').children[1].style.opacity = '0'
    document.getElementById('color-green').children[1].style.opacity = '0'
    document.getElementById('color-yellow').children[1].style.opacity = '0'
    document.getElementById('color-purple').children[1].style.opacity = '0'
    root.style.setProperty('--accent-color', 'rgb(50, 150, 255')
})
document.getElementById('color-red').addEventListener('click', () => {
    localStorage.setItem('color', 'red')
    document.getElementById('color-blue').children[1].style.opacity = '0'
    document.getElementById('color-red').children[1].style.opacity = '1'
    document.getElementById('color-green').children[1].style.opacity = '0'
    document.getElementById('color-yellow').children[1].style.opacity = '0'
    document.getElementById('color-purple').children[1].style.opacity = '0'
    root.style.setProperty('--accent-color', 'rgb(255, 50, 50')
})
document.getElementById('color-green').addEventListener('click', () => {
    localStorage.setItem('color', 'green')
    document.getElementById('color-blue').children[1].style.opacity = '0'
    document.getElementById('color-red').children[1].style.opacity = '0'
    document.getElementById('color-green').children[1].style.opacity = '1'
    document.getElementById('color-yellow').children[1].style.opacity = '0'
    document.getElementById('color-purple').children[1].style.opacity = '0'
    root.style.setProperty('--accent-color', 'rgb(50, 255, 150')
})
document.getElementById('color-yellow').addEventListener('click', () => {
    localStorage.setItem('color', 'yellow')
    document.getElementById('color-blue').children[1].style.opacity = '0'
    document.getElementById('color-red').children[1].style.opacity = '0'
    document.getElementById('color-green').children[1].style.opacity = '0'
    document.getElementById('color-yellow').children[1].style.opacity = '1'
    document.getElementById('color-purple').children[1].style.opacity = '0'
    root.style.setProperty('--accent-color', 'rgb(230, 230, 50')
})
document.getElementById('color-purple').addEventListener('click', () => {
    localStorage.setItem('color', 'purple')
    document.getElementById('color-blue').children[1].style.opacity = '0'
    document.getElementById('color-red').children[1].style.opacity = '0'
    document.getElementById('color-green').children[1].style.opacity = '0'
    document.getElementById('color-yellow').children[1].style.opacity = '0'
    document.getElementById('color-purple').children[1].style.opacity = '1'
    root.style.setProperty('--accent-color', 'rgb(230, 50, 230')
})

document.getElementById('authenticating').style.display = 'none'

function Login() {
    document.getElementById('authenticating').style.display = 'block'
    fetch(requestUrl + 'LOGIN&username=' + document.getElementById('username').value + '&password=' + document.getElementById('password').value.hashCode())
    .then(response => response.json())
    .then(json => {
        if(json.userid != '0') {
            document.getElementById('authenticating').style.display = 'none'
            username = json.username
            userid = json.userid
            localStorage.setItem('username', username)
            localStorage.setItem('password', document.getElementById('password').value)
            document.getElementById('login-page').style.transform = 'translateY(-100%)'
            loggedIn = true
            return false
        } else {
            alert('Username or password is incorrect')
            document.getElementById('authenticating').style.display = 'none'
            return false
        }
        alert('Username or password is incorrect')
        document.getElementById('authenticating').style.display = 'none'
        return false
    })

    return false
}

document.getElementById('sign-up').addEventListener('click', () => {
    document.getElementById('authenticating').style.display = 'block'
    if (document.getElementById('username').value == '') {
        document.getElementById('authenticating').style.display = 'none'
        alert('Username cannot be blank')
        return false
    } else if (document.getElementById('password').value == '') {
        document.getElementById('authenticating').style.display = 'none'
        alert('Password cannot be blank')
        return false
    } else if (document.getElementById('username').value.length <= 5) {
        document.getElementById('authenticating').style.display = 'none'
        alert('Username must be longer than 5 characters')
        return false
    } else if (document.getElementById('password').value.length <= 5) {
        document.getElementById('authenticating').style.display = 'none'
        alert('Password must be longer than 5 characters')
        return false
    }

    fetch(requestUrl + 'SIGNUP&username=' + document.getElementById('username').value + '&password=' + document.getElementById('password').value.hashCode().toString())
    .then(response => response.json())
    .then(json => {
        if(json != '') {
            alert(json)
            document.getElementById('authenticating').style.display = 'none'
            return false
        } else {
            Login()
            document.getElementById('authenticating').style.display = 'none'
            return false
        }
    })
})

function SendMessage() {
    if (editing == true) {
        editUrl = requestUrl + 'EDITMESSAGE&message=' + sessionStorage.getItem('messageid') + '&content=' + document.getElementById('input').value
        fetch(editUrl)
        .then(document.getElementById('input').value = '')
        document.getElementById('send-button').style.display = 'block'
        document.getElementById('edit-button').style.display = 'none'
        editing = false
        return false
    } else if (document.getElementById('input').value == '') {
        document.getElementById('input').value = ''
        alert('Message cannot be blank')
        return false
    } else {
        sendMessageUrl = requestUrl + 'WRITECHAT&username=' + username + '&userid=' + userid + '&content=' + document.getElementById('input').value + '&reply=' + sessionStorage.getItem('reply')
        CreateDOMElementsGrayed()
        node = document.createTextNode(username)
        messageUsername.appendChild(node)
        messageContainer.appendChild(messageUsername)
        node = document.createTextNode(document.getElementById('input').value)
        messageContent.appendChild(node)
        messageContainer.appendChild(messageContent)
        document.getElementById('sent-messages').appendChild(messageContainer)
        document.getElementById('input').value = ''
        document.body.scrollTop = document.body.scrollHeight
        DeleteDOMElements()
        fetch(sendMessageUrl)
        sessionStorage.setItem('reply', '')
        return false
    }
}

function CreateDOMElements() {
    messageContainer = document.createElement('div')
    messageContainer.classList.add('message')
    messageUsername = document.createElement('h1')
    messageUsername.classList.add('username')
    messageUsername.classList.add('user')
    messageContent = document.createElement('p')
    messageId = document.createElement('h2')
    messageId.classList.add('message-id')
    messageContent.classList.add('content')
    button = document.createElement('div')
    button.classList.add('button')
    reply = document.createElement('div')
    reply.classList.add('reply')
    replyDiv = document.createElement('div')
    replyDiv.classList.add('reply-div')
    replyContainer = document.createElement('div')
    replyContainer.classList.add('reply-container')
    replyContent = document.createElement('h3')
    replyContent.classList.add('reply-content')
    bottom = document.createElement('div')
}

function CreateDOMElementsGrayed() {
    messageContainer = document.createElement('div')
    messageContainer.classList.add('message')
    messageUsername = document.createElement('h1')
    messageUsername.classList.add('username-gray')
    messageContent = document.createElement('p')
    messageContent.classList.add('content-gray')
    button = document.createElement('div')
    bottom = document.createElement('div')
}

function DeleteDOMElements() {
    delete messageContainer
    delete messageUsername
    delete messageContent
    delete messageId
    delete button
    delete bottom
    delete reply
    delete replyDiv
    delete replyContent
    delete replyContainer
}



String.prototype.hashCode = function() {
    hashCode = 19981479
    sub = false
    hash = 0
    if (this.length == 0) return hash
    for (n = 0; n < this.length; n++) {
        chr = this.charCodeAt(n)
        if (sub == false) {
            sub = true
            hash += hashCode + chr
        } else {
            sub = false
            hash += hashCode - chr
        }
    }
    return hash
}

function UpdateThings() {
    childLength = document.getElementById('messages').children
    fetch(requestUrl + 'CHATDATA')
    .then(response => response.json())
    .then(json => {
        while (document.getElementById('messages').lastChild) {
            document.getElementById('messages').lastChild.remove()
        }
        for (let i in json.content) {
            if (json.content[i] != '' && json.userId[i] != '' && json.username[i] != '') {

                CreateDOMElements()
                if (userid != json.userId[i]) {
                    messageUsername.classList.remove('user')
                }
                if (json.username[i] == username) {
                    messageContainer.appendChild(button)
                }
                messageContainer.appendChild(reply)
                node = document.createTextNode(json.username[i])
                messageUsername.appendChild(node)
                messageContainer.appendChild(messageUsername)

                if(json.reply[i] != '') {
                    replyContent.appendChild(document.createTextNode(json.reply[i]))
                    replyContainer.appendChild(replyDiv)
                    replyContainer.appendChild(replyContent)
                    messageContainer.appendChild(replyContainer)
                }

                node = document.createTextNode(json.content[i])
                messageContent.appendChild(node)
                messageContainer.appendChild(messageContent)
                node = document.createTextNode(i.toString())
                messageId.appendChild(node)
                messageContainer.appendChild(messageId)
                document.getElementById('messages').appendChild(messageContainer)
                DeleteDOMElements()

                for (b in document.getElementById('sent-messages').children) {
                    object = document.getElementById('sent-messages')
                    list = []

                    try {
                        if (object.children.length > 0) {
                            if (object.children[b].children[0].textContent == json.username[i] && object.children[b].children[1].textContent == json.content[i]) {
                                object.children[b].remove()
                                break
                            }
                        }
                    } catch {
                        continue
                    }
                }
            }
        }

        if (hasScrolled == false) {
            document.body.scrollTop = document.body.scrollHeight
            hasScrolled = true
        }

    })

    if (childLength != document.getElementById('messages').children) {
        document.body.scrollTop = document.body.scrollHeight
    }
}

function Edit() {
    for (s in document.getElementsByClassName('button')) {
        document.getElementsByClassName('button')[s].addEventListener('click', () => {
            editing = true
            replying = false
            for(let h in event.target.parentNode.children) {
                if(event.target.parentNode.children[h].tagName == 'H2') {
                    sessionStorage.setItem('messageid', event.target.parentNode.children[h].textContent)
                }
            }
            for(let f in event.target.parentNode.children) {
                if(event.target.parentNode.children[f].tagName == 'P') {
                    document.getElementById('input').value = event.target.parentNode.children[f].textContent
                }
            }
            document.getElementById('input').focus()
            document.getElementById('send-button').style.display = 'none'
            document.getElementById('edit-button').style.display = 'block'
            document.getElementById('reply-button').style.display = 'none'
            document.getElementById('edit-button').addEventListener('click', () => {
                SendMessage()
            })
        })
    }
}

function Reply() {
    for (g in document.getElementsByClassName('reply')) {
        document.getElementsByClassName('reply')[g].addEventListener('click', () => {
            for(let j in event.target.parentNode.children) {
                if(event.target.parentNode.children[j].tagName == 'P') {
                    sessionStorage.setItem('reply', event.target.parentNode.children[j].textContent)
                }
            }

            console.log(localStorage.getItem('reply'))
            document.getElementById('send-button').style.display = 'none'
            document.getElementById('edit-button').style.display = 'none'
            document.getElementById('reply-button').style.display = 'block'
            replying = true
            editing = false
            document.getElementById('input').focus()

        })
    }
}


document.getElementById('reply-button').addEventListener('click', () => {
    SendMessage()
})

document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('menu-toggle').style.transform = 'translateX(200%)'
    document.getElementById('menu').style.transform = 'translateX(0%)'
})

document.getElementById('un-toggle').addEventListener('click', () => {
    document.getElementById('menu-toggle').style.transform = 'translateX(0%)'
    document.getElementById('menu').style.transform = 'translateX(100%)'
})

UpdateThings()
UpdateThings()

setInterval(UpdateThings, 1000)
setInterval(Edit, 100)
setInterval(Reply, 100)
