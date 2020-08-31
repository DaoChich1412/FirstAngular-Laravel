<?php
namespace App\Repositories;

interface IRepository{
    /**
     * Get all
     */
    public function getAll();

    /**
     * Get by id
     * @param $id
     * @return mixed
     */
    public function getById($id);

    /**
     * Create
     * @param $attributes
     * @return mixed
     */
    public function create(array $attributes);

    /**
     * Update
     * @param $id
     * @param $attributes
     * @return mixed
     */
    public function update($id, array $attributes);

    /**
     * Delete
     * @param $id
     * @return mixed
     */
    public function delete($id);
}
