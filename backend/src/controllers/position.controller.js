import prisma from "../prisma/prisma.js";

export const getPositions = async (req, res) => {
  try {
    const positions = await prisma.position.findMany({
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
    const { title, description } = req.body;

    const position = await prisma.position.create({
      data: {
        title,
        description,
      },
    });

    res.status(201).json(position)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create position',
    });
  }
};

export const updatePosition = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, description} = req.body;

    const position = await prisma.position.update({
      where: {
        id: Number(id),
      },
      data: {
        title, 
        description,
      },
    });

    res.json(position);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update position',
    });
  }
};

export const deletePosition = async (req, res) => {
  try {
    const {id} = req.params;

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