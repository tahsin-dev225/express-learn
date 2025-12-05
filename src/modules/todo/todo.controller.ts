import { Request, Response } from "express";
import { pool } from "../../config/db";
import { todoServices } from "./todo.service";

const createTodo = async(req:Request, res : Response)=>{
  const { user_id, title } = req.body;
  try {
    const result = await todoServices.createTodo(req.body)

    res.status(200).json({
      status : true,
      message : "TOdo created",
      data : result.rows[0]
    })
  } catch (err : any) {
    res.status(500).json({
      status : true,
      message : err.message,
    })
  }
}

const getTodo =  async(req:Request, res : Response)=>{
  try {
    const result = await todoServices.getTodo()

    res.status(200).json({
      success : true,
      message : "todos retrieved successfully",
      data : result.rows,
    })
  } catch (err : any) {
    res.status(500).json({success : false ,message : err?.message})
  }
}


const getSingleTodo =  async(req:Request, res : Response)=>{
  try {
    const result = await todoServices.getSingleTodo(req.params.id as string)

    if(result.rows.length === 0){
      res.status(404).json({
        success : false,
        message : "Users not found.",
      })
    }else{
      res.status(200).json({
        success : true,
        message : "Users retrieved successfully",
        data : result.rows[0],
      })
    }
  } catch (err : any) {
    res.status(500).json({success : false ,message : err?.message})
  }
}

const UpdateTodo = async(req:Request, res : Response)=>{
  const {title} = req.body;
  try {
    const result = await todoServices.updateTodo(title, req.params.id!)

    if(result.rows.length === 0){
      res.status(404).json({
        success : false,
        message : "Users not found.",
      })
    }else{
      res.status(200).json({
        success : true,
        message : "Users updated successfully",
        data : result.rows[0],
      })
    }
  } catch (err : any) {
    res.status(500).json({success : false ,message : err?.message})
  }
}

const deleteTodo = async(req:Request, res : Response)=>{
  try {
    const result = await todoServices.deleteTodo(req.params.id!)
    console.log(result)
    if(result.rowCount === 0){
      res.status(404).json({
        success : false,
        message : "Users not found.",
      })
    }else{
      res.status(200).json({
        success : true,
        message : "Users deleted successfully",
        data : null,
      })
    }
    
  } catch (err : any) {
    res.status(500).json({success : false ,message : err?.message})
  }
}



export const todoController = {
  createTodo,
  getTodo,
  getSingleTodo,
  UpdateTodo,
  deleteTodo
}