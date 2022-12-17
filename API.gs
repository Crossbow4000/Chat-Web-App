var ss = SpreadsheetApp.openById('1_zfR1srLzDHsvPQaGnKB4q6pU6BjgZfYsxkyHU4f2Ww');
var chat = ss.getSheetByName('Data')
var user = ss.getSheetByName('Users')
var chatRange = chat.getDataRange()
var chatData = chatRange.getValues()
var userRange = user.getDataRange()
var userData = userRange.getValues()

function FormatChatData(rowData){
  var userId = []
  var username = []
  var content = []
  var reply = []
  for (var i in rowData) {
    if (i >= 1) {
      userId.push(rowData[i][0])
      username.push(rowData[i][1])
      content.push(rowData[i][2])
      reply.push(rowData[i][3])
    }
  }

  var chatData = {
    'userId': userId,
    'username': username,
    'content': content,
    'reply': reply
  }
  return chatData
}

function FormatUserData(rowData) {
  var username = []
  var password = []
  var userId = []
  for (var i in rowData) {
    if (i >= 1) {
      username.push(rowData[i][0])
      password.push(rowData[i][1])
      userId.push(rowData[i][2])
    }
  }
  var userData = {
    'username': username,
    'password': password,
    'userId': userId
  }
  return userData
}

function doGet(request) {
  Logger.log(FormatUserData(userData).userId[FormatUserData(userData).userId.length-1])
  if (request.parameter.request === 'CHATDATA') {
    return ContentService.createTextOutput(JSON.stringify(FormatChatData(chatData)));
  } else if (request.parameter.request === 'USERDATA') {
    return ContentService.createTextOutput(JSON.stringify(FormatUserData(userData)));
  } else if (request.parameter.request === 'WRITECHAT'){
    data = FormatChatData(chatData)
    var userIdCell = chat.getRange('A' + String(data.username.length+2))
    userIdCell.setValue(request.parameter.userid)
    var usernameCell = chat.getRange('B' + String(data.username.length+2))
    usernameCell.setValue(request.parameter.username)
    var contentCell = chat.getRange('C' + String(data.username.length+2))
    contentCell.setValue(request.parameter.content)
    var replyCell = chat.getRange('D' + String(data.username.length+2))
    replyCell.setValue(request.parameter.reply)
    return ContentService.createTextOutput('Sucessfully created message')
  } else if (request.parameter.request === 'WRITEUSER') {
    data = FormatUserData(userData)
    var userIdCell = user.getRange('C' + String(data.userId.length+2))
    userIdCell.setValue(data.userId[data.userId.length-1]+1)
    var usernameCell = user.getRange('A' + String(data.username.length+2))
    usernameCell.setValue(request.parameter.username)
    var passwordCell = user.getRange('B' + String(data.password.length+2))
    passwordCell.setValue(request.parameter.password)
    return ContentService.createTextOutput('Sucessfully created user ' + request.parameter.username + ' with an ID of ' + request.parameter.userid + ' and a password of ' + request.parameter.password)
  } else if (request.parameter.request === 'EDITMESSAGE') {
    data = FormatChatData(chatData)
    var contentCell = chat.getRange('C' + String(Number(request.parameter.message) + 2))
    contentCell.setValue(request.parameter.content)
  } else if (request.parameter.request === 'LOGIN') {
    data = FormatUserData(userData)
    for(let j in data.username) {
      if(request.parameter.username === data.username[j] && request.parameter.password === data.password[j]) {
        userData = {
          'username': data.username[j],
          'userid': String(data.userId[j])
        }
        return ContentService.createTextOutput(JSON.stringify(userData))
      }
    }
    userData = {
      'username': 'Incorrect credentials',
      'userid': '0'
    }
    return ContentService.createTextOutput(JSON.stringify(userData))
  } else if(request.parameter.request === 'SIGNUP') {
      data = FormatUserData(userData)
      if(data.username.includes(request.parameter.username)) {
        message = 'Username already taken'
        return ContentService.createTextOutput(JSON.stringify(message))
      } else {
        var userIdCell = user.getRange('C' + String(data.userId.length+2))
        userIdCell.setValue(data.userId[data.userId.length-1]+1)
        var usernameCell = user.getRange('A' + String(data.username.length+2))
        usernameCell.setValue(request.parameter.username)
        var passwordCell = user.getRange('B' + String(data.password.length+2))
        passwordCell.setValue(request.parameter.password)
        message = ''
        return ContentService.createTextOutput(JSON.stringify(message))
      }
  } else {
    return ContentService.createTextOutput('Please provide a valid request');
  }

}
