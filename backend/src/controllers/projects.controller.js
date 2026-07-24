import prisma from "../prisma/prisma.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        profileId: req.user.profileId,
      },
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to load projects",
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const {
      name,
      startDate,
      endDate,
      current,
      description,
    } = req.body;

    const project = await prisma.project.create({
      data: {
        profileId: req.user.profileId,
        name,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current: current ?? false,
        description,
      },
    });

    return res.status(201).json(project);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create project",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const project = await prisma.project.findFirst({
      where: {
        id,
        profileId: req.user.profileId,
      },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const {
      name,
      startDate,
      endDate,
      current,
      description,
    } = req.body;

    const updatedProject = await prisma.project.update({
      where: {
        id,
      },
      data: {
        name,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current,
        description,
      },
    });

    return res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update project",
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const project = await prisma.project.findFirst({
      where: {
        id,
        profileId: req.user.profileId,
      },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await prisma.project.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete project",
    });
  }
};