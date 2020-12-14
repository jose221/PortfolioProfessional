@extends('admin.app')
@section('title', 'administrador-personal-projects')
@section('content')
    <a href="{{route('project.personal.create')}}" class="float-right btn btn-outline-success">Nuevo proyecto personal </a>
    <h2>Proyectos personales</h2>
    <hr>
    <div class="alert alert-secondary" role="alert"></div>
        <div class="row">
            @foreach($personalProject as $proyect)
                <div class="col-md-4">
                    <div class="card text-center" style="width: 20rem;" >
                        <img src="{{$proyect->image_path}}" height="250" class="rounded card-img-top" alt="test">
                        <div class="card-body">
                            <h5 class="card-title">{{$proyect->name_es}}</h5>
                            <p class="card-text text-muted mb-2">{{$proyect->name_en}}</p>
                            <h5>Descripción</h5>
                            <div class="card-text  mb-2">
                                {!! strip_tags(BBCode::convertToHtml($proyect->description_es),'<li><ul><b><i><u><p><h1><h5><h4><h2>') !!}
                            </div>
                            <h5>Description</h5>
                            <div class="card-text text-muted mb-2">
                                {!! strip_tags(BBCode::convertToHtml($proyect->description_en),'<li><ul><b><i><u><p><h1><h5><h4><h2>') !!}
                            </div>
                            <p class="card-text  mb-2">{{$proyect->date_upload}}</p>
                            <a class="card-text  mb-2" href="{{$proyect->link}}">{{$proyect->link}}</a>
                            <!--Acciones-->
                            <div class="mb-2">
                                <a href="{{route('project.personal.edit',$proyect->id)}}" class="float-left btn btn-outline-info">Editar</a>
                                <form method="post" action="{{route('project.personal.delete',$proyect->id)}}">
                                    @method('DELETE')
                                    @csrf
                                    <button type="submit" class="float-right btn btn-outline-danger">Eliminar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection
