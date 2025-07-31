<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioCategory extends Model
{

    protected $table = 'portfolio_categories';
    protected $primaryKey = 'id';
    protected $fillable = [
        'code', 'title_es', 'title_en', 'description_es', 'description_en'
    ];
    public function portfolios(){
        return $this->hasMany(Portfolio::class, 'portfolio_categories_id');
    }
    public function getPortfoliosCategories($search){
        return PortfolioCategory::select('id', 'title_es as text')->where(function ($q) use ($search){
            $q->where('code','like',"%{$search}%")->orWhere('title_es','like',"%{$search}%")->orWhere('title_en','like', "%{$search}%");
        })->with('portfolios')->get();
    }
}
