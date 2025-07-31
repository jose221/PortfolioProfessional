<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HistoryCurriculumVitae;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class HistoryCurriculumVitaeController extends Controller
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function info($id)
    {
        return view('admin.history_curriculum_vitae.info', compact('id'));
    }

    public function editor(){
        return view('admin.history_curriculum_vitae.editor');
    }

}
