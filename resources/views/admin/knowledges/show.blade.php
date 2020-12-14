@extends('admin.app')
@section('title', 'Mis Conocimientos')
@section('content')
    <a href="{{route('knowledges.create')}}" class="float-right btn btn-outline-success">Nuevo Conocimiento</a>
    <a href="{{route('knowledges.edit',$data['knowledge']->id)}}" class="float-right btn btn-outline-success">Editar</a>
    <h2>Mis Conocimientos</h2>
    <hr>
    <div class="alert alert-secondary" role="alert">Ultima actualización {{$data['knowledge']->updated_at}}</div>
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
        <div class="col-md-3">
            <div class="card" style=" ">
                <img class="card-img-top" src="{{$data['knowledge']->icon_path}}" alt="Card image cap">
                <div class="card-body">
                    <h5>Titulo</h5>
                    <p class="card-text mb-0">{{$data['knowledge']->title_es}}</p>
                    <h5>Title</h5>
                    <p class="card-text text-muted mb-0">{{$data['knowledge']->title_en}}</p>
                    <hr>
                    <h5>Descripción</h5>
                    {!! strip_tags(BBCode::convertToHtml($data['knowledge']->description_es),'<li><ul><b><i><u><p><h1><h5><h4><h2>') !!}
                    <h5>Description</h5>
                    {!! strip_tags(BBCode::convertToHtml($data['knowledge']->description_en),'<li><ul><b><i><u><p><h1><h5><h4><h2>') !!}

                </div>
                <form method="post" action="{{route('knowledges.delete',$data['knowledge']->id)}}">
                    @method('delete')
                    @csrf
                    <button  type="submit" class="btn btn-lg btn-block btn-danger ">Eliminar</button>
                </form>
            </div>
        </div>
        <div class="col-md-9">
            <a href="{{route('knowledges.abilities.create',$data['knowledge']->id)}}" class="float-right btn btn-outline-success">Nueva Habilidad</a>
            <h2>Mis habilidades</h2>
            <hr>
            <div class="row">
                @foreach($data['knowledgeAbilities'] as $knowledgeAbility)
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-body">
                                <h5>Titulo</h5>
                                <h3 class="card-title mb-0">{{$knowledgeAbility->title_es}}</h3>
                                <h5>title</h5>
                                <h5 class="card-title text-muted">{{$knowledgeAbility->title_en}}</h5>
                                <h5>Descripción</h5>
                                <p class="card-text mb-1">{{$knowledgeAbility->description_es}}</p>
                                <h5>Description</h5>
                                <p class="card-text text-muted mb-2">{{$knowledgeAbility->description_en}}</p>
                                <a href="{{route('knowledges.abilities.edit',$knowledgeAbility->id)}}" class="btn btn-info float-left">Editar</a>
                                <form method="post" action="{{route('knowledges.abilities.delete',$knowledgeAbility->id)}}">
                                    @method('delete')
                                    @csrf
                                    <button  type="submit" class="btn btn-danger float-right">Eliminar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                @endforeach

            </div>
        </div>
    </div>
@endsection
