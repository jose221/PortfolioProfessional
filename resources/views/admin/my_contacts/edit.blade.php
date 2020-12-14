@extends('admin.app')
@section('title', 'Mis contactos')
@section('content')
    <a href="{{route('contacts.create')}}" class="float-right btn btn-outline-success">Nuevo Contacto</a>
    <a href="{{route('contacts.view')}}" class="float-right btn btn-outline-success">Ver todo</a>
    <h2>Editar contacto</h2>
    <hr>
    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>¡Exitoso! </strong> {{session('success')}}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    @endif
    @if(session('error'))
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>¡Error! </strong> {{session('error')}}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    @endif
    <form class="row" method="post" action="{{route('contacts.update',$myContact->id)}}" enctype="multipart/form-data">
        @csrf
        <div class="col-md-12">
            <div class="form-group">
                <h4 for="image_path">Imagen icono</h4>
                <input type="file" class="form-control-file" id="icon_path" name="icon_path">
                <small id="icon_path-help" class="form-text text-muted">Foto o imagen se mostrará de portada</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="name_es">Nombre del contacto en español</label>
                <input type="text" value="{{$myContact->name_es}}" class="form-control" id="name_es" name="name_es" aria-describedby="name_es-help">
                <small id="name_es-help" class="form-text text-muted">Nombre del contacto, puede ser facebook, whatsapp etc.</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="name_en">Nombre del contacto en inglés</label>
                <input type="text" value="{{$myContact->name_en}}" class="form-control" id="name_en" name="name_en" aria-describedby="name_en-help">
                <small id="name_en-help" class="form-text text-muted">Nombre del contacto, puede ser facebook, whatsapp etc.</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="url_path">Url path</label>
                <input type="text" value="{{$myContact->url_path}}" class="form-control" id="url_path" name="url_path" aria-describedby="url_path-help">
                <small id="url_path-help" class="form-text text-muted">link para poder ir a la cuenta</small>
            </div>
        </div>
        <button type="submit" class="btn btn-secondary btn-lg btn-block">Guardar todos los cambios</button>
    </form>
@endsection
