@extends('admin.app')
@section('title', 'portfolio-categories')
@section('content')

    <div class="container">
        <h3 class="pb-4 title-text mt-2">Mi portafolio</h3>
        <div class="container">
            <nav aria-label="breadcrumb seaction-breadcumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/admin/portfolio-categories">Categoría del portafolio</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Portafolio</li>
                </ol>
            </nav>
        </div>
        <portfolio-component data-id="{{$id}}" data-user_id="{{auth()->id()}}"></portfolio-component>
    </div>
@endsection
