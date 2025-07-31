@extends('admin.app')
@section('title', 'Roles')
@section('content')
   <div class="container">
       <h3 class="pb-4 title-text mt-2">Roles de los usuarios</h3>
       <roles-component data-id="{{auth()->id()}}"></roles-component>
   </div>
@endsection
