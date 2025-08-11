@extends('admin.app')
@section('title', 'portfolio-categories')
@section('content')


    <div class="container">
        <h3 class="pb-4 title-text mt-2">Categoría del portafolio</h3>
        <portfolio-categories-component data-id="{{auth()->id()}}"></portfolio-categories-component>
    </div>

@endsection
