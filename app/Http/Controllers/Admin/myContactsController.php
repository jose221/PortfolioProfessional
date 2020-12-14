<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MyContact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class myContactsController extends Controller
{
    public function index(){
        try{
            $myContacts = MyContact::where('user_id', Auth::id())->get();
            return view('admin.my_contacts.view', compact('myContacts'));
        }catch (\Exception $e){
            return view('admin.my_contacts.view')->with('error',$e->getMessage());
        }
    }
    public function edit($id){
        try{
            $myContact = MyContact::find($id);
            return view('admin.my_contacts.edit',compact('myContact'));
        }catch (\Exception $e){
            return view('admin.my_contacts.edit')->with('error',$e->getMessage());
        }
    }
    public function create(){
        try{
            return view('admin.my_contacts.create');
        }catch (\Exception $e){

        }
    }
    public function store(Request $request){
        //agregar imagen del icono
        $icon_path = "";
        if(isset($request->icon_path)&&!empty($request->icon_path)){
            $image = $request->file('icon_path')->store('public');
            $icon_path = Storage::url($image);
        }
        //Agr
        try {
            $myContact = MyContact::create([
                'name_es'=>$request->name_es,
                'name_en'=>$request->name_en,
                'url_path'=>$request->url_path,
                'icon_path'=>$icon_path,
                'user_id'=>Auth::id()
            ]);
            if($myContact){
                return redirect()->route('contacts.view')->with('success','Se ha guardado con exito');
            }else{
                return redirect()->route('contacts.create')->with('error','No se pudó guardar');
            }

        }catch (\Exception $e){
            return redirect()->route('contacts.create')->with('error',$e->getMessage());
        }
    }
    public function update(Request $request,$id){
        //agregar foto para el header de la pagina
        $myContact = MyContact::find($id);
        $icon_path = $myContact->icon_path;
        if(isset($request->icon_path)&&!empty($request->icon_path)){
            if(!empty($myContact->icon_path)) {
                $path = explode("/", $myContact->icon_path);
                Storage::delete("public/{$path[2]}");
            }
            $image = $request->file('icon_path')->store('public');
            $icon_path = Storage::url($image);
        }
        //Agr
        try {
            $myContact_update = MyContact::where('id',$id)->update([
                'name_es'=>$request->name_es,
                'name_en'=>$request->name_en,
                'url_path'=>$request->url_path,
                'icon_path'=>$icon_path,
                'user_id'=>Auth::id()
            ]);
            if($myContact_update){
                return redirect()->route('contacts.view')->with('success','Se ha azctualizado con exito');
            }else{
                return redirect()->route('contacts.create')->with('error','No se pudó actualizar');
            }
        }catch (\Exception $e){
            return redirect()->route('contacts.view')->with('error',$e->getMessage());
        }
    }
    public function destroy($id){
        try{
            if (MyContact::destroy($id)) {
                return redirect()->route('contacts.view')->with('success','Se ha eliminado con exito');
            }
            else{
                return redirect()->route('contacts.view')->with('error','No se pudó eliminar');
            }
        }catch (\Exception $e){
            return redirect()->route('contacts.view')->with('error',$e->getMessage());
        }
    }
}
