@extends('admin.app')

@section('title','administrador-experiencia profesional')

@section('content')

    <div class="container">
        <h3 class="pb-4 title-text mt-2">Usuarios</h3>
        <users-component  data-id="{{auth()->id()}}"></users-component>
    </div>
@endsection
