<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckoutController extends Controller
{
    public function placeOrder(Request $request)
    {
         if(auth('sanctum')->check())
         {
             $validator= Validator::make($request->all(),[
                 'firstname'=>'required|string',
                 'lastname'=>'required|string',
                 'phone'=>'required|string',
                 'email'=>'required|string',
                 'address'=>'required|string',
                 'city'=>'required|string',
                 'state'=>'required|string',
                 'zipcode'=>'required|string'
             ]);

             if($validator->fails())
             {
                return response()->json([
                    'status'=>422,
                    'errors'=>$validator->errors()->messages()
                ]);
             }
             else
             {
                 $user_id=auth('sanctum')->user()->id;

                $order=new Order();
                $order->firstname=$request->firstname;
                $order->lastname=$request->lastname;
                $order->phone=$request->phone;
                $order->email=$request->email;
                $order->address=$request->address;
                $order->city=$request->city;
                $order->state=$request->state;
                $order->zipcode=$request->zipcode;
                $order->user_id=$user_id;
                $order->remark=isset($request->remark)?$request->remark : 0;
                $order->payment_mode=$request->paymentMode;
                $order->payment_id=$request->payment_id;
                $order->tracking_no="fundaecom". rand(1111,9999);
                $order->save();

                $cart=Cart::where('user_id',$user_id)->get();
                $orderItems=[];
                foreach($cart as $item)
                {
                    $orderItems[]=[
                        'product_id'=>$item->product_id,
                        'qty'=>$item->product->quantity,
                        'price'=>$item->product->selling_price
                    
                    ];

                    $item->product->update([
                        'quantity'=>$item->product->quantity - $item->product_qty
                    ]);
                }

                $order->orderItems()->createMany($orderItems);
                Cart::destroy($cart);
                return response()->json([
                    'status'=>200,
                    'message'=>'Order placed successfully'
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

    public function validateOrder(Request $request)
    {
        if(auth('sanctum')->check())
        {
            $validator= Validator::make($request->all(),[
                'firstname'=>'required|string',
                'lastname'=>'required|string',
                'phone'=>'required|string',
                'email'=>'required|string',
                'address'=>'required|string',
                'city'=>'required|string',
                'state'=>'required|string',
                'zipcode'=>'required|string'
            ]);

            if($validator->fails())
            {
               return response()->json([
                   'status'=>422,
                   'errors'=>$validator->errors()->messages()
               ]);
            }
            else
            {
               return response()->json([
                   'status'=>200,
                   'message'=>'Order is valid'
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
