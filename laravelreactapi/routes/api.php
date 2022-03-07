<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('register',[AuthController::class,'register']);

Route::post('login',[AuthController::class,'login']);

Route::get('getCategory',[FrontendController::class,'category']);
Route::get('fetchProducts/{prodcut_slug}',[FrontendController::class,'product']);
Route::get('view-product-normal-user/{category_slug}/{product_slug}',[FrontendController::class,'show']);

Route::post('add-to-cart',[CartController::class,'addToCart']);
Route::get('cart',[CartController::class,'getCartDetails']);
Route::put('cart-updatequantity/{cart_id}/{scope}',[CartController::class,'updateCartQuantity']);
Route::delete('delet-cartitem/{cart_id}',[CartController::class,'deleteCartItem']);

Route::post('place-order',[CheckoutController::class,'placeOrder']);
Route::post('validate-order',[CheckoutController::class,'validateOrder']);

Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function(){

    Route::get('/checkingAuthenticated',function(){
        return response()->json(["message"=>"You are in", 'status'=>200],200);
    });

    Route::post('store-category',[CategoryController::class,'store']);

    Route::get('view-category',[CategoryController::class,'index']);

    Route::get('edit-category/{id}',[CategoryController::class,'edit']);

    Route::put('update-category/{id}',[CategoryController::class,'update']);

    Route::delete('delete-category/{id}',[CategoryController::class,'destory']);

    Route::get('all-category',[CategoryController::class,'allCategory']);

    //Products
    Route::post('store-product', [ProductController::class,'store']);

    Route::get('view-product', [ProductController::class,'index']);

    Route::get('edit-product/{id}',[ProductController::class,'edit']);

    Route::post('update-product/{id}',[ProductController::class,'update']);

    //Orders
    Route::get('admin/orders',[OrderController::class,'index']);
});

Route::middleware(['auth:sanctum'])->group(function(){

    Route::post('logout',[AuthController::class,'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
