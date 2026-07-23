import prisma from "../prisma/prisma.js";

export const getProfileAttributes = async (req, res) => {
  try {
    const attributes = await prisma.profileAttributeValue.findMany({
      where: {
        profileId: req.user.profileId,
      },
      include: {
        attribute: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        attribute: {
          name: "asc",
        },
      },
    });

    return res.status(200).json(attributes);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get profile attributes",
    });
  }
};

export const createProfileAttribute = async (req, res) => {
  try {
    const { attributeId, value } = req.body;

    if (!attributeId) {
      return res.status(400).json({
        message: "Attribute is required",
      });
    }

    const existing =
      await prisma.profileAttributeValue.findFirst({
        where: {
          profileId: req.user.profileId,
          attributeId,
        },
      });

    if (existing) {
      return res.status(409).json({
        message: "Attribute already exists in profile",
      });
    }

    const profileAttribute =
      await prisma.profileAttributeValue.create({
        data: {
          profileId: req.user.profileId,
          attributeId,
          value,
        },
        include: {
          attribute: {
            include: {
              category: true,
            },
          },
        },
      });

    return res.status(201).json(profileAttribute);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create profile attribute",
    });
  }
};

export const updateProfileAttribute = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { value } = req.body;

    const existing =
      await prisma.profileAttributeValue.findUnique({
        where: {
          id,
        },
      });

    if (
      !existing ||
      existing.profileId !== req.user.profileId
    ) {
      return res.status(404).json({
        message: "Profile attribute not found",
      });
    }

    const profileAttribute =
      await prisma.profileAttributeValue.update({
        where: {
          id,
        },
        data: {
          value,
        },
        include: {
          attribute: {
            include: {
              category: true,
            },
          },
        },
      });

    return res.status(200).json(profileAttribute);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update profile attribute",
    });
  }
};

export const deleteProfileAttribute = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing =
      await prisma.profileAttributeValue.findUnique({
        where: {
          id,
        },
      });

    if (
      !existing ||
      existing.profileId !== req.user.profileId
    ) {
      return res.status(404).json({
        message: "Profile attribute not found",
      });
    }

    await prisma.profileAttributeValue.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Profile attribute deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete profile attribute",
    });
  }
};