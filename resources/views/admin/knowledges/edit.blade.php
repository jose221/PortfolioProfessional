@extends('admin.app')
@section('title', 'Mis conocimientos')
@section('content')
    <a href="{{route('knowledges.create')}}" class="float-right btn btn-outline-success">Nuevo Conocimiento</a>
    <a href="{{route('knowledges.view')}}" class="float-right btn btn-outline-success">Ver todo</a>
    <h2>Editar Conocimiento</h2>
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
    <div class="alert alert-secondary" role="alert">Ultima actualización {{$knowledge->updated_at}}</div>

    <form class="row" method="post" enctype="multipart/form-data" action="{{route('knowledges.update',$knowledge->id)}}">
        @csrf
        <div class="col-md-12">
            <div class="form-group">
                <h4 for="icon_path">Foto del proyecto</h4>
                <input type="file" class="form-control-file" id="icon_path" name="icon_path">
                <small id="icon_path-help" class="form-text text-muted">Foto o imagen se mostrará de portada</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="title_es">Titulo en español</label>
                <input type="text" class="form-control" id="title_es" value="{{$knowledge->title_es}}" name="title_es" aria-describedby="title_es-help">
                    <small id="title_es-help" class="form-text text-muted">Titulo que se verá </small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="title_en">Titulo en inglés</label>
                <input type="text" class="form-control"value="{{$knowledge->title_en}}" id="title_en" name="title_en" aria-describedby="title_en-help">
                <small id="title_en-help" class="form-text text-muted">Titulo que se verá</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="description_es">Descripción en español</label>
                <textarea type="text" rows="10" class="form-control" id="description_es" name="description_es" aria-describedby="description_es-help">{{$knowledge->description_es}}</textarea>
                <small id="description_es-help" class="form-text text-muted">Descripción de la habilidad(puede ser codigo HTML)</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="description_en">Descripción en inglés</label>
                <textarea type="text" rows="10" class="form-control" id="description_en" name="description_en" aria-describedby="description_en-help">{{$knowledge->description_en}}</textarea>
                <small id="description_en-help" class="form-text text-muted">Descripción de la habilidad(puede ser codigo HTML)</small>
            </div>
        </div>
        <button type="submit" class="btn btn-secondary btn-lg btn-block">Guardar todos los cambios</button>
    </form>
@endsection
