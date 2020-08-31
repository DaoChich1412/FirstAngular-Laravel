<?php


namespace App\Repositories\Account;


use App\Models\Role;
use App\Repositories\EloquentRepository;

class RoleRepository extends EloquentRepository
{
    public function getModel()
    {
        return Role::class;
    }
}
