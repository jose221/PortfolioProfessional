<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Cross-Platform Application Developer">
    <meta name="author" content="José Ángel Alvarado Gonzalez">
    <meta property="og:title" content="José Ángel Alvarado Gonzalez">
    <meta property="og:image:url" content="{{asset('img/logo.png')}}">
    <meta property="og:image:secure_url" content="{{asset('img/logo.png')}}">
    <meta property="og:image:width" content="2500">
    <meta property="og:image:height" content="1330">
    <meta property="og:url" content="https://jose.alvarado.herandro.com.mx/">
    <meta property="og:site_name" content="José Ángel">
    <meta property="og:type" content="website">
    <link rel="shortcut icon" href="{{asset('img/logo.svg')}}" />
    <title>José Ángel</title>
    <!-- Scripts -->
    <!--<script src="{{ asset('js/app.js') }}" defer></script>-->
    <!-- Styles -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet"  integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous" lazyload>
    <!--<link href="{{ asset('css/app.css') }}" rel="stylesheet">-->

    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>z
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;1,200;1,700&display=swap" rel="preload">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous" lazyload>
    <!-- Custom CSS -->
    <link href="css/stylish-portfolio.css" rel="stylesheet" lazyload>
    <link type="text/css" href="{{ mix('/css/my-portafolio.css') }}" rel="stylesheet" lazyload>
    <link type="text/css" href="{{ mix('/css/appIndex.css') }}" rel="stylesheet" lazyload>
    <!--<link href="css/my-portafolio.css" rel="stylesheet">-->

    <title> @yield('title')</title>
</head>
<body id="page-top" data-bs-spy="scroll" data-bs-target="#navbar-example">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10" ></script>
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill" ></script>
<!-- Navigation -->
<!--<a class="menu-toggle rounded" href="#">
    <i class="fas fa-bars"></i>
</a>-->
<!--<nav id="sidebar-wrapper">
    <ul class="sidebar-nav" >
        <li class="sidebar-brand">
            <a class="js-scroll-trigger" href="#page-top">{!! trans('index.Mi Portafolio') !!}</a>
        </li>
        <li class="sidebar-nav-item">
            <a class="js-scroll-trigger" href="#page-top"> <i class="fas fa-home"></i> {!! trans('index.Inicio') !!}</a>
        </li>
        <li class="sidebar-nav-item">
            <a class="js-scroll-trigger" href="#acerca"><i class="fas fa-user"></i>  {!! trans('index.Acerca de') !!}</a>
        </li>
        <li class="sidebar-nav-item">
            <a class="js-scroll-trigger" href="#conocimientos"><i class="fab fa-centercode"></i> {!! trans('index.Mis conocimientos') !!}</a>
        </li>
        <li class="sidebar-nav-item">
            <a class="js-scroll-trigger" href="#experiencia-profesional"><i class="fas fa-certificate"></i> {!! trans('index.Mi experiencia profesional') !!}</a>
        </li>
        @if(count($myPortafolio['personal_projects']))
            <li class="sidebar-nav-item">
                <a class="js-scroll-trigger" href="#experiencia-personal"><i class="fas fa-tasks"></i> {!! trans('index.Mi proyectos personales') !!}</a>
            </li>
        @endif
        <li class="sidebar-nav-item">
            <a class="js-scroll-trigger" href="#contacto"><i class="fas fa-phone-alt"></i> {!! trans('index.Contacto') !!}</a>
        </li>
    </ul>
</nav>-->
<div class="container fixed-top" id="navbar-example">
    <nav class="navbar shadow navbar-expand-lg navbar-light bg-white">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img width="45" height="40" src="{{asset($myPortafolio['myPerfil']['logo'])}}"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse bg-white " id="navbarText">
                <ul class="navbar-nav me-auto"  data-bs-spy="scroll">
                </ul>

                <ul class="navbar-nav" data-bs-spy="scroll">
                    <li class="nav-item">
                        <a class="nav-link" href="#home-section"><span class="nav-text">{!! trans('index.Inicio') !!}</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#about-section">  <span class="nav-text">{!! trans('index.Acerca de') !!}</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#knowledges-section"> <span class="nav-text">{!! trans('index.Mis conocimientos') !!}</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#abilities-section"> <span class="nav-text">{!! trans('index.mis habilidades') !!}</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#professional-experience-section"><span class="nav-text"> {!! trans('index.Mi experiencia profesional') !!}</span></a>
                    </li>
                    @if(count($myPortafolio['personal_projects']))
                        <li class="nav-item">
                            <a class="nav-link" href="#experiencia-personal"><span class="nav-text"> {!! trans('index.Mi proyectos personales') !!}</span></a>
                        </li>
                    @endif
                    <li class="nav-item">
                        <a class="nav-link" href="#contact-section"> <span class="nav-text">{!! trans('index.Contacto') !!}</span></a>
                    </li>
                </ul>
            </div>
            <a class="menu-toggle-language rounded" href="{{route('index.language',(App()->getLocale() === 'es')?'en':'es')}}">
                <i class="fas "><img src="{{asset("img/".App()->getLocale().".webp")}}"></i>
            </a>
        </div>
    </nav>
</div>
<div data-spy="scroll" data-target=".bs-docs-sidebar">
<!--Content-->
    @yield('content')
</div>
<!-- Footer -->
<footer class="footer text-center" id="footer-info">
    <div class="container">
        <img width="90" class="img-circle text-center mb-5" src="{{asset($myPortafolio['myPerfil']['slogan'])}}" alt="Card image cap" loading="lazy">
        <div class="mb-3" loading="lazy">
            @foreach($myPortafolio['myContacts'] as $contact)
                <a class="btn btn-contact" href="{{$contact['url_path']}}" target="_blank">
                    <i class=" {{$contact['icon_path']}} text-center"></i>
                </a>
            @endforeach
        </div>

        <p class="text-muted small mb-0">Copyright &copy; José Angel 2020</p>
    </div>
</footer>
<!-- Scroll to Top Button-->
<a class="scroll-to-top rounded js-scroll-trigger" href="#page-top">
    <i class="fas fa-angle-up"></i>
</a>
<!-- Bootstrap core JavaScript -->
<!-- Custom scripts for this template -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<!-- Custom Fonts -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.min.js" integrity="sha384-cn7l7gDp0eyniUwwAZgrzD06kc/tftFf19TOAs2zVinnD/C7E91j9yyk5//jjpt/" crossorigin="anonymous"></script>
<script src="js/stylish-portfolio.js"></script>
<script>
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbar-example'
    })
    $(function (){
        $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                $('.navbar').addClass("shadow");
            } else {
                $(".navbar").removeClass("shadow");
            }
        });
    });
</script>
</body>
</html>
