userDataUrl = 'https://script.google.com/macros/s/AKfycbxEynImw_4oZiibcrE_FIt-8jlC-qGedLbaX21MCwLNqzTyG-ld-ZI5WZPDKqQM2Faayw/exec?request=USERDATA'
requestUrl  = 'https://script.google.com/macros/s/AKfycbxEynImw_4oZiibcrE_FIt-8jlC-qGedLbaX21MCwLNqzTyG-ld-ZI5WZPDKqQM2Faayw/exec?request='

let loggedIn = false
let hasScrolled = false

editing = false

document.getElementById('edit-button').style.display = 'none'
document.getElementById('reply-button').style.display = 'none'


document.getElementById('username').focus()

sessionStorage.setItem('reply', '')

if (localStorage.getItem('username') != null) {
    document.getElementById('username').value = localStorage.getItem('username')
}
if (localStorage.getItem('password') != null) {
    document.getElementById('password').value = localStorage.getItem('password')
}

document.getElementById('authenticating').style.display = 'none'

function Login() {
    document.getElementById('authenticating').style.display = 'block'
    fetch(userDataUrl)
    .then(response => response.json())
    .then(json => {
        for (i in json.username) {
            if (json.username[i] == document.getElementById('username').value) {
                if (json.password[i] == document.getElementById('password').value.hashCode()) {
                    document.getElementById('authenticating').style.display = 'none'
                    username = document.getElementById('username').value
                    userid = json.userId[i]
                    localStorage.setItem('username', username)
                    localStorage.setItem('password', document.getElementById('password').value)
                    document.getElementById('login-page').style.transform = 'translateY(-100%)'
                    loggedIn = true
                    return false
                }
            }
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
    }

    fetch(userDataUrl)
    .then(response => response.json())
    .then(json => {
        if (json.username.includes(document.getElementById('username').value)) {
            document.getElementById('authenticating').style.display = 'none'
            alert('Username already taken')
            return false
        } else {
            signUpUrl = requestUrl + 'WRITEUSER&username=' + document.getElementById('username').value + '&password=' + document.getElementById('password').value.hashCode().toString()
            fetch(signUpUrl)
            .then(response => response.json)
            .then(json => {
                fetch(userDataUrl)
                .then(response => response.json)
                .then(json => {
                    Login()
                })
            })

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
    messageId = document.createElement('p')
    messageId.classList.add('message-id')
    messageContent.classList.add('content')
    button = document.createElement('div')
    button.classList.add('button')
    reply = document.createElement('div')
    reply.classList.add('reply')
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
    fetch('https://script.google.com/macros/s/AKfycbz87WVtorZmH6ve0zBEqSKzuX8_hpVJ27w_4SccZdv7sC66KeHEy4ycg91BmdYmxPbgLQ/exec?request=CHATDATA')
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
            sessionStorage.setItem('messageid', event.target.parentNode.children[4].textContent)
            document.getElementById('input').value = event.target.parentNode.children[3].textContent
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
            sessionStorage.setItem('reply', event.target.parentNode.children[4].textContent)
            console.log(localStorage.getItem('reply'))
            document.getElementById('send-button').style.display = 'none'
            document.getElementById('edit-button').style.display = 'none'
            document.getElementById('reply-button').style.display = 'block'
            replying = true
            editing = false
            document.getElementById('input').value = ''
            document.getElementById('input').focus()

        })
    }
}

document.getElementById('reply-button').addEventListener('click', () => {
    SendMessage()
})

UpdateThings()
UpdateThings()

setInterval(UpdateThings, 1000)
setInterval(Edit, 100)
setInterval(Reply, 100)
