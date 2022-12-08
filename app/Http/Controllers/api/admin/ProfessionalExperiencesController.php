<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Models\professionalExperience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfessionalExperiencesController extends Controller
{
    public function index($id){
        try{
            $items = professionalExperience::where('user_id', $id)->get();
            return response()->json([
                'message'=>'Datos encontrados',
                'code'=>200,
                'data'=>$items,
                'response'=>'success'
            ]);
        }catch (\Exception $e){
            return response()->json([
                'message'=>'No se ha podido actualizar correctamente',
                'error'=>$e->getMessage(),
                'data'=>[],
                'code'=>500,
                'response'=>'error'
            ]);
        }
    }
    public function find($id){
        try {
            $item = professionalExperience::find($id);
            return response()->json([
                'message'=>'Datos encontrados',
                'code'=>200,
                'data'=>$item,
                'response'=>'success'
            ]);
        }catch (\Exception $e){
            return response()->json([
                'message'=>'No se ha podido actualizar correctamente',
                'error'=>$e->getMessage(),
                'data'=>[],
                'code'=>500,
                'response'=>'error'
            ]);
        }
    }
    public function edit($id, Request $request){
        try {
            $item = professionalExperience::find($id);
            $params = $request->all();
            $params['image_path'] = $this->uploadImage($request->image_path, $request->file('image_path'), $item->image_path);
            $item->update($params);
            return response()->json([
                'message'=>'Se ha actualizado correctamente',
                'code'=>200,
                'data'=>$item,
                'response'=>'success'
            ]);
        }catch (\Exception $e){
            return response()->json([
                'message'=>'No se ha podido actualizar correctamente',
                'error'=>$e->getMessage(),
                'data'=>[],
                'code'=>500,
                'response'=>'error'
            ]);
        }
    }

    public function create(Request $request){
        try {
            $params = $request->all();
            $params['image_path'] = $this->uploadImage($request->image_path, $request->file('image_path'));
            $item = professionalExperience::create($params);
            return response()->json([
                'message'=>'Se ha creado correctamente',
                'code'=>200,
                'data'=>$item,
                'response'=>'success'
            ]);
        }catch (\Exception $e){
            return response()->json([
                'message'=>'No se ha podido crear correctamente',
                'error'=>$e->getMessage(),
                'data'=>[],
                'code'=>500,
                'response'=>'error'
            ]);
        }
    }
    public function delete(Request $request){
        try {
            professionalExperience::destroy(json_decode($request->ids));
            return response()->json([
                'message'=>'Se ha actualizado correctamente',
                'code'=>200,
                'data'=>$request->all(),
                'response'=>'success'
            ]);
        }catch (\Exception $e){
            return response()->json([
                'message'=>'No se ha podido actualizar correctamente',
                'error'=>$e->getMessage(),
                'data'=>[],
                'code'=>500,
                'response'=>'error'
            ]);
        }
    }
    private function uploadImage($image, $file="", $model = null){
        if(isset($image)&&!empty($image)){
            if($image != $model)
            {
                if(!empty($model)) {
                    $path = explode("/", $model);
                    Storage::delete("public/{$path[2]}");
                }


                return Storage::url($file->store('public'));
            }
        }
        return $image;
    }
}
