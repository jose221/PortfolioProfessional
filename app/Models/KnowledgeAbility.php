<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class KnowledgeAbility extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "knowledges_abilities";
    protected $fillable = ['title_es','title_en','description_en','description_es','knowledges_id'];
}
