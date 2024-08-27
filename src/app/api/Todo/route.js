import Todo from "@/models/todoModel";
import connectDB from "@/config/database";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export const GET = async (req) => {
  try {
    const todos = await Todo.find({});

    return NextResponse.json(
      {
        todos,
        total: todos.length,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (req) => {
  try {
    const reqBody = await req.json();
    const { title, description } = reqBody;

    if (!title || !description) {
      return NextResponse.json(
        { message: "All fields are required" },
        {
          status: 400,
        }
      );
    }

    const findTitle = await Todo.findOne({ title });

    if (findTitle) {
      return NextResponse.json(
        {
          message: "Title already exists.",
          status: 409,
        },
        {
          status: 409,
        }
      );
    }

    const newTodo = new Todo({ title, description });
    await newTodo.save();

    return NextResponse.json(
      { message: "Todo created successfully!", data: newTodo },
      { status: 201 }
    );
  } catch (error) {
    console.error(error.message); // Log the error for debugging
    return NextResponse.json(
      { status: 500, message: "Error creating todo." },
      { status: 500 }
    );
  }
};

export const DELETE = async (req) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await Todo.findByIdAndDelete(id);
    return NextResponse.json(
      {
        message: "DELETE request received.",
        status: 200,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "89.",
      },
      {
        status: 500,
      }
    );
  }
};

export const PUT = async (req) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await Todo.findByIdAndUpdate(id, {
      $set: {
        isCompleted: true,
      },
    });
    return NextResponse.json(
      {
        message: "PUT request received.",
        status: 200,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "89.",
      },
      {
        status: 500,
      }
    );
  }
};
