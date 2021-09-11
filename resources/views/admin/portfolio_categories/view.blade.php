@extends('admin.app')
@section('title', 'portfolio-categories')
@section('content')
    <button class="float-right btn btn-outline-success" onclick="initModal('newCategoryModal','{{route('portfolio-categories.store')}}')">Nuevo proyecto personal </button>
    <h2>Portafolio</h2>
    <hr>
    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>¡Exitoso! </strong> {{session('success')}}

        </div>
    @endif
    @if(session('error'))
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>¡Error! </strong> {{session('error')}}
        </div>
    @endif

    <div class="row">
        <div class="col-md-12">
            <h3>Categorias</h3>
        </div>
        <div class="col-md-12 table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Code</th>
                    <th scope="col">Titulo en Inglés</th>
                    <th scope="col">Titulo en Español</th>
                    <th scope="col">Descripción en Español</th>
                    <th scope="col">Descripción en Ingles</th>
                    <th scope="col">Acciones</th>
                </tr>
                </thead>
                <tbody>
                @foreach($items as $item)
                <tr>
                    <th scope="row">{{$item->id}}</th>
                    <td>{{$item->code}}</td>
                    <td>{{$item->title_en}}</td>
                    <td>{{$item->title_es}}</td>
                    <td>{{$item->description_es}}</td>
                    <td>{{$item->description_en}}</td>
                    <td>
                        <div class="btn-group dropend">
                            <button type="button" class="btn " data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="{{route('portfolio-categories.portfolio.view',$item->id)}}">Detalles</a></li>
                                <li><a class="dropdown-item" onclick="initModal('newCategoryModal','{{route('portfolio-categories.update',$item->id)}}',{{$item}})">Editar</a></li>
                                <form id="deletemethod" method="post" action="{{route('portfolio-categories.delete',$item->id)}}">
                                    @method('DELETE')
                                    @csrf
                                    <li><button type="submit" class="dropdown-item">Eliminar</button></li>
                                </form>
                            </ul>
                        </div>
                    </td>
                </tr>
                @endforeach
                </tbody>
            </table>
        </div>

    </div>
    </div>

    <!-- modal create-->
    <div class="modal fade" id="newCategoryModal" data-bs-backdrop="static"  tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen-md-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Crear nueva categoria</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="#" id="categoriesId" class="frm-ventas" method="post">
                        @csrf
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <label for="code" class="form-label">Codigo</label>
                                <input type="text" class="form-control" id="code" name="code" aria-describedby="code-Help">
                                <div id="code-Help" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="title_en" class="form-label">título en Inglés</label>
                                <input type="text" class="form-control" id="title_en" name="title_en" aria-describedby="title_en-Help">
                                <div id="title_en-Help" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="title_es" class="form-label">título en Español</label>
                                <input type="text" class="form-control" id="title_es" name="title_es" aria-describedby="title_es-help">
                                <div id="title_es-help" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="description_en" class="form-label">Descripción en Inglés</label>
                                <input type="text" class="form-control" id="description_en" name="description_en" aria-describedby="description_en-help">
                                <div id="description_en-help" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="description_es" class="form-label">Descripción en Español</label>
                                <input type="text" class="form-control" id="description_es" name="description_es" aria-describedby="description_es-help">
                                <div id="description_es-help" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="col-md-12 mb-3 text-center d-grid gap-2">
                                <button type="submit" id="sendCategory" class=" btn btn-primary">Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!--modal edit-->
    <script>
        let actionUrl = '';
        let myModal = null;
        let keys = [];
        //eventos
        document.getElementById('newCategoryModal').addEventListener('hidden.bs.modal', function (event) {
            if(actionUrl){
                actionUrl= '';
                myModal = null;
            }
            if(keys.length){
                keys.forEach(key =>{
                    let tag = document.getElementById(event.target.id).querySelector(`#${key}`);
                    if(tag){
                        tag.value = '';
                    }
                })
            }
        })
        //funciones
        function initModal(name, url='', data=null){
            actionUrl = url;
            myModal = new bootstrap.Modal(document.getElementById(name), {
                keyboard: false
            })
            if(data){
                keys = Object.keys(data);
                keys.forEach(key =>{
                    let tag = document.getElementById(name).querySelector(`#${key}`);
                    if(tag){
                        tag.value=data[key];
                    }
                })
                console.log(keys)
                //document.getElementById(name).querySelector("")
            }
            myModal.show();
        }
        document.getElementById('sendCategory').addEventListener('click', (e) => {
            e.preventDefault()
            submit();
        });
        function submit(){

            let formulario = document.getElementById('categoriesId');
            if(actionUrl){
                formulario.setAttribute('action', actionUrl)
                console.log(formulario.getAttribute('action'))
                document.getElementById('categoriesId').submit()
            }
        }
    </script>
@endsection
