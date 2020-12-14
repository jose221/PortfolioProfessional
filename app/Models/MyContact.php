<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MyContact extends Model
{
    protected $table="my_contacts";
    protected $fillable = ['name_es','name_en','url_path','icon_path','user_id'];
}
