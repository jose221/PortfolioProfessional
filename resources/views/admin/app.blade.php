<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <!--CSS admin-->
    <link rel="stylesheet" href="{{asset('css/admin.css')}}" >
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
    <link href="{{ asset('css/stylish-auth.css') }}" rel="stylesheet">
<body>
<div class="page-wrapper chiller-theme toggled">
    @guest
        <main>
            @yield('content')
        </main>
    @else
        <a id="show-sidebar" class="btn btn-sm btn-dark" href="#">
            <i class="fas fa-bars"></i>
        </a>
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <div class="sidebar-brand">
                    <a href="#">Mi portafolio</a>
                    <div id="close-sidebar">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <div class="sidebar-header">
                    <div class="user-pic">
                        <img class="img-responsive img-rounded" src="{{Auth::user()->my_perfil}}"
                             alt="User picture">
                    </div>
                    <div class="user-info">
          <span class="user-name">
            <strong>{{ Auth::user()->name }}</strong>
          </span>
                        <span class="user-role">Administrator</span>
                        <span class="user-status">
            <i class="fa fa-circle"></i>
            <span>Online</span>
          </span>
                    </div>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-search">
                    <div>
                        <div class="input-group">
                            <input type="text" class="form-control search-menu" placeholder="Search...">
                            <div class="input-group-append">
              <span class="input-group-text">
                <i class="fa fa-search" aria-hidden="true"></i>
              </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- sidebar-search  -->
                <div class="sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>General</span>
                        </li>
                        <li class="">
                            <a href="{{route('home')}}">
                                <i class="fa fa-tachometer-alt"></i>
                                <span>Mi información</span>
                                <!--<span class="badge badge-pill badge-warning">New</span>-->
                            </a>
                            <!--<div class="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a href="#">Dashboard 1
                                            <span class="badge badge-pill badge-success">Pro</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Dashboard 2</a>
                                    </li>
                                    <li>
                                        <a href="#">Dashboard 3</a>
                                    </li>
                                </ul>
                            </div>-->
                        </li>
                        <li class="">
                            <a href="{{route('contacts.view')}}">
                                <i class="fa fa-chart-line"></i>
                                <span>Mis contactos</span>
                            </a>
                        </li>
                        <li class="">
                            <a href="{{route('studies.view')}}">
                                <i class="fa fa-globe"></i>
                                <span>Mis estudios</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{route('knowledges.view')}}">
                                <i class="fa fa-book"></i>
                                <span>Mis conocimientos</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{route('project.personal.view')}}">
                                <i class="fa fa-book"></i>
                                <span>Mis proyectos personales</span>
                            </a>
                        </li>
                        <li>
                            <a href="{{route('experience.professional.view')}}">
                                <i class="fa fa-book"></i>
                                <span>Mi experiencia profesional</span>
                            </a>
                        </li>
                    <!--
                    <li class="">
                        <a href="{{'contacts.view'}}">
                            <i class="fa fa-chart-line"></i>
                            <span>Charts</span>
                        </a>
                        <div class="sidebar-submenu">
                            <ul>
                                <li>
                                    <a href="#">Pie chart</a>
                                </li>
                                <li>
                                    <a href="#">Line chart</a>
                                </li>
                                <li>
                                    <a href="#">Bar chart</a>
                                </li>
                                <li>
                                    <a href="#">Histogram</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    -->
                        <li class="header-menu">
                            <span>Extra</span>
                        </li>
                        <li>
                            <a href="/">
                                <i class="fa fa-book"></i>
                                <span>pagina principal</span>
                                <span class="badge badge-pill badge-primary">Beta</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>
            <!-- sidebar-content  -->
            <div class="sidebar-footer">
                <a href="#">
                    <i class="fa fa-bell"></i>
                    <!--<span class="badge badge-pill badge-warning notification">3</span>-->
                </a>
                <a href="{{route('messages.view')}}">
                    <i class="fa fa-envelope"></i>
                    <span class="badge badge-pill badge-success notification">{{\App\Models\Message::where('viewed',0)->count()}}</span>
                </a>
                <a href="#">
                    <i class="fa fa-cog"></i>
                    <!--<span class="badge-sonar"></span>-->
                </a>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                    @csrf
                </form>
                <a href="{{ route('logout') }}"
                   onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                    <i class="fa fa-power-off"></i>
                </a>
            </div>
        </nav>
        <main class="page-content">
            <div class="container-fluid">
                @yield('content')
            </div>
        </main>
    @endguest
</div>
<!-- page-wrapper -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="{{asset('js/admin-portafolio.js')}}"></script>


</body>

</html>
