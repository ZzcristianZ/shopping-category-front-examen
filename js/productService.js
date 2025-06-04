function products() {
    document.getElementById('cardHeader').innerHTML ='<h5>Listado de Categorias</h5>'
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/categories'
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
            let list_products = `
            <button class="btn btn-primary" onclick="mostrarFormularioCrearCategoria()">Crear Categoria</button>
            <table class="table table-hover table-striped">
                <thead>
                  <tr>
                    
                    <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">SLUG</th>
                    <th scope="col">IMAGE</th>
                    <th >Accion</th>
                  </tr>
                </thead>
                <tbody>
                
            `
            result.info.forEach(element => {
                list_products=list_products+`
                <tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.slug}</td>
                    <td><img src="${element.image}" class="img-thumbnail" alt"Imagen de la categoria"></td> 
                    <td><button type="button" class="btn btn-secondary" onclick="getProduct('${element.id}')">Ver</button></td>
                `
            });
            document.getElementById('info').innerHTML=list_products
        }else{
            document.getElementById('info').innerHTML = 'no existen ususarios en la BD'
        }
    })
}


function getProduct(idProduct) {
    console.log("id", idProduct)
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/categories/'+idProduct;
    fetch(REQRES_ENDPOINT,  {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            
        }
    })
    .then((result)=>{
        console.log("result", result)
        return result.json().then(
            data =>{
                return{
                    status: result.status,
                    body: data
                }
            }
        )
    })
    .then((response)=>{
        if(response.status===200){
            const productos= response.body
            console.log("id", productos)
            const modalProductos= `
                                <div class="modal fade" id="modalProductos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Ver producto</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="card">

 
                          <div class="card-body">
                          <h5 class= "card-title" >Informacion del producto</h5>
                          
                            <p class="card-text">Nombre: ${productos.name}</p>
                            <p class="card-text">ID: ${productos.id} </p>
                            <p class="card-text">SLUG: ${productos.slug} </p>
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
            
            document.getElementById('viewModal').innerHTML=modalProductos
            
            const modal = new bootstrap.Modal(
                document.getElementById('modalProductos')
            )
            modal.show()
            
        }
        else{
            document.getElementById('info').innerHTML='<h3>No se encontrò el usuario en la Api</h3>'
        }
    })
}


function mostrarFormularioCrearCategoria() {
    document.getElementById('info').innerHTML = `
        <div class="card">
            <div class="card-header" id="cardHeader">
                <h5>Crear Categoría</h5>
            </div>
            <div class="card-body">
                <form id="formCrearCategoria">
                    <div class="mb-3">
                        <label class="form-label">Nombre de la Categoría</label>
                        <input type="text" class="form-control" id="NombreCategoria" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">URL de Imagen</label>
                        <input type="text" class="form-control" id="imagenCategoria" required>
                    </div>
                    <button type="submit" class="btn btn-success">Crear</button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('formCrearCategoria').onsubmit = function(e) {
        e.preventDefault();
        createCategoria();
    };
}


function createCategoria() {
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/categories';
    const data = {
        name: document.getElementById('NombreCategoria').value,
        image: document.getElementById('imagenCategoria').value
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
            throw new Error(errorData.message || 'No se pudo crear la categoría');
        }
        return response.json();
    })
    .then(categoria => {
        alert('Categoría creada correctamente');
        products();  
    })
    .catch(error => {
        alert('Error al crear la categoría: ' + error.message);
        console.error(error);
    });
}
