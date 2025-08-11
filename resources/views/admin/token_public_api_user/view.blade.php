@extends('admin.app')

@section('title','administrador-estudios')

@section('content')
    <div class="container">
        <h3 class="pb-4 title-text mt-2">Geneador de token público</h3>
        <token-public-api-user-component  data-id="{{auth()->id()}}"></token-public-api-user-component>
    </div>

@endsection
