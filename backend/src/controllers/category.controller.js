import prisma from '../prisma/prisma.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to get categories',
    });
  }
};