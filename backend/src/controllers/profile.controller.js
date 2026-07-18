import prisma from "../prisma/prisma.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: req.user.userId,
      },
    });

    if (!profile) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      location,
      linkedin,
      github,
      website,
      summary,
    } = req.body;

    const profile = await prisma.profile.update({
      where: {
        userId: req.user.userId, 
      },
      data: {
        firstName, 
        lastName, 
        email,
        phone, 
        location, 
        linkedin, 
        github, 
        website, 
        summary,
      },
    });

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Interval server error',
    });
  }
};