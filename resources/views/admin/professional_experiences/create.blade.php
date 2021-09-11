@extends('admin.app')

@section('title','administrador-experiencia profesional')

@section('content')
    <style>
        .popover-title {
            color: blue !important;
            font-size: 15px;
        }
        .popover-content {
            color: red !important;
            font-size: 10px;
        }
    </style>

    <a href="{{route('experience.professional.view')}}" class="float-right btn btn-outline-success">Ver todo</a>
    <h2>Nueva experiencia Profesional</h2>
    <hr>
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
    <form class="row" action="{{route('experience.professional.store')}}" method="post" enctype="multipart/form-data">
        @csrf
        <div class=" col-md-6">
            <div class="card mb-3">
                <div class="row no-gutters">

                    <div class="col-md-12">
                        <div class="card-body">
                            <div class="form-group">
                                <h4 for="image_path">Foto de la empresa</h4>
                                <input type="file" class="form-control-file" id="image_path" name="image_path">
                                <small id="image_path-help" class="form-text text-muted">Foto o imagen se mostrará de portada</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="company">Nombre de la empresa</label>
                <input type="text" class="form-control" id="company" name="company" aria-describedby="company-help">
                <small id="company-help" class="form-text text-muted">Nombre de la empresa donde trabajasté</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="job_es">Empleo o rol en la Empresa en español</label>
                <input type="text" class="form-control" id="job_es" name="job_es" aria-describedby="job_es-help">
                <small id="job_es-help" class="form-text text-muted">¿Cuál fue tu cargo en la empresa en español?</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="job_en">Empleo o rol en la Empresa en inglés</label>
                <input type="text" class="form-control" id="job_en" name="job_en" aria-describedby="job_en-help">
                <small id="job_en-help" class="form-text text-muted">¿Cuál fue tu cargo en la empresa en inglés?</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="date_start">Fecha de inicio </label>
                <input type="date" class="form-control" id="date_start" name="date_start" aria-describedby="date_start-help">
                <small id="date_start-help" class="form-text text-muted">Fecha de inicio en la empresa</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="date_start">Fecha final </label>
                <input type="date" class="form-control" id="date_end" name="date_end" aria-describedby="date_end-help">
                <small id="date_end-help" class="form-text text-muted">Fecha de final en la empresa</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="country_es">País donde proviene la empresa en español</label>
                <input type="text" class="form-control" id="country_es" name="country_es" aria-describedby="country_es-help">
                <small id="country_es-help" class="form-text text-muted">¿de dónde es la empresa donde trabajasté?</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="country_en">País donde proviene la empresa en inglés</label>
                <input type="text" class="form-control" id="country_en" name="country_en" aria-describedby="country_en-help">
                <small id="country_en-help" class="form-text text-muted">¿de dónde es la empresa donde trabajasté?</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="description_es">Descripción de tu rol en la empresa en español</label>
                <input type="hidden" class="form-control" id="description_es" name="description_es" aria-describedby="description_es-help">
                <trix-editor input="description_es"></trix-editor>
                <small id="description_es-help" class="form-text text-muted">¿Qué hiciste en la empresa, con que trabajaste, describelo(Puedes utilizar codigo html) en español</small>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="description_en">Descripción de tu rol en la empresa en Inglés</label>
                <input type="hidden" class="form-control" id="description_en" name="description_en" aria-describedby="description_en-help">
                <trix-editor input="description_en"></trix-editor>
                <small id="description_en-help" class="form-text text-muted">¿Qué hiciste en la empresa, con que trabajaste, describelo(Puedes utilizar codigo html) en inglés</small>
            </div>
        </div>
        <div class="col-md-12 mb-3">
            <div class="form-group">
                <label for="description_en">Descripción de tu rol en la empresa en español</label>
                <select class="js-example-basic-multiple-limit form-control" id="portfolio" name="portfolio[]" multiple></select>
            </div>
        </div>
        <button type="submit" class="btn btn-secondary btn-lg btn-block">Guardar </button>
        <!--<a tabindex="0" class="btn btn-lg btn-danger popover-dismiss" role="button" data-bs-toggle="popover"
           data-bs-trigger="focus" title="Dismissible popover" data-bs-content="w<div class='progress'> <div class='progress-bar bg-success' role='progressbar' style='width: 55%' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div> </div>">Dismissible popover</a>-->
    </form>
    <div class='progress'> <div class='progress-bar bg-success' role='progressbar' style='width: 55%' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div> </div>
    <script>
        $('.js-example-basic-multiple-limit').select2({
            ajax: {
                url: '/api/list/portfolios',
                data: function (params) {
                    var query = {
                        search: params.term,
                        type: 'query'
                    }
                    // Query parameters will be ?search=[term]&type=public
                    return query;
                },
                processResults: function (data) {
                    console.log(data)
                    return {
                        results: data
                    };
                },
            },
            templateResult: formatState,
            placeholder: 'Selecciona una opción',
        });
        function formatState (state) {
            if (!state.id) {
                return state.text;
            }
            var baseUrl = state.url_img;
            var $state = $(
                '<span><img width="40" src="' + baseUrl + '" class="img-flag" /> ' + state.text + '</span>'
            );
            return $state;
        };
        /**var popover = new bootstrap.Popover(document.querySelector('.popover-dismiss'), {
            trigger: 'focus hover',
            html:true,
            customClass:"popover-style"
        })**/
    </script>
@endsection

