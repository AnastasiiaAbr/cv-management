import prisma from "../prisma/prisma.js";

export const getPositions = async (req, res) => {
  try {
    const positions = await prisma.position.findMany({
      include: {
        attributes: true,
      },
      orderBy: {
        title: 'asc',
      },
    });

    res.json(positions);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to load positions',
    });
  }
};

export const createPosition = async (req, res) => {
  try {
    const {
      title,
      description,
      attributeIds = [],
    } = req.body;

    const position = await prisma.position.create({
      data: {
        title,
        description,
        attributes: {
          connect: attributeIds.map((id) => ({
            id: Number(id),
          })),
        },
      },
      include: {
        attributes: true,
      },
    });

    res.status(201).json(position);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create position",
    });
  }
};

export const updatePosition = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    attributeIds = [],
  } = req.body;

  try {
    const position = await prisma.position.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
        attributes: {
          set: attributeIds.map((id) => ({
            id: Number(id),
          })),
        },
      },
      include: {
        attributes: true,
      },
    });

    res.json(position);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update position",
    });
  }
};

export const deletePosition = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.position.delete({
      where: {
        id: Number(id),
      }
    });

    res.json({
      message: 'Position deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete position',
    });
  }
};

export const getPositionById = async (req, res) => {
  try {
    const { id } = req.params;

    const position = await prisma.position.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        attributes: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!position) {
      return res.status(404).json({
        message: "Position not found",
      });
    }

    res.json(position);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load position",
    });
  }
};

export const updatePositionAttributes = async (req, res) => {
  try {
    const { id } = req.params;
    const { attributeIds } = req.body;

    const position = await prisma.position.update({
      where: {
        id: Number(id),
      },
      data: {
        attributes: {
          set: attributeIds.map((id) => ({ id })),
        },
      },
      include: {
        attributes: true,
      },
    });

    res.json(position);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update position attributes",
    });
  }
};