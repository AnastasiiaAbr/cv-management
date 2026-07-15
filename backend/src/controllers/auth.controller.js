import bcrypt from 'bcrypt';
import prisma from '../prisma/prisma.js';
import jwt from 'jsonwebtoken';

export const test = (req, res) => {
  res.status(200).json({
    message: "Auth controller works!",
  });
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "User registered successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password',
    });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(401).json({
      message: 'Invalid email or password',
    })
  };

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      email: user.email,
    }
  })
}