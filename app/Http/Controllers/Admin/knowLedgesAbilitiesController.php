<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Knowledge;
use App\Models\KnowledgeAbility;
use Illuminate\Http\Request;

class knowLedgesAbilitiesController extends Controller
{
    public function edit($id){
        try{
            $knowledges_abilities = KnowledgeAbility::find($id);
            return view('admin.knowledges_abilities.edit', compact('knowledges_abilities'));
        }catch (\Exception $e){
            return redirect()->route('knowledges.view')->with('error',$e->getMessage());
        }
    }
    public function create($id){
        try{
            return view('admin.knowledges_abilities.create', compact('id'));
        }catch (\Exception $e){
            return redirect()->route('knowledges.show',$id)->with('error',$e->getMessage());
        }
    }
    /**el id es el id de knowledges o la tabla de conocimientos**/
    public function store(Request$request, $id){
        try {
            $knowledges_abilities = KnowledgeAbility::create([
                'title_es'=>$request->title_es,
                'title_en'=>$request->title_en,
                'description_en'=>$request->description_en,
                'description_es'=>$request->description_es,
                'knowledges_id'=>$id
            ]);
            if($knowledges_abilities){
                return redirect()->route('knowledges.show',$id)->with('success','Se ha guardado con exito');
            }else{
                redirect()->route('knowledges.abilities.create',$id)->with('error','No se pudó guardar');
            }

        }catch (\Exception $e){
            return redirect()->route('knowledges.abilities.create',$id)->with('error',$e->getMessage());
        }
    }
    public function update($id,Request $request){
        //el $id es de knowledges abilities
        try {
            $knowledges_abilities = KnowledgeAbility::where('id',$id)->update([
                'title_es'=>$request->title_es,
                'title_en'=>$request->title_en,
                'description_en'=>$request->description_en,
                'description_es'=>$request->description_es
            ]);
            if($knowledges_abilities){
                return redirect()->route('knowledges.abilities.edit',$id)->with('success','Se ha actualizado con exito');
            }else{
                redirect()->route('knowledges.abilities.edit',$id)->with('error','No se pudó actualizar');
            }
        }catch (\Exception $e){
            return redirect()->route('knowledges.abilities.edit',$id)->with('error',$e->getMessage());
        }
    }
    public function destroy($id){
        try{
            $knowledgeAbility = KnowledgeAbility::find($id);
            $id_knowledge = $knowledgeAbility->knowledges_id;
            if ($knowledgeAbility->delete()) {
                return redirect()->route('knowledges.show',$id_knowledge)->with('success','Se ha eliminado con exito');
            }
            else{
                return redirect()->route('knowledges.show',$id_knowledge)->with('error','No se pudó eliminar');
            }
        }catch (\Exception $e){
            return redirect()->route('knowledges.show',$id_knowledge)->with('error',$e->getMessage());
        }
    }

}
