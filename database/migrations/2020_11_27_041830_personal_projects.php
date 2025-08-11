<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PersonalProjects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personal_projects',function (Blueprint $table){
            $table->id();
            $table->string('name_es')->nullable();
            $table->string('name_en')->nullable();
            $table->string('date_upload')->nullable();
            $table->string('link')->nullable();
            $table->longText('description_es',50000)->nullable();
            $table->longText('description_en',50000)->nullable();
            $table->string('image_path')->nullable();
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
        Schema::dropIfExists('personal_projects');
    }
}
