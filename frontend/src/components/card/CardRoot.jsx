function CardRoot({ children, className = "" }) {

    const defaultClass = "flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] md:p-6";
    const finalClassName = className ? `${defaultClass} ${className}` : defaultClass

    return (
        <div className={finalClassName}>
            {children}
        </div>
    )
}

export default CardRoot;