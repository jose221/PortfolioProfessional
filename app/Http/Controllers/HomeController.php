<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user = User::find(Auth::id());
        return view('home',compact('user'));
    }
    public function update( Request $request)
    {
        $user = User::find(Auth::id());
        $password_update = ($request->password !=$user->password)? Hash::make($request->password) : $user->password;
        $header_image_path_update = $user->header_image_path;
        $my_perfil_update = $user->my_perfil;
        //agregar foto para el header de la pagina
        if(isset($request->header_image_path)&&!empty($request->header_image_path)){
            $path = explode("/", $user->header_image_path);
            Storage::delete("public/{$path[2]}");
            $image = $request->file('header_image_path')->store('public');
            $header_image_path_update = Storage::url($image);
        }
        //Agregar una foto de perfil
        if(isset($request->my_perfil)&&!empty($request->my_perfil)){
            $path = explode("/", $user->my_perfil);
            Storage::delete("public/{$path[2]}");
            $image = $request->file('my_perfil')->store('public');
            $my_perfil_update = Storage::url($image);
        }

        if(User::where('id',Auth::id())->update(
            [
                'name'=>$request->name,
                'age'=>$request->age,
                'date_birthday'=>$request->date_birthday,
                'nationality_es'=>$request->nationality_es,
                'nationality_en'=>$request->nationality_en,
                'description_en'=>$request->description_en,
                'description_es'=>$request->description_es,
                'email'=>$request->email,
                'password'=>$password_update,
                'country_es'=>$request->country_es,
                'country_en'=>$request->country_en,
                'header_image_path'=>$header_image_path_update,
                'my_perfil'=>$my_perfil_update
            ]
        )){
            return redirect()->route('home')->with('success','Actualizado correctamente');
        }
        else{
            return redirect()->route('home')->with('error','No se pudó actualizar');
        }
    }
}
