<?php

use App\Http\Controllers\API\AuthController;
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

Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function(){

    Route::get('/checkingAuthenticated',function(){
        return response()->json(["message"=>"You are in", 'status'=>200],200);
    });
}
);

Route::middleware(['auth:sanctum'])->group(function(){

    Route::post('logout',[AuthController::class,'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
