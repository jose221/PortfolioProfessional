<?php

namespace App\Http\Controllers\api\admin;

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
}
