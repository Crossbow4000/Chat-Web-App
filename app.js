userDataUrl = 'https://script.google.com/macros/s/AKfycbzrxlBcEuV7zu4ZjhrUsH3-wnoJi8_FMtjSM3KaVtYu7evAAUU7etAk7krCNJFabEyqYw/exec?request=USERDATA'
requestUrl  = 'https://script.google.com/macros/s/AKfycbzrxlBcEuV7zu4ZjhrUsH3-wnoJi8_FMtjSM3KaVtYu7evAAUU7etAk7krCNJFabEyqYw/exec?request='

let loggedIn = false
let hasScrolled = false

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
    if (document.getElementById('input').value == '') {
        document.getElementById('input').value = ''
        alert('Message cannot be blank')
        return false
    } else {
        sendMessageUrl = requestUrl + 'WRITECHAT&username=' + username + '&userid=' + userid + '&content=' + document.getElementById('input').value
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
    messageContent.classList.add('content')
    divider = document.createElement('div')
    divider.classList.add('divider')
    bottom = document.createElement('div')
}

function CreateDOMElementsGrayed() {
    messageContainer = document.createElement('div')
    messageContainer.classList.add('message')
    messageUsername = document.createElement('h1')
    messageUsername.classList.add('username-gray')
    messageContent = document.createElement('p')
    messageContent.classList.add('content-gray')
    divider = document.createElement('div')
    divider.classList.add('divider')
    bottom = document.createElement('div')
}

function DeleteDOMElements() {
    delete messageContainer
    delete messageUsername
    delete messageContent
    delete divider
    delete bottom
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
                for (b in document.getElementById('sent-messages').children) {
                    object = document.getElementById('sent-messages')
                    list = []
                    try {
                        if (object.children.length > 0) {
                            if (object.children[b].children[0].textContent == json.username[i] && object.children[b].children[1].textContent == json.content[i]) {
                                object.children[b].remove()
                            }
                        }
                    } catch {
                        continue
                    }
                }

                CreateDOMElements()
                if (userid != json.userId[i]) {
                    messageUsername.classList.remove('user')
                }
                node = document.createTextNode(json.username[i])
                messageUsername.appendChild(node)
                messageContainer.appendChild(messageUsername)
                node = document.createTextNode(json.content[i])
                messageContent.appendChild(node)
                messageContainer.appendChild(messageContent)
                document.getElementById('messages').appendChild(messageContainer)
                DeleteDOMElements()
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

UpdateThings()
UpdateThings()

setInterval(UpdateThings, 100)

