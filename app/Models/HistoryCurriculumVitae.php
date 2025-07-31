<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoryCurriculumVitae extends Model
{
    protected $table = 'history_curriculum_vitae';
    protected $primaryKey = 'id';
    protected $fillable = [
        'archive_name',
        'path',
        'archive_type'
    ];

}
