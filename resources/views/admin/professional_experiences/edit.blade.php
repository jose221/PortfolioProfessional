@extends('admin.app')

@section('title','administrador-experiencia profesional')

@section('content')
    <a href="{{route('experience.professional.view')}}" class="float-right  btn btn-outline-success">Ver todo</a>
    <a href="{{route('experience.professional.create')}}" class="float-right btn btn-outline-success">Nueva Experiencia </a>
    <h2>Editar la experiencia Profesional</h2>
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
        Ultima actualización {{$experience->updated_at}}
    </div>
    <form method="post" enctype="multipart/form-data" action="{{route('experience.professional.update',$experience->id)}}"  class="row">
        @csrf
        <div class=" col-md-6">
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="{{$experience->image_path}}" class="rounded float-left img-thumbnail" alt="test">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <div class="form-group">
                                <h4 for="image_path">Foto de la empresa</h4>
                                <input type="file" class="form-control-file" id="image_path" name="image_path">
                                <small id="image_path-help" class="form-text text-muted">Foto o imagen se mostrará de portada</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="company">Nombre de la empresa</label>
                <input type="text" value="{{$experience->company}}" class="form-control" id="company" name="company" aria-describedby="company-help">
                <small id="company-help" class="form-text text-muted">Nombre de la empresa donde trabajasté</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="job_es">Empleo o rol en la Empresa en español</label>
                <input type="text" value="{{$experience->job_es}}" class="form-control" id="job_es" name="job_es" aria-describedby="job_es-help">
                <small id="job_es-help" class="form-text text-muted">¿Cuál fue tu cargo en la empresa en español?</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="job_en">Empleo o rol en la Empresa en inglés</label>
                <input type="text" class="form-control" value="{{$experience->job_en}}" id="job_en" name="job_en" aria-describedby="job_en-help">
                <small id="job_en-help" class="form-text text-muted">¿Cuál fue tu cargo en la empresa en inglés?</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="date_start">Fecha de inicio </label>
                <input type="date" class="form-control" value="{{$experience->date_start}}" id="date_start" name="date_start" aria-describedby="date_start-help">
                <small id="date_start-help" class="form-text text-muted">Fecha de inicio en la empresa</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="date_start">Fecha final </label>
                <input type="date" class="form-control" value="{{$experience->date_end}}" id="date_end" name="date_end" aria-describedby="date_end-help">
                <small id="date_end-help" class="form-text text-muted">Fecha de final en la empresa</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="country_es">País donde proviene la empresa en español</label>
                <input type="text" class="form-control" value="{{$experience->country_es}}" id="country_es" name="country_es" aria-describedby="country_es-help">
                <small id="country_es-help" class="form-text text-muted">¿de dónde es la empresa donde trabajasté?</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="country_en">País donde proviene la empresa en inglés</label>
                <input type="text" class="form-control" id="country_en" value="{{$experience->country_en}}" name="country_en" aria-describedby="country_en-help">
                <small id="country_en-help" class="form-text text-muted">¿de dónde es la empresa donde trabajasté?</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="description_es">Descripción de tu rol en la empresa en español</label>
                <textarea type="text" class="form-control" id="description_es" name="description_es" aria-describedby="description_es-help" cols="6">{{$experience->description_es}}</textarea>
                <small id="description_es-help" class="form-text text-muted">¿Qué hiciste en la empresa, con que trabajaste, describelo(Puedes utilizar codigo html) en español</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="description_en">Descripción de tu rol en la empresa en español</label>
                <textarea type="text" class="form-control" id="description_en" name="description_en" aria-describedby="description_en-help" cols="6">{{$experience->description_en}}</textarea>
                <small id="description_en-help" class="form-text text-muted">¿Qué hiciste en la empresa, con que trabajaste, describelo(Puedes utilizar codigo html) en inglés</small>
            </div>
        </div>
        <button type="submit" class="btn btn-secondary btn-lg btn-block">Guardar todos los cambios</button>
    </form>
@endsection
