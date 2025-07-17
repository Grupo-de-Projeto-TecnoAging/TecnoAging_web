function CardIcon({children: icon, className = ""}) {

    if (!icon) {
        return null;
    }

    const defaultClass = "flex items-center justify-center";
    const finalClassName = className ? `${defaultClass} ${className}` : defaultClass;

    return (
        <div className={finalClassName}>
            {icon}
        </div>
    );
}

export default CardIcon;