<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Knowledge;
use App\Models\KnowledgeAbility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class KnowLedgesController extends Controller
{
    public function index(){
        try {
            $knowledges = Knowledge::where('user_id',Auth::id())->get();
            return view('admin.knowledges.view',compact('knowledges'));
        }catch (\Exception $e){
            return view('admin.knowledges.view')->with('error',$e->getMessage());
        }
    }
    public function edit($id){
        try{
            $knowledge = Knowledge::find($id);
            return view('admin.knowledges.edit', compact('knowledge'));
        }catch (\Exception $e){
            return view('admin.knowledges.edit')->with('error',$e->getMessage());
        }

    }
    public function show($id){
        try{
            $knowledge = Knowledge::find($id);
            $knowledgeAbilities = KnowledgeAbility::where('knowledges_id',$knowledge->id)->get();

            $data = array(
                'knowledge'=>$knowledge,
                'knowledgeAbilities'=>$knowledgeAbilities
            );
            return view('admin.knowledges.show',compact('data'));
        }catch (\Exception $e){
            return view('admin.knowledges.show')->with('error',$e->getMessage());
        }
    }
    public function create(){
        return view('admin.knowledges.create');
    }
    public function store(Request $request){
        try {
            $icon_path ="";
            //Agregar icono que se verá en la pantalla
            if(isset($request->icon_path)&&!empty($request->icon_path)){
                $image = $request->file('icon_path')->store('public');
                $icon_path = Storage::url($image);
            }
            $knowledge = Knowledge::create([
                'title_es'=>$request->title_es,
                'title_en'=>$request->title_en,
                'icon_path'=>$icon_path,
                'description_es'=>$request->description_es,
                'description_en'=>$request->description_en,
                'user_id'=>Auth::id()
            ]);
            if($knowledge){
                return redirect()->route('knowledges.view')->with('success','Se ha guardado correctamente');
            }else{
                return redirect()->route('knowledges.view')->with('error','No se pudó guardar');
            }
        }catch (\Exception $e){
            return redirect()->route('knowledges.create')->with('error',$e->getMessage());
        }
    }
    public function update(Request $request, $id){
        try {
            $know = Knowledge::find($id);
            $icon_path = $know->icon_path;
            if(isset($request->icon_path)&&!empty($request->icon_path)){
                if(!empty($know->icon_path)){
                    $path = explode("/", $know->icon_path);
                    Storage::delete("public/{$path[2]}");
                }
                $image = $request->file('icon_path')->store('public');
                $icon_path = Storage::url($image);
            }
            $knowledge = Knowledge::where('id',$id)->update([
                'title_es'=>$request->title_es,
                'title_en'=>$request->title_en,
                'icon_path'=>$icon_path,
                'description_es'=>$request->description_es,
                'description_en'=>$request->description_en,
                'user_id'=>Auth::id()
            ]);
            if($knowledge){
                return redirect()->route('knowledges.show',$id)->with('success','Se ha guardado correctamente');
            }else{
                return redirect()->route('knowledges.show',$id)->with('error','No se pudó guardar');
            }
        }catch (\Exception $e){
            return redirect()->route('knowledges.show',$id)->with('error',$e->getMessage());
        }
    }
    public function destroy($id){
        try{
            if (Knowledge::destroy($id)) {
                return redirect()->route('knowledges.view')->with('success','Se ha eliminado con exito');
            }
            else{
                return redirect()->route('knowledges.view')->with('error','No se pudó eliminar');
            }
        }catch (\Exception $e){
            return redirect()->route('knowledges.view')->with('error',$e->getMessage());
        }
    }
}
