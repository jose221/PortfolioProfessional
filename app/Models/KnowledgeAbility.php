<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KnowledgeAbility extends Model
{
    protected $table = "knowledges_abilities";
    protected $fillable = ['title_es','title_en','description_en','description_es','knowledges_id'];
}
