<?php

namespace App\interfaces;

use Illuminate\Http\Request;

interface Authinterface {

    /**
     * check if an user is authenticated or not
     * 
     * @param Request $request
     * @return boolen -> true is authenticated, false if not
     */
    public function checkIfAuthenticated(Request $request);

     /**
     * Register a User by Form Request
     * 
     * @param Request $request
     * @return obj $user object
     */
    public function registerUser(Request $request);

       /**
     * Find a user by email address
     * 
     * @param String $email
     * @return obj $user object
     */
    public function findUserByEmail($email);
}