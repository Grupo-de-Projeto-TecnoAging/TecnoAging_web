import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import DangerIcon from "@/components/modal/DangerIcon";
import WarningIcon from "@/components/modal/WarningIcon";
import SuccessIcon from "@/components/modal/SuccessIcon";
import InfoIcon from "@/components/modal/InfoIcon";

const iconMap = {
    danger: DangerIcon,
    warning: WarningIcon,
    info: InfoIcon,
    success: SuccessIcon,
};

export default function AlertModal({
                                       isOpen,
                                       onClose,
                                       type = 'danger',
                                       title = 'Alerta!',
                                       description = 'Você tem certeza que deseja prosseguir?',
                                       onConfirm,
                                   }) {
    const IconComponent = iconMap[type] || DangerIcon;

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} className="max-w-[600px] p-5 lg:p-10">
                <div className="relative w-full rounded-3xl bg-white dark:bg-gray-900">
                    <div className="text-center">
                        <div className="relative flex items-center justify-center z-10 mb-7">
                            <IconComponent />
                        </div>
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 sm:text-title-sm">
                            {title}
                        </h4>
                        <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                            {description}
                        </p>
                        <div className="flex items-center justify-center w-full gap-3 mt-7">
                            <button
                                type="button"
                                onClick={() => {
                                    onConfirm?.();
                                    onClose?.();
                                }}
                                className={`flex justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg ${
                                    type === 'danger'
                                        ? 'bg-red-500 hover:bg-red-600'
                                        : type === 'warning'
                                            ? 'bg-yellow-500 hover:bg-yellow-600'
                                            : type === 'success'
                                                ? 'bg-green-500 hover:bg-green-600'
                                                : 'bg-blue-500 hover:bg-blue-600'
                                } shadow sm:w-auto`}
                            >
                                Ok, continuar
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
