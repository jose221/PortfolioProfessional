<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Study extends Model
{
    protected $table = "studies";
    protected $fillable =['caerrer_es','caerrer_en','school_es','school_en','folio','user_id'];
}
