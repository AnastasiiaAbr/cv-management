import prisma from "../prisma/prisma.js";

export const createAttribute = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      categoryId,
    } = req.body;

    if (!name || !type || !categoryId) {
      return res.status(400).json({
        message: "Name, type and category are required",
      });
    }

    const attribute = await prisma.attribute.create({
      data: {
        name,
        description,
        type,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return res.status(201).json(attribute);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create attribute",
    });
  }
};

export const getAttributes = async (req, res) => {
  try {
    const attributes = await prisma.attribute.findMany({
      include: {
        category: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return res.status(200).json(attributes);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get attributes",
    });
  }
};

export const updateAttribute = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const {
      name,
      description,
      type,
      categoryId,
    } = req.body;

    if (!name || !type || !categoryId) {
      return res.status(400).json({
        message: "Name, type and category are required",
      });
    }

    const attribute = await prisma.attribute.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        type,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return res.status(200).json(attribute);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update attribute",
    });
  }
};

export const deleteAttribute = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.attribute.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Attribute deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete attribute",
    });
  }
};