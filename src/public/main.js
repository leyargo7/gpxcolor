
const adminSocket = io()

const colorPicker = document.getElementById('colorPicker')
const reloadButton = document.getElementById('reloadButton')
const textInput = document.getElementById('textInput')
const sendTextButton = document.getElementById('sendTextButton')
const logoutButton = document.getElementById('logoutButton')

colorPicker.addEventListener('input', ()=>{
    const color = colorPicker.value
    adminSocket.emit('changeColor', color)
})

reloadButton.addEventListener('click', () => {
    adminSocket.emit('reloadClients')
})

sendTextButton.addEventListener('click', () => {
    const text = textInput.value
    adminSocket.emit('updateText', text)
    textInput.value = ''
})

logoutButton.addEventListener('click', async () =>{
    const response = await fetch('/logout', {
        method: 'POST',
    })
    if(response.ok){
        console.log('true')
        window.location.href = '/'
    } else {
        alert('Error close session')
    }
})