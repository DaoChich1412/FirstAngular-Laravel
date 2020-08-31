<?php
namespace App\Repositories;

abstract class EloquentRepository implements IRepository{
    /**
     * Eloquent model
     */
    protected $_model;

    /**
     * EloquentRepository constructor.
     */
    public function __construct()
    {
        $this->setModel();
    }

    /**
     * get model
     * @return string
     */
    abstract public function getModel();

    /**
     * Set model
     */
    public function setModel()
    {
        $this->_model = app()->make(
            $this->getModel()
        );
    }

    public function getAll()
    {
        return $this->_model->all();
    }

    public function getById($id)
    {
        return $this->_model->find($id);
    }

    public function create(array $attributes)
    {
        return $this->_model->create($attributes);
    }

    public function update($id, array $attributes)
    {
        $result=$this->_model->find($id);
        if($result){
            $result->update($attributes);
            return $result;
        }
        return false;
    }

    public function delete($id)
    {
        $result=$this->_model->find($id);
        if($result){
            $result->delete();
            return true;
        }
        return false;
    }
}
