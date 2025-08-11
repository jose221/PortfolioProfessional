@extends('admin.app')

@section('title','administrador-estudios')

@section('content')
    <a href="{{route('studies.create')}}" class="float-right btn btn-outline-success">Nuevo Estudio</a>
    <a href="{{route('studies.view')}}" class="float-right btn btn-outline-success">ver todo</a>
    <h2>Editar estudios</h2>
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
    <div class="alert alert-secondary" role="alert">
        Ultima actualización {{$study->created_at}}
    </div>
    <form method="post" action="{{route('studies.update',$study->id)}}" class="row">
        @csrf
        <div class="col-md-6">
            <div class="form-group">
                <label for="folio">Folio</label>
                <input type="text" class="form-control" id="folio" name="folio" value="{{$study->folio}}" aria-describedby="folio-help">
                <small id="folio-help" class="form-text text-muted">Folio del certificado</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="school_en">Universidad en inglés</label>
                <input type="text" class="form-control" id="school_en" value="{{$study->school_en}}" name="school_en" aria-describedby="school_en-help">
                <small id="school_en-help" class="form-text text-muted">Escribe el nombre de la Universidad o institución en inglés</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="school_es">Universidad en español</label>
                <input type="text" class="form-control" id="school_es" value="{{$study->school_es}}" name="school_es" aria-describedby="school_es-help">
                <small id="school_es-help" class="form-text text-muted">Escribe el nombre de la Universidad o institución en español</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="caerrer_es">Carrera en español</label>
                <input type="text" class="form-control" id="caerrer_es" value="{{$study->caerrer_es}}" name="caerrer_es" aria-describedby="caerrer_es-help">
                <small id="caerrer_es-help" class="form-text text-muted">Escribe el nombre de la carrera en español</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="caerrer_en">Carrera en inglés</label>
                <input type="text" class="form-control" id="caerrer_en" value="{{$study->caerrer_en}}" name="caerrer_en" aria-describedby="caerrer_en-help">
                <small id="caerrer_en-help" class="form-text text-muted">Escribe el nombre de la carrera en inglés</small>
            </div>
        </div>
        <button type="submit" class="btn btn-secondary btn-lg btn-block">Guardar todos los cambios</button>
    </form>
@endsection
