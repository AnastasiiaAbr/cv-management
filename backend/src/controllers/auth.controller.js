import bcrypt from 'bcrypt';
import prisma from '../prisma/prisma.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
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

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      await tx.profile.create({
        data: {
          userId: user.id,
          firstName,
          lastName,
          email,
        },
      });
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
    include: {
      profile: true,
    },
  });

  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password',
    });
  }

  if (!user.password) {
    return res.status(401).json({
      message: "Please sign in with GitHub.",
    });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = generateToken(user);

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    }
  })
}

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const githubLogin = (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri:
      "https://cv-management-back.onrender.com/auth/github/callback",
    scope: "user:email",
  });

  res.redirect(
    `https://github.com/login/oauth/authorize?${params}`
  );
};

export const githubCallback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        message: "GitHub code is missing",
      });
    }

    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res.status(400).json({
        message: "Failed to obtain GitHub access token",
      });
    }

    const githubResponse = await fetch(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    const githubUser = await githubResponse.json();

    const emailResponse = await fetch(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    const emails = await emailResponse.json();

    const email =
      emails.find((e) => e.primary && e.verified)?.email ??
      githubUser.email;

    if (!email) {
      return res.status(400).json({
        message: "GitHub account has no verified email.",
      });
    }

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          password: null,
          githubId: String(githubUser.id),
          profile: {
            create: {
              firstName:
                githubUser.name?.split(" ")[0] ??
                githubUser.login,
              lastName:
                githubUser.name
                  ?.split(" ")
                  .slice(1)
                  .join(" ") ?? "",
              email,
            },
          },
        },
        include: {
          profile: true,
        },
      });
    } else if (!user.githubId) {
      user = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          githubId: String(githubUser.id),
        },
        include: {
          profile: true,
        },
      });
    }

    const token = generateToken(user);

    return res.redirect(
      `https://cv-management-tifl.onrender.com/oauth-success?token=${token}`
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "GitHub authentication failed",
    });
  }
};