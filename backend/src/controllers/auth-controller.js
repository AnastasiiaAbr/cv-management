import bcrypt from 'bcrypt';

export const test = (req, res) => {
  res.status(200).json({
    message: "Auth controller works!",
  });
};

export const register = async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  };

  const hashedPassword = await bcrypt.hash(password, 10);

  res.status(201).json({
    message: 'User registered successfully',
  })
}