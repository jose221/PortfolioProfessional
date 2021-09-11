<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use App\Models\professionalExperience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class professionalExperiencesController extends Controller
{
    public function index(){
        try{
            $experiences = professionalExperience::where('user_id', Auth::id())->get();
            return view('admin.professional_experiences.view',compact('experiences'));
        }catch (\Exception $e){
            return redirect()->route('home')->with('error',$e->getMessage());
        }
    }
    public function edit($id){
        try{
            $experience = professionalExperience::find($id);
            //$experience->portfolio = $experience->portfolio;
            return view('admin.professional_experiences.edit',compact('experience'));
        }catch (\Exception $e){
            return redirect()->route('experience.professional.view')->with('success',$e->getMessage());
        }
    }
    public function create(){
        try{
            return view('admin.professional_experiences.create');
        }catch (\Exception $e){
            return redirect()->route('experience.professional.view')->with('error',$e->getMessage());
        }
    }
    public function store(Request $request){
        try{
            //PORTFOLIO ARRAY
            $porfolio  = [];
            if($request->portfolio){
                $porfolio = Portfolio::find($request->portfolio);
            }
            //agregar imagen del icono
            $image_path = "";
            if(isset($request->image_path)&&!empty($request->image_path)){
                $image = $request->file('image_path')->store('public');
                $image_path = Storage::url($image);
            }
            $experience = professionalExperience::create([
                'company'=>$request->company,
                'job_es'=>$request->job_es,
                'job_en'=>$request->job_en,
                'date_start'=>$request->date_start,
                'date_end'=>$request->date_end,
                'description_es'=>$request->description_es,
                'description_en'=>$request->description_en,
                'country_es'=>$request->country_es,
                'country_en'=>$request->country_en,
                'image_path'=>$image_path,
                'portfolio' =>$porfolio,
                'user_id'=>Auth::id()
            ]);
            if($experience){
                return redirect()->route('experience.professional.create')->with('success', 'Se ha guardado con exito');
            }else{
                return redirect()->route('experience.professional.create')->with('error', 'No se pudó guardar');
            }
        }catch (\Exception $e){
            return redirect()->route('experience.professional.create')->with('error',$e->getMessage());
        }
    }
    public function update(Request $request,$id){
        try{
            //PORTFOLIO ARRAY
            $porfolio  = [];
            if($request->portfolio){
                $porfolio = Portfolio::find($request->portfolio);
            }
            //agregar foto para el header de la pagina
            $myexperience = professionalExperience::find($id);
            $image_path = $myexperience->image_path;
            if(isset($request->image_path)&&!empty($request->image_path)){
                if(!empty($myexperience->image_path)) {
                    $path = explode("/", $myexperience->image_path);
                    Storage::delete("public/{$path[2]}");
                }
                $image = $request->file('image_path')->store('public');
                $image_path = Storage::url($image);
            }
            $experience = professionalExperience::where('id',$id)->update([
                'company'=>$request->company,
                'job_es'=>$request->job_es,
                'job_en'=>$request->job_en,
                'date_start'=>$request->date_start,
                'date_end'=>$request->date_end,
                'description_es'=>$request->description_es,
                'description_en'=>$request->description_en,
                'country_es'=>$request->country_es,
                'country_en'=>$request->country_en,
                'image_path'=>$image_path,
                'portfolio' =>$porfolio,
                'user_id'=>Auth::id()
            ]);
            if($experience){
                return redirect()->route('experience.professional.edit',$id)->with('success', 'Se ha actualizado con exito');
            }else{
                return redirect()->route('experience.professional.edit',$id)->with('error', 'No se pudó actualizar');
            }
        }catch (\Exception $e){
            return redirect()->route('experience.professional.edit',$id)->with('error',$e->getMessage());
        }
    }
    public function destroy($id){
        try{
            if (professionalExperience::destroy($id)) {
                return redirect()->route('experience.professional.view')->with('success','Se ha eliminado con exito');
            }
            else{
                return redirect()->route('experience.professional.view')->with('error','No se pudó eliminar');
            }
        }catch (\Exception $e){
            return redirect()->route('experience.professional.view')->with('error',$e->getMessage());
        }
    }
}
