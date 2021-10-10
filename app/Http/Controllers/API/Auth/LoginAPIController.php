<?php

namespace App\Http\Controllers\API\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\repositories\AuthRepository;
use App\Models\User;

class LoginAPIController extends Controller
{
    public $authrepository;

    public function __construct(AuthRepository $authrepository)
    {
        $this->authrepository = $authrepository;
    }

    public function createToken()
    {
        $user = User::first();
        $accessToken = $user->createToken('Token Name')->accessToken;
        return $accessToken;
    }

    public function login(Request $request)
    {
        //validation
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'email' => 'required',
            'password' => 'required'
        ], [
            'email.required' => 'Please give your user Email',
            'password.required' => 'Please give your Password',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        if ($this->authrepository->checkIfAuthenticated($request)) {
            $user = $this->authrepository->findUserByEmail($request->email);
            $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => "LoggedIn Successfully !!",
                'user' => $user,
                'access_token' => $accessToken,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => "Invalid Email and Password",
                'errors' => null,
            ]);
        }
    }
}
