<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Users;
use App\Models\Bids;
use Illuminate\Http\Request;

/*use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;*/

class UsersController extends Controller
{
  public $timestamps = false;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Users::select('id','name','email','phone_number')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) { 
      print_r("some data: \n" . implode(",\n", $request->input()) . "\n\n"); // крч, ты шлешь инфу в request, а там два поля лишних и он ошибку выдает, хз что делать

      $user = Users::where('name', $request->input('name'))->first();
      print_r("id = " . $user . " \n"); // это проверка на наличие записи - он уже тут дает ошибку
      if (!$user) {
        /*$request->validate([
          'name'=>'required',
          'email'=>'required',
          'phone_number'=>'required'
        ]);
        $model = Users::create($request);//->all()*/

        //$id = DB::table('users')->insertGetId($model);
        //print_r("\nnew id: " . $model->$id . " \n");

        /*$userData = $request->validate([
          'name' => 'required',
          'email' => 'required',
          'phone_number' => 'required'
        ]);
        print_r("\n\nuserData: \n". implode(",\n", $userData) . "\n\n");*/
        //$model = Users::create($userData);//->all()
        


        $id = \DB::table('users')->insertGetId($request->validate([
          'name'=>'required',
          'email'=>'required',
          'phone_number'=>'required'
        ]));
        print_r("\nnew id: " . $id . " \n");

        $reqData = DB::table('requests')->insert(
          [
            'req_text' => $request->req_text,
            'recipient_id' => $request->recipient_id,
            'sender_id' => $id
          ]);
        



        /*$reqData = DB::table('requests')->$request->validate([
          'req_text'=>'required',
          'recipient_id'=>$id,
          'sender_id'=>'required'
        ]);*/

        //Users::create($request);
        
        return response()->json('User created', 201);
     }

      $reqData = DB::table('requests')->insert(
        [
          'req_text' => $request->req_text,
          'recipient_id' => $request->recipient_id,
          'sender_id' => $user["id"]
        ]);   
     return response()->json('Bids send', 201);
     
    }

    /**
     * Display the specified resource.
     */
    public function show(Users $users)
    {
        return response()->json([
            'users'=>$user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Users $users)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Users $users)
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Users $users)
    {

    }
}
