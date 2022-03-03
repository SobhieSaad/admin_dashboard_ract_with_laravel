<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->integer('category_id');
            $table->string('slug');
            $table->string('name');
            $table->string('meta_title');
            $table->string('meta_keyword')->nullable();
            $table->string('meta_description')->nullable();
            $table->mediumText('description')->nullable();
            $table->string('brand');
            $table->string('selling_price');
            $table->string('original_price');
            $table->string('quantity');
            $table->string('image')->nullable();
            $table->tinyInteger('featured')->default(0)->nullable();
            $table->tinyInteger('popular')->default(0)->nullable();
            $table->tinyInteger('status')->default(0)->nullable();
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
        Schema::dropIfExists('products');
    }
}
