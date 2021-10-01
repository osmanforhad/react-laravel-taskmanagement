<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\TaskRepository;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    public $taskrepository;

    public function __construct(TaskRepository $taskrepository)
    {
        $this->taskrepository = $taskrepository;
    }

    /**
     * index() Get All Task List
     * 
     * @return response
     */
    public function index()
    {
        $tasks = $this->taskrepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'Task List from projcet table',
            'data' => $tasks
        ]);
    }

    /**
     * show() Find Task By ID
     * 
     * @param integer $id
     * @return response
     */
    public function show($id)
    {
        $task = $this->taskrepository->findById($id);
        if(is_null($task)){
            return response()->json([
                'success' => false,
                'message' => 'task not found',
                'data' => null
            ]);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'Single Task Details from Task table',
                'data' => $task
            ]);
        }
        
    }

     /**
     * store() Insert Task data into DB
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
            'project_id' => 'required'
        ],[
            'name.required' => 'Please give Task Name',
            'description.required' => 'Please give Task Description',
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
             ]);
        }

       $task = $this->taskrepository->create($request);
        
            return response()->json([
                'success' => true,
                'message' => 'Task Stored',
                'data' => $task
              ]);
        
        
    }

    /**
     * update() update/modify Task data into DB by using id
     * 
     * @param Request $request
     * @param integer $id
     * @return response
     */
    public function update(Request $request, $id)
    {
        $task = $this->taskrepository->findById($id);
        if(is_null($task)){
            return response()->json([
                'success' => false,
                'message' => 'Task not found',
                'data' => null,
             ]);
        } else {
            //validation
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'description' => 'required',
            'project_id' => 'required'
        ],[
            'name.required' => 'Please give Task Name',
            'description.required' => 'Please give Task Description',
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
             ]);
        }

       $task = $this->taskrepository->edit($request, $id);
        
            return response()->json([
                'success' => true,
                'message' => 'Task Updated',
                'data' => $task
              ]);
        }
        
        
    }

    /**
     * destroy() delete single Task data from DB by using id
     * 
     * @param integer $id
     * @return response
     */
    public function destroy($id)
    {
        $task = $this->taskrepository->findById($id);
        if(is_null($task)){
            return response()->json([
                'success' => false,
                'message' => 'Task not found',
                'data' => null,
             ]);
        } else {
       $task = $this->taskrepository->delete($id);
        
            return response()->json([
                'success' => true,
                'message' => 'Task Deleted',
                'data' => $task
              ]);
        }
        
        
    }

}
