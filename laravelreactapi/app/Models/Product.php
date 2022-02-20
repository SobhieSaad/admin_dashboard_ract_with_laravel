<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table='products';
    protected $fillable=[
        'category_id',
        'name',
        'slug',
        'description',
        'meta_title','meta_keyword','meta_decription',
        'selling_price','original_price','quantity','brand','featured','popular','status',
        'image'
    ];
}
