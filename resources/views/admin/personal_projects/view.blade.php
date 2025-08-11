@extends('admin.app')
@section('title', 'administrador-personal-projects')
@section('content')

    <div class="container">
        <h3 class="pb-4 title-text mt-2">Proyectos personales</h3>
        <personal-projects-component  data-id="{{auth()->id()}}"></personal-projects-component>
    </div>
@endsection
