@extends('admin.app')
@section('title', 'History Curriculum vitae')
@section('content')

    <div class="container">
        <h3 class="pb-4 title-text mt-2">Mi cv</h3>
        <nav aria-label="breadcrumb seaction-breadcumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/admin/knowledges">Historial de CV</a></li>
                <li class="breadcrumb-item active" aria-current="page">Mi CV</li>
            </ol>
        </nav>
        <!--<info-vitae-component data-id="{{$id}}"  data-user_id="{{auth()->id()}}"></info-vitae-component>-->
    </div>
@endsection
