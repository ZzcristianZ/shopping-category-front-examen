tokenValidate()

function logout() {
    localStorage.removeItem('access_token')
    location.href='../index.html'
}

function tokenValidate(){
const TOKEN =localStorage.getItem('access_token')
if (TOKEN=== null) {
    location.href='../index.html'
}
console.log('autenticado',TOKEN)
}