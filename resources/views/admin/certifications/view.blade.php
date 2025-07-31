
@extends('admin.app')
@section('title', 'Mis Conocimientos')
@section('content')
    <div class="container">
        <h3 class="pb-4 title-text mt-2">Mis certificados</h3>
        <certifications-component data-id="{{auth()->id()}}"></certifications-component>
    </div>
@endsection
