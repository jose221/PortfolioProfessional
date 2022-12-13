<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Testing\Fluent\Concerns\Has;

class UserController extends Controller
{
    public function index(){
        $items = User::all();
        return response()->json([
            'message'=>'Datos encontrados',
            'code'=>200,
            'data'=>$items,
            'response'=>'success'
        ]);
    }
    public function find($id){
        $items = User::find($id);
        return response()->json([
            'message'=>'Datos encontrados',
            'code'=>200,
            'data'=>$items,
            'response'=>'success'
        ]);
    }
    public function update($id, Request $request)
    {
        $user = User::find($id);
        //$password_update = ($request->password == $user->password)?  $user->password : Hash::make($request->password);
        $header_image_path_update = $user->header_image_path;
        $my_perfil_update = $user->my_perfil;
        $slogan_es = $user->slogan_es;
        $slogan_en = $user->slogan_en;
        $logo = $user->logo;
        $avatar = $user->avatar;
        $params = [
            'name'=>$request->name,
            'age'=>$request->age,
            'date_birthday'=>$request->date_birthday,
            'nationality_es'=>$request->nationality_es,
            'nationality_en'=>$request->nationality_en,
            'description_en'=>$request->description_en,
            'description_es'=>$request->description_es,
            'email'=>$request->email,
            //'password'=>$password_update,
            'country_es'=>$request->country_es,
            'country_en'=>$request->country_en,
            'header_text_en'=>$request->header_text_en,
            'header_text_es'=>$request->header_text_es,
        ];
        //agregar foto para el header de la pagina
        if(isset($request->header_image_path)&&!empty($request->header_image_path)){
            if( $user->header_image_path != $request->header_image_path)
            {
                if(!empty($user->header_image_path)) {
                    $path = explode("/", $user->header_image_path);
                    Storage::delete("public/{$path[2]}");
                }
                $image = $request->file('header_image_path')->store('public');
                $params['header_image_path'] = Storage::url($image);
            }
        }
        //Agregar una foto de perfil
        if(isset($request->my_perfil)&&!empty($request->my_perfil)){
            if( $user->my_perfil != $request->my_perfil){
                if(!empty($user->my_perfil)) {
                    $path = explode("/", $user->my_perfil);
                    Storage::delete("public/{$path[2]}");
                }
                $image = $request->file('my_perfil')->store('public');
                $params['my_perfil'] = Storage::url($image);
            }
        }
        //Agregar una foto de eslogan en
        if(isset($request->slogan_en)&&!empty($request->slogan_en)){
            if($user->slogan_en != $request->slogan_en){
                if(!empty($user->slogan_en)) {
                    $path = explode("/", $user->slogan_en);
                    Storage::delete("public/{$path[2]}");
                }
                $image = $request->file('slogan_en')->store('public');
                $params['slogan_en'] = Storage::url($image);
            }
        }
        //Agregar una foto de eslogan es
        if(isset($request->slogan_es)&&!empty($request->slogan_es)){
            if($user->slogan_es != $request->slogan_es)
            {
                if(!empty($user->slogan_es)) {
                    $path = explode("/", $user->slogan_es);
                    Storage::delete("public/{$path[2]}");
                }
                $image = $request->file('slogan_es')->store('public');
                $params['slogan_es'] = Storage::url($image);
            }
        }
        //Agregar una foto de logo
        if(isset($request->logo)&&!empty($request->logo)){
            if($user->logo != $request->logo)
            {
                if(!empty($user->logo)) {
                    $path = explode("/", $user->logo);
                    Storage::delete("public/{$path[2]}");
                }


                $image = $request->file('logo')->store('public');
                $params['logo'] = Storage::url($image);
            }
        }
        //Agregar una foto del avatar
        if(isset($request->avatar)&&!empty($request->avatar)){
            if(($user->avatar != $request->avatar))
            {
               if(!empty($user->avatar)){
                   $path = explode("/", $user->avatar);
                   Storage::delete("public/{$path[2]}");
                }

                $image = $request->file('avatar')->store('public');
                $params['avatar'] = Storage::url($image);
            }
        }
//'slogan_en','slogan_es','logo'

        if(User::where('id',$request->id)->update($params)){
            return response()->json([
                'message'=>'Se ha actualizado correctamente',
                'code'=>201,
                'response'=>'success'
            ]);;
        }
        else{
            return response()->json([
                'message'=>'No se ha podido actualizar correctamente',
                'code'=>500,
                'response'=>'error',
                'params' => $params
            ]);
        }
    }
}
