<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\personalProject;
use App\Models\professionalExperience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class personalProjectsController extends Controller
{
    public function index(){
        try{
            $personalProject = personalProject::where('user_id', Auth::id())->get();
            return view('admin.personal_projects.view',compact('personalProject'));
        }catch (\Exception $e){
            return redirect()->route('home')->with('success',$e->getMessage());
        }
    }
    public function edit($id){
        try{
            $proyect = personalProject::find($id);
            return view('admin.personal_projects.edit',compact('proyect'));
        }catch (\Exception $e){
            return redirect()->route('project.personal.view')->with('success',$e->getMessage());
        }
    }
    public function create(){
        try{
            return view('admin.personal_projects.create');
        }catch (\Exception $e){
            return redirect()->route('project.personal.view')->with('success',$e->getMessage());
        }
    }
    public function store(Request $request){
        try{
            //agregar imagen del icono
            $image_path = "";
            if(isset($request->image_path)&&!empty($request->image_path)){
                $image = $request->file('image_path')->store('public');
                $image_path = Storage::url($image);
            }
            $experience = personalProject::create([
                'name_es'=>$request->name_es,
                'name_en'=>$request->name_en,
                'date_upload'=>$request->date_upload,
                'link'=>$request->link,
                'description_es'=>$request->description_es,
                'description_en'=>$request->description_en,
                'image_path'=>$image_path,
                'user_id'=>Auth::id()
            ]);
                if($experience){
                    return redirect()->route('project.personal.create')->with('success', 'Se ha guardado con exito');
                }else{
                    return redirect()->route('project.personal.create')->with('error', 'No se pudó guardar');
                }
        }catch (\Exception $e){
            return redirect()->route('project.personal.create')->with('success',$e->getMessage());
        }
    }
    public function update(Request $request,$id){
        try{
            //agregar foto para el header de la pagina
            $myproyect = personalProject::find($id);
            $image_path = $myproyect->image_path;
            if(isset($request->image_path)&&!empty($request->image_path)){
                if(!empty($myproyect->image_path)) {
                    $path = explode("/", $myproyect->image_path);
                    Storage::delete("public/{$path[2]}");
                }
                $image = $request->file('image_path')->store('public');
                $image_path = Storage::url($image);
            }
            $experience = personalProject::where('id',$id)->update([
                'name_es'=>$request->name_es,
                'name_en'=>$request->name_en,
                'date_upload'=>$request->date_upload,
                'link'=>$request->link,
                'description_es'=>$request->description_es,
                'description_en'=>$request->description_en,
                'image_path'=>$image_path,
                'user_id'=>Auth::id()
            ]);
            if($experience){
                return redirect()->route('project.personal.edit',$id)->with('success', 'Se ha actualizado con exito');
            }else{
                return redirect()->route('project.personal.edit',$id)->with('error', 'No se pudó actualizar');
            }
        }catch (\Exception $e){
            return redirect()->route('project.personal.edit',$id)->with('success',$e->getMessage());
        }
    }
    public function destroy($id){
        try{
            if (personalProject::destroy($id)) {
                return redirect()->route('project.personal.view')->with('success','Se ha eliminado con exito');
            }
            else{
                return redirect()->route('project.personal.view')->with('error','No se pudó eliminar');
            }
        }catch (\Exception $e){
            return redirect()->route('project.personal.view')->with('error',$e->getMessage());
        }
    }
}
