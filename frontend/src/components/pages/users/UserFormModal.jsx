import { Modal } from "@/components/ui/modal";
import UserForm from "@/components/pages/users/UserForm";

export default function UserFormModal({ isOpen, onClose, userData, onSuccess }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[900px] m-4">
            <div className="w-full max-w-[900px] rounded-3xl bg-white dark:bg-gray-900 p-4 lg:p-6">
                <div className="px-2 mb-4">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                        {userData ? 'Editar usuário' : 'Cadastrar novo usuário'}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {userData
                            ? 'Atualize os dados necessários e salve.'
                            : 'Preencha os dados para concluir o cadastro.'}
                    </p>
                </div>

                <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                    <UserForm
                        mode={userData ? "edit" : "create"}
                        initialData={userData}
                        onSuccess={(updatedData) => {
                            onSuccess?.(updatedData);
                            onClose?.();
                        }}
                    />
                </div>
            </div>
        </Modal>
    );
}
