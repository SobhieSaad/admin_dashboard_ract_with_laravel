<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function store(Request $request){
        
        $validator=Validator::make($request->all(),[
            'name'=>'required|string',
            'slug'=>'required|string',
            'meta_title'=>'required',
            'quantity'=>'required',
            'brand'=>'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors(),
            ]);
        }else{
            $product=new Product();
            $product->category_id= $request->input('category_id');
            $product->slug= $request->input('slug');
            $product->name= $request->input('name');
            $product->description= $request->input('description');
            $product->meta_title= $request->input('meta_title');
            $product->meta_keyword= $request->input('meta_keyword');
            $product->meta_description= $request->input('meta_description');
            $product->selling_price= $request->input('selling_price');
            $product->original_price= $request->input('original_price');
            $product->quantity= $request->input('quantity');
            $product->brand= $request->input('brand');
            $product->featured= $request->input('featured') ==true? 1:0;
            $product->popular= $request->input('popular') ==true? 1:0;
            $product->status= $request->input('status') ==true? 1:0;
            

            if($request->hasFile('image')){
                $file=$request->file('image');
                $extenstion=$file->getClientOriginalExtension();
                $fileName=time().'.'.$extenstion;
                $path='uploads/proucts/';
                $file->move($path,$fileName);
                $product->image=$path.$fileName;
            }
            
            $product->save();
            return response()->json([
                'status'=>200,
                'message'=>"Product added successfully",
            ]);
        }
    }
}
