<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class professionalExperience extends Model
{
    protected $table = "prefessional_experiences";
    protected $fillable=['company','job_es','job_en','date_start','date_end','description_es','description_en','country_es','country_en','image_path','user_id'];
}
