@extends('home.index')

@section('title', 'Page Title')



@section('content')
    <!-- Header -->
    @if(session('success'))
        <script>
            Swal.fire({
                title: 'Success',
                text: "{{session('success')}}",
                icon: 'success',
                showConfirmButton: false,
                timer: 2500
            })
        </script>
    @endif
    @if(session('error'))
        <script>
            Swal.fire({
                title: 'Error',
                text: "{{session('error')}}",
                icon: 'error',
                showConfirmButton: false,
                timer: 2500
            })
        </script>
    @endif

    <header class="masthead d-flex" id="home-section">
            <div class="container-fluid row">
                <div class="col-md-8 header-text">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="mb-3">
                                @foreach($myPortafolio['myContacts'] as $contact)
                                    <a class="btn btn-contact" href="{{$contact['url_path']}}" target="_blank">
                                        <i class=" {{$contact['icon_path']}} text-center"></i>
                                    </a>
                                @endforeach
                            </div>
                        </div>
                        <div class="col-md-12">
                            <h2>{{Str::upper($myPortafolio['myPerfil']['name'])}}</h2>
                        </div>
                        <div class="col-md-12">
                            <h3>
                                {{Str::upper($myPortafolio['myPerfil']['header_text'])}}
                            </h3>
                        </div>
                        <div class="col-md-12 mt-3">
                            <a class="btn outliner-primary" href="#professional-experience-section">{!! trans('index.VER MI PORTAFOLIO') !!}</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 header-img ">
                    <img src="{{asset($myPortafolio['myPerfil']['header_image_path'])}}" loading="lazy">
                </div>
            </div>
        <div class="overlay"></div>
    </header>
    <!-- About -->
    <section class="content-section bg-light" id="about-section" >
        <div class="container">
            <div class="content-section-heading text-center">
                <h3 class="text-name-section mb-0">{!! trans('index.Acerca de') !!}</h3>
                <hr>
            </div>
            <div class="row">
                <div class="col-md-4 my-perfil-image">
                    <img  src="{{$myPortafolio['myPerfil']['my_perfil']}}" alt="" srcset="" loading="lazy">
                </div>
                <div class="col-md-8 my-perfil-content">
                    <div class="row  ml-lg-5 ml-2 mr-3">
                        <div class="col-12 mb-3">
                            <h2>{!! trans('index.hello') !!}.</h2>
                        </div>
                        <div class="col-lg-12">
                            <p class="lead text-justify">{{$myPortafolio['myPerfil']['description']}}</p>
                        </div>
                        <div class="col-lg-12 mt-4">
                            <div class="row">
                                <div class="col-md-6" >
                                    <span class="lead font-weight-bold">{!! trans('index.Age') !!}:</span>
                                    <p class="lead text-justify">
                                        {{$myPortafolio['myPerfil']['age']}}
                                    </p>
                                </div>
                                <div class="col-md-6">
                                    <span class="lead font-weight-bold">{!! trans('index.email') !!}: </span>
                                    <p class="lead">
                                        {{$myPortafolio['myPerfil']['email']}}
                                    </p>
                                </div>
                                <div class="col-md-6">
                                    <span class="font-weight-bold lead">{!! trans('index.nationality') !!}:</span>
                                    <p class="lead ">
                                        {{$myPortafolio['myPerfil']['nationality']}}
                                    </p>
                                </div>
                                <div class="col-6">
                                    <span class="font-weight-bold lead">{!! trans('index.country') !!}:</span>
                                    <p class="lead ">
                                        {{$myPortafolio['myPerfil']['country']}}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 text-center mt-4">
                            <a class="btn outliner-primary" target="_blank" href="{{asset($myPortafolio['myPerfil']['cv'])}}">{!! trans('index.VER MI PORTAFOLIO') !!}</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="content-section bg-blue text-center" id="knowledges-section">
        <div class="container">
            <div class="content-section-heading">
                <h3 class="mb-0 text-name-section">{!! trans('index.Mis conocimientos') !!}</h3>
                <hr class="mb-3">
                <div class="description-content pt-3">
                    <h5>
                        {!! trans('index.Conocimiento y destrezas en la tecnologías de la información') !!}</h5>
                </div>
            </div>
            <div class="row  gy-4 mt-2">
                @foreach($myPortafolio['myKnowledges'] as $knowledges)
                <div class="col-md-4">
                    <div class="item-column h-100">
                        <div class="item-head">
                            <div class="">
                            <img class="card-img-top img-circle " src="{{$knowledges['icon_path']}}" alt="Card image cap" loading="lazy">
                            </div>
                        </div>
                        <div class="item-content">
                            <h5>
                                {{$knowledges['title']}}
                            </h5>
                            <p class="card-text text-justify">{!! strip_tags(BBCode::convertToHtml($knowledges['description'] ?? ''),'<li><ul><b><i><u><p><h1><h5><h4><h2>') !!}</p>
                        </div>
                    </div>
                </div>
                    @endforeach



            </div>
        </div>
    </section>
    <!-- languages, tools, frameworks -->
    <section class="content-section bg-light text-center" id="abilities-section">
        <div class="container">
            <div class="content-section-heading">
                <h3 class="mb-0 text-name-section">{!! trans('index.mis habilidades') !!}</h3>
                <hr class="mb-3">
            </div>
            <div class="description-content pt-3">
                <h5>{!! trans('index.Buen manejo y conocimiento en las siguientes Tecnológias') !!}</h5>
            </div>
            @foreach($myPortafolio['portfolio_categories'] as $categories)
            <div class="section-habilities mt-5">
                <div class="content-section-heading">
                    <h3 class="mb-0 text-name-section">{{$categories['title']}}</h3>
                </div>
                <div>
                    <div class="row mt-5 row-cols-3 row-cols-lg-6 gy-3 justify-content-center">
                        @foreach($categories['portfolios'] as $portfolio)
                            <div class="col">
                                <div>
                                    <img width="100" height="120" src="{{asset($portfolio['icon_path'])}}" data-bs-toggle="tooltip" data-bs-placement="top" title="{{$portfolio['description']}}" loading="lazy">
                                </div>
                            </div>
                        @endforeach

                    </div>
                </div>
            </div>
            @endforeach

        </div>
    </section>
    <!-- mis conocimientos -->
    <!--<section class="content-section bg-primary text-white text-center" id="conocimientos-section">
        <div class="container">
            <div class="content-section-heading">
                <h2 class="mb-0">{!! trans('index.Mis conocimientos') !!}</h2>
            </div>
            <div class="row">
                <div class="card-group">
                    @foreach($myPortafolio['myKnowledges'] as $knowledges)
                        <div class="col-lg-4 col-md-6 mb-5 mb-lg-0">
                            <div class="card">
                                <div class="div-img">
                                    <img class="card-img-top img-circle " src="{{$knowledges['icon_path']}}" alt="Card image cap">
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title text-black">{{$knowledges['title']}}</h5>
                                    <p class="card-text text-muted text-justify">{!! strip_tags(BBCode::convertToHtml($knowledges['description'] ?? ''),'<li><ul><b><i><u><p><h1><h5><h4><h2>') !!}</p>
                                    @foreach($knowledges['abilities'] as $ability)
                                        <div class="divider-e">
                                            <h5 class="text-primary">{{$ability['title']}}</h5>
                                            <p class="text-muted">
                                                {!! strip_tags(BBCode::convertToHtml(   $ability['description'] ?? ''),'<li><ul><b><i><u><p><h1><h5><h4><h2>') !!}
                                            </p>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>

            </div>
        </div>
    </section>-->
    <!-- Portfolio -->
    <section class="content-section bg-light" id="professional-experience-section" >
        <div class="container">
            <div class="content-section-heading text-center mb-5">
                <h3 class="text-name-section mb-0">{!! trans('index.experiencia profesional') !!}</h3>
                <hr class="mb-3">
                <div class="description-content pt-3">
                    <h5>{!! trans('index.Experiencia a nivel profesional en los siguientes proyectos') !!}</h5>
                </div>
            </div>
            <div class="row  projects justify-content-center">
                @foreach($myPortafolio['professional_projects'] as $experience)
                    <div class="col-lg-4   col-md-12 mr-0 mt-5">
                        <a class="content-middle" role="button" data-bs-toggle="modal" href="#modal_details_experience_{{$experience['id']}}">
                            <div class="">

                            </div>
                            <img class="img-fluid"  src="{{$experience['image_path']}}" alt="" loading="lazy">
                        </a>
                    </div>
                   <!--modal of details-->
                    <div id="modal_details_experience_{{$experience['id']}}" data-bs-keyboard="false" class="modal fade modal-jobs" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header content-middle"style=" width: 100%; min-height: 15rem; max-height: 25rem; background-image: url('{{asset($experience['image_path'])}}');
                                    text-align: center;
                                    background-position: center center;
                                    background-size: 100% 100%;
                                    background-repeat: no-repeat;

                                    position: relative;
                                    ">
                                    <h3 class="float-text-center">{{Str::upper($experience['company'])}}</h3>
                                    <button type="button" class="btn-close-modal "   data-bs-dismiss="modal"><i class="fas fa-times"></i></button>
                                    <!--<h5 class="modal-title">{{$experience['company']}} | {{$experience['country']}}</h5>
                                    <button type="button" class="btn-closeund-image:" data-bs-dismiss="modal" aria-label="Close"></button>-->

                                </div>
                                <div class="modal-body container" >
                                    <div class="text-center">
                                        <h2>{{Str::upper($experience['job'])}} </h2>
                                        <p class="text-muted text-center text-content">
                                            <b>Del </b><span class="text-muted">{{$experience['date_start']}}</span> <b> al  </b><span class="text-muted">{{$experience['date_end']}}</span>
                                        </p>
                                    </div>
                                    <div class="text-justify mt-2">
                                        <div class="">
                                            @foreach($experience['portfolio'] as $portfolio)
                                                <span class="badge rounded-pill outline-badge mt-2"><img src="{{asset($portfolio['icon_path'])}}" width="13" loading="lazy" /> {{$portfolio['title_en']}}</span>
                                            @endforeach
                                        </div>
                                        <div class="mt-4">
                                            {!! strip_tags(BBCode::convertToHtml($experience['description'] ?? ''),'<li><ul><b><i><u><p><h1><h5><h4><h2><a><strong>') !!}
                                        </div>
                                    </div>
                                    <!--<div class="mt-4 text-center">
                                        <button class="btn outliner-primary"  data-bs-dismiss="modal" aria-label="Close">Cerrar</button>
                                    </div>-->
                                </div>
                            </div>
                        </div> <!-- modal-bialog .// -->
                    </div> <!-- modal.// -->

                @endforeach
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    @if(count($myPortafolio['personal_projects']))
        <section class="content-section bg-primary text-white" id="experiencia-personal">
            <div class="container">
                <div class="content-section-heading text-center">
                    <h3 class="text-secondary mb-0">{!! trans('index.Portafolio') !!}</h3>
                    <h2 class="mb-5 mb-5 mb-lg-0">{!! trans('index.Mi proyectos personales') !!}</h2>
                </div>
                <div class="row no-gutters projects-created">
                    @foreach($myPortafolio['personal_projects'] as $project)
                        <div class="col-lg-4">
                            <a class="portfolio-item" href="#">
                                <div class="caption">
                                    <div class="caption-content">
                                    </div>
                                </div>
                                <img src="{{$project->image_path ?? ''}}" alt="Image"  loading="lazy">
                            </a>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
    @endif

    <!-- Contact -->
    <div class="contact">
        <section class="content-section contact-me bg-blue" id="contact-section">
            <div class="container">
                <!-- Contact Section Heading-->
                <div class="content-section-heading text-center mb-5">
                    <h3 class="text-name-section mb-0">{!! trans('index.Contacto') !!}</h3>
                    <hr class="mb-3">
                    <div class="description-content pt-3">
                        <h5>{!! trans('index.Puedes contactarme enviandome un mensaje') !!}</h5>
                    </div>
                </div>
                <!-- Icon Divider-->

                <!-- Contact Section Form-->
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <!--novalidate="novalidate"-->
                        <form id="contactForm" class="row gy-2" name="sentMessage" method="post" action="{{route('messages.send')}}" >
                            @csrf
                            <div class="col-md-6">
                                <div class="control-group">
                                    <div class="form-group controls mb-0 pb-2">
                                        <input value="{{ old('name') }}"  class="form-control {{ $errors->has('name') ? 'is-invalid ' : '' }}" id="name" name="name" required type="text" placeholder="{!! trans('index.Nombre') !!}" required="required" />
                                        @if ($errors->has('name'))
                                            <div class="invalid-feedback">
                                                {{ $errors->first('name') }}
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="control-group">
                                    <div class="form-group  controls mb-0 pb-2">
                                        <input value="{{ old('phone') }}"  class="form-control {{ $errors->has('phone') ? 'is-invalid' : '' }}" id="phone" name="phone" type="tel" placeholder="{!! trans('index.Número telefónico') !!}" required="required" />
                                        <!--<p class="help-block text-danger"></p>-->
                                        @if ($errors->has('phone'))
                                            <div class="invalid-feedback">
                                                {{ $errors->first('phone') }}
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                           <div class="col-md-12">
                               <div class="control-group">
                                   <div class="form-group  controls mb-0 pb-2">
                                       <input value="{{ old('email') }}"  class="form-control {{ $errors->has('email') ? 'is-invalid ' : ' ' }}" id="email" name="email" type="email" placeholder="{!! trans('index.Email') !!}" required="required"  />
                                       @if ($errors->has('email'))
                                           <div class="invalid-feedback">
                                               {{ $errors->first('email') }}
                                           </div>
                                       @endif
                                   </div>
                               </div>
                           </div>
                            <div class="col-md-12">
                                <div class="control-group">
                                    <div class="form-group  controls mb-0 pb-2">
                                        <textarea class="form-control  {{ $errors->has('message') ? 'is-invalid' : '' }}" name="message" id="message" rows="5" cols="5" placeholder="{!! trans('index.Mensaje') !!}" required="required">{{ old('message') }}</textarea>
                                        @if ($errors->has('message'))
                                            <div class="invalid-feedback">
                                                {{ $errors->first('message') }}
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div id="success"></div>
                                <div class="form-group d-flex justify-content-center mt-3">
                                    <button class="btn btn-outline-light  btn-lg" id="sendMessageButton" type="submit">{!! trans('index.Envíar mensaje') !!}</button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>

@endsection
