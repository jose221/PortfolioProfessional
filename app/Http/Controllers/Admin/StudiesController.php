<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Study;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudiesController extends Controller
{
    public function index(){
        $studies = Study::where('user_id',Auth::id())->get();
        return view('admin.studies.view',compact('studies'));
    }

    public function edit($id){
        try {
            $study = Study::find($id);
            return view('admin.studies.edit',compact('study'));
        }catch (\Exception $e){
            return redirect()->route('studies.edit',$id)->with('error',$e->getMessage());
        }
    }
    public function create(){
        try {
            return view('admin.studies.create');
        }catch (\Exception $e){
            return redirect()->route('studies.create')->with('error',$e->getMessage());
        }
    }
    public function store(Request $request){
        try {
            $studies = Study::create([
                'caerrer_es'=>$request->caerrer_es,
                'caerrer_en'=>$request->caerrer_en,
                'school_es'=>$request->school_es,
                'school_en'=>$request->school_en,
                'folio'=>$request->folio,
                'user_id'=>Auth::id()
            ]);
            if($studies){
                return redirect()->route('studies.view')->with('success','estudio guardado con exito');
            }
            else{
                return redirect()->route('studies.create')->with('error','No se pudó guardar');
            }

        }catch (\Exception $e){
            return redirect()->route('studies.view')->with('error',$e->getMessage());
        }
    }

    public function update(Request $request,$id){
        try {
            if(Study::where('id',$id)->update(
                [
                    'caerrer_es'=>$request->caerrer_es,
                    'caerrer_en'=>$request->caerrer_en,
                    'school_es'=>$request->school_es,
                    'school_en'=>$request->school_en,
                    'folio'=>$request->folio,
                    'user_id'=>Auth::id()
                ]
            )){
                return redirect()->route('studies.view')->with('success','Se ha actualizado correctamente');
            }
            else{
                return redirect()->route('studies.edit',$id)->with('error','No se pudó eliminar intentelo más tarde');
            }
        }catch (\Exception $e){
            return redirect()->route('studies.edit',$id)->with('error',$e->getMessage());

        }
    }
    public function destroy($id){
        try{
            if (Study::destroy($id)) {
                return redirect()->route('studies.view')->with('success','Se ha eliminado con exito');
            }
            else{
                return redirect()->route('studies.view')->with('error','No se pudó eliminar');
            }
        }catch (\Exception $e){
            return redirect()->route('studies.view')->with('error',$e->getMessage());
        }
    }
}
