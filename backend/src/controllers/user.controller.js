import Prisma from '@prisma/client';
const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

const validateUserData = (data) => {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10,11}$/;

  if (!data.nomeCompleto?.trim()) {
    errors.push('Nome completo é obrigatório');
  }

  if (!data.email?.trim()) {
    errors.push('E-mail é obrigatório');
  } else if (!emailRegex.test(data.email)) {
    errors.push('E-mail inválido');
  }

  if (!data.senha && !data.id) {
    errors.push('Senha é obrigatória para novos usuários');
  }

  if (!data.telefone?.trim()) {
    errors.push('Telefone é obrigatório');
  } else if (!phoneRegex.test(data.telefone.replace(/\D/g, ''))) {
    errors.push('Telefone inválido (deve conter 10 ou 11 dígitos)');
  }

  if (!data.dtNascimento) {
    errors.push('Data de nascimento é obrigatória');
  } else {
    const dtNascimento = new Date(data.dtNascimento);
    const hoje = new Date();
    if (dtNascimento > hoje) {
      errors.push('Data de nascimento não pode ser futura');
    }
  }

  if (!data.endereco?.trim()) {
    errors.push('Endereço é obrigatório');
  }

  return errors;
};

export const createUser = async (req, res) => {
  try {
    const validationErrors = validateUserData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: 'Erro de validação', 
        errors: validationErrors 
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email }
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'Erro de validação',
        errors: ['E-mail já cadastrado']
      });
    }

    const newUser = await prisma.user.create({
      data: {
        ...req.body,
        nomeCompleto: req.body.nomeCompleto.trim(),
        email: req.body.email.trim(),
        telefone: req.body.telefone.trim(),
        endereco: req.body.endereco.trim(),
        dtNascimento: new Date(req.body.dtNascimento)
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const validationErrors = validateUserData({ ...req.body, id });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: 'Erro de validação', 
        errors: validationErrors 
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email }
    });

    if (existingUser && existingUser.id !== parseInt(id)) {
      return res.status(400).json({ 
        message: 'Erro de validação',
        errors: ['E-mail já cadastrado por outro usuário']
      });
    }

    const updateData = {
      ...req.body,
      nomeCompleto: req.body.nomeCompleto.trim(),
      email: req.body.email.trim(),
      telefone: req.body.telefone.trim(),
      endereco: req.body.endereco.trim(),
      dtNascimento: new Date(req.body.dtNascimento)
    };

    // Remove senha do objeto se não foi fornecida
    if (!updateData.senha) {
      delete updateData.senha;
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};