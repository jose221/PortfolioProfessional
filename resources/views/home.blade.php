@extends('admin.app')
@section('title', 'administrador')
@section('content')

    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>¡Exitoso! </strong> {{session('success')}}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    @endif
    @if(session('error'))
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>¡Error! </strong> {{session('error')}}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    @endif

    <div class="container">
        <h3 class="pb-4 title-text mt-2">Mi información personal</h3>
        <form-component data-id="{{auth()->id()}}"></form-component>
        <!--<div class="alert alert-secondary" role="alert">
            Ultima actualización {{$user->updated_at}}
        </div>-->
        <!--
        <form class="row" method="POST" action="{{ route('user.update') }}" enctype="multipart/form-data">
            @csrf
            <div class="form-group col-md-6">
                <label for="name">Nombre completo</label>
                <input type="text" class="form-control" id="name" name="name" value="{{$user->name}}" aria-describedby="name-help">
                <small id="name-help" class="form-text text-muted">Nombre completo del administrador</small>
            </div>
            <div class="form-group col-md-2">
                <label for="age">Edad</label>
                <input type="number" class="form-control" id="age" name="age" value="{{$user->age}}" aria-describedby="age-help">
                <small id="age-help" class="form-text text-muted">Edad del administrador</small>
            </div>
            <div class="form-group col-md-4">
                <label for="date_birthday">Fecha de cumpleaños</label>
                <input type="date" class="form-control" id="date_birthday" name="date_birthday" value="{{$user->date_birthday}}" aria-describedby="date_birthday-help">
                <small id="date_birthday-help" class="form-text text-muted">Edad del administrador</small>
            </div>
            <div class="form-group col-md-6">
                <label for="nationality_es">Nacionalidad en español</label>
                <input type="text" class="form-control" id="nationality_es" name="nationality_es" value="{{$user->nationality_es}}" aria-describedby="nationality_es-help">
                <small id="nationality_es-help" class="form-text text-muted">Nacionalidad del administrador en español</small>
            </div>
            <div class="form-group col-md-6">
                <label for="nationality_en">Nacionalidad en inglés</label>
                <input type="text" class="form-control" id="nationality_en" value="{{$user->nationality_en}}" name="nationality_en" aria-describedby="nationality_en-help">
                <small id="nationality_en-help" class="form-text text-muted">Nacionalidad del administrador en inglés</small>
            </div>
            <div class="form-group col-md-6">
                <label for="country_es">Ciudad donde vives en español</label>
                <input type="text" class="form-control" id="country_es" value="{{$user->country_es}}" name="country_es" aria-describedby="country_es-help">
                <small id="country_es-help" class="form-text text-muted">Ciudad donde vives actualmente en español</small>
            </div>
            <div class="form-group col-md-6">
                <label for="country_en">Ciudad donde vives en inglés</label>
                <input type="text" class="form-control" id="country_en" value="{{$user->country_en}}" name="country_en" aria-describedby="country_en-help">
                <small id="country_en-help" class="form-text text-muted">Ciudad donde vives actualmente en inglés</small>
            </div>
            <div class="form-group col-md-6">
                <label for="description_es">Descripción en español</label>
                <textarea type="text" class="form-control" id="description_es" name="description_es" aria-describedby="description_es-help" rows="5">{{$user->description_es}}</textarea>
                <small id="description_es-help" class="form-text text-muted">Descripción de tu perfil en español</small>
            </div>
            <div class="form-group col-md-6">
                <label for="description_en">Descripción en inglés</label>
                <textarea type="text" class="form-control" id="description_en" name="description_en" aria-describedby="description_en-help" rows="5">{{$user->description_en}}</textarea>
                <small id="description_en-help" class="form-text text-muted">Descripción de tu perfil en inglés</small>
            </div>
            <div class="form-group col-md-6">
                <label for="email">Correo electrónico</label>
                <input type="email" class="form-control" id="email" value="{{$user->email}}" name="email" aria-describedby="email-help">
                <small id="email-help" class="form-text text-muted">Correo electrónico(Recuerda que tambien es el correo de contacto)</small>
            </div>
            <div class="form-group col-md-6">
                <label for="password">Contraseña</label>
                <input type="password" class="form-control" id="password" value="{{$user->password}}" name="password" aria-describedby="password-help">
                <small id="password-help" class="form-text text-muted">Contraseña</small>
            </div>
            <div class="form-group col-md-6">
                <label for="header_text_es">Texto o descripción del header en Español</label>
                <textarea type="text" class="form-control" id="header_text_es" name="header_text_es" aria-describedby="header_text_es-help" rows="5">{{$user->header_text_es}}</textarea>
                <small id="header_text_es-help" class="form-text text-muted">Texto o descripción del header en Español</small>
            </div>
            <div class="form-group col-md-6">
                <label for="header_text_en">Texto o descripción del header en Inglés</label>
                <textarea type="text" class="form-control" id="header_text_en" name="header_text_en" aria-describedby="header_text_en-help" rows="5">{{$user->header_text_en}}</textarea>
                <small id="header_text_en-help" class="form-text text-muted">Texto o descripción del header en Inglés</small>
            </div>
            <hr>
            <div class=" col-md-6">
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="{{$user->logo}}" class="rounded float-left img-thumbnail" alt="test">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <div class="form-group">
                                    <h4 for="logo">Imagen del logo</h4>
                                    <input type="file" class="form-control-file" id="logo" name="logo">
                                    <small id="logo-help" class="form-text text-muted">Imagen o logo que se mostrará en la nevegación</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" col-md-6">
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="{{$user->avatar}}" class="rounded float-left img-thumbnail" alt="test">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <div class="form-group">
                                    <h4 for="avatar">Imagen del avatar</h4>
                                    <input type="file" class="form-control-file" id="avatar" name="avatar">
                                    <small id="avatar-help" class="form-text text-muted">Avatar que se mostrará</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" col-md-6">
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="{{$user->slogan_en}}" class="rounded float-left img-thumbnail" alt="test">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <div class="form-group">
                                    <h4 for="slogan_en">Imagen del logo con Eslogan en Inglés</h4>
                                    <input type="file" class="form-control-file" id="slogan_en" name="slogan_en">
                                    <small id="slogan_en-help" class="form-text text-muted">Imagen o logo que se mostrará como eslogan en Inglés</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" col-md-6">
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="{{$user->slogan_es}}" class="rounded float-left img-thumbnail" alt="test">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <div class="form-group">
                                    <h4 for="slogan_es">Imagen del logo con Eslogan en Español</h4>
                                    <input type="file" class="form-control-file" id="slogan_es" name="slogan_es">
                                    <small id="slogan_es-help" class="form-text text-muted">Imagen o logo que se mostrará como eslogan en Español</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" col-md-6">
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="{{$user->my_perfil}}" class="rounded float-left img-thumbnail" alt="test">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <div class="form-group">
                                    <h4 for="my_perfil">Foto de Perfil</h4>
                                    <input type="file" class="form-control-file" id="my_perfil" name="my_perfil">
                                    <small id="my_perfil-help" class="form-text text-muted">Foto de perfil que irá junto a la descripción</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" col-md-6">
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="{{$user->header_image_path}}" class="rounded float-left img-thumbnail" alt="test">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <div class="form-group">
                                    <h4 for="header_image_path">Foto de Header</h4>
                                    <input type="file" class="form-control-file" id="header_image_path" name="header_image_path">
                                    <small id="description_en-help" class="form-text text-muted">Foto o imagen se mostrará en el header</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button type="submit" class="btn btn-secondary btn-lg btn-block">Guardar todos los cambios</button>
        </form>
        -->
    </div>

@endsection

