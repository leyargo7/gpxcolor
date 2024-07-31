const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', async(event) => {
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const response = await fetch('/login', {
        method: "POST",
        headers: { 'content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    })

    if(response.ok) {
        window.location.href = '/admin'
    } else {
        alert('Is Wrong!!!')
    }


})