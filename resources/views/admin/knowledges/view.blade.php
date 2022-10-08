
@extends('admin.app')
@section('title', 'Mis Conocimientos')
@section('content')
    <a href="{{route('knowledges.create')}}" class="float-right btn btn-outline-success">Nuevo Conocimiento</a>
    <h2>Mis Conocimientos</h2>
    <hr>

    <knowledges-component data-id="{{auth()->id()}}"></knowledges-component>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">titulo español</th>
                <th scope="col">titulo inglés</th>
                <th scope="col">icono path</th>
                <th scope="col">descripción español</th>
                <th scope="col">descripción inglés</th>
                <th scope="col">fecha actualización</th>
                <th scope="col">Acciones</th>

            </tr>
            </thead>
            <tbody>
            @foreach($knowledges as $knowledge)
                <tr>
                    <th scope="row">{{$knowledge->id}}</th>
                    <td>Ma{{$knowledge->title_es}}rk</td>
                    <td>{{$knowledge->title_en}}</td>
                    <td><img src="{{$knowledge->icon_path}}" style="margin-left: auto;margin-right: auto; display: block; width: 1rem; height: 1rem;"></td>
                    <td>{{$knowledge->description_es}}</td>
                    <td>{{$knowledge->description_en}}</td>
                    <td>{{$knowledge->updated_at}}</td>
                    <td>
                        <a type="button" href="{{route('knowledges.edit',$knowledge->id)}}" class="btn btn-outline-info">Editar</a>
                        <a type="button" href="{{route('knowledges.show',$knowledge->id)}}" class="btn btn-outline-secondary">Detalles</a>
                        <button type="button" class="btn btn-outline-danger">Eliminar</button>
                    </td>

                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection
