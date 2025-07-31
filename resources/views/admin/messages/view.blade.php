@extends('admin.app')
@section('title', 'messages')
@section('content')
    <h2>Mensajes recibidos</h2>
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
    <h3>Mensajes sin ver</h3>
    <hr>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo eléctronico</th>
                <th scope="col">Telefono</th>
                <th scope="col">mensaje</th>
                <th scope="col">Fecha</th>
                <th scope="col">Acciones</th>

            </tr>
            </thead>
            <tbody>
            @foreach($not_vieweds as $not_viewed)
                <tr>
                    <th scope="row">{{$not_viewed->id}}</th>
                    <td>{{$not_viewed->name}}</td>
                    <td><a href="mailto:{{$not_viewed->email}}">{{$not_viewed->email}}</a></td>
                    <td><a href="tel:{{$not_viewed->phone}}">{{$not_viewed->phone}}</a></td>
                    <td>{{$not_viewed->message}}</td>
                    <td>{{$not_viewed->created_at}}</td>
                    <td>
                        <form method="post" action="{{route('messages.viewed',$not_viewed->id)}}">
                            @csrf
                            <button type="submit" class="btn btn-outline-success">Marcar visto</button>
                        </form>
                    </td>

                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    <h3>Mensajes Vistos</h3>
    <hr>
    <div class="table-responsive">
            <table class="table table-bordered">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo eléctronico</th>
                <th scope="col">Telefono</th>
                <th scope="col">mensaje</th>
                <th scope="col">Fecha</th>
                <th scope="col">Visto el día</th>
                <th scope="col">Acciones</th>

            </tr>
            </thead>
            <tbody>
            @foreach($vieweds as $viewed)
                <tr>
                    <th scope="row">{{$viewed->id}}</th>
                    <td>{{$viewed->name}}</td>
                    <td><a href="mailto:{{$viewed->email}}">{{$viewed->email}}</a></td>
                    <td><a href="tel:{{$viewed->phone}}">{{$viewed->phone}}</a></td>
                    <td>{{$viewed->message}}</td>
                    <td>{{$viewed->created_at}}</td>
                    <td>{{$viewed->updated_at}}</td>
                    <td>
                        <form method="post" action="{{route('messages.delete',$viewed->id)}}">
                            @method('delete')
                            @csrf
                            <button type="submit" class="btn btn-outline-danger">Eliminar</button>
                        </form>
                    </td>

                </tr>
            @endforeach
            </tbody>
        </table>
@endsection
