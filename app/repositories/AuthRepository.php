<?php

namespace App\repositories;

use App\interfaces\Authinterface;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthRepository implements Authinterface
{

    public function checkIfAuthenticated(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return true;
        } else {
            return false;
        }
    }

    public function registerUser(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->save();
        return $user;
    }

    public function findUserByEmail($email)
    {
        $user = User::where('email', $email)->first();

        return $user;
    }
}
