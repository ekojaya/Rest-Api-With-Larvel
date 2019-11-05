<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Category;
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $hasil = Category::paginate(3);
        return $hasil;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $hasil = new Category;
        $hasil->name = $request->category_name;
        if($hasil->save()){
            $res['message']="Success!";
            $res['value']="$hasil";
       
            return response($res);
        }else{
            $res['message']='empty!';
            return response($res);
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $hasil = Category::find($id);
        return $hasil;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $hasil = Category::find($id);
        $hasil->name = $request->category_name;
        if($hasil->save()){
            $res['message']="Success!";
            $res['value']="$hasil";
       
            return response($res);
        }else{
            $res['message']='empty!';
            return response($res);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $hasil = Category::find($id);
     
        if($hasil->delete()){
            $res['message']="Delete Success!";
            $res['value']="$hasil";
            return response($res);
        }else{

            $res['message']="Failed!";
            return response($res);
        }

    }
}
