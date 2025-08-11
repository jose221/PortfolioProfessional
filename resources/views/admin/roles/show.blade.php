@extends('admin.app')
@section('title', 'Roles')
@section('content')
    <div class="container">
        <h3 class="pb-4 title-text mt-2">Role</h3>
        <role-component data-id="{{auth()->id()}}" data-role-Id="{{$id}}"></role-component>
    </div>
@endsection
