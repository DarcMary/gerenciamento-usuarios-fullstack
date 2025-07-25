import PropTypes from "prop-types";
import { useState } from "react";
import { motion } from "framer-motion";

const UserForm = ({ onSubmit, initialData, isEditing, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,11}$/;
    if (!formData.get("nomeCompleto")?.trim())
      newErrors.nomeCompleto = "Nome é obrigatório";
    if (!formData.get("email")?.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!emailRegex.test(formData.get("email"))) {
      newErrors.email = "E-mail inválido";
    }
    if (!isEditing && !formData.get("senha")?.trim())
      newErrors.senha = "Senha é obrigatória";
    if (!formData.get("telefone")?.trim()) {
      newErrors.telefone = "Telefone é obrigatório";
    } else if (!phoneRegex.test(formData.get("telefone").replace(/\D/g, ""))) {
      newErrors.telefone = "Telefone inválido";
    }
    if (!formData.get("dtNascimento"))
      newErrors.dtNascimento = "Data de nascimento é obrigatória";
    if (!formData.get("endereco")?.trim())
      newErrors.endereco = "Endereço é obrigatório";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setErrors({});
    const data = Object.fromEntries(formData.entries());
    await onSubmit(data);
    setIsSubmitting(false);
  };

  const FormInput = ({ id, label, error, required, ...props }) => (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-neutral-300">
        {label} {required && <span className="text-danger-400">*</span>}
      </label>
      <input
        id={id}
        className={`block w-full rounded-lg border-neutral-700 bg-neutral-900/50 text-neutral-200 shadow-sm transition-colors duration-200 placeholder:text-neutral-500 focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
          error ? "border-danger-500 focus:ring-danger-500" : ""
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-danger-400">{error}</p>}
    </div>
  );

  return (
    // Backdrop
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      {/* Modal Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()} // Impede que o clique feche o modal
        className="w-full max-w-2xl rounded-2xl bg-neutral-900/80 shadow-2xl ring-1 ring-white/10"
      >
        <div className="px-6 py-5 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? "Editar Usuário" : "Criar Novo Usuário"}
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            Preencha os campos abaixo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <FormInput
              id="nomeCompleto"
              name="nomeCompleto"
              label="Nome Completo"
              error={errors.nomeCompleto}
              required
              defaultValue={initialData?.nomeCompleto}
              placeholder="Digite o nome completo"
            />
            <FormInput
              id="email"
              name="email"
              type="email"
              label="E-mail"
              error={errors.email}
              required
              defaultValue={initialData?.email}
              placeholder="exemplo@email.com"
            />
            <FormInput
              id="senha"
              name="senha"
              type="password"
              label="Senha"
              error={errors.senha}
              required={!isEditing}
              placeholder={
                isEditing ? "Deixe em branco para não alterar" : "••••••••"
              }
            />
            <FormInput
              id="telefone"
              name="telefone"
              type="tel"
              label="Telefone"
              error={errors.telefone}
              required
              defaultValue={initialData?.telefone}
              placeholder="(00) 00000-0000"
            />
            <FormInput
              id="dtNascimento"
              name="dtNascimento"
              type="date"
              label="Data de Nascimento"
              error={errors.dtNascimento}
              required
              defaultValue={initialData?.dtNascimento?.split("T")[0]}
            />
            <FormInput
              id="endereco"
              name="endereco"
              label="Endereço"
              error={errors.endereco}
              required
              defaultValue={initialData?.endereco}
              placeholder="Rua, número, bairro..."
            />
          </div>

          <div className="flex justify-end mt-8 pt-6 border-t border-white/10 space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-semibold text-neutral-300 bg-neutral-800 rounded-lg hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-primary-500 transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-primary-500 transition-all duration-200 disabled:from-neutral-600 disabled:to-neutral-700 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Processando..."
                : isEditing
                ? "Salvar Alterações"
                : "Cadastrar Usuário"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  isEditing: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
};

export default UserForm;
