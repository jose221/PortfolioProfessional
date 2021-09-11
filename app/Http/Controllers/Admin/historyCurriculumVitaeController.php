<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HistoryCurriculumVitae;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class historyCurriculumVitaeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::find(Auth::id());
        $items= HistoryCurriculumVitae::orderBy('id', 'DESC')->get();
        $items = $items->map(function ($item) use($user){
            if($item->id === $user->cv){
                $item->selected = true;
            }else{
                $item->selected = false;
            }
            return $item;
        } );
        //return $items;
        return view('admin.history_curriculum_vitae.view', compact('items'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $path ="";
            //Agregar icono que se verá en la pantalla

            if(isset($request->path)&&!empty($request->path)){
                //$image = Storage::disk('public')->put('my_archivo.pdf', $request->file('path'));
                $image = $request->file('path')->store('public');
                $path = Storage::url($image);
            }
            $item = (array) $request->all();
            $item['path'] =  $path;
            $data = HistoryCurriculumVitae::create($item);
            $user = User::find(Auth::id())->update([
                'cv' =>$data->id
            ]);
            return redirect()->route('users.vitae.view')->with('success','Se ha guardado con exito');;
        }catch (\Exception $e){
            return redirect()->route('users.vitae.view')->with('error',$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $path ="";
            $item = (array)$request->all();

            //Agregar icono que se verá en la pantalla

            if(isset($request->path)&&!empty($request->path)){
                $image = $request->file('path')->store('public');
                $path = Storage::url($image);
                $item['path'] = $path;
            }else{
                unset($item['path']);
            }
            unset($item['_token']);
            $data = HistoryCurriculumVitae::where('id', $id)->update($item);
            return redirect()->route('users.vitae.view')->with('success','Se ha guardado con exito');;
        }catch (\Exception $e){
            return redirect()->route('users.vitae.view')->with('error',$e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            $item = HistoryCurriculumVitae::find($id);
            if ($item->delete()) {
                return redirect()->route('users.vitae.view')->with('success','Se ha eliminado con exito');
            }
            else{
                return redirect()->route('users.vitae.view')->with('error','No se pudó eliminar');
            }
        }catch (\Exception $e){
            return redirect()->route('users.vitae.view')->with('error',$e->getMessage());
        }
    }
    public function selected($id, Request $request){
        try {
            $user = User::find(Auth::id());
            $item = HistoryCurriculumVitae::find($id);
            $user->update([
                'cv' =>$id
            ]);
            return redirect()->route('users.vitae.view')->with('success','Actualizado con exito');
        }
        catch (\Exception $e){
            return redirect()->route('users.vitae.view')->with('error',$e->getMessage());
        }

    }
}
