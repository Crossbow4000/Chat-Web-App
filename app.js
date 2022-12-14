userDataUrl = 'https://script.google.com/macros/s/AKfycbz87WVtorZmH6ve0zBEqSKzuX8_hpVJ27w_4SccZdv7sC66KeHEy4ycg91BmdYmxPbgLQ/exec?request=USERDATA'
requestUrl  = 'https://script.google.com/macros/s/AKfycbz87WVtorZmH6ve0zBEqSKzuX8_hpVJ27w_4SccZdv7sC66KeHEy4ycg91BmdYmxPbgLQ/exec?request='

let loggedIn = false

document.getElementById('authenticating').style.display = 'none'

function Login() {
    document.getElementById('authenticating').style.display = 'block'
    fetch(userDataUrl)
    .then(response => response.json())
    .then(json => {
        for (i in json.username) {
            if (json.username[i] == document.getElementById('username').value) {
                if (json.password[i] == document.getElementById('password').value) {
                    document.getElementById('authenticating').style.display = 'none'
                    username = document.getElementById('username').value
                    userid = json.userId[i]
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
            document.getElementById('authenticating').style.display = 'none'
            signUpUrl = requestUrl + 'WRITEUSER&username=' + document.getElementById('username').value + '&password=' + document.getElementById('password').value
            fetch(signUpUrl)
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
        document.getElementById('input').value = ''
        document.body.scrollTop = document.body.scrollHeight
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
    bottom.classList.add('bottom')
}

function DeleteDOMElements() {
    delete messageContainer
    delete messageUsername
    delete messageContent
    delete divider
    delete bottom
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
            CreateDOMElements()
            node = document.createTextNode(json.username[i])
            messageUsername.appendChild(node)
            messageContainer.appendChild(messageUsername)
            node = document.createTextNode(json.content[i])
            messageContent.appendChild(node)
            messageContainer.appendChild(messageContent)
            document.getElementById('messages').appendChild(messageContainer)
            document.getElementById('messages').appendChild(divider)
            DeleteDOMElements()
        }
        CreateDOMElements()
        document.getElementById('messages').appendChild(bottom)
        DeleteDOMElements()
    })
    if (childLength != document.getElementById('messages').children) {
        document.body.scrollTop = document.body.scrollHeight
    }
}

UpdateThings()

setInterval(UpdateThings, 1000)

