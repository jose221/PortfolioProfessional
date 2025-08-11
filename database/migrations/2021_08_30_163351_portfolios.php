<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Portfolios extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('portfolios',function (Blueprint $table){
            $table->id();
            $table->string('code')->nullable();
            $table->string('icon_path')->nullable();
            $table->string('title_es')->nullable();
            $table->string('title_en')->nullable();
            $table->string('description_es')->nullable();
            $table->string('description_en')->nullable();
            $table->integer('years_experience')->nullable();
            $table->integer('knowledge_level')->nullable();
            $table->unsignedBigInteger('portfolio_categories_id')->nullable();
            $table->foreign('portfolio_categories_id')->references('id')->on('portfolio_categories')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
