

function users() {
    document.getElementById('cardHeader').innerHTML ='<h5>Listado de Productos</h5>'
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/products'
    fetch(REQRES_ENDPOINT,  {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            
        }
    })
    .then((response)=>{
      console.log(response)
      return response.json().then(
        data =>{
          return{
            status: response.status,
            info:data
          }
        }
      )
    })
    .then((result)=>{
      if (result.status===200) {
          console.log(result)
            let list_user = `
            <button class="btn btn-primary" onclick="mostrarFormularioCrearProducto()">Crear Producto</button>
            <table class="table table-hover table-striped">
            <thead>
            <tr>
            <th scope="col">ID</th>
            <th scope="col">PRODUCTOS</th>
            <th scope="col">PRECIO</th>
            <th scope="col">SLUG</th>
            <th scope="col">ACCION</th>
            </tr>
            </thead>
            <tbody>
            `
            result.info.forEach(element => {
                list_user = list_user + `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.title}</td>
                    <td>${"$" + element.price}</td>
                    <td>${element.slug}</td>
                <td>
                    <div class="d-flex gap-2 justify-content-center">
                        <button type="button" class="btn btn-secondary" onclick="getUser('${element.id}')">Ver</button>
                        <button type="button" class="btn btn-danger" onclick="deleteProduct('${element.id}')">Eliminar</button>
                    </div>
                </td>
                    
                </tr>
                `
            });
            document.getElementById('info').innerHTML=list_user
        }else{
            document.getElementById('info').innerHTML = 'no existen ususarios en la BD'
        }
    })
}


function getUser(idUser) {
    console.log("id", idUser)
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/products/'+idUser
    fetch(REQRES_ENDPOINT,  {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key':'reqres-free-v1'
        }
    })
    .then((result)=>{
        console.log("result", result)
        return result.json().then(
            info =>{
                return{
                    status: result.status,
                    body: info
                }
            }
        )
    })
    .then((response)=>{
        if(response.status===200){
            const user= response.body
            console.log("hola", user)
            const modalUser= `
                                <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Producto</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="card">
                          <div class="card-body">
                          <h5 class= "card-title">Informacion del Producto</h5>
                            <p class="card-text">ID: ${user.id}</p>
                            <p class="card-text">Titulo: ${user.title} </p>
                            <p class="card-text">Precio: ${user.price} </p>
                            <p class="card-text">Slug: ${user.slug} </p>
                            <p class="card-text">Descripcion: ${user.description} </p>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
            `
            document.getElementById('viewModal').innerHTML=modalUser
            const modal = new bootstrap.Modal(
                document.getElementById('modalUser')
            )
            modal.show()
        }
        else{
            document.getElementById('info').innerHTML='<h3>No se encontrò el usuario en la Api</h3>'
        }
    })
}


function mostrarFormularioCrearProducto() {
    document.getElementById('info').innerHTML = `
        <div class="card">
            <div class="card-header" id="cardHeader">
                <h5>Crear Producto</h5>
            </div>
            <div class="card-body">
                <form id="formCrearProducto">
                    <div class="mb-3">
                        <label class="form-label">Título</label>
                        <input type="text" class="form-control" id="tituloProducto" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Precio</label>
                        <input type="number" class="form-control" id="precioProducto" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Descripción</label>
                        <input type="text" class="form-control" id="descripcionProducto" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Categoría ID</label>
                        <input type="number" class="form-control" id="categoriaProducto" required>
                    </div>
                    <button type="submit" class="btn btn-success">Crear</button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('formCrearProducto').onsubmit = function(e) {
        e.preventDefault();
        createProduct();
    };
}

function createProduct() {
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/products';
    const data = {
        title: document.getElementById('tituloProducto').value,
        price: Number(document.getElementById('precioProducto').value),
        description: document.getElementById('descripcionProducto').value,
        categoryId: Number(document.getElementById('categoriaProducto').value),
        images: ["https://placeimg.com/640/480/any"]
    };

    fetch(REQRES_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(producto => {
        alert('Producto creado correctamente');
        users(); 
    })
    .catch(error => {
        alert('Error al crear el producto');
        console.error(error);
    });
}




























function personas() {
    document.getElementById('cardHeader').innerHTML ='<h5>Listado de USUARIOS</h5>';
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/users/';
    fetch(REQRES_ENDPOINT,  {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    })
    .then((response)=>{
      return response.json().then(
        data =>{
          return{
            status: response.status,
            info:data
          }
        }
      )
    })
    .then((result)=>{
      if (result.status===200) {
            let list_personas = `
            <button class="btn btn-primary mb-2" onclick="mostrarFormularioCrearUsuario()">Crear Usuario</button>
            <table class="table table-hover table-striped">
            <thead>
            <tr>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">EMAIL</th>
            <th scope="col">PASSWORD</th>
            <th scope="col">ROLE</th>
            <th scope="col">AVATAR</th>
            </tr>
            </thead>
            <tbody>
            `;
            result.info.forEach(element => {
                list_personas += `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.email}</td>
                    <td>${element.password || ''}</td>
                    <td>${element.role}</td>
                    <td><img src="${element.avatar}" alt="avatar" width="40"></td>
                </tr>
                `;
            });
            list_personas += `</tbody></table>`;
            document.getElementById('info').innerHTML = list_personas;
        } else {
            document.getElementById('info').innerHTML = 'No existen usuarios en la BD';
        }
    })
    .catch(error => {
        document.getElementById('info').innerHTML = 'Error al obtener los usuarios';
        console.error(error);
    });
}
    


function mostrarFormularioCrearUsuario() {
    document.getElementById('info').innerHTML = `
        <div class="card">
            <div class="card-header" id="cardHeader">
                <h5>Crear Usuario</h5>
            </div>
            <div class="card-body">
                <form id="formCrearUsuario">
                    <div class="mb-3">
                        <label class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombreUsuario" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" id="emailUsuario" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="passwordUsuario" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Avatar (URL de imagen)</label>
                        <input type="text" class="form-control" id="avatarUsuario" required>
                    </div>
                    <button type="submit" class="btn btn-success">Crear</button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('formCrearUsuario').onsubmit = function(e) {
        e.preventDefault();
        createUsuario();
    };
}

function createUsuario() {
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/users/';
    const data = {
        name: document.getElementById('nombreUsuario').value,
        email: document.getElementById('emailUsuario').value,
        password: document.getElementById('passwordUsuario').value,
        avatar: document.getElementById('avatarUsuario').value
    };

    fetch(REQRES_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(async response => {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'No se pudo crear el usuario');
        }
        return response.json();
    })
    .then(usuario => {
        alert('Usuario creado correctamente');
        personas();  
    })
    .catch(error => {
        alert('Error al crear el usuario: ' + error.message);
        console.error(error);
    });
}







































function deleteProduct(id) {
    const REQRES_ENDPOINT = `https://api.escuelajs.co/api/v1/products/${id}`;
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        fetch(REQRES_ENDPOINT, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Producto eliminado correctamente');
                users(); 
            } else {
                alert('No se pudo eliminar el producto');
            }
        })
        .catch(error => {
            alert('Error al eliminar el producto');
            
            console.error(error);
        });
    }
}

