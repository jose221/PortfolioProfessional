<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{

    protected $table = 'portfolios';
    protected $primaryKey = 'id';
    protected $fillable= [
        'code', 'icon_path','title_es', 'title_en','description_es', 'description_en','portfolio_categories_id', 'knowledge_level', 'years_experience'
    ];

    public function getPortfolios($search){
        return Portfolio::select('id', 'title_es as text', 'icon_path as url_img')->where(function ($q) use ($search){
            $q->where('code','like',"%{$search}%")->orWhere('title_es','like',"%{$search}%")->orWhere('title_en','like', "%{$search}%");
        })->get();
    }
}
