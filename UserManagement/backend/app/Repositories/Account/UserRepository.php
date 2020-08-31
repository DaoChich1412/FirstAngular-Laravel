<?php

namespace App\Repositories\Account;

use App\Models\User;
use App\Repositories\EloquentRepository;

class UserRepository extends EloquentRepository{

    public function getModel()
    {
        return User::class;
    }
    public function getAllUser() {
        return User::where('deleted',0)->get();
    }
    public function checkUserAvailable($id) {
        $user = User::where('id',$id)->where('deleted',0)->get();
        if(count($user)==0){
            return false;
        }
        return true;
    }
}
