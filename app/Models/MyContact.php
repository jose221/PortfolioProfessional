<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MyContact extends Model
{
    use HasFactory, SoftDeletes;
    protected $table="my_contacts";
    protected $fillable = ['name_es','name_en','url_path','icon_path','user_id'];
}
