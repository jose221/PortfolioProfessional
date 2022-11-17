
@extends('admin.app')
@section('title', 'Mis Conocimientos')
@section('content')
    <div class="container">
        <h3 class="pb-4 title-text mt-2">Mis Conocimientos</h3>
        <knowledges-component data-id="{{auth()->id()}}"></knowledges-component>
    </div>
@endsection
