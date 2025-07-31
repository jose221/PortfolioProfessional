<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Knowledges extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('knowledges',function (Blueprint $table){
            $table->id();
            $table->string('title_es')->nullable();
            $table->string('title_en')->nullable();
            $table->string('icon_path')->nullable();
            $table->longText('description_es',50000)->nullable();
            $table->longText('description_en',50000)->nullable();
            $table->tinyInteger('important')->nullable()->default(0);
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('knowledges');
    }
}
