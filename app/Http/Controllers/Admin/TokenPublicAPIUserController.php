<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Study;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TokenPublicAPIUserController extends Controller
{
    public function index(){
        return view('admin.token_public_api_user.view');
    }
}
