@extends('admin.app')
@section('title', 'Modules')
@section('content')
   <div class="container">
       <h3 class="pb-4 title-text mt-2">Módulos del sistema</h3>
       <modules-component data-id="{{auth()->id()}}"></modules-component>
   </div>
@endsection
