<?php

namespace App\interfaces;

use Illuminate\Http\Request;

interface Crudinterface {

    public function getAll();
    public function findById($id);
    public function create(Request $request);
    public function edit(Request $request, $id);
    public function delete($id);

}