@extends('admin.app')
@section('title', 'Mis Habilidades')
@section('content')
    <a href="{{route('knowledges.view')}}" class="float-right btn btn-outline-success">Ver todo</a>
    <a href="{{route('knowledges.show',2)}}" class="float-right btn btn-outline-success">Regresar</a>
    <h2>Nueva habilidad</h2>
    <hr>
    <div class="alert alert-secondary" role="alert"></div>
    <form class="row" method="post" action="{{route('knowledges.abilities.store',$id)}}">
        @csrf
        <div class="col-md-6">
            <div class="form-group">
                <label for="title_es">Titulo en español</label>
                <input type="text" class="form-control" id="title_es" name="title_es" aria-describedby="title_es-help">
                <small id="title_es-help" class="form-text text-muted">Titulo que se verá </small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="title_en">Titulo en inglés</label>
                <input type="text" class="form-control" id="title_en" name="title_en" aria-describedby="title_en-help">
                <small id="title_en-help" class="form-text text-muted">Titulo que se verá</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="description_es">Descripción en español</label>
                <textarea type="text" rows="10" class="form-control" id="description_es" name="description_es" aria-describedby="description_es-help"></textarea>
                <small id="description_es-help" class="form-text text-muted">Descripción de la habilidad(puede ser codigo HTML)</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="description_en">Descripción en inglés</label>
                <textarea type="text" rows="10" class="form-control" id="description_en" name="description_en" aria-describedby="description_en-help"></textarea>
                <small id="description_en-help" class="form-text text-muted">Descripción de la habilidad(puede ser codigo HTML)</small>
            </div>
        </div>
        <button type="submit" class="btn btn-secondary btn-lg btn-block">Guardar</button>
    </form>
@endsection
