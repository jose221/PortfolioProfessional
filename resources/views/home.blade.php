@extends('admin.app')
@section('title', 'administrador')
@section('content')

    <div class="container">
        <h3 class="pb-4 title-text mt-2">Mi información personal</h3>
        <form-home-component data-id="{{auth()->id()}}"></form-home-component>
    </div>

@endsection

