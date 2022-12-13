<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioCategory;
use Illuminate\Http\Request;

class PortfolioCategoriesController extends Controller
{
    public function index($id){
        try{
            $items = PortfolioCategory::all();
            //$items = PortfolioCategory::where('user_id', $id)->get();
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
            $item = PortfolioCategory::find($id);
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
            $item = PortfolioCategory::find($id);
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
            $params = $request->all();
            $item = PortfolioCategory::create($params);
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
            PortfolioCategory::destroy(json_decode($request->ids));
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
