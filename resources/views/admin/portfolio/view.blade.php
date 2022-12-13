@extends('admin.app')
@section('title', 'portfolio-categories')
@section('content')

    <div class="container">
        <h3 class="pb-4 title-text mt-2">Mi portafolio</h3>
        <portfolio-component data-id="{{$id}}" data-user_id="{{auth()->id()}}"></portfolio-component>
    </div>

    <button class="float-right btn btn-outline-success" onclick="initModal('newItemModal','{{route('portfolio-categories.portfolio.store',$id)}}')">Nuevo item </button>
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
        <div class="col-md-12 table-responsive">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Code</th>
                    <th scope="col">Icono</th>
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
                    <td><img src="{{asset($item->icon_path)}}" width="80px"></td>
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
                                <li><a class="dropdown-item" onclick="initModal('newItemModal','{{route('portfolio-categories.portfolio.update',$item->id)}}',{{$item}})">Editar</a></li>
                                <form id="deletemethod" method="post" action="{{route('portfolio-categories.portfolio.delete',$item->id)}}">
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
    <div class="modal fade" id="newItemModal" data-bs-backdrop="static"  tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen-md-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="#" id="categoriesId" class="frm-ventas" method="post"  enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <label for="icon_path" class="form-label">Icono del item</label>
                                <input type="file" accept="image/svg+xml, image/png"  class="form-control"  name="icon_path" aria-describedby="icon_path-Help">
                                <div id="icon_path-Help" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <label for="code" class="form-label">Codigo</label>
                                <input type="text" class="form-control" id="code" name="code" aria-describedby="code-Help">
                                <div id="code-Help" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="years_experience" class="form-label">Años de experiencia</label>
                                <input type="number" class="form-control"  id="years_experience" name="years_experience" aria-describedby="years_experience-Help">
                                <div id="years_experience-Help"class="form-text">Años de experiencia</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="knowledge_level" class="form-label">Nivel de conocimiento</label>
                                <input type="range" class="form-range" value="0" min="0" max="100" step="10" id="knowledge_level" name="knowledge_level" aria-describedby="knowledge_level-Help">
                                <div id="knowledge_level-Help" class="form-text">Nivel de conocimiento</div>
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
                            <input type="text" hidden class="form-control" id="portfolio_categories_id" name="portfolio_categories_id" aria-describedby="portfolio_categories_id-help">
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
        document.getElementById('newItemModal').addEventListener('hidden.bs.modal', function (event) {
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
