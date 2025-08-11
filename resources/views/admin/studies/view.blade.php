@extends('admin.app')

@section('title','administrador-estudios')

@section('content')
    <div class="container">
        <h3 class="pb-4 title-text mt-2">Mis estudios</h3>
        <studies-component  data-id="{{auth()->id()}}"></studies-component>
    </div>

@endsection
