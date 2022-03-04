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

    public function getCartDetails()
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $cart_items=Cart::where('user_id',$user_id)->get();
            return response()->json([
                'status'=>200,
                'cart'=>$cart_items
            ]);
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Login first'
            ]);
        }
    }

    public function updateCartQuantity($cart_id,$scope)
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $cart= Cart::where('id',$cart_id)->where('user_id',$user_id)->first();
            if($scope ==="dec")
            {
                $cart->product_qty--;
            }else if($scope ==="inc")
            {
                $cart->product_qty++;
            }
            $cart->update();
            return response()->json([
                'status'=>200,
                'message'=>'quantity updated'
            ]);
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Login first'
            ]);
        }
    }

    public function deleteCartItem($cart_id)
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $cart= Cart::where('id',$cart_id)->where('user_id',$user_id)->first();
            if($cart)
            {
                $cart->delete();
                return response()->json([
                    'status'=>200,
                    'message'=>'item deleted'
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'item not found'
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
