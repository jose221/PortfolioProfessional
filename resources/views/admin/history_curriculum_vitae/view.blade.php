@extends('admin.app')
@section('title', 'History Curriculum vitae')
@section('content')

    <div class="container">
        <h3 class="pb-4 title-text mt-2">Historial de CV</h3>
        <vitae-component  data-id="{{auth()->id()}}"></vitae-component>
    </div>
@endsection
