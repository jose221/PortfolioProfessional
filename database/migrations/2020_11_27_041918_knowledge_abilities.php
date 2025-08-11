<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class KnowledgeAbilities extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('knowledges_abilities',function (Blueprint $table){
            $table->id();
            $table->string('title_es')->nullable();
            $table->string('title_en')->nullable();
            $table->longText('description_es',50000)->nullable();
            $table->longText('description_en',50000)->nullable();
            $table->unsignedBigInteger('knowledges_id');
            $table->foreign('knowledges_id')->references('id')->on('knowledges')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('knowledges_abilities');
    }
}
