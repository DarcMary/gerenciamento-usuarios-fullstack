// src/App.jsx

import { useState, useEffect } from "react";
import { userService } from "./services/api";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { ToastContainer, toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

// Ícones (Heroicons são uma ótima opção com Tailwind)
const PlusIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

function App() {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      toast.error("Erro ao carregar usuários.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (userToEdit) {
        const updatedUser = await userService.update(userToEdit.id, data);
        setUsers(users.map((u) => (u.id === userToEdit.id ? updatedUser : u))); // Atualiza apenas o usuário editado
        toast.success("Usuário atualizado com sucesso!");
      } else {
        const newUser = await userService.create(data);
        setUsers([...users, newUser]);
        toast.success("Usuário cadastrado com sucesso!");
      }
      setIsFormOpen(false);
      setUserToEdit(null);
      fetchUsers();
    } catch (error) {
      toast.error(userToEdit ? "Erro ao atualizar." : "Erro ao cadastrar.");
    }
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      try {
        await userService.delete(id);
        setUsers(users.filter((u) => u.id !== id));
        toast.success("Usuário excluído com sucesso!");
        fetchUsers();
      } catch (error) {
        toast.error("Erro ao excluir usuário.");
      }
    }
  };

  const handleOpenForm = () => {
    setUserToEdit(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans">
      {/* Efeito Aurora no Fundo */}
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000" />
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-950/50 backdrop-blur-lg">
          <div className="container mx-auto flex h-20 items-center justify-between px-6">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              <span className="text-primary-400">User</span>
              <span className="text-secondary-400">Flow</span>
            </h1>
            <button
              onClick={handleOpenForm}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg ring-1 ring-white/20 transition-all duration-300 hover:scale-105 hover:from-primary-500 hover:to-secondary-500 active:scale-95"
            >
              <PlusIcon className="mr-1.5 h-5 w-5" />
              Novo Usuário
            </button>
          </div>
        </header>

        <main className="container mx-auto flex-grow p-6">
          {loading ? (
            <div className="flex h-96 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary-400"></div>
            </div>
          ) : (
            <UserList
              users={users}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </main>

        <footer className="py-6">
          <p className="text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} UserFlow Management System
          </p>
        </footer>
      </div>

      {/* Modal do Formulário com Animação */}
      <AnimatePresence>
        {isFormOpen && (
          <UserForm
            onSubmit={handleSubmit}
            initialData={userToEdit}
            isEditing={!!userToEdit}
            onCancel={handleCloseForm}
          />
        )}
      </AnimatePresence>

      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
}

export default App;
