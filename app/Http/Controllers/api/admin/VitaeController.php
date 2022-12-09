<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Models\HistoryCurriculumVitae;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VitaeController extends Controller
{
    public function index($id){
        try{
            //$items = HistoryCurriculumVitae::where('user_id', $id)->get();
            $user = User::find($id);
            $items= HistoryCurriculumVitae::orderBy('id', 'DESC')->get();
            $items = $items->map(function ($item) use($user){
                if($item->id === $user->cv){
                    $item->selected = true;
                }else{
                    $item->selected = false;
                }
                return $item;
            } );
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
            $item = HistoryCurriculumVitae::find($id);
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
            $item = HistoryCurriculumVitae::find($id);
            $params = $request->all();
            $params['path'] = $this->uploadImage($request->path, $request->file('path'), $item->path);
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
            $params['path'] = $this->uploadImage($request->path, $request->file('path'));
            $item = HistoryCurriculumVitae::create($params);
            $user = User::find($params['user_id'])->update([
                'cv' =>$item->id
            ]);
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
            HistoryCurriculumVitae::destroy(json_decode($request->ids));
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

    public function selected($id, Request $request){
        try {
            $user = User::find($request->user_id);
            $item = HistoryCurriculumVitae::find($id);
            $user->update([
                'cv' =>$id
            ]);
            return response()->json([
                'message'=>'Se ha actualizado correctamente',
                'code'=>201,
                'data'=>$item,
                'response'=>'success'
            ]);
        }
        catch (\Exception $e){
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
