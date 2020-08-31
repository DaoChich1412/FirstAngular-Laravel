<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Repositories\Account\UserRepository;
use App\Repositories\Account\UserRoleRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    protected $userRepository;
    protected $userRoleRepository;
    public function __construct(UserRepository $userRepository,UserRoleRepository $userRoleRepository)
    {
        $this->userRepository=$userRepository;
        $this->userRoleRepository=$userRoleRepository;
    }

    /**
     * Register
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request){
        /*Validate input*/
        $validator=Validator::make($request->all(),[
            'name'=>'required|string',
            'email'=>'required|string|email|unique:users',
            'password'=>'required|string|min:8'
        ]);
        if($validator->fails()){
            return $this->jsonResponse('Bad Request', $request->all(), $validator->errors(), 400);
        }
        /*Create new user*/
        $user=[
            'name'=>$request->input('name'),
            'email'=>$request->input('email'),
            'password'=>bcrypt($request->input('password'))
        ];
        $new=$this->userRepository->create($user);
        /*Default role for new user*/
        $this->userRoleRepository->create([
           'user_id'=>$new->id,
           'role_id'=>2
        ]);
        return $this->jsonResponse('Successfully Registered!', $new);
    }

    /**
     * Login
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request){
        /*Validate input*/
        $validator=Validator::make($request->all(),[
           'email'=>'required|string|email',
           'password'=>'required|string'
        ]);
        if($validator->fails()){
            return $this->jsonResponse('Bad Request', $request->all(), $validator->errors(), 400 );
        }
        $credentials=[
          'email'=>$request->input('email'),
          'password'=>$request->input('password')
        ];
        /*If(existed account) $token = jwt else $token = null*/
        $token=auth()->attempt($credentials);
        if(!$token){
            return $this->jsonResponse( 'Email or password is invalid!', $credentials, 'Unauthorized', 401);
        }
        return $this->jsonResponse('Successfully logged in!',[
            'access_token'=>$token,
            'token_type'=>'Bearer',
            'expires_in'=>auth()->factory()->getTTL()*60
        ]);
    }

    /**
     * Logout
     */
    public function logout(){
        auth()->logout();
        return $this->jsonResponse('Successfully logged out!');
    }

    /**
     * Get authenticated user
     */
    public function authUser(){
        $auth = auth()->user();
        $roles = $this->userRepository->getById($auth->id)->roles;
        return $this->jsonResponse('Success', ['info'=>$auth,'roles'=>$roles]);
    }
}
