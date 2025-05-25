<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class portfolioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        try {
            $items = Portfolio::where('portfolio_categories_id', $id)->get();
            return view('admin.portfolio.view', compact(['items','id']));
        }catch (\Exception $e){
            return redirect()->route('portfolio-categories.portfolio.view',$id)->with('error',$e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        try {
            $icon_path ="";
            //Agregar icono que se verá en la pantalla

            if(isset($request->icon_path)&&!empty($request->icon_path)){
                $image = $request->file('icon_path')->store('public');
                $icon_path = Storage::url($image);
            }
            $item = (array) $request->all();
            $item['portfolio_categories_id'] = $id;
            $item['icon_path'] = $icon_path;
            $data = Portfolio::create($item);
            return redirect()->route('portfolio-categories.portfolio.view', $id)->with('success','Se ha guardado con exito');;
        }catch (\Exception $e){
            return redirect()->route('portfolio-categories.portfolio.view', $id)->with('error',$e->getMessage());
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
            $icon_path ="";
            $item = (array)$request->all();

            //Agregar icono que se verá en la pantalla

            if(isset($request->icon_path)&&!empty($request->icon_path)){
                $image = $request->file('icon_path')->store('public');
                $icon_path = Storage::url($image);
                $item['icon_path'] = $icon_path;
            }else{
                unset($item['icon_path']);
            }
            unset($item['_token']);
            $data = Portfolio::where('id', $id)->update($item);
            return redirect()->route('portfolio-categories.portfolio.view',$item['portfolio_categories_id'])->with('success', 'Se ha guardado con exito');;
        } catch (\Exception $e) {
            return redirect()->route('portfolio-categories.portfolio.view',$item['portfolio_categories_id'])->with('error', $e->getMessage());

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
            $item = Portfolio::find($id);
            if ($item->delete()) {
                return redirect()->route('portfolio-categories.portfolio.view',$item->portfolio_categories_id)->with('success','Se ha eliminado con exito');
            }
            else{
                return redirect()->route('portfolio-categories.portfolio.view', $item->portfolio_categories_id)->with('error','No se pudó eliminar');
            }
        }catch (\Exception $e){
            return redirect()->route('portfolio-categories.portfolio.view', $item->portfolio_categories_id)->with('error',$e->getMessage());
        }
    }
    public function getPortfolios(Request $request, Portfolio $items){
        try {
            $res = $items->getPortfolios($request->search);
            return response()->json($res);

        }catch (\Exception $e){
            return response()->json($e);
        }
    }

}
