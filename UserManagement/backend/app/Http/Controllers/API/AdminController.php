<?php

namespace App\Http\Controllers\API;

use App\Repositories\Account\RoleRepository;
use App\Repositories\Account\UserRepository;
use App\Repositories\Account\UserRoleRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    protected $userRepository;
    protected $userRoleRepository;
    protected $roleRepository;
    public function __construct(UserRepository $userRepository,UserRoleRepository $userRoleRepository,RoleRepository $roleRepository)
    {
        $this->userRepository=$userRepository;
        $this->userRoleRepository=$userRoleRepository;
        $this->roleRepository=$roleRepository;
    }

    /**
     * Get all users
     */
    public function getAllUsers() {
        $data = [];
        foreach ($this->userRepository->getAllUser() as $user) {
            $data[] = ['info'=> $user, 'roles' => $user->roles];
        }
        return $this->jsonResponse('Success', $data);
    }

    /**
     * Get user by id
     * @param $id
     * @return JsonResponse
     */
    public function getUserById($id){
        if($this->userRepository->checkUserAvailable($id)){
            $user = $this->userRepository->getById($id);
            if($user){
                $roles = $user->roles;
                return $this->jsonResponse('Success', ['info' => $user, 'roles' => $roles]);
            }
        }
        return $this->jsonResponse('Not found user', null, null, 404);
    }

    /**
     * Create new user
     * @param Request $request
     * @return JsonResponse
     */
    public function createNewUser(Request $request) {
        /*Validate input*/
        $validator=Validator::make($request->all(),[
            'name'=>'required|string',
            'email'=>'required|string|email|unique:users',
            'password'=>'required|string|min:8',
            'roles'=>'required|array|min:1'
        ]);
        if($validator->fails()){
            return $this->jsonResponse('Bad Request', $request->all(), $validator->errors(), 400);
        }
        $new=$this->userRepository->create([
           'name'=>$request->input('name'),
           'email'=>$request->input('email'),
           'password'=>bcrypt($request->input('password'))
        ]);
        $this->userRoleRepository->insertMany($new->id, $request->input('roles'));
        return $this->jsonResponse('Successfully created new user', ["info"=>$new, "roles"=>$new->roles]);
    }

    /**
     * Edit user
     * @param Request $request
     * @return JsonResponse
     */
    public function editUser(Request $request) {
        /*Validate input*/
        $validator=Validator::make($request->all(),[
            'id'=>'required|int',
            'name'=>'required|string',
            'roles'=>'required|array|min:1'
        ]);
        if($validator->fails()){
            return $this->jsonResponse('Bad Request', $request->all(), $validator->errors(), 400);
        }
        $id=$request->input('id');
        /*Edit user*/
        if($this->userRepository->checkUserAvailable($id)){
            $result=$this->userRepository->update($id,[
                'name'=>$request->input('name')
            ]);
            if($result){
                $this->userRoleRepository->deleteUserRoles($id);
                $this->userRoleRepository->insertMany($id, $request->input('roles'));
                return $this->jsonResponse('Successfully edited user', ['info'=>$result,'roles'=>$result->roles]);
            }
        }
        return $this->jsonResponse('Edit failed', null, null, 404);
    }

    /**
     * Delete user
     * @param $id
     * @return JsonResponse
     */
    public function deleteUser($id) {
        if($this->userRepository->checkUserAvailable($id)){
            $result = $this->userRepository->update($id, ['deleted'=>1]);
            if($result){
                return $this->jsonResponse('Successfully deleted user', $result);
            }
        }
        return $this->jsonResponse('Delete failed', null, null, 404);
    }

    /**
     * Get all roles
     */
    public function getAllRoles() {
        return $this->jsonResponse('Success', $this->roleRepository->getAll());
    }
}
