<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Knowledge extends Model
{
    protected $table = "knowledges";
    protected $fillable = ['title_es','title_en','icon_path','description_es','description_en','user_id'];
}
