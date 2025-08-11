<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class CertificationsController extends Controller
{
    public function index(){
        try {
            return view('admin.certifications.view');
        }catch (\Exception $e){
            return view('admin.certifications.view')->with('error',$e->getMessage());
        }
    }
}
