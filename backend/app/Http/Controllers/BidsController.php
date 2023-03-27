<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Users;
use App\Models\Bids;
use Illuminate\Http\Request;

class BidsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DB::table('requests')
          ->select('req_id', 'req_text', 'recipient.name as recipient_name', 'sender.name as sender_name')
          ->join('users as recipient','requests.recipient_id','=','recipient.id')
          ->join('users as sender','requests.sender_id','=','sender.id')
          ->orderBy('req_id','asc')
          ->get();

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
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Bids $bids)
    {
        return response()->json([
            'bids'=>$bid
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bids $bids)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bids $bids)
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bids $bids)
    {


    }
}
