@extends('admin.app')

@section('title','administrador-experiencia profesional')

@section('content')

    <a href="{{route('experience.professional.create')}}" class="float-right btn btn-outline-success">Nueva Experiencia </a>
    <h2>Experiencia Profesional</h2>
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
    <div class="row">
        @foreach($experiences as $experience)
            <div class="col-md-4">
                <div class="card text-center" style="width: 20rem;" >
                    <img src="{{$experience->image_path}}" height="250" class="rounded card-img-top" alt="test">
                    <div class="card-body">
                        <h5 class="card-title">{{$experience->company}}</h5>
                        <p class="card-text mb-2">{{$experience->rol_es}}</p>
                        <p class="card-text  mb-2">{{$experience->rol_en}}</p>
                        <h5>Descripción</h5>
                        <div class="card-text text-muted mb-2">
                            {!! strip_tags(BBCode::convertToHtml($experience->description_es),'<li><ul><b><i><u><p><h1><h5><h4><h2>') !!}
                        </div>

                        <h5>Description</h5>
                        <div class="card-text text-muted mb-2">
                            {!! strip_tags(BBCode::convertToHtml($experience->description_en),'<li><ul><b><i><u><p><h1><h5><h4><h2>') !!}
                        </div>
                        <p class="card-text  mb-2"><span>{{$experience->country_es}}</span>/<span>{{$experience->country_en}}</span></p>
                        <p class="card-text  mb-2"><span>{{$experience->date_start}}</span>-<span>{{$experience->date_end}}</span></p>
                        <!--Acciones-->
                        <a href="{{route('experience.professional.edit',$experience->id)}}" class="float-left btn btn-outline-info">Editar</a>
                        <form method="post" action="{{route('experience.professional.delete',$experience->id)}}">
                            @method('DELETE')
                            @csrf
                            <button type="submit" class="float-right btn btn-outline-danger">Eliminar</button>
                        </form>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
@endsection
