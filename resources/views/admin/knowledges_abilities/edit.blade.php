@extends('admin.app')
@section('title', 'Mis Habilidades')
@section('content')
    <a href="{{route('knowledges.view')}}" class="float-right btn btn-outline-success">Ver todo</a>
    <a href="{{route('knowledges.show',$knowledges_abilities->knowledges_id)}}" class="float-right btn btn-outline-success">Regresar</a>
    <h2>Editar habilidad</h2>
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
    <div class="alert alert-secondary" role="alert">Ultima actualización {{$knowledges_abilities->updated_at}}</div>
    <form class="row" method="post" action="{{route('knowledges.abilities.update',$knowledges_abilities->id)}}">
        @csrf
        <div class="col-md-6">
            <div class="form-group">
                <label for="title_es">Titulo en español</label>
                <input type="text" class="form-control" id="title_es" value="{{$knowledges_abilities->title_es}}" name="title_es" aria-describedby="title_es-help">
                <small id="title_es-help" class="form-text text-muted">Titulo que se verá </small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="title_en">Titulo en inglés</label>
                <input type="text" class="form-control" id="title_en" value="{{$knowledges_abilities->title_en}}" name="title_en" aria-describedby="title_en-help">
                <small id="title_en-help" class="form-text text-muted">Titulo que se verá</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="description_es">Descripción en español</label>
                <textarea type="text" rows="10" class="form-control" id="description_es" name="description_es" aria-describedby="description_es-help">{{$knowledges_abilities->description_es}}</textarea>
                <small id="description_es-help" class="form-text text-muted">Descripción de la habilidad(puede ser codigo HTML)</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="description_en">Descripción en inglés</label>
                <textarea type="text" rows="10" class="form-control" id="description_en" name="description_en" aria-describedby="description_en-help">{{$knowledges_abilities->description_en}}</textarea>
                <small id="description_en-help" class="form-text text-muted">Descripción de la habilidad(puede ser codigo HTML)</small>
            </div>
        </div>
        <button type="submit" class="btn btn-secondary btn-lg btn-block">Guardar los cambios</button>
    </form>
@endsection
