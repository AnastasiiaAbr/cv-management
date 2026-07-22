import prisma from "../prisma/prisma.js";

export const getCVs = async (req, res) => {
  try {
    const cvs = await prisma.cV.findMany({
      where: {
        profileId: req.user.profileId,
      },
      include: {
        position: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(cvs);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get CVs",
    });
  }
};

export const getCVById = async (req, res) => {
  try {
    const { id } = req.params;

    const cv = await prisma.cV.findFirst({
      where: {
        id: Number(id),
        profileId: req.user.profileId,
      },
      include: {
        position: true,
      },
    });

    if (!cv) {
      return res.status(404).json({
        message: "CV not found",
      });
    }

    return res.status(200).json(cv);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get CV",
    });
  }
};

export const createCV = async (req, res) => {
  try {
    const { title, positionId } = req.body;

    const existingCV = await prisma.cV.findUnique({
      where: {
        profileId_positionId: {
          profileId: req.user.profileId,
          positionId: Number(positionId),
        },
      },
    });

    if (existingCV) {
      return res.status(409).json({
        message: "CV for this position already exists",
      });
    }

    const cv = await prisma.cV.create({
      data: {
        title,
        profileId: req.user.profileId,
        positionId: Number(positionId),
      },
      include: {
        position: true,
      },
    });

    return res.status(201).json(cv);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create CV",
    });
  }
};

export const updateCV = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const cv = await prisma.cv.findFirst({
      where: {
        id: Number(id),
        profileId: req.user.profileId,
      },
    });

    if (!cv) {
      return res.status(404).json({
        message: "CV not found",
      });
    }

    const updatedCV = await prisma.cv.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
      },
      include: {
        position: true,
      },
    });

    return res.status(200).json(updatedCV);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update CV",
    });
  }
};

export const deleteCV = async (req, res) => {
  try {
    const { id } = req.params;

    const cv = await prisma.cv.findFirst({
      where: {
        id: Number(id),
        profileId: req.user.profileId,
      },
    });

    if (!cv) {
      return res.status(404).json({
        message: "CV not found",
      });
    }

    await prisma.cv.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      message: "CV deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete CV",
    });
  }
};