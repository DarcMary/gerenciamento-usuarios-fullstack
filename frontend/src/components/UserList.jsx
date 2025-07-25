import PropTypes from "prop-types";

const EditIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
  </svg>
);

const DeleteIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.22-2.365.468a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4.888c-1.703 0-3.297.236-4.67.639a.75.75 0 00.552 1.43l.1-.024a29.488 29.488 0 018.036 0l.1.024a.75.75 0 00.552-1.43C13.297 5.124 11.703 4.888 10 4.888z"
      clipRule="evenodd"
    />
  </svg>
);

const UserList = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 rounded-2xl bg-neutral-900/50 text-center">
        <svg
          className="w-20 h-20 text-neutral-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375.336.375.75zm-.75 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.75 0h.008v.015h-.008V9.75z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-semibold text-white">
          Nenhum usuário encontrado
        </h3>
        <p className="mt-1 text-sm text-neutral-400">
          Clique em "Novo Usuário" para começar a cadastrar.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="group relative flex flex-col rounded-2xl bg-neutral-900/80 p-5 shadow-lg ring-1 ring-white/10 transition-all duration-300 hover:ring-primary-400/50"
        >
          <div className="flex-grow">
            {/* Avatar e Nome */}
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 text-xl font-bold text-white">
                {user.nomeCompleto.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {user.nomeCompleto}
                </h3>
                <p className="text-sm text-neutral-400">{user.email}</p>
              </div>
            </div>

            {/* Outras Informações */}
            <div className="mt-5 space-y-2 text-sm">
              <p className="text-neutral-300">
                <span className="font-semibold text-neutral-500">
                  Telefone:
                </span>{" "}
                {user.telefone}
              </p>
              <p className="text-neutral-300">
                <span className="font-semibold text-neutral-500">Idade:</span>{" "}
                {user.dtNascimento
                  ? `${
                      new Date().getFullYear() -
                      new Date(user.dtNascimento).getFullYear()
                    } anos`
                  : "-"}
              </p>
            </div>
          </div>

          {/* Ações */}
          <div className="mt-6 flex justify-end space-x-2">
            <button
              onClick={() => onEdit(user)}
              className="inline-flex items-center rounded-md bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
            >
              <EditIcon className="mr-1.5 h-4 w-4" /> Editar
            </button>
            <button
              onClick={() => onDelete(user.id)}
              className="inline-flex items-center rounded-md bg-danger-900/50 px-3 py-1.5 text-xs font-semibold text-danger-300 hover:bg-danger-800/50 hover:text-danger-200 transition-colors"
            >
              <DeleteIcon className="mr-1.5 h-4 w-4" /> Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserList;
