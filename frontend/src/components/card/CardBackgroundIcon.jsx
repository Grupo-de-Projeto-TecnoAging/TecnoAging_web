function CardBackgroundIcon({ children: Icon, className = ''}) {

    if (!Icon) {
        return null;
    }

    const defaultClass = "absolute right-4 bottom-4 opacity-10";

    const finalClassName = className ? `${defaultClass} ${className}` : defaultClass;

    return (
        <div className={finalClassName}>
            {Icon}
        </div>
    );
}

export default CardBackgroundIcon;