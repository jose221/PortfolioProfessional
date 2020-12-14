<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>José Ángel</title>
    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <!-- Custom Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script>
    <!-- Custom CSS -->
    <link href="css/stylish-portfolio.css" rel="stylesheet">
    <link href="css/my-portafolio.css" rel="stylesheet">

    <title>Portafolio - @yield('title')</title>
</head>
<body id="page-top">
<!-- Navigation -->
<a class="menu-toggle rounded" href="#">
    <i class="fas fa-bars"></i>
</a>
<a class="menu-toggle-language rounded" href="{{route('index.language',(App()->getLocale() === 'es')?'en':'es')}}">
    <i class="fas "><img width="60%" src="{{asset("img/".App()->getLocale().".png")}}"></i>
</a>
<nav id="sidebar-wrapper">
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
</nav>
<div>
<!--Content-->
    @yield('content')
</div>
<!-- Footer -->
<footer class="footer text-center">
    <div class="container">
        <ul class="list-inline mb-5">
            @foreach($myPortafolio['myContacts'] as $contact)
                <li class="list-inline-item">
                    <a style="line-height: 3.9rem !important;" class="social-link rounded-circle text-white mr-3" href="{{$contact['url_path']}}">
                        <img class="css" src="{{$contact['icon_path']}}" width="20rem;">
                    </a>
                </li>
            @endforeach
        </ul>
        <p class="text-muted small mb-0">Copyright &copy; Your Website 2020</p>
    </div>
</footer>
<!-- Scroll to Top Button-->
<a class="scroll-to-top rounded js-scroll-trigger" href="#page-top">
    <i class="fas fa-angle-up"></i>
</a>
<!-- Bootstrap core JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
<!-- Custom scripts for this template -->
<script src="js/stylish-portfolio.js"></script>
</body>
</html>
