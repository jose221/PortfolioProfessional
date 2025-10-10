@php
use App\Helpers\ArrayHelper
@endphp

<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <script>
        window.token = @json(session('auth-token'));
        window.url_api = @json(config('services.api.url') . '/api');
        window.url_image = @json(config('services.storage.url'));
    </script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>

    <!-- Scripts -->
    <!-- Styles -->
    <!--<link href="{{ asset('css/app.css') }}" rel="stylesheet">-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    <!--CSS admin-->
    <link rel="stylesheet" href="{{asset('css/admin.css')}}" >
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
    <link href="{{ asset('css/stylish-auth.css') }}" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js" integrity="sha384-eMNCOe7tC1doHpGoWe/6oMVemdAVTMs2xqW4mwXrXsW0L84Iytr2wi5v2QjrP/xp" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.min.js" integrity="sha384-cn7l7gDp0eyniUwwAZgrzD06kc/tftFf19TOAs2zVinnD/C7E91j9yyk5//jjpt/" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <!--trix editor-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.min.css" integrity="sha512-5m1IeUDKtuFGvfgz32VVD0Jd/ySGX7xdLxhqemTmThxHdgqlgPdupWoSN8ThtUSLpAGBvA8DY2oO7jJCrGdxoA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.min.js" integrity="sha512-2RLMQRNr+D47nbLnsbEqtEmgKy67OSCpWJjJM394czt99xj3jJJJBQ43K7lJpfYAYtvekeyzqfZTx2mqoDh7vg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="{{ asset('js/admin-portafolio.js') }}" defer></script>
    <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
    <!-- CSS Pagination for CV Editor -->
    <link href="{{ asset('css/pagination.css') }}" rel="stylesheet">
<body>

<div class="page-wrapper chiller-theme theme-blue">
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
                        <!--<img class="img-responsive img-rounded" src="{{Auth::user()->my_perfil}}"
                             alt="User picture">-->
                    </div>
                    <div class="user-info">
          <span class="user-name">
            <strong>{{ Auth::user()->name }}</strong>
          </span>
                        @if(session()->has('user')
    && session('user')->Role
    && isset(session('user')->Role->name_es)
)
                        <span class="user-role">{{ session()->get('user')->Role->name_es }}</span>
                        <span class="user-status">
            <!--<i class="fa fa-circle"></i>
            <span>Online</span>-->
          </span>
                        @endif
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
                        @if(!empty(session()->get('user')))
                            @foreach (ArrayHelper::groupBy(ArrayHelper::filter(session()->get('user')->modules, function ($module){
                                    return !empty($module->path) && $module->Permissions[0]->is_page && $module->Permissions[0]->can_read;
                                }), 'tag') as $tag => $modules)
                                <li class="header-menu">
                                    <span>{{ $tag }}</span>
                                </li>
                                @foreach($modules as $module)
                                    <li class="">
                                        <a href="{{ $module->path }}">
                                            <i class="fa fa-chart-line"></i>
                                            <span>{{ $module->name_es }}</span>
                                        </a>
                                    </li>
                                @endforeach
                            @endforeach
                        @endif
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
<script src="{{ asset('js/app.js') }}" ></script>
</body>

</html>
