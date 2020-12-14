@extends('admin.app')
@section('title', 'administrador-personal-projects')
@section('content')
    <a href="{{route('project.personal.create')}}" class="float-right btn btn-outline-success">Nuevo proyecto personal </a>
    <a href="{{route('project.personal.view')}}" class="float-right btn btn-outline-success">Ver todo </a>
    <h2>Editar proyecto personal</h2>
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
    <div class="alert alert-secondary" role="alert">Ultima actualización {{$proyect->updated_at}}</div>
    <form method="post" class="row" action="{{route('project.personal.update',$proyect->id)}}"  enctype="multipart/form-data">
        @csrf
        <div class=" col-md-12">
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="{{$proyect->image_path}}" class="rounded float-left img-thumbnail" alt="test">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <div class="form-group">
                                <h4 for="image_path">Foto del proyecto</h4>
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
                <label for="name_es">Nombre del proyecto en español</label>
                <input type="text" class="form-control" value="{{$proyect->name_es}}" id="name_es" name="name_es" aria-describedby="name_es-help">
                <small id="name_es-help" class="form-text text-muted">Nombre de la proyecto que hiciste</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="name_en">Nombre del proyecto en ingles</label>
                <input type="text" class="form-control" value="{{$proyect->name_en}}" id="name_en" name="name_en" aria-describedby="name_en-help">
                <small id="name_en-help" class="form-text text-muted">Nombre de la proyecto que hiciste</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="date_upload">Fecha del proyecto</label>
                <input type="date" class="form-control" value="{{$proyect->date_upload}}" id="date_upload" name="date_upload" aria-describedby="date_upload-help">
                <small id="date_upload-help" class="form-text text-muted">Fecha que fue hecho el proyecto o subido a la web</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="link">link del proyecto</label>
                <input type="text" class="form-control" value="{{$proyect->link}}" id="link" name="link" aria-describedby="link-help">
                <small id="link-help" class="form-text text-muted">Link del proyecto, puede ser del repositorio o dónde fue subido</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="description_es">Descripción del proyecto en español</label>
                <textarea type="text" class="form-control" id="description_es" name="description_es" aria-describedby="description_es-help" cols="6">{{$proyect->description_es}}</textarea>
                <small id="description_es-help" class="form-text text-muted">¿Qué hiciste en la empresa, con que trabajaste, describelo(Puedes utilizar codigo html) en español</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="description_en">Descripción del proyecto en inglés</label>
                <textarea type="text" class="form-control" id="description_en" name="description_en" aria-describedby="description_en-help" cols="6">{{$proyect->description_en}}</textarea>
                <small id="description_en-help" class="form-text text-muted">¿Qué hiciste en el proyecto que trabajaste, describelo(Puedes utilizar codigo html) en inglés</small>
            </div>
        </div>


        <button type="submit" class="btn btn-secondary btn-lg btn-block">Guardar todos los cambios</button>
    </form>
@endsection
