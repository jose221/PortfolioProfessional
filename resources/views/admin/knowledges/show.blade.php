@extends('admin.app')
@section('title', 'Mis Conocimientos')
@section('content')
    <div class="container">
        <h3 class="pb-4 title-text mt-2">Mis Conocimientos</h3>
        <nav aria-label="breadcrumb seaction-breadcumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/admin/knowledges">Mis Conocimientos</a></li>
                <li class="breadcrumb-item active" aria-current="page">Mis Habilidades</li>
            </ol>
        </nav>
        <knowledge-ability-component  data-id="{{$data['knowledge']->id}}"></knowledge-ability-component>
    </div>
@endsection
