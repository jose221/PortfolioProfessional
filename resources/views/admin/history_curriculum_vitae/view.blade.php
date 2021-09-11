@extends('admin.app')
@section('title', 'History Curriculum vitae')
@section('content')
    <button class="float-right btn btn-outline-success" onclick="initModal('newItemModal','{{route('users.vitae.store')}}')">Agregar nuevo curriculum</button>
    <h2>Mi CV</h2>
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
            <h3>Hitorial de curriculum vitae</h3>
        </div>
        <div class="col-md-12">
            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre del archivo</th>
                    <th scope="col">Tipo de archivo</th>
                    <th scope="col">seleccionado</th>
                    <th scope="col">URL</th>
                    <th scope="col">Acciones</th>
                </tr>
                </thead>
                <tbody>
                @foreach($items as $item)
                <tr>
                    <th scope="row">{{$item->id}}</th>
                    <td>{{$item->archive_name}}</td>
                    <td>{{$item->archive_type}}</td>
                    <td>
                        <div class="form-check form-switch">
                            <form id="deletemethod" method="post" action="{{route('users.vitae.selected',$item->id)}}">
                                @csrf
                                @if($item->selected)
                                    <button type="submit" disabled class=" btn btn-success btn-sm rounded-pill">Mostrando</button>
                                @else
                                    <input value="true" name="selected" hidden>
                                    <button type="submit" class=" btn btn-danger btn-sm rounded-pill">Sin mostrar</button>
                                @endif
                            </form>
                        </div>
                    </td>
                    <td><a href="{{asset($item->path)}}" target="_blank">Seleccionar</a></td>
                    <td>
                        <div class="btn-group dropend">
                            <button type="button" class="btn " data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" onclick="initModal('newItemModal','{{route('users.vitae.update',$item->id)}}',{{$item}})">Editar</a></li>
                                @if(!$item->selected)
                                    <form id="deletemethod" method="post" action="{{route('users.vitae.delete',$item->id)}}">
                                        @method('DELETE')
                                        @csrf
                                        <li><button type="submit" class="dropdown-item">Eliminar</button></li>
                                    </form>
                                @endif
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
                    <h5 class="modal-title" id="staticBackdropLabel">Crear nueva categoria</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="#" id="itemId" class="frm-ventas" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <label for="path" class="form-label">Subir archivo</label>
                                <input type="file" accept="application/msword,
                                text/plain, application/pdf"  class="form-control" id="path_url" name="path" aria-describedby="path-Help">
                                <div id="path-Help" class="form-text">Solo subir PDF o DOCX</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="archive_name" class="form-label">Nombre del archivo</label>
                                <input type="text" class="form-control" id="archive_name" name="archive_name" aria-describedby="archive_name-Help">
                                <div id="archive_name-Help" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="archive_type" class="form-label">Tipo de archivo subido</label>
                                <select class="form-select" id="archive_type" name="archive_type" aria-describedby="archive_type-help">
                                    <option selected>Open this select menu</option>
                                    <option value="DOC">Documento word</option>
                                    <option value="PDF">PDF</option>
                                </select>
                                <div id="archive_type-help" class="form-text">Tipo de archivo</div>
                            </div>
                            <div class="col-md-12 mb-3 text-center d-grid gap-2">
                                <button type="submit" id="sendItem" class=" btn btn-primary">Enviar</button>
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
        document.getElementById('sendItem').addEventListener('click', (e) => {
            e.preventDefault()
            submit();
        });
        function submit(){

            let formulario = document.getElementById('itemId');
            if(actionUrl){
                formulario.setAttribute('action', actionUrl)
                console.log(formulario.getAttribute('action'))
                document.getElementById('itemId').submit()
            }
        }
    </script>
@endsection
