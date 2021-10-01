<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\ProjectRepository;
use Illuminate\Http\Request;

class ProjectsController extends Controller
{
    public $projectrepository;

    public function __construct(ProjectRepository $projectrepository)
    {
        $this->projectrepository = $projectrepository;
    }

    /**
     * index() Get All Project List
     * 
     * @return response
     */
    public function index()
    {
        $projects = $this->projectrepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'Project List from projcet table',
            'data' => $projects
        ]);
    }

    /**
     * show() Find Project By ID
     * 
     * @param integer $id
     * @return response
     */
    public function show($id)
    {
        $project = $this->projectrepository->findById($id);
        if(is_null($project)){
            return response()->json([
                'success' => false,
                'message' => 'Project not found',
                'data' => null
            ]);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'Single Project Details from projcet table',
                'data' => $project
            ]);
        }
        
    }

     /**
     * store() Insert Project data into DB
     * 
     * @param Request $request
     * @return response
     */
    public function store(Request $request)
    {
        //validation
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required'
        ],[
            'name.required' => 'Please give Project Name',
            'description.required' => 'Please give Project Description',
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
             ]);
        }

       $project = $this->projectrepository->create($request);
        
            return response()->json([
                'success' => true,
                'message' => 'Project Stored',
                'data' => $project
              ]);
        
        
    }

    /**
     * update() update/modify Project data into DB by using id
     * 
     * @param Request $request
     * @param integer $id
     * @return response
     */
    public function update(Request $request, $id)
    {
        $project = $this->projectrepository->findById($id);
        if(is_null($project)){
            return response()->json([
                'success' => false,
                'message' => 'Project not found',
                'data' => null,
             ]);
        } else {
            //validation
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required'
        ],[
            'name.required' => 'Please give Project Name',
            'description.required' => 'Please give Project Description',
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
             ]);
        }

       $project = $this->projectrepository->edit($request, $id);
        
            return response()->json([
                'success' => true,
                'message' => 'Project Updated',
                'data' => $project
              ]);
        }
        
        
    }

    /**
     * destroy() delete single Project data from DB by using id
     * 
     * @param integer $id
     * @return response
     */
    public function destroy($id)
    {
        $project = $this->projectrepository->findById($id);
        if(is_null($project)){
            return response()->json([
                'success' => false,
                'message' => 'Project not found',
                'data' => null,
             ]);
        } else {
       $project = $this->projectrepository->delete($id);
        
            return response()->json([
                'success' => true,
                'message' => 'Project Deleted',
                'data' => $project
              ]);
        }
        
        
    }

}
