<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Knowledge extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "knowledges";
    protected $fillable = ['title_es','title_en','icon_path','description_es','description_en','user_id'];
}
