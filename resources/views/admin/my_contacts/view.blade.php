@extends('admin.app')
@section('title', 'Mis contactos')
@section('content')
    <!--<a href="{{route('contacts.create')}}" class="float-right btn btn-outline-success">Nuevo Contacto</a>-->
   <div class="container">
       <h3 class="pb-4 title-text mt-2">Mis contactos</h3>
       <contacts-component data-id="{{auth()->id()}}"></contacts-component>
   </div>
@endsection
