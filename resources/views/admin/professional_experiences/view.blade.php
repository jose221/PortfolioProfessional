@extends('admin.app')

@section('title','administrador-experiencia profesional')

@section('content')

    <div class="container">
        <h3 class="pb-4 title-text mt-2">Mi Experiencia Profesional</h3>
    <professional-experiences-component  data-id="{{auth()->id()}}"></professional-experiences-component>
    </div>
@endsection
