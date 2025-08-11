<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class RolesController extends Controller
{
    public function index(){
        $items = User::all();
        return view('admin.roles.view',compact('items'));
    }

    public function show(int $id){
        return view('admin.roles.show', compact('id'));
    }
}
