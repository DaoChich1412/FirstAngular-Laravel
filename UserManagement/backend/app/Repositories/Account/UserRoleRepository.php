<?php

namespace App\Repositories\Account;

use App\Models\UserRole;
use App\Repositories\EloquentRepository;

class UserRoleRepository extends EloquentRepository{

    public function getModel()
    {
        return UserRole::class;
    }
    public function insertMany($userId, $roleIds) {
        foreach ($roleIds as $roleId) {
            $userRole = [
                'user_id'=>$userId,
                'role_id'=>$roleId
            ];
            $this->create($userRole);
        }
    }
    public function deleteUserRoles($userId) {
        UserRole::where('user_id', $userId)->delete();
    }
}
