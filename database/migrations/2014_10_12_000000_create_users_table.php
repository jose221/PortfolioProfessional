<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('age')->nullable();
            $table->date('date_birthday')->nullable();
            $table->string('nationality_es')->nullable();
            $table->string('nationality_en')->nullable();
            $table->longText('description_es',50000)->nullable();
            $table->longText('description_en',50000)->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('country_es')->nullable();
            $table->string('country_en')->nullable();
            $table->string('header_image_path')->nullable();
            $table->string('my_perfil')->nullable();
            $table->string('logo')->nullable();
            $table->string('slogan_es')->nullable();
            $table->string('slogan_en')->nullable();
            $table->string('avatar')->nullable();
            $table->string('header_text_es')->nullable();
            $table->string('header_text_en')->nullable();
            $table->unsignedBigInteger('cv')->nullable();
            $table->foreign('cv')->references('id')->on('history_curriculum_vitae')->onDelete('set null')->onUpdate('set null');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
