<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\MyContact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MyContactsController extends Controller
{
    public function index($id){
        try{
            $items = MyContact::where('user_id', $id)->get();
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
    public function edit($id, Request $request){
        try {
            $item = MyContact::find($id);
            $params = $request->all();
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
            $item = MyContact::create($request->all());
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
            MyContact::destroy(json_decode($request->ids));
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
}
