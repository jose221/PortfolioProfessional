<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\PortfolioCategory;
use Illuminate\Http\Request;

class PortfolioCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $items = PortfolioCategory::all();
            return view('admin.portfolio_categories.view', compact('items'));
        }catch (\Exception $e){
            return redirect()->route('portfolio_categories.view')->with('error',$e->getMessage());
        }
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
            $item = (array) $request->all();
            $data = PortfolioCategory::create($item);
              return redirect()->route('portfolio-categories.view')->with('success','Se ha guardado con exito');;
        }catch (\Exception $e){
            return redirect()->route('portfolio-categories.view')->with('error',$e->getMessage());
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
            $item = (array)$request->all();
            unset($item['_token']);
            $data = PortfolioCategory::where('id', $id)->update($item);
            return redirect()->route('portfolio-categories.view')->with('success', 'Se ha guardado con exito');;
        } catch (\Exception $e) {
            return redirect()->route('portfolio-categories.view')->with('error', $e->getMessage());

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
            $item = PortfolioCategory::find($id);
            if ($item->delete()) {
                return redirect()->route('portfolio-categories.view')->with('success','Se ha eliminado con exito');
            }
            else{
                return redirect()->route('portfolio-categories.view')->with('error','No se pudó eliminar');
            }
        }catch (\Exception $e){
            return redirect()->route('portfolio-categories.view')->with('error',$e->getMessage());
        }
    }


    public function getPortfoliosCategories(Request $request, PortfolioCategory $items){
        try {
            $res = $items->getPortfoliosCategories($request->search);
            return response()->json($res);

        }catch (\Exception $e){
            return response()->json($e);
        }
    }
}
