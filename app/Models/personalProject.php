<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class personalProject extends Model
{
    protected $table = "personal_projects";
    protected $fillable = ['name_es','name_en','date_upload','link','description_es','description_en','image_path','user_id'];
}
