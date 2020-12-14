@extends('admin.app')

@section('title','administrador-estudios')

@section('content')
    <a href="{{route('studies.create')}}" class="float-right btn btn-outline-success">Nuevo Estudio</a>
    <h2>Mis estudios</h2>
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
        @foreach($studies as $study)
            <div class="col-md-4">
                <div class="card text-center" >
                    <div class="card-body">
                        <h5 class="card-title">{{$study->school_es}}</h5>
                        <p class="text-muted">{{$study->school_en}}</p>
                        <p class="card-text">{{$study->caerrer_es}}</p>
                        <p class="card-text text-muted">{{$study->caerrer_en}}</p>
                        <p class=" card-text text-muted">Folio:<b>{{$study->folio}}</b></p>
                        <!--Acciones-->
                        <a href="{{route('studies.edit',$study->id)}}" class="float-left btn btn-outline-info">Editar</a>
                        <form method="post" action="{{route('studies.delete',$study->id)}}">
                            @method('delete')
                            @csrf
                            <button type="submit" class="float-right btn btn-outline-danger">Eliminar</button>
                        </form>
                    </div>
                </div>
            </div>
        @endforeach
    </div>

@endsection
