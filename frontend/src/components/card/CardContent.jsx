function CardContent({className, title, content}) {

    if (content === null || content === undefined) {
        return null;
    }

    const defaultClass = "p-2 rounded-lg";
    const finalClassName = className ? `${defaultClass} ${className}` : defaultClass;

    return (
        <div className={finalClassName}>
            {title && (
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            )}
            <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">{content}</h4>
        </div>
    )
}

export default CardContent;