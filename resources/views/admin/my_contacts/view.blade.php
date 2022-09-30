@extends('admin.app')
@section('title', 'Mis contactos')
@section('content')
    <a href="{{route('contacts.create')}}" class="float-right btn btn-outline-success">Nuevo Contacto</a>
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
   <div class="container">
       <h3 class="pb-4 title-text mt-2">Mis contactos</h3>
       <contacts-component data-id="{{auth()->id()}}"></contacts-component>
   </div>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre español</th>
                <th scope="col">Nombre inglés</th>
                <th scope="col">icono path</th>
                <th scope="col">url path</th>
                <th scope="col">fecha actualización</th>
                <th scope="col">Acciones</th>

            </tr>
            </thead>
            <tbody>
            @foreach($myContacts as $myContact)
                <tr>
                    <th scope="row">{{$myContact->id}}</th>
                    <td>{{$myContact->name_es}}</td>
                    <td>{{$myContact->name_en}}</td>
                    <td><i class=" {{$myContact->icon_path}} fa-3x text-center"></i></td>
                    <!--<td><i> <img src="{{$myContact->icon_path}}" style="margin-left: auto;margin-right: auto; display: block; width: 1rem; height: 1rem;"></i></td>-->
                    <td><a href="https://www.facebook.com/joseangel.alvarado.735507/">{{$myContact->url_path}}</a></td>
                    <td>{{$myContact->updated_at}}</td>
                    <td>
                        <a type="button" href="{{route('contacts.edit',$myContact->id)}}" class="btn btn-outline-info">Editar</a>
                        <form method="post" action="{{route('contacts.delete',$myContact->id)}}">
                            @method('delete')
                            @csrf
                            <button type="submit" class="btn btn-outline-danger ">Eliminar</button>
                        </form>
                    </td>

                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection
