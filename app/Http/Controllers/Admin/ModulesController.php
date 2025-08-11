<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class ModulesController extends Controller
{
    public function index(){
        $items = User::all();
        return view('admin.modules.view',compact('items'));
    }
}
