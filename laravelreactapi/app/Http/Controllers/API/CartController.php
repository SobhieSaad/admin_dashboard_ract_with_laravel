<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    
    public function addToCart(Request $request)
    {
        if(auth('sanctum')->check())
        {
            $product_id=$request->product_id;
            $product_qty=$request->product_qty;
            $user_id= auth('sanctum')->user()->id;
            
            $productCheck=Product::where('id',$product_id)->first();
            if($productCheck)
            {
                if(Cart::where('product_id',$product_id)->where('user_id',$user_id)->exists())
                {
                    return response()->json([
                        'status'=>409,
                        'message'=>$productCheck->name .' already in cart'
                    ]);
                }
                else
                {
                    $cartItem= new Cart();
                    $cartItem->user_id = $user_id;
                    $cartItem->product_id= $product_id;
                    $cartItem->product_qty= $product_qty;
                    $cartItem->save();
                    return response()->json([
                        'status'=>201,
                        'message'=>'Added to cart successfully'
                    ]);
                }
                
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'Product not found'
                ]);
            }
            
        }
        else
        {

            return response()->json([
                'status'=>401,
                'message'=>'Login first'
            ]);
        }
    }
}
