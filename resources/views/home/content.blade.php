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
    <header class="masthead d-flex">
        <div class="container text-center my-auto">
            <h1 class="mb-1">{{$myPortafolio['myPerfil']['name']}}</h1>
            <h3 class="mb-5">
                <em>{!! trans('index.alias') !!}</em>
            </h3>
            <a class="btn btn-primary btn-xl" href="#contacto"><i class="fas fa-phone-alt"></i> {!! trans('index.Contacto') !!}</a>
        </div>
        <div class="overlay"></div>
    </header>

    <!-- About -->
    <section class="content-section bg-light" id="acerca">
        <div class="container ">
            <div class="row">
                <div class="col-4 my-perfil-image">
                    <img height="400" src="{{$myPortafolio['myPerfil']['my_perfil']}}" alt="" srcset="">
                </div>
                <div class="col-md-8 my-perfil-content">
                    <div class="row">
                        <div class="col-lg-10 mx-auto">
                            <h2>{!! trans('index.hello') !!}</h2>
                            <p class="lead mb-5 text-justify">{{$myPortafolio['myPerfil']['description']}}</p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- mis conocimientos -->
    <section class="content-section bg-primary text-white text-center" id="conocimientos">
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
                                    <p class="card-text text-muted text-justify">{!! strip_tags(BBCode::convertToHtml($knowledges['description']),'<li><ul><b><i><u><p><h1><h5><h4><h2>') !!}</p>
                                    @foreach($knowledges['abilities'] as $ability)
                                        <div class="divider-e">
                                            <h5 class="text-primary">{{$ability['title']}}</h5>
                                            <p class="text-muted">
                                                {!! strip_tags(BBCode::convertToHtml(   $ability['description']),'<li><ul><b><i><u><p><h1><h5><h4><h2>') !!}
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
    </section>
    <!-- Portfolio -->
    <section class="content-section" id="experiencia-profesional">
        <div class="container">
            <div class="content-section-heading text-center mb-5">
                <h3 class="text-secondary mb-0">{!! trans('index.Portafolio') !!}</h3>
                <h2 class="mb-5 mb-5 mb-lg-0">{!! trans('index.Mi experiencia profesional') !!}</h2>
            </div>
            <div class="row no-gutters projects">
                @foreach($myPortafolio['professional_projects'] as $experience)
                    <div class="col-lg-2 mr-0">
                        <a class="" data-toggle="modal" href="" data-target="#modal_details_experience_{{$experience['id']}}">
                            <div class="">

                            </div>
                            <img class="img-fluid"  src="{{$experience['image_path']}}" alt="">
                        </a>
                    </div>
                   <!--modal of details-->
                    <div id="modal_details_experience_{{$experience['id']}}" class="modal fixed-right fade" tabindex="-1" role="dialog">
                        <div class="modal-dialog modal-dialog-aside" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">{{$experience['company']}} | {{$experience['country']}}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div style="height: 30%; width: 100%;">
                                        <img style="height: 100%; width: 100% !important;" class="card-img-top" src="{{$experience['image_path']}}" alt="Bussiness">
                                    </div>
                                    <div class="text-center">
                                        <h5>{{$experience['job']}}</h5>
                                        <p class="text-muted">
                                            <b>Del </b><span class="text-muted">{{$experience['date_start']}}</span> <b> al  </b><span class="text-muted">{{$experience['date_end']}}</span>
                                        </p>
                                    </div>
                                    <div class=" text-justify mt-4">
                                        {!! strip_tags(BBCode::convertToHtml($experience['description']),'<li><ul><b><i><u><p><h1><h5><h4><h2>') !!}
                                    </div>
                                </div>
                            </div>
                        </div> <!-- modal-bialog .// -->
                    </div> <!-- modal.// -->

                @endforeach
            </div>
        </div>
    </section>

    <!-- Call to Action -->
        <section class="content-section bg-primary text-white" id="experiencia-personal">
            @if(count($myPortafolio['personal_projects']))
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
                                <img src="{{$project->image_path}}" alt="Image" >
                            </a>
                        </div>
                    @endforeach
                </div>
            </div>
            @endif
        </section>

    <!-- Contact -->
    <div class="contact">
        <section class="content-section contact-me" id="contacto">
            <div class="container">
                <!-- Contact Section Heading-->
                <div class="content-section-heading text-center">
                    <h3 class="text-secondary mb-0">{!! trans('index.Contacto') !!}</h3>
                    <h2 class="mb-5 mb-5 mb-lg-0">{!! trans('index.Contactame') !!}</h2>
                </div>
                <!-- Icon Divider-->

                <!-- Contact Section Form-->
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <!--novalidate="novalidate"-->
                        <form id="contactForm" name="sentMessage" method="post" action="{{route('messages.send')}}" >
                            @csrf
                            <div class="control-group">
                                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                                    <label>{!! trans('index.Nombre') !!}</label>
                                    <input value="{{ old('name') }}"  class="form-control {{ $errors->has('name') ? 'is-invalid ' : '' }}" id="name" name="name" required type="text" placeholder="{!! trans('index.Nombre') !!}" required="required" />
                                    @if ($errors->has('name'))
                                        <div class="invalid-feedback">
                                            {{ $errors->first('name') }}
                                        </div>
                                    @endif
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                                    <label>{!! trans('index.Email') !!}</label>
                                    <input value="{{ old('email') }}"  class="form-control {{ $errors->has('email') ? 'is-invalid ' : ' ' }}" id="email" name="email" type="email" placeholder="{!! trans('index.Email') !!}" required="required"  />
                                    @if ($errors->has('email'))
                                        <div class="invalid-feedback">
                                            {{ $errors->first('email') }}
                                        </div>
                                    @endif
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                                    <label>{!! trans('index.Número telefónico') !!}</label>
                                    <input value="{{ old('phone') }}"  class="form-control {{ $errors->has('phone') ? 'is-invalid' : '' }}" id="phone" name="phone" type="tel" placeholder="{!! trans('index.Número telefónico') !!}" required="required" />
                                    <!--<p class="help-block text-danger"></p>-->
                                    @if ($errors->has('phone'))
                                        <div class="invalid-feedback">
                                            {{ $errors->first('phone') }}
                                        </div>
                                    @endif
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                                    <label>{!! trans('index.Mensaje') !!}</label>
                                    <textarea class="form-control {{ $errors->has('message') ? 'is-invalid' : '' }}" name="message" id="message" rows="5" placeholder="{!! trans('index.Mensaje') !!}" required="required">{{ old('message') }}</textarea>
                                    @if ($errors->has('message'))
                                        <div class="invalid-feedback">
                                            {{ $errors->first('message') }}
                                        </div>
                                    @endif
                                </div>
                            </div>
                            <br />
                            <div id="success"></div>
                                <div class="form-group d-flex justify-content-center  ">
                                    <button class="btn btn-outline-primary btn-lg" id="sendMessageButton" type="submit">{!! trans('index.Enviar') !!}  <i class="far fa-paper-plane"></i></button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>

@endsection
