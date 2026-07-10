export const getProfile = async (req, res) => {
  res.status(200).json({
    message: 'Profile works',
    user: req.user,
  })
}